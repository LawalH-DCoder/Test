import Link from 'next/link';

interface FormActionsProps {
  isPending: boolean;
}

const FormActions = ({ isPending }: FormActionsProps) => {
  return (
    <div className="p-8 bg-slate-50 flex flex-col sm:flex-row items-center justify-end gap-4">
      <Link
        href="/admin/students"
        className="w-full sm:w-auto px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-100 transition-all text-center"
      >
        Cancel
      </Link>
      <button
        type="submit"
        disabled={isPending}
        className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined text-lg">person_add</span>
        {isPending ? 'Creating...' : 'Create Student'}
      </button>
    </div>
  );
};

export default FormActions;
