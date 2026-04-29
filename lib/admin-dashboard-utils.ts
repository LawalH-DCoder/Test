import { Attendance } from '@/types';

export function getTodayAttendanceStats(records: Attendance[], totalStudents: number) {
  const today = new Date().toISOString().slice(0, 10);
  const todayRecords = records.filter((r) => r.date === today);

  const present = todayRecords.filter((r) => r.status === 'present').length;
  const late = todayRecords.filter((r) => r.status === 'late').length;
  const absent = todayRecords.filter((r) => r.status === 'absent').length;
  const total = totalStudents || 1;

  return {
    totalStudents,
    present,
    late,
    absent,
    presentPct: Math.round((present / total) * 100),
    latePct: Math.round((late / total) * 100),
    absentPct: Math.round((absent / total) * 100),
  };
}

export function getOverallAttendanceRate(records: Attendance[]): number {
  if (!records.length) return 0;
  return Math.round((records.filter((r) => r.status === 'present').length / records.length) * 100);
}

export function getHeatmapColor(status: string): string {
  if (status === 'present') return 'bg-indigo-600';
  if (status === 'late') return 'bg-indigo-200';
  return 'bg-slate-100';
}
