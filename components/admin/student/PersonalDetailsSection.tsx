import { PASSWORD_WARNING } from '@/constants/new-student';
import { NewStudentFormValues } from '@/hooks/useNewStudentForm';
import { type UseFormReturn } from 'react-hook-form';

interface PersonalDetailsSectionProps {
  form: UseFormReturn<NewStudentFormValues>;
  onRegenerate: () => void;
}

const PersonalDetailsSection = ({ form, onRegenerate }: PersonalDetailsSectionProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-indigo-600">person</span>
        <h3 className="text-[20px] font-semibold leading-tight tracking-[-0.01em] text-slate-900">
          Personal Details
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
            Full Name
          </label>
          <input
            {...register('name')}
            type="text"
            placeholder="e.g. Ada Okafor"
            className="w-full bg-slate-50 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white rounded-lg px-4 py-3 transition-all outline-none"
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
            Email Address
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="ada.okafor@example.com"
            className="w-full bg-slate-50 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white rounded-lg px-4 py-3 transition-all outline-none"
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>

        {/* Temporary Password — full width */}
        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
            Temporary Password
          </label>
          <div className="relative">
            <input
              {...register('password')}
              type="text"
              className="w-full bg-slate-50 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white rounded-lg px-4 py-3 transition-all outline-none font-mono"
            />
            <button
              type="button"
              onClick={onRegenerate}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-600 hover:text-indigo-700 font-semibold text-xs"
            >
              Regenerate
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}

          {/* Amber warning */}
          <div className="mt-4 flex items-start gap-3 bg-amber-50 border border-amber-100 p-4 rounded-lg">
            <span className="material-symbols-outlined text-amber-600 mt-0.5">warning</span>
            <p className="text-sm text-amber-800">
              <span className="font-bold">Important:</span> {PASSWORD_WARNING}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsSection;
