import { ToastType } from '@/types';

export const STATUS_STYLES: Record<string, string> = {
  present: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  absent: 'bg-red-50 text-red-600 ring-1 ring-red-200',
  late: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
};

export const toastStyles: Record<ToastType, any> = {
  success: {
    bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    iconBg: 'bg-emerald-500',
    icon: 'check_circle',
  },
  error: {
    bg: 'bg-red-50 border-red-200 text-red-800',
    iconBg: 'bg-red-500',
    icon: 'error',
  },
  warning: {
    bg: 'bg-amber-50 border-amber-200 text-amber-800',
    iconBg: 'bg-amber-500',
    icon: 'warning',
  },
  info: {
    bg: 'bg-blue-50 border-blue-200 text-blue-800',
    iconBg: 'bg-blue-500',
    icon: 'info',
  },
};

export { CHECK_IN_WINDOW, COURSE_NAME } from './checkIn';
export { REQUIRED_DAYS } from './dashboard';
export { FEATURES } from './login';
