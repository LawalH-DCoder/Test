import type { Cohort } from '@/types';

interface DashboardHeaderProps {
  cohort: Cohort | null;
}

const DashboardHeader = ({ cohort }: DashboardHeaderProps) => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div>
        <h1 className="font-['Plus_Jakarta_Sans'] text-[26px] font-bold leading-[1.1] tracking-[-0.02em] text-slate-900 mb-1">
          Dashboard
        </h1>
        <div className="flex items-center gap-2 text-slate-500">
          <span className="material-symbols-outlined text-indigo-500 text-lg">school</span>
          <span>
            {cohort
              ? `${cohort.name} · ${new Date(cohort.startDate).getFullYear()}`
              : 'Academy · Admin'}
          </span>
        </div>
      </div>
      <div className="bg-white px-4 py-2 border border-slate-200 rounded-lg shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)] flex items-center gap-3">
        <span className="material-symbols-outlined text-slate-400">calendar_month</span>
        <span className="font-semibold text-slate-700">{today}</span>
      </div>
    </div>
  );
};

export default DashboardHeader;
