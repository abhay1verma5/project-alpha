import { NextRequest, NextResponse } from 'next/server';
import { callGemini } from '@/lib/gemini';

function getApiBase() { return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'; }

const SYSTEM_PROMPT = `You are a helpful Indian government job search assistant for SarkariAlert.
Given a user's search query (in Hindi, English, or Hinglish), extract structured search filters.

Available categories: railway, ssc, banking, defence, upsc, state_psc, teaching, police, health, engineering, medical, university, gramin, other
Available states: all_india, uttar_pradesh, bihar, rajasthan, madhya_pradesh, maharashtra, delhi, haryana, punjab, tamil_nadu, karnataka, west_bengal, gujarat, kerala, andhra_pradesh, telangana, odisha, jharkhand, chhattisgarh, assam, uttarakhand, himachal_pradesh, goa, jammu_kashmir, arunachal_pradesh, manipur, meghalaya, mizoram, nagaland, sikkim, tripura, chandigarh, puducherry, andaman_nicobar, dadra_nagar_haveli, lakshadweep
Available content_types: job, result, admit_card, answer_key, admission
Available qualifications: 8th, 10th, 12th, ITI, Diploma, D.Pharm, GNM, ANM, Graduate, BA, B.Sc, B.Com, B.Tech, BCA, BBA, B.Ed, BTC, LLB, MBBS, BDS, BAMS, BHMS, B.Pharm, B.Sc Nursing, Post Graduate, MA, M.Sc, M.Com, M.Tech, MBA, MCA, M.Ed, LLM, MD, PhD, NET

Respond ONLY with valid JSON (no markdown, no explanation):
{
  "category": "matched category or empty string",
  "state": "matched state or empty string",
  "qualification": "matched qualification or empty string",
  "content_type": "matched content_type or empty string",
  "search_text": "remaining search keywords for text search",
  "summary": "One line Hindi+English summary of what user is looking for (for display)"
}

Examples:
- "10th pass railway job UP" → {"category":"railway","state":"uttar_pradesh","qualification":"10th","content_type":"","search_text":"","summary":"UP में 10th पास के लिए Railway Jobs"}
- "ssc result" → {"category":"ssc","state":"","qualification":"","content_type":"result","search_text":"","summary":"SSC Result देखें"}
- "bsc nursing job bihar" → {"category":"medical","state":"bihar","qualification":"B.Sc Nursing","content_type":"","search_text":"","summary":"Bihar में B.Sc Nursing Jobs"}
- "polytechnic admission UP" → {"category":"engineering","state":"uttar_pradesh","qualification":"Diploma","content_type":"admission","search_text":"polytechnic","summary":"UP Polytechnic Admission / JEECUP Counseling"}
- "ग्राम पंचायत नौकरी" → {"category":"gramin","state":"","qualification":"","content_type":"","search_text":"gram panchayat","summary":"ग्राम पंचायत / Rural Government Jobs"}`;

interface SearchFilters {
  category?: string;
  state?: string;
  qualification?: string;
  content_type?: string;
  search_text?: string;
  summary?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query || query.length < 2) {
      return NextResponse.json({ error: 'Query too short' }, { status: 400 });
    }
    if (query.length > 200) {
      return NextResponse.json({ error: 'Query too long' }, { status: 400 });
    }

    const result = await callGemini<SearchFilters>({
      systemPrompt: SYSTEM_PROMPT,
      userMessage: `User query: "${query}"`,
      temperature: 0.1,
      maxTokens: 256,
      json: true,
    });

    if (!result.ok) {
      // Fallback to text search
      const res = await fetch(`${getApiBase()}/search/?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      return NextResponse.json({
        results: data.results || [],
        summary: `Showing results for "${query}"`,
        filters: {},
        ai_powered: false,
      });
    }

    const filters = result.data;

    // Build Django API query params from AI-extracted filters
    const params = new URLSearchParams();
    if (filters.category) params.set('category', filters.category);
    if (filters.state) params.set('state', filters.state);
    if (filters.qualification) params.set('qualification', filters.qualification);
    if (filters.search_text) params.set('search', filters.search_text);

    // Route to the correct endpoint based on content_type
    const CONTENT_TYPE_ENDPOINTS: Record<string, string> = {
      admission: '/admissions/',
      result: '/results/',
      admit_card: '/admit-cards/',
      answer_key: '/answer-keys/',
      syllabus: '/syllabus/',
    };

    let apiUrl: string;
    if (!params.toString() && !filters.content_type) {
      apiUrl = `${getApiBase()}/search/?q=${encodeURIComponent(query)}`;
    } else {
      const endpoint = CONTENT_TYPE_ENDPOINTS[filters.content_type || ''] || '/jobs/';
      apiUrl = `${getApiBase()}${endpoint}?${params.toString()}&page_size=20`;
    }

    const jobsRes = await fetch(apiUrl);
    const jobsData = await jobsRes.json();

    return NextResponse.json({
      results: jobsData.results || [],
      summary: filters.summary || `Results for "${query}"`,
      filters: {
        category: filters.category || null,
        state: filters.state || null,
        qualification: filters.qualification || null,
        content_type: filters.content_type || null,
      },
      ai_powered: true,
    });
  } catch {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
