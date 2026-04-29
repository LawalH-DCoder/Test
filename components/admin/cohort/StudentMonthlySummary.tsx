'use client';

import { useMonthlySummary } from '@/hooks/useMonthlySummary';
import MonthlySummaryHeader from './MonthlySummaryHeader';
import MonthlyProgressCard from './MonthlyProgressCard';
import AttendanceStatsGrid from './AttendanceStatsGrid';
import DailyBreakdownCalendar from './DailyBreakdownCalendar';
import QuarterlyTrendChart from './QuarterlyTrendChart';

const StudentMonthlySummaryPage = () => {
  const { user, activeMonth, setActiveMonth, stats, calendarMap, trendData, trendInsight } =
    useMonthlySummary();

  return (
    <main>
      <MonthlySummaryHeader user={user} activeMonth={activeMonth} onMonthChange={setActiveMonth} />

      <div className="grid grid-cols-12 gap-6">
        <MonthlyProgressCard activeMonth={activeMonth} rate={stats.rate} />

        <AttendanceStatsGrid
          present={stats.present}
          late={stats.late}
          excused={stats.excused}
          absent={stats.absent}
        />

        <DailyBreakdownCalendar activeMonth={activeMonth} calendarMap={calendarMap} />

        <QuarterlyTrendChart
          data={trendData}
          activeMonth={activeMonth}
          trendInsight={trendInsight}
        />
      </div>
    </main>
  );
};

export default StudentMonthlySummaryPage;
