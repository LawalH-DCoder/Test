'use client';

import { SheetWrapper } from '@/components/shared/CustomSheet';
import { NewCohortFormValues } from '@/hooks/useAdminCohorts';
import { type UseFormReturn } from 'react-hook-form';

interface NewCohortSheetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  form: UseFormReturn<NewCohortFormValues>;
  onSubmit: () => void;
  isPending: boolean;
}

const INSTRUCTORS = ['Marcus Thorne', 'Elena Vance', 'Sarah Jenkins'];

const NewCohortSheet = ({ open, setOpen, form, onSubmit, isPending }: NewCohortSheetProps) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const autoAttendance = watch('autoAttendance');
  const publicRegistration = watch('publicRegistration');

  return (
    <SheetWrapper
      open={open}
      setOpen={setOpen}
      side="right"
      title="New Cohort"
    >
      <div className="flex-1 overflow-y-auto">
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Cohort Name */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
              Cohort Name
            </label>
            <input
              {...register('name')}
              type="text"
              placeholder="e.g. Fullstack Web Dev"
              className="w-full bg-slate-50 border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 font-medium transition-all outline-none"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
              Description
            </label>
            <textarea
              {...register('description')}
              rows={3}
              placeholder="Brief summary of the curriculum..."
              className="w-full bg-slate-50 border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 font-medium transition-all outline-none resize-none"
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                Start Date
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  calendar_month
                </span>
                <input
                  {...register('startDate')}
                  type="date"
                  className="w-full bg-slate-50 border-none rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 font-medium transition-all outline-none"
                />
              </div>
              {errors.startDate && (
                <p className="text-xs text-red-500 mt-1">{errors.startDate.message}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                End Date
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  event
                </span>
                <input
                  {...register('endDate')}
                  type="date"
                  className="w-full bg-slate-50 border-none rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 font-medium transition-all outline-none"
                />
              </div>
              {errors.endDate && (
                <p className="text-xs text-red-500 mt-1">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          {/* Instructor Select */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
              Primary Instructor
            </label>
            <select
              {...register('instructor')}
              className="w-full bg-slate-50 border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 font-medium appearance-none transition-all outline-none"
            >
              <option value="">Select Instructor</option>
              {INSTRUCTORS.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            {errors.instructor && (
              <p className="text-xs text-red-500 mt-1">{errors.instructor.message}</p>
            )}
          </div>

          {/* Enrollment Settings */}
          <div className="pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
              Enrollment Settings
            </label>

            {/* Auto-attendance toggle */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-700">Auto-attendance tracking</span>
              <button
                type="button"
                onClick={() => setValue('autoAttendance', !autoAttendance)}
                className={`w-10 h-5 rounded-full relative transition-colors ${autoAttendance ? 'bg-indigo-600' : 'bg-slate-200'}`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${autoAttendance ? 'right-0.5' : 'left-0.5'}`}
                />
              </button>
            </div>

            {/* Public registration toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Public registration</span>
              <button
                type="button"
                onClick={() => setValue('publicRegistration', !publicRegistration)}
                className={`w-10 h-5 rounded-full relative transition-colors ${publicRegistration ? 'bg-indigo-600' : 'bg-slate-200'}`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${publicRegistration ? 'right-0.5' : 'left-0.5'}`}
                />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 px-4 py-3 border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-100 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 px-4 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-60"
            >
              {isPending ? 'Creating...' : 'Create Cohort'}
            </button>
          </div>
        </form>
      </div>
    </SheetWrapper>
  );
};

export default NewCohortSheet;
