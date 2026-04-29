'use client';

import Link from 'next/link';
import { useStudentDashboard } from '@/hooks/useStudentDashboard';
import { StatCard } from './StatCard';
import { MonthlyChart } from './MonthlyChart';
import { RecentActivity } from './RecentActivity';
import { SecondaryBento } from './SecondaryBento';

export function StudentDashboard() {
  const { user, stats, monthlyData, milestonePercentage } = useStudentDashboard();

  return (
    <div className=" space-y-8">
      {/* Header Section */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-h1 text-h1 text-slate-900">Good morning, {user?.name} 👋</h1>
          <p className="font-body-md text-slate-500 mt-1">Frontend Engineering · Cohort 3</p>
        </div>
        <Link href="/student/check-in">
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20">
            <span className="material-symbols-outlined text-lg" data-icon="qr_code_scanner">
              qr_code_scanner
            </span>
            Scan Check In
          </button>
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon="monitoring"
          bgColor="bg-indigo-50"
          iconColor="text-indigo-600"
          label="Overall Attendance"
          value={`${stats.overallAttendance}%`}
          change="+2.4%"
          changeColor="text-emerald-600 bg-emerald-50"
        />
        <StatCard
          icon="check_circle"
          bgColor="bg-emerald-50"
          iconColor="text-emerald-600"
          label="Days Present"
          value={stats.daysPresent.toString()}
          change="+1"
          changeColor="text-emerald-600 bg-emerald-50"
        />
        <StatCard
          icon="schedule"
          bgColor="bg-amber-50"
          iconColor="text-amber-600"
          label="Late Arrivals"
          value={stats.lateArrivals.toString()}
          change="-0.5%"
          changeColor="text-red-600 bg-red-50"
        />
        <StatCard
          icon="cancel"
          bgColor="bg-red-50"
          iconColor="text-red-600"
          label="Absent Days"
          value={stats.absentDays.toString()}
          change="-1"
          changeColor="text-red-600 bg-red-50"
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Monthly Chart */}
        <div className="lg:col-span-2">
          <MonthlyChart data={monthlyData} />
        </div>

        {/* Recent Activity */}
        <div>
          <RecentActivity records={[]} isLoading={false} />
        </div>
      </div>

      {/* Secondary Bento */}
      <SecondaryBento milestonePercentage={milestonePercentage} />
    </div>
  );
}
