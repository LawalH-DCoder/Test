interface CreateCohortCardProps {
  onClick: () => void;
}

const CreateCohortCard = ({ onClick }: CreateCohortCardProps) => {
  return (
    <button
      onClick={onClick}
      className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-400 hover:text-indigo-500 transition-all group min-h-[320px] w-full"
    >
      <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-300 group-hover:border-indigo-400 group-hover:bg-indigo-50 flex items-center justify-center mb-4 transition-all">
        <span className="material-symbols-outlined text-3xl">add_circle</span>
      </div>
      <span className="text-[20px] font-semibold leading-tight tracking-[-0.01em]">
        Create New Cohort
      </span>
      <p className="text-sm mt-2 text-center max-w-[200px]">
        Define a new student group, instructor, and schedule.
      </p>
    </button>
  );
};

export default CreateCohortCard;
