interface CohortOverviewCardProps {
  overallRate: number;
}

const CohortOverviewCard = ({ overallRate }: CohortOverviewCardProps) => {
  return (
    <div className="bg-slate-900 rounded-xl p-6 text-white border border-slate-800 shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)]">
      <h3 className="text-[20px] font-semibold leading-tight tracking-[-0.01em] mb-6">
        Cohort Overview
      </h3>
      <div className="space-y-6">
        {/* Overall attendance rate bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-400 text-sm">Overall Attendance Rate</span>
            <span className="font-bold">{overallRate}%</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full"
              style={{ width: `${overallRate}%` }}
            />
          </div>
        </div>

        {/* Week avg + target */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-800/50 rounded-lg">
            <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">
              Week Avg
            </p>
            <p className="text-xl font-bold">{overallRate}%</p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-lg">
            <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Target</p>
            <p className="text-xl font-bold text-green-400">95%</p>
          </div>
        </div>

        {/* Next assessment */}
        <div className="pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Next Assessment</span>
            <span className="text-white font-medium">May 15, 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CohortOverviewCard;
