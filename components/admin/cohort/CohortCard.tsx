import { COHORT_STATUS_CONFIG } from '@/constants/admin-cohorts';
import type { Cohort } from '@/types';

interface CohortCardProps {
  cohort: Cohort;
  onDetails: (cohort: Cohort) => void;
}

const CohortCard = ({ cohort, onDetails }: CohortCardProps) => {
  const status = cohort.status ?? 'active';
  const cfg = COHORT_STATUS_CONFIG[status] ?? COHORT_STATUS_CONFIG.active;
  const isCompleted = status === 'completed';

  return (
    <div
      className={`bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col min-h-[320px] ${cfg.cardOpacity}`}
    >
      {/* Top row: icon + status badge */}
      <div className="flex justify-between items-start mb-6">
        <div
          className={`w-14 h-14 ${cfg.iconBg} ${cfg.iconText} rounded-xl flex items-center justify-center`}
        >
          <span
            className="material-symbols-outlined text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            terminal
          </span>
        </div>
        <span
          className={`px-3 py-1 ${cfg.bg} ${cfg.text} text-xs font-bold rounded-full uppercase tracking-wider`}
        >
          {cfg.label}
        </span>
      </div>

      {/* Body */}
      <div className="mb-auto">
        <h3
          className={`text-[20px] font-semibold leading-tight tracking-[-0.01em] mb-1 ${isCompleted ? 'text-slate-700' : 'text-slate-900'}`}
        >
          {cohort.name}
        </h3>
        <p className="text-sm text-slate-500 mb-6">{cohort.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-50 p-3 rounded-lg">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Students
            </p>
            <p className={`text-lg font-bold ${isCompleted ? 'text-slate-700' : 'text-slate-900'}`}>
              {cohort.studentCount ?? 0} / {cohort.capacity ?? 45}
            </p>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              {isCompleted ? 'Avg Grade' : 'Attendance'}
            </p>
            <p className={`text-lg font-bold ${isCompleted ? 'text-slate-700' : 'text-slate-900'}`}>
              {isCompleted ? (cohort.avgGrade ?? 'A-') : `${cohort.attendanceRate ?? 0}%`}
            </p>
          </div>
        </div>
      </div>

      {/* Footer: instructor + action */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
            {cohort.instructor?.charAt(0).toUpperCase() ?? 'I'}
          </div>
          <span className="text-sm font-medium text-slate-700">{cohort.instructor}</span>
        </div>

        {isCompleted ? (
          <button className="text-slate-400 hover:text-slate-600 text-sm font-bold flex items-center gap-1 group">
            Archive
            <span className="material-symbols-outlined text-sm">inventory_2</span>
          </button>
        ) : (
          <button
            onClick={() => onDetails(cohort)}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-bold flex items-center gap-1 group"
          >
            Details
            <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default CohortCard;
