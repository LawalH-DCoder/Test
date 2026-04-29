'use client';

import { useMemo } from 'react';
import { useGet } from '@/hooks/useQueries';
import { useAuth } from '@/hooks/useAuth';
import type { Attendance } from '@/types';
import { REQUIRED_DAYS } from '@/constants';

export function useStudentDashboard() {
  const { user } = useAuth();

  const attendanceQuery = useGet<Attendance[]>(
    user ? ['student', 'attendance', user.id] : ['student', 'attendance'],
    user ? `/attendance?studentId=${user.id}` : '/attendance?studentId=0',
    {
      enabled: Boolean(user),
    },
  );

  const attendanceRecords = attendanceQuery.data ?? [];

  const stats = useMemo(() => {
    const counts: Record<Attendance['status'], number> = {
      present: 0,
      late: 0,
      excused: 0,
      absent: 0,
    };

    attendanceRecords.forEach((record) => {
      counts[record.status] += 1;
    });

    const total = counts.present + counts.late + counts.excused + counts.absent;
    const percentage = total > 0 ? Math.round((counts.present / total) * 100) : 0;

    return {
      overallAttendance: percentage,
      daysPresent: counts.present,
      lateArrivals: counts.late,
      absentDays: counts.absent,
    };
  }, [attendanceRecords]);

  const monthlyData = useMemo(() => {
    const monthlyStats: Record<string, { present: number; total: number }> = {};

    attendanceRecords.forEach((record) => {
      const date = new Date(record.date);
      const monthKey = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });

      if (!monthlyStats[monthKey]) {
        monthlyStats[monthKey] = { present: 0, total: 0 };
      }

      monthlyStats[monthKey].total += 1;
      if (record.status === 'present') {
        monthlyStats[monthKey].present += 1;
      }
    });

    const sortedMonths = Object.keys(monthlyStats).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    );
    const lastThreeMonths = sortedMonths.slice(-3);

    return lastThreeMonths.map((month) => {
      const stat = monthlyStats[month];
      const percentage = stat.total > 0 ? Math.round((stat.present / stat.total) * 100) : 0;
      return { month, percentage };
    });
  }, [attendanceRecords]);

  const milestonePercentage = useMemo(() => {
    return Math.min(Math.round((stats.daysPresent / REQUIRED_DAYS) * 100), 100);
  }, [stats.daysPresent]);

  return {
    user,
    stats,
    monthlyData,
    milestonePercentage,
  };
}
