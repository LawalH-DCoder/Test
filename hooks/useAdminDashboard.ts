'use client';

import { useMemo } from 'react';
import { useGet } from '@/hooks/useQueries';
import type { User, Cohort, Attendance } from '@/types';
import {
  AT_RISK_THRESHOLD,
} from '@/constants/admin-dashboard';
import { getOverallAttendanceRate, getTodayAttendanceStats } from '@/lib/admin-dashboard-utils';

export function useAdminDashboard() {
  const studentsQuery = useGet<User[]>(['admin', 'students'], '/users?role=student');
  const cohortsQuery = useGet<Cohort[]>(['admin', 'cohorts'], '/cohorts');
  const attendanceQuery = useGet<Attendance[]>(['admin', 'attendance'], '/attendance');

  const students = studentsQuery.data ?? [];
  const cohorts = cohortsQuery.data ?? [];
  const records = attendanceQuery.data ?? [];

  const todayStats = useMemo(
    () => getTodayAttendanceStats(records, students.length),
    [records, students.length],
  );

  const overallRate = useMemo(() => getOverallAttendanceRate(records), [records]);

  // Today's attendance rows — each student with their today record
  const todayRows = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const todayMap = new Map(records.filter((r) => r.date === today).map((r) => [r.studentId, r]));
    return students.map((student) => ({
      student,
      record: todayMap.get(student.id) ?? null,
    }));
  }, [students, records]);

  // Students at risk: overall attendance below threshold
  const atRiskStudents = useMemo(() => {
    return students
      .map((student) => {
        const studentRecords = records.filter((r) => r.studentId === student.id);
        const rate =
          studentRecords.length > 0
            ? Math.round(
                (studentRecords.filter((r) => r.status === 'present').length /
                  studentRecords.length) *
                  100,
              )
            : 0;
        const absences = studentRecords.filter((r) => r.status === 'absent').length;
        return { student, rate, absences };
      })
      .filter((s) => s.rate < AT_RISK_THRESHOLD)
      .sort((a, b) => a.rate - b.rate);
  }, [students, records]);

  // Heatmap: last 31 days of attendance records
  const heatmapData = useMemo(() => {
    const days: string[] = [];
    for (let i = 30; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().slice(0, 10));
    }

    return days.map((date) => {
      const dayRecords = records.filter((r) => r.date === date);
      if (!dayRecords.length) return 'absent';
      const presentCount = dayRecords.filter((r) => r.status === 'present').length;
      const lateCount = dayRecords.filter((r) => r.status === 'late').length;
      if (presentCount >= lateCount) return 'present';
      return 'late';
    });
  }, [records]);

  // Active cohort info (first cohort for now)
  const activeCohort = cohorts[0] ?? null;

  return {
    todayStats,
    overallRate,
    todayRows,
    atRiskStudents,
    heatmapData,
    activeCohort,
  };
}
