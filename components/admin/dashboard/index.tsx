'use client';

import { useAdminDashboard } from '@/hooks/useAdminDashboard';
import DashboardHeader from './DashboardHeader';
import TodaysAttendanceTable from './TodaysAttendanceTable';
import CohortOverviewCard from './CohortOverviewCard';
import StudentsAtRisk from './StudentsAtRisk';
import ActivityHeatmap from './ActivityHeatmap';
import StatsRow from './StatsRow';

const AdminDashboard = () => {
  const { todayStats, overallRate, todayRows, atRiskStudents, heatmapData, activeCohort } =
    useAdminDashboard();

  return (
    <div className='w-full'>
      <DashboardHeader cohort={activeCohort} />
      <StatsRow
        totalStudents={todayStats.totalStudents}
        present={todayStats.present}
        presentPct={todayStats.presentPct}
        late={todayStats.late}
        latePct={todayStats.latePct}
        absent={todayStats.absent}
        absentPct={todayStats.absentPct}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <TodaysAttendanceTable rows={todayRows} />
        <div className="space-y-8">
          <CohortOverviewCard overallRate={overallRate} />
          <StudentsAtRisk atRiskStudents={atRiskStudents} />
        </div>
      </div>
      <ActivityHeatmap heatmapData={heatmapData} />
    </div>
  );
};

export default AdminDashboard;
