export const COHORT_FILTER_TABS = ['Active', 'Completed', 'Drafts'] as const;

export type CohortFilterTab = (typeof COHORT_FILTER_TABS)[number];

export const COHORT_STATUS_CONFIG: Record<
  string,
  { bg: string; text: string; label: string; cardOpacity: string; iconBg: string; iconText: string }
> = {
  active: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    label: 'Active',
    cardOpacity: '',
    iconBg: 'bg-indigo-50',
    iconText: 'text-indigo-600',
  },
  completed: {
    bg: 'bg-slate-100',
    text: 'text-slate-600',
    label: 'Completed',
    cardOpacity: 'opacity-80',
    iconBg: 'bg-slate-100',
    iconText: 'text-slate-600',
  },
  draft: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    label: 'Draft',
    cardOpacity: 'opacity-80',
    iconBg: 'bg-amber-50',
    iconText: 'text-amber-600',
  },
};

export const NEW_COHORT_FORM_DEFAULTS = {
  name: '',
  description: '',
  startDate: '',
  endDate: '',
  instructor: '',
  autoAttendance: true,
  publicRegistration: false,
};
