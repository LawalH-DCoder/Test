'use client';

import { useMemo, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useGet } from '@/hooks/useQueries';
import type { Attendance } from '@/types';

export default function StudentHistoryPage() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  const attendanceKey = user ? ['student', 'attendance', user.id] : ['student', 'attendance'];

  const attendanceQuery = useGet<Attendance[]>(
    attendanceKey,
    user ? `/attendance?studentId=${user.id}` : '/attendance?studentId=0',
    { enabled: Boolean(user) },
  );

  const filteredRecords = useMemo(
    () => attendanceQuery.data?.filter((record) => record.date === selectedDate) ?? [],
    [attendanceQuery.data, selectedDate],
  );

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Attendance history</h1>
            <p className="mt-2 text-sm text-slate-500">Filter your own records by date.</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-slate-700">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
            />
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {filteredRecords.length ? (
            filteredRecords.map((record) => (
              <div
                key={`${record.id}${new Date()}`}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <p className="font-medium text-slate-900">{record.status.toUpperCase()}</p>
                <p className="text-sm text-slate-600">
                  Checked in at: {record.checkInTime || 'N/A'}
                </p>
                <p className="text-sm text-slate-600">Note: {record.note || 'No note.'}</p>
              </div>
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
              No check-in record found for {selectedDate}.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
