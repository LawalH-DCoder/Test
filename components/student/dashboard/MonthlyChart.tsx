interface MonthlyChartProps {
  data: { month: string; percentage: number }[];
}

export function MonthlyChart({ data }: MonthlyChartProps) {
  const maxHeight = Math.max(...data.map((d) => d.percentage), 100);

  return (
    <div className="flex items-end justify-between h-64 pt-8 px-12 border-b border-slate-100">
      {data.map((item, index) => (
        <div key={index} className="group relative flex flex-col items-center w-24">
          <div
            className="w-full bg-emerald-500 rounded-t-lg transition-all hover:brightness-110"
            style={{ height: `${(item.percentage / maxHeight) * 100}%` }}
          />
          <span className="absolute -top-8 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {item.percentage}%
          </span>
          <span className="mt-4 font-bold text-sm text-slate-500">{item.month}</span>
        </div>
      ))}
    </div>
  );
}
