import type { Attendance } from '@/types';

interface ActivityItemProps {
  record: Attendance;
}

const STATUS_CONFIG = {
  present: {
    icon: 'check_circle',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    statusBg: 'bg-emerald-50',
    statusColor: 'text-emerald-700',
    label: 'Present',
  },
  late: {
    icon: 'schedule',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    statusBg: 'bg-amber-50',
    statusColor: 'text-amber-700',
    label: 'Late',
  },
  excused: {
    icon: 'info',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    statusBg: 'bg-blue-50',
    statusColor: 'text-blue-700',
    label: 'Excused',
  },
  absent: {
    icon: 'cancel',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    statusBg: 'bg-rose-50',
    statusColor: 'text-rose-700',
    label: 'Absent',
  },
};

export function ActivityItem({ record }: ActivityItemProps) {
  const config = STATUS_CONFIG[record.status];
  const date = new Date(record.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
  const time = record.checkInTime
    ? new Date(record.checkInTime).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
    : 'No Record';

  return (
    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
      <div
        className={`h-10 w-10 rounded-full ${config.iconBg} flex items-center justify-center ${config.iconColor} shrink-0`}
      >
        <span className="material-symbols-outlined text-xl" data-icon={config.icon}>
          {config.icon}
        </span>
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-slate-900">{date}</p>
        <p className="text-xs text-slate-500">In: {time}</p>
      </div>
      <span
        className={`text-[10px] font-bold uppercase px-2 py-1 ${config.statusBg} ${config.statusColor} rounded-full`}
      >
        {config.label}
      </span>
    </div>
  );
}
