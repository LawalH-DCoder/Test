import { getHeatmapColor } from '@/lib/admin-dashboard-utils';

interface ActivityHeatmapProps {
  heatmapData: string[];
}

const ActivityHeatmap = ({ heatmapData }: ActivityHeatmapProps) => {
  return (
    <div className="mt-8 bg-white rounded-xl border border-slate-200 shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[20px] font-semibold leading-tight tracking-[-0.01em] text-slate-900">
          Cohort Activity Heatmap
        </h3>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-slate-100 rounded-sm" />
            Absent
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-indigo-200 rounded-sm" />
            Late
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-indigo-600 rounded-sm" />
            Present
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-12 md:grid-cols-[repeat(24,minmax(0,1fr))] lg:grid-cols-[repeat(31,minmax(0,1fr))] gap-1">
        {heatmapData.map((status, i) => (
          <div
            key={i}
            title={status}
            className={`w-full aspect-square rounded-sm ${getHeatmapColor(status)}`}
          />
        ))}
      </div>

      <p className="mt-4 text-xs text-slate-400 italic">
        Daily status aggregate for the cohort (Last 30 Days)
      </p>
    </div>
  );
};

export default ActivityHeatmap;
