import { NextRequest, NextResponse } from 'next/server';
import { callGemini } from '@/lib/gemini';
import { checkStaticEligibility } from '@/lib/eligibility-data';

const SYSTEM_PROMPT = `You are an Indian government exam eligibility expert. Given a candidate's profile, check their eligibility for major government exams.

Analyze eligibility for these exams: SSC CGL, SSC CHSL, SSC MTS, UPSC CSE, UPSC CDS, NDA, Railway NTPC, Railway Group D, IBPS PO, IBPS Clerk, SBI PO, CTET, UP Police Constable, UP SI, Agniveer (Army), State PCS, Gram Panchayat Secretary, GNM/ANM Nursing.

Consider:
- Age limits with category-wise relaxation (OBC: +3 years, SC/ST: +5 years)
- Minimum qualification requirements
- Gender-specific criteria if any
- State-specific variations

Respond ONLY with valid JSON (no markdown):
{
  "total_eligible": number,
  "top_pick": "exam name",
  "top_pick_reason": "why this is the best choice",
  "exams": [
    {
      "name": "exam name",
      "eligible": true/false,
      "salary_range": "₹XX,XXX - ₹X,XX,XXX",
      "age_range": "18-32 years (with relaxation)",
      "tips": "preparation tip",
      "reason": "why eligible or not eligible"
    }
  ]
}`;

interface EligibilityResult {
  total_eligible: number;
  top_pick: string;
  top_pick_reason: string;
  exams: {
    name: string;
    eligible: boolean;
    salary_range: string;
    age_range: string;
    tips: string;
    reason: string;
  }[];
}

export async function POST(request: NextRequest) {
  try {
    const { dob, qualification, category, gender, state, lang } = await request.json();

    if (!dob || !qualification || !category || !gender) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Calculate age
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    const language = lang === 'hi' ? 'hi' : 'en';
    const langInstruction = language === 'hi'
      ? 'Respond in Hindi (tips, reasons, top_pick_reason in Hindi/Devanagari).'
      : 'Respond in English.';

    const result = await callGemini<EligibilityResult>({
      systemPrompt: SYSTEM_PROMPT,
      userMessage: `Candidate Profile:
- Age: ${age} years (DOB: ${dob})
- Qualification: ${qualification}
- Category: ${category}
- Gender: ${gender}
- State: ${state || 'Not specified'}

${langInstruction}`,
      temperature: 0.1,
      maxTokens: 4096,
      json: true,
    });

    if (result.ok && result.data && typeof result.data.total_eligible === 'number') {
      return NextResponse.json({ ...result.data, source: 'ai' });
    }

    // Fallback to static eligibility check
    const staticResults = checkStaticEligibility({ age, qualification, category, gender });
    const eligible = staticResults.filter((r) => r.eligible);

    return NextResponse.json({
      total_eligible: eligible.length,
      top_pick: eligible[0]?.exam.name || 'None found',
      top_pick_reason: eligible[0]
        ? (language === 'hi' ? `आपकी प्रोफ़ाइल के अनुसार ${eligible[0].exam.name_hi} सबसे उपयुक्त है।` : `Based on your profile, ${eligible[0].exam.name} is the best match.`)
        : (language === 'hi' ? 'आपकी प्रोफ़ाइल से कोई परीक्षा मेल नहीं खाती।' : 'No matching exams found for your profile.'),
      exams: staticResults.map((r) => ({
        name: language === 'hi' ? r.exam.name_hi : r.exam.name,
        eligible: r.eligible,
        salary_range: `₹${r.exam.salary_range}`,
        age_range: `${r.exam.min_age}-${r.exam.max_age} years`,
        tips: language === 'hi' ? r.exam.tips_hi : r.exam.tips,
        reason: r.eligible
          ? (language === 'hi' ? 'आप पात्र हैं' : 'You are eligible')
          : (r.reason || 'Not eligible'),
      })),
      source: 'static',
    });
  } catch {
    return NextResponse.json({ error: 'Eligibility check failed' }, { status: 500 });
  }
}
