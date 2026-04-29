'use client';

import { useMemo } from 'react';
import { useGet } from '@/hooks/useQueries';
import type { User, Attendance } from '@/types';
import { attendancePercentage } from '@/lib/utils';
import StudentsHeader from './StudentsHeader';
import StudentsTable from './StudentsTable';

const AdminStudentsComponent = () => {
  const studentsQuery = useGet<User[]>(['admin', 'students'], '/users?role=student');
  const attendanceQuery = useGet<Attendance[]>(['admin', 'attendance'], '/attendance');

  const rows = useMemo(() => {
    const students = studentsQuery.data ?? [];
    const attendance = attendanceQuery.data ?? [];

    return students.map((student) => {
      const id = typeof student.id === 'number' ? student.id : Number(student.id);

      return {
        ...student,
        id,
        attendanceRate: attendancePercentage(id, attendance),
      };
    });
  }, [studentsQuery.data, attendanceQuery.data]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
      <StudentsHeader count={rows.length} />
      <StudentsTable rows={rows} />
    </div>
  );
};

export default AdminStudentsComponent;
