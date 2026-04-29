'use client';

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { ATTENDANCE_PROGRESS_THRESHOLDS } from '@/constants/monthly-summary';
import type { MonthTab } from '@/constants/monthly-summary';

interface TrendDataPoint {
  month: MonthTab;
  rate: number;
  target: number;
}

interface QuarterlyTrendChartProps {
  data: TrendDataPoint[];
  activeMonth: MonthTab;
  trendInsight: string | null;
}

const QuarterlyTrendChart = ({ data, activeMonth, trendInsight }: QuarterlyTrendChartProps) => {
  return (
    <div className="col-span-12 bg-white border border-slate-200 rounded-xl shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-[20px] font-semibold leading-tight tracking-[-0.01em] mb-1">
            Quarterly Attendance Trend
          </h3>
          <p className="text-sm text-slate-500">
            Analysis of performance relative to academy standards
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-indigo-600" />
            <span className="text-xs font-semibold">Performance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 border-t border-dashed border-slate-400" />
            <span className="text-xs font-semibold text-slate-400">
              Target ({ATTENDANCE_PROGRESS_THRESHOLDS.target}%)
            </span>
          </div>
        </div>
      </div>

      {/* Recharts */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fontWeight: 700, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              formatter={(value: any) => {
                const numericValue = typeof value === 'number' ? value : 0;
                return [`${numericValue}%`, 'Attendance'];
              }}
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                fontSize: '12px',
              }}
            />
            <ReferenceLine
              y={ATTENDANCE_PROGRESS_THRESHOLDS.target}
              stroke="#cbd5e1"
              strokeDasharray="4 4"
              strokeWidth={1.5}
            />
            <Bar dataKey="rate" radius={[6, 6, 0, 0]} maxBarSize={64}>
              {data.map((entry) => (
                <Cell
                  key={entry.month}
                  fill={entry.month === activeMonth ? '#4f46e5' : '#e0e7ff'}
                />
              ))}
            </Bar>
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Footer insight */}
      <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
        <p className="text-sm text-slate-600 italic">
          {trendInsight ?? 'Attendance data is being calculated...'}
        </p>
        <button className="bg-indigo-50 text-indigo-700 px-6 py-2 rounded-lg font-bold text-sm hover:bg-indigo-100 transition-colors">
          Generate PDF Report
        </button>
      </div>
    </div>
  );
};

export default QuarterlyTrendChart;
