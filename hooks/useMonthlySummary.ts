'use client';

import { useMemo, useState } from 'react';
import { useGet } from '@/hooks/useQueries';
import { useAuth } from '@/hooks/useAuth';
import type { Attendance, User } from '@/types';
import { ATTENDANCE_PROGRESS_THRESHOLDS, MONTH_TABS, MonthTab } from '@/constants/monthly-summary';

const MONTH_INDEX: Record<MonthTab, number> = {
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
};

export function useMonthlySummary() {
  const { user } = useAuth();
  const [activeMonth, setActiveMonth] = useState<MonthTab>('Apr');

  const attendanceQuery = useGet<Attendance[]>(
    user ? ['student', 'attendance', user.id] : ['student', 'attendance'],
    user ? `/attendance?studentId=${user.id}` : '/attendance?studentId=0',
    { enabled: Boolean(user) },
  );

  const records = attendanceQuery.data ?? [];

  // Filter records for the selected month
  const monthRecords = useMemo(() => {
    const monthIdx = MONTH_INDEX[activeMonth];
    return records.filter((r) => {
      const date = new Date(r.date);
      return date.getMonth() === monthIdx;
    });
  }, [records, activeMonth]);

  // Count stats
  const stats = useMemo(() => {
    const counts = { present: 0, late: 0, excused: 0, absent: 0 };
    monthRecords.forEach((r) => {
      if (r.status in counts) counts[r.status as keyof typeof counts]++;
    });
    const total = counts.present + counts.late + counts.excused + counts.absent;
    const rate = total > 0 ? Math.round((counts.present / total) * 100) : 0;
    return { ...counts, rate, total };
  }, [monthRecords]);

  // Build calendar cells: a map of day -> status for the selected month/year
  const calendarMap = useMemo(() => {
    const map = new Map<number, string>();
    monthRecords.forEach((r) => {
      const day = new Date(r.date).getDate();
      map.set(day, r.status);
    });
    return map;
  }, [monthRecords]);

  // Quarterly trend data for Recharts
  const trendData = useMemo(() => {
    return MONTH_TABS.filter((m) => m !== 'May' && m !== 'Jun').map((month) => {
      const mIdx = MONTH_INDEX[month];
      const mRecords = records.filter((r) => new Date(r.date).getMonth() === mIdx);
      const total = mRecords.length;
      const present = mRecords.filter((r) => r.status === 'present').length;
      const rate = total > 0 ? Math.round((present / total) * 100) : 0;
      return { month, rate, target: ATTENDANCE_PROGRESS_THRESHOLDS.target };
    });
  }, [records]);

  // Trend insight text
  const trendInsight = useMemo(() => {
    if (trendData.length < 2) return null;
    const last = trendData[trendData.length - 1];
    const prev = trendData[trendData.length - 2];
    const diff = last.rate - prev.rate;
    if (diff > 0)
      return `${user?.name} has shown a positive ${diff}% upward trend in attendance since ${prev.month}.`;
    if (diff < 0)
      return `${user?.name} attendance has decreased by ${Math.abs(diff)}% since ${prev.month}.`;
    return `${user?.name} attendance has remained stable.`;
  }, [trendData, user?.name]);

  return {
    user,
    activeMonth,
    setActiveMonth,
    stats,
    calendarMap,
    trendData,
    trendInsight,
    isLoading: attendanceQuery.isLoading,
  };
}
