import { ATTENDANCE_STATUS_STYLE } from '@/constants/monthly-summary';

interface AttendanceStatsGridProps {
  present: number;
  late: number;
  excused: number;
  absent: number;
}

const STAT_ITEMS = [
  { key: 'present', label: 'Present', sublabel: 'Days' },
  { key: 'late', label: 'Late', sublabel: 'Sessions' },
  { key: 'excused', label: 'Excused', sublabel: 'Medical' },
  { key: 'absent', label: 'Absent', sublabel: 'Unexcused' },
] as const;

const AttendanceStatsGrid = ({ present, late, excused, absent }: AttendanceStatsGridProps) => {
  const values = { present, late, excused, absent };

  return (
    <div className="col-span-12 lg:col-span-4 grid grid-cols-2 gap-4">
      {STAT_ITEMS.map(({ key, label, sublabel }) => {
        const cfg = ATTENDANCE_STATUS_STYLE[key];
        return (
          <div
            key={key}
            className={`bg-white border border-slate-200 rounded-xl shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)] p-6 border-l-4 ${cfg.border}`}
          >
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
              {label}
            </p>
            <p className={`text-[28px] font-bold leading-[1.2] tracking-[-0.02em] ${cfg.statText}`}>
              {String(values[key]).padStart(2, '0')}
            </p>
            <p className="text-sm text-slate-400">{sublabel}</p>
          </div>
        );
      })}
    </div>
  );
};

export default AttendanceStatsGrid;
