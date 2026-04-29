import { Attendance } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function attendancePercentage(studentId: number, attendance: Attendance[]) {
  const records = attendance.filter((record) => record.studentId === studentId);
  if (!records.length) return 0;
  const presentCount = records.filter((record) => record.status === 'present').length;
  return Math.round((presentCount / records.length) * 100);
}

export function getTodayDateString() {
  return new Date().toISOString().slice(0, 10);
}

export function formatDate(value: Date) {
  return value.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatTime(value: string) {
  return new Date(value).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}
