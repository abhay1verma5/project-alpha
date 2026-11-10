#!/bin/bash
# Parallel PYQ generation for ALL exams
# Run from backend/ directory

cd "$(dirname "$0")"
source venv/bin/activate
set -a; source "$(dirname "$0")/.env"; set +a  # key comes from backend/.env, never hard-code it
export DJANGO_SECRET_KEY="${DJANGO_SECRET_KEY:-temp-secret-key-for-generation}"

LOG_DIR="/tmp/pyq_logs"
mkdir -p "$LOG_DIR"

# All exam types
EXAMS=(
  # Engineering (back to 1998-2005)
  jee_main jee_advanced gate_cse gate_ece gate_me gate_ee gate_ce gate_ch gate_in gate_bt gate_pi gate_xe ese isro
  # Medical (back to 2000-2005)
  neet neet_pg aiims jipmer
  # SSC (back to 2000-2008)
  ssc_cgl ssc_chsl ssc_mts ssc_gd ssc_cpo ssc_je ssc_steno
  # Central (back to 1996-2010)
  upsc_prelims upsc_mains nda cds afcat capf
  # Railway (back to 2005-2010)
  rrb_ntpc rrb_group_d rrb_je rrb_alp rpf
  # Banking (back to 2000-2010)
  ibps_po ibps_clerk ibps_so sbi_po sbi_clerk rbi_grade_b rbi_assistant nabard sebi lic_aao lic_ado
  # Teaching (back to 2000-2011)
  ctet ugc_net kvs dsssb
  # State PSC (back to 2000-2008)
  uppsc bpsc mppsc rpsc appsc tnpsc wbpsc hpsc jpsc ukpsc cgpsc gpsc opsc ppsc kpsc
  # Board exams (back to 2000-2008)
  cbse_10 cbse_11 cbse_12 up_board_12_en up_board_12_hi up_board_10_en up_board_10_hi icse_10 isc_12
  # Law & MBA
  clat ailet cat xat mat
  # Nursing & Paramedical
  gnm anm bsc_nursing bpharm dpharm dmlt
  # State Police
  up_police up_si bihar_police bihar_si mp_police mp_si raj_police raj_si haryana_police delhi_police cg_police uk_police jharkhand_police
  # State TET
  uptet supertet bihar_tet mptet reet htet otet wb_tet tntet kartet aptet
  # Revenue/Patwari
  up_lekhpal mp_patwari raj_patwari cg_patwari
  # Group C/D
  up_vdo up_ro_aro bihar_cdpo mp_vyapam raj_ldc hssc jssc osssc wbssc
  # Other
  icar fci epfo cuet olympiad ntse niacl uiic
)

MAX_PARALLEL=15
RUNNING=0
TOTAL=${#EXAMS[@]}
DONE=0

echo "=== PYQ Parallel Generation ==="
echo "Total exams: $TOTAL"
echo "Max parallel: $MAX_PARALLEL"
echo "Logs at: $LOG_DIR"
echo "================================"
echo ""

for exam in "${EXAMS[@]}"; do
  # Wait if we have too many parallel jobs
  while [ $RUNNING -ge $MAX_PARALLEL ]; do
    wait -n 2>/dev/null
    RUNNING=$((RUNNING - 1))
    DONE=$((DONE + 1))
    echo "[Progress: $DONE/$TOTAL completed, $RUNNING running]"
  done

  echo "  Starting: $exam"
  python manage.py generate_pyq --exam "$exam" --skip-existing > "$LOG_DIR/${exam}.log" 2>&1 &
  RUNNING=$((RUNNING + 1))
done

# Wait for all remaining jobs
echo ""
echo "All exams launched. Waiting for remaining $RUNNING jobs..."
wait
DONE=$TOTAL
echo ""
echo "=== ALL DONE ==="
echo "Total exams processed: $TOTAL"

# Count total questions
python -c "
import os; os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
import django; django.setup()
from pyq.models import ExamQuestion
print(f'Total questions in DB: {ExamQuestion.objects.count()}')
from collections import Counter
counts = Counter(ExamQuestion.objects.values_list('exam_type', flat=True))
print(f'Exam types with data: {len(counts)}')
for exam, cnt in counts.most_common():
    print(f'  {exam}: {cnt}')
" 2>/dev/null

echo ""
echo "Check individual logs at: $LOG_DIR/"
