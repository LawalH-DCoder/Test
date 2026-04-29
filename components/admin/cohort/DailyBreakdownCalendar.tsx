import {
  ATTENDANCE_STATUS_STYLE,
  CALENDAR_DAY_HEADERS,
  MonthTab,
} from '@/constants/monthly-summary';

interface DailyBreakdownCalendarProps {
  activeMonth: MonthTab;
  calendarMap: Map<number, string>;
}

const MONTH_INDEX: Record<MonthTab, number> = {
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
};

function getCalendarCells(month: MonthTab): { day: number; type: 'weekday' | 'future' }[] {
  const year = 2026;
  const monthIdx = MONTH_INDEX[month];
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
  const firstDay = new Date(year, monthIdx, 1).getDay(); // 0=Sun
  // Adjust so Mon=0
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  const cells: { day: number; type: 'weekday' | 'future' }[] = [];

  // Only show Mon–Fri, skip weekends
  for (let d = 1; d <= daysInMonth; d++) {
    const dow = new Date(year, monthIdx, d).getDay();
    if (dow !== 0 && dow !== 6) {
      cells.push({ day: d, type: 'weekday' });
    }
  }

  // Pad to multiple of 5
  const remainder = cells.length % 5;
  if (remainder !== 0) {
    for (let i = 0; i < 5 - remainder; i++) {
      cells.push({ day: cells.length + i + 1, type: 'future' });
    }
  }

  return cells;
}

const LEGEND_ITEMS = ['present', 'late', 'excused', 'absent', 'noclass'] as const;

const DailyBreakdownCalendar = ({ activeMonth, calendarMap }: DailyBreakdownCalendarProps) => {
  const cells = getCalendarCells(activeMonth);

  return (
    <div className="col-span-12 lg:col-span-8 bg-white border border-slate-200 rounded-xl shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[20px] font-semibold leading-tight tracking-[-0.01em]">
          Daily Breakdown
        </h3>
        <div className="flex gap-4 items-center flex-wrap">
          {LEGEND_ITEMS.map((key) => {
            const cfg = ATTENDANCE_STATUS_STYLE[key];
            if (!cfg.label) return null;
            return (
              <div key={key} className="flex items-center gap-1.5 text-xs font-semibold">
                <div className={`w-3 h-3 rounded-sm ${cfg.bg}`} />
                {cfg.label}
              </div>
            );
          })}
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-5 gap-3">
        {CALENDAR_DAY_HEADERS.map((h) => (
          <div key={h} className="text-center text-xs font-bold text-slate-400 mb-2">
            {h}
          </div>
        ))}

        {/* Calendar cells */}
        {cells.map((cell, i) => {
          if (cell.type === 'future') {
            return (
              <div
                key={`future-${i}`}
                className="aspect-square flex items-center justify-center rounded-lg text-sm font-semibold bg-slate-50 text-slate-300"
              >
                {cell.day}
              </div>
            );
          }

          const status = calendarMap.get(cell.day) ?? 'noclass';
          const cfg = ATTENDANCE_STATUS_STYLE[status] ?? ATTENDANCE_STATUS_STYLE.noclass;

          return (
            <div
              key={cell.day}
              title={cfg.label}
              className={`aspect-square flex items-center justify-center rounded-lg text-sm font-semibold ${cfg.bg} ${cfg.text}`}
            >
              {cell.day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyBreakdownCalendar;
