export const MONTH_TABS = ['Feb', 'Mar', 'Apr', 'May', 'Jun'] as const;
export type MonthTab = (typeof MONTH_TABS)[number];

export const CALENDAR_DAY_HEADERS = ['MON', 'TUE', 'WED', 'THU', 'FRI'] as const;

export const ATTENDANCE_STATUS_STYLE: Record<
  string,
  { bg: string; text: string; label: string; border: string; statText: string }
> = {
  present: {
    bg: 'bg-emerald-500',
    text: 'text-white',
    label: 'Present',
    border: 'border-l-emerald-500',
    statText: 'text-emerald-600',
  },
  late: {
    bg: 'bg-amber-500',
    text: 'text-white',
    label: 'Late',
    border: 'border-l-amber-500',
    statText: 'text-amber-600',
  },
  excused: {
    bg: 'bg-sky-500',
    text: 'text-white',
    label: 'Excused',
    border: 'border-l-sky-500',
    statText: 'text-sky-600',
  },
  absent: {
    bg: 'bg-rose-500',
    text: 'text-white',
    label: 'Absent',
    border: 'border-l-rose-500',
    statText: 'text-rose-600',
  },
  noclass: {
    bg: 'bg-slate-200',
    text: 'text-slate-500',
    label: 'No Class',
    border: '',
    statText: 'text-slate-400',
  },
  future: {
    bg: 'bg-slate-50',
    text: 'text-slate-300',
    label: '',
    border: '',
    statText: '',
  },
};

export const ATTENDANCE_PROGRESS_THRESHOLDS = {
  target: 75,
  distinction: 90,
};
