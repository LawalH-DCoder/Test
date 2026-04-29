
import { buildMonthlySummaries, getBarColor } from '@/lib/utils/attendanceStats';
import type { AttendanceRecord } from '@/types';
const records: AttendanceRecord[] = [
  { id: 1, studentId: 2, cohortId: 1, date: '2026-04-01', status: 'present', note: '' },
  { id: 2, studentId: 2, cohortId: 1, date: '2026-04-02', status: 'late', note: '' },
  { id: 3, studentId: 2, cohortId: 1, date: '2026-04-03', status: 'absent', note: '' },
  { id: 4, studentId: 2, cohortId: 1, date: '2026-04-04', status: 'present', note: '' },
  { id: 5, studentId: 2, cohortId: 1, date: '2026-04-05', status: 'excused', note: '' },
];
describe('buildMonthlySummaries', () => {
  it('groups records by month correctly', () => {
    const summaries = buildMonthlySummaries(records);
    expect(summaries).toHaveLength(1);
    expect(summaries[0].month).toBe('Apr 2026');
  });
  it('counts each status correctly', () => {
    const s = buildMonthlySummaries(records)[0];
    expect(s.present).toBe(2);
    expect(s.late).toBe(1);
    expect(s.absent).toBe(1);
    expect(s.excused).toBe(1);
    expect(s.total).toBe(5);
  });
  it('calculates percentage as (present + late) / total', () => {
    // attended = 2 present + 1 late = 3, total = 5 → 60%
    const s = buildMonthlySummaries(records)[0];
    expect(s.percentage).toBe(60);
  });
  it('returns 0% when records array is empty', () => {
    const s = buildMonthlySummaries([]);
    expect(s).toHaveLength(0);
  });
  it('handles 100% attendance correctly', () => {
    const perfect = records.map((r) => ({ ...r, status: 'present' as const }));
    const s = buildMonthlySummaries(perfect)[0];
    expect(s.percentage).toBe(100);
  });
});
describe('getBarColor', () => {
  it('returns green for >= 80%', () => expect(getBarColor(80)).toBe('#16A34A'));
  it('returns green for 100%', () => expect(getBarColor(100)).toBe('#16A34A'));
  it('returns amber for 79%', () => expect(getBarColor(79)).toBe('#D97706'));
  it('returns amber for 60%', () => expect(getBarColor(60)).toBe('#D97706'));
  it('returns red for 59%', () => expect(getBarColor(59)).toBe('#DC2626'));
  it('returns red for 0%', () => expect(getBarColor(0)).toBe('#DC2626'));
});
