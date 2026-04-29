import { ATTENDANCE_PROGRESS_THRESHOLDS, MonthTab } from "@/constants/monthly-summary";


interface MonthlyProgressCardProps {
  activeMonth: MonthTab;
  rate: number;
}

const MonthlyProgressCard = ({ activeMonth, rate }: MonthlyProgressCardProps) => {
  const { target, distinction } = ATTENDANCE_PROGRESS_THRESHOLDS;

  return (
    <div className="col-span-12 bg-white border border-slate-200 rounded-xl shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)] p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
            Monthly Performance
          </p>
          <h3 className="text-[28px] font-bold leading-[1.2] tracking-[-0.02em]">
            {activeMonth} 2026
          </h3>
        </div>
        <div className="text-right">
          <span className="text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-indigo-600">
            {rate}%
          </span>
          <p className="text-sm text-slate-500 font-medium">Average Attendance</p>
        </div>
      </div>

      {/* Progress bar with threshold markers */}
      <div className="relative h-6 bg-slate-100 rounded-full overflow-hidden mb-4">
        <div
          className="absolute top-0 left-0 h-full bg-indigo-600 rounded-full transition-all duration-500"
          style={{ width: `${rate}%` }}
        />
        <div
          className="absolute top-0 h-full w-0.5 bg-white/50 z-10"
          style={{ left: `${target}%` }}
          title={`Target Threshold (${target}%)`}
        />
        <div
          className="absolute top-0 h-full w-0.5 bg-white/50 z-10"
          style={{ left: `${distinction}%` }}
          title={`Distinction Threshold (${distinction}%)`}
        />
      </div>

      <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
        <span>0%</span>
        <span className="text-indigo-600 font-bold">Current: {rate}%</span>
        <span>Target: {target}%</span>
        <span>Distinction: {distinction}%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default MonthlyProgressCard;
