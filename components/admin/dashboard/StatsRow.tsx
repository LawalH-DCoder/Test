import { STAT_CARD_STATIC } from "@/constants/admin-dashboard";

interface StatsRowProps {
  totalStudents: number;
  present: number;
  presentPct: number;
  late: number;
  latePct: number;
  absent: number;
  absentPct: number;
}

const StatsRow = ({
  totalStudents,
  present,
  presentPct,
  late,
  latePct,
  absent,
  absentPct,
}: StatsRowProps) => {
  const values = [
    { value: totalStudents, pct: null },
    { value: present, pct: `${presentPct}%` },
    { value: late, pct: `${latePct}%` },
    { value: absent, pct: `${absentPct}%` },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {STAT_CARD_STATIC.map((card, i) => (
        <div
          key={card.label}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)]"
        >
          <div className="flex items-center justify-between mb-4">
            <span
              className={`material-symbols-outlined p-2 ${card.iconBg} ${card.iconColor} rounded-lg`}
            >
              {card.icon}
            </span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {card.label}
            </span>
          </div>

          {values[i].pct ? (
            <div className="flex items-baseline gap-2">
              <h2 className="text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-slate-900">
                {values[i].value}
              </h2>
              <span className={`font-bold text-sm ${card.percentColor}`}>{values[i].pct}</span>
            </div>
          ) : (
            <h2 className="text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-slate-900">
              {values[i].value}
            </h2>
          )}

          <p className="text-slate-500 text-xs mt-1">{card.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsRow;
