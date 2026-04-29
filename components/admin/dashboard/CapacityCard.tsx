interface CapacityCardProps {
  totalStudents: number;
  capacityPercentage: number;
  totalSeats?: number;
}

const CapacityCard = ({
  totalStudents,
  capacityPercentage,
  totalSeats = 500,
}: CapacityCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h4 className="font-semibold text-slate-900 text-base mb-4">Registration Stats</h4>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">Capacity filled</span>
          <span className="text-sm font-extrabold text-slate-900">{capacityPercentage}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-500"
            style={{ width: `${capacityPercentage}%` }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
            {totalStudents} Registered
          </span>
          <span className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
            {totalSeats} Total Seats
          </span>
        </div>
      </div>
    </div>
  );
};

export default CapacityCard;
