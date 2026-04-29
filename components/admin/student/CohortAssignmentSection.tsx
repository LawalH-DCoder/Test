import { type UseFormReturn } from 'react-hook-form';
import type { Cohort } from '@/types';
import { NewStudentFormValues } from '@/hooks/useNewStudentForm';

interface CohortAssignmentSectionProps {
  form: UseFormReturn<NewStudentFormValues>;
  cohorts: Cohort[];
}

const CohortAssignmentSection = ({ form, cohorts }: CohortAssignmentSectionProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-indigo-600">school</span>
        <h3 className="text-[20px] font-semibold leading-tight tracking-[-0.01em] text-slate-900">
          Cohort Assignment
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Select Cohort */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
            Select Cohort
          </label>
          <div className="relative">
            <select
              {...register('cohortId')}
              className="w-full bg-slate-50 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white rounded-lg px-4 py-3 transition-all outline-none appearance-none cursor-pointer"
            >
              <option value="" disabled>
                Choose a cohort
              </option>
              {cohorts.map((cohort) => (
                <option key={cohort.id} value={cohort.id}>
                  {cohort.name}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              expand_more
            </span>
          </div>
          {errors.cohortId && <p className="text-xs text-red-500">{errors.cohortId.message}</p>}
        </div>

        {/* Enrolment Date */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
            Enrolment Date
          </label>
          <div className="relative">
            <input
              {...register('enrolledDate')}
              type="date"
              className="w-full bg-slate-50 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white rounded-lg px-4 py-3 transition-all outline-none cursor-pointer"
            />
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-sm">
              calendar_month
            </span>
          </div>
          {errors.enrolledDate && (
            <p className="text-xs text-red-500">{errors.enrolledDate.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CohortAssignmentSection;
