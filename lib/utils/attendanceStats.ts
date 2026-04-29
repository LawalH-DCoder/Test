// lib/utils/attendanceStats.ts
import type { AttendanceRecord, MonthlySummary } from '@/types';
export const buildMonthlySummaries = (records: AttendanceRecord[]): MonthlySummary[] => {
  const groups: Record<string, AttendanceRecord[]> = {};
  records.forEach((rec) => {
    const [year, month] = rec.date.split('-');
    const key = `${year}-${month}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(rec);
  });
  return Object.entries(groups).map(([key, recs]) => {
    const [year, month] = key.split('-');
    const label = new Date(+year, +month - 1).toLocaleDateString('en-GB', {
      month: 'short',
      year: 'numeric',
    });
    const present = recs.filter((r) => r.status === 'present').length;
    const late = recs.filter((r) => r.status === 'late').length;
    const excused = recs.filter((r) => r.status === 'excused').length;
    const absent = recs.filter((r) => r.status === 'absent').length;
    const attended = present + late;
    const pct = recs.length > 0 ? Math.round((attended / recs.length) * 100) : 0;
    return { month: label, total: recs.length, present, late, excused, absent, percentage: pct };
  });
};
// Bar colour logic for the chart
export const getBarColor = (pct: number): string => {
  if (pct >= 80) return '#16A34A'; // green
  if (pct >= 60) return '#D97706'; // amber
  return '#DC2626'; // red
};
