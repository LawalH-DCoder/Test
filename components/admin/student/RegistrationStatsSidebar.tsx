interface RegistrationStatsSidebarProps {
  totalStudents: number;
  totalSeats?: number;
}

const RegistrationStatsSidebar = ({
  totalStudents,
  totalSeats = 500,
}: RegistrationStatsSidebarProps) => {
  const capacityPercentage = Math.min(Math.round((totalStudents / totalSeats) * 100), 100);

  return (
    <div className="space-y-6">
      {/* Registration Stats card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h4 className="text-[20px] font-semibold leading-tight tracking-[-0.01em] text-slate-900 mb-4">
          Registration Stats
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-sm">Capacity Filled</span>
            <span className="font-bold text-slate-900">{capacityPercentage}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-indigo-500 h-full rounded-full"
              style={{ width: `${capacityPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-slate-400">
            <span>{totalStudents} Registered</span>
            <span>{totalSeats} Total Seats</span>
          </div>
        </div>
      </div>

      {/* Need help card */}
      <div className="bg-indigo-900 text-white p-6 rounded-xl relative overflow-hidden group">
        <div className="relative z-10">
          <h4 className="text-[20px] font-semibold leading-tight tracking-[-0.01em] mb-2">
            Need help?
          </h4>
          <p className="text-indigo-200 text-sm mb-4">
            Read our documentation on managing student records and cohort transfers.
          </p>
          <a
            href="#"
            className="inline-flex items-center text-sm font-bold text-white group-hover:underline"
          >
            View Guide
            <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
          </a>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-10 transform group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-[120px]">menu_book</span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationStatsSidebar;
