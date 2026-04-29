interface StatCardProps {
  label: string;
  value: string | number;
  change: string;
  changePositive: boolean;
  icon: string;
  iconBg: string;
  iconColor: string;
  borderColor: string;
}

const StatCard = ({
  label,
  value,
  change,
  changePositive,
  icon,
  iconBg,
  iconColor,
  borderColor,
}: StatCardProps) => {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 border-t-4 ${borderColor} p-6 shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
            {label}
          </p>
          <p className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">{value}</p>
        </div>
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
        >
          <span className="material-symbols-outlined text-xl">{icon}</span>
        </span>
      </div>
      <div className="mt-4 flex items-center gap-1.5">
        <span
          className={`material-symbols-outlined text-sm ${changePositive ? 'text-emerald-500' : 'text-red-500'}`}
        >
          {changePositive ? 'trending_up' : 'trending_down'}
        </span>
        <p
          className={`text-xs font-semibold ${changePositive ? 'text-emerald-600' : 'text-red-500'}`}
        >
          {change}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
