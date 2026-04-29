interface StatCardProps {
  icon: string;
  bgColor: string;
  iconColor: string;
  label: string;
  value: string | number;
  change?: string;
  changeColor?: string;
}

export function StatCard({
  icon,
  bgColor,
  iconColor,
  label,
  value,
  change,
  changeColor,
}: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)]">
      <div className="flex justify-between items-start mb-4">
        <div className={`h-10 w-10 rounded-lg ${bgColor} flex items-center justify-center ${iconColor}`}>
          <span className="material-symbols-outlined" data-icon={icon}>
            {icon}
          </span>
        </div>
        {change && (
          <span className={`${changeColor} px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-opacity-10`}>
            {change}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-slate-500 font-label-caps text-[11px] tracking-widest uppercase">
          {label}
        </span>
        <span className="text-h2 font-h2 text-slate-900 mt-1">{value}</span>
      </div>
    </div>
  );
}
