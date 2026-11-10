#!/bin/bash
# PYQ generation with proper throttling
cd /Users/abhaykumarverma/job-search/backend
source venv/bin/activate
set -a; source "$(dirname "$0")/.env"; set +a  # key comes from backend/.env, never hard-code it
export DJANGO_SECRET_KEY="temp-secret-key-for-generation"

LOG_DIR="/tmp/pyq_logs"
mkdir -p "$LOG_DIR"

run_exam() {
  local exam=$1
  echo "[$(date +%H:%M:%S)] Starting: $exam"
  python manage.py generate_pyq --exam "$exam" --skip-existing > "$LOG_DIR/${exam}.log" 2>&1
  local status=$?
  local saved=$(grep -c "Saved" "$LOG_DIR/${exam}.log" 2>/dev/null)
  echo "[$(date +%H:%M:%S)] Done: $exam (exit=$status, batches_saved=$saved)"
}

# Run 4 exams at a time
run_batch() {
  local pids=()
  for exam in "$@"; do
    run_exam "$exam" &
    pids+=($!)
  done
  for pid in "${pids[@]}"; do
    wait $pid
  done
}

echo "=== PYQ Batch Generation ==="
echo "Started: $(date)"
echo ""

# Batch 1: Major engineering
run_batch jee_main jee_advanced gate_cse neet
# Batch 2: More engineering + medical
run_batch gate_ece gate_me gate_ee gate_ce
# Batch 3: SSC
run_batch ssc_cgl ssc_chsl ssc_mts ssc_gd
# Batch 4: Central + Railway
run_batch upsc_prelims rrb_ntpc ibps_po sbi_po
# Batch 5: Banking + Teaching
run_batch ibps_clerk ctet ugc_net cbse_12
# Batch 6: Board exams
run_batch cbse_10 up_board_12_en up_board_12_hi icse_10
# Batch 7: State PSC
run_batch uppsc bpsc mppsc rpsc
# Batch 8: Police
run_batch up_police up_si delhi_police bihar_police
# Batch 9: More exams
run_batch nda cds cat clat
# Batch 10: TET
run_batch uptet reet mptet htet
# Batch 11: Nursing
run_batch gnm bpharm bsc_nursing anm
# Batch 12: More state
run_batch tnpsc wbpsc appsc kpsc
# Batch 13: Revenue
run_batch up_lekhpal mp_patwari raj_patwari hssc
# Batch 14: Remaining GATE
run_batch gate_ch gate_in gate_bt gate_pi
# Batch 15: Remaining
run_batch ssc_cpo ssc_je rrb_group_d rrb_je
# Batch 16
run_batch sbi_clerk rbi_grade_b neet_pg upsc_mains
# Batch 17
run_batch bihar_tet supertet kvs dsssb
# Batch 18
run_batch up_board_10_en up_board_10_hi isc_12 cbse_11
# Batch 19
run_batch afcat capf rrb_alp rpf
# Batch 20
run_batch nabard sebi lic_aao lic_ado
# Batch 21
run_batch mp_police raj_police haryana_police bihar_si
# Batch 22
run_batch hpsc jpsc ukpsc cgpsc
# Batch 23
run_batch gpsc opsc ppsc jssc
# Batch 24
run_batch up_vdo up_ro_aro mp_vyapam raj_ldc
# Batch 25
run_batch ese isro aiims jipmer
# Batch 26
run_batch gate_xe ssc_steno ibps_so rbi_assistant
# Batch 27
run_batch cuet olympiad ntse xat
# Batch 28
run_batch mat dpharm dmlt fci
# Batch 29
run_batch epfo icar niacl uiic
# Batch 30
run_batch otet wb_tet tntet kartet
# Batch 31
run_batch aptet cg_patwari osssc wbssc
# Batch 32
run_batch cg_police uk_police jharkhand_police mp_si raj_si

echo ""
echo "=== ALL DONE ==="
echo "Finished: $(date)"

# Final count
python -c "
import os; os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
import django; django.setup()
from pyq.models import ExamQuestion
from collections import Counter
total = ExamQuestion.objects.count()
counts = Counter(ExamQuestion.objects.values_list('exam_type', flat=True))
print(f'Total questions in DB: {total}')
print(f'Exam types: {len(counts)}')
for exam, cnt in sorted(counts.items(), key=lambda x: -x[1])[:30]:
    print(f'  {exam}: {cnt}')
" 2>/dev/null
