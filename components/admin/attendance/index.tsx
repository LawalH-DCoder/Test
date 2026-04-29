'use client';

import { useMemo, useState } from 'react';
import { useGet } from '@/hooks/useQueries';
import type { Attendance, User } from '@/types';
import AttendanceHeader from './AttendanceHeader';
import AttendanceEmptyState from './AttendanceEmptyState';
import AttendanceRow from './AttendanceRow';

const AdminAttendanceComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  const attendanceQuery = useGet<Attendance[]>(
    ['attendance', selectedDate],
    `/attendance?date=${selectedDate}`,
  );
  const studentsQuery = useGet<User[]>(['admin', 'students'], '/users?role=student');

  const studentsMap = useMemo(() => {
    const map = new Map<number, User>();

    studentsQuery.data?.forEach((s) => {
      const id = typeof s.id === 'number' ? s.id : Number(s.id);
      if (!Number.isNaN(id)) {
        map.set(id, s);
      }
    });

    return map;
  }, [studentsQuery.data]);

  const records = attendanceQuery.data ?? [];
  // console.log(records)

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
      <AttendanceHeader selectedDate={selectedDate} onDateChange={setSelectedDate} />

      {/* Summary strip */}
      {records.length > 0 && (
        <div className="flex items-center gap-2 px-1">
          <span className="text-xs font-semibold text-slate-500">
            {records.length} record{records.length !== 1 ? 's' : ''}
          </span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span className="text-xs text-emerald-600 font-semibold">
            {records.filter((r) => r.status === 'present').length} present
          </span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span className="text-xs text-red-500 font-semibold">
            {records.filter((r) => r.status === 'absent').length} absent
          </span>
        </div>
      )}

      {/* Rows */}
      <div className="flex flex-col gap-3">
        {records.length > 0 ? (
          records.map((record) => {
            const studentId =
              typeof record.studentId === 'number' ? record.studentId : Number(record.studentId);

            return (
              <AttendanceRow key={record.id} record={record} student={studentsMap.get(studentId)} />
            );
          })
        ) : (
          <AttendanceEmptyState date={selectedDate} />
        )}
      </div>
    </div>
  );
};

export default AdminAttendanceComponent;
