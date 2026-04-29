import type { Attendance } from '@/types';

export const STAT_CARD_STATIC = [
  {
    icon: 'group',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    label: 'Total Students',
    subtitle: 'Full cohort enrollment',
    valueColor: '',
    percentColor: '',
  },
  {
    icon: 'check_circle',
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
    label: 'Present Today',
    subtitle: 'Verified on campus',
    valueColor: '',
    percentColor: 'text-green-600',
  },
  {
    icon: 'schedule',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    label: 'Late Today',
    subtitle: 'Arrived after 9:00 AM',
    valueColor: '',
    percentColor: 'text-amber-600',
  },
  {
    icon: 'cancel',
    iconBg: 'bg-red-50',
    iconColor: 'text-red-600',
    label: 'Absent Today',
    subtitle: 'No check-in recorded',
    valueColor: '',
    percentColor: 'text-red-600',
  },
] as const;

export const STATUS_CONFIG: Record<string, { bg: string; text: string; label: string }> = {
  present: { bg: 'bg-green-50', text: 'text-green-700', label: 'PRESENT' },
  late: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'LATE' },
  absent: { bg: 'bg-red-50', text: 'text-red-700', label: 'ABSENT' },
  excused: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'EXCUSED' },
};

export const AT_RISK_THRESHOLD = 75;