'use client';

import { useMemo, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useGet, usePost } from '@/hooks/useQueries';
import { formatDate, formatTime, getTodayDateString } from '@/lib/utils';
import type { Attendance } from '@/types';

const attendanceQueryKeyBase = ['student', 'attendance'];

export function useStudentCheckIn() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');

  const today = getTodayDateString();
  const attendanceKey = user ? [...attendanceQueryKeyBase, user.id] : attendanceQueryKeyBase;

  const attendanceQuery = useGet<Attendance[]>(
    attendanceKey,
    user ? `/attendance?studentId=${user.id}` : '/attendance?studentId=0',
    {
      enabled: Boolean(user),
    },
  );

  const addAttendance = usePost<Attendance, Omit<Attendance, 'id'>>('/attendance', attendanceKey);

  const attendanceToday = useMemo(
    () => attendanceQuery.data?.find((record) => record.date === today),
    [attendanceQuery.data, today],
  );

  const hasCheckedIn = Boolean(attendanceToday);
  const checkInTime = attendanceToday?.checkInTime ? formatTime(attendanceToday.checkInTime) : null;
  const currentDateLabel = formatDate(new Date());
  const isSubmitting = addAttendance.isPending;

  const handleCheckIn = async () => {
    if (!user || hasCheckedIn) return;

    setMessage('');

    try {
      await addAttendance.mutateAsync({
        studentId: user.id,
        cohortId: user.cohortId ?? 0,
        date: today,
        status: 'present',
        checkInTime: new Date().toISOString(),
        note: '',
      });
      setMessage('Check-in recorded. Have a great day!');
    } catch {
      setMessage('Unable to record check-in. Please try again.');
    }
  };

  return {
    currentDateLabel,
    hasCheckedIn,
    checkInTime,
    handleCheckIn,
    isSubmitting,
    message,
  };
}
