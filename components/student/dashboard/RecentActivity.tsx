'use client';

import Link from 'next/link';
import { ActivityItem } from './ActivityItem';
import type { Attendance } from '@/types';

interface RecentActivityProps {
  records: Attendance[];
  isLoading: boolean;
}

export function RecentActivity({ records, isLoading }: RecentActivityProps) {
  const recent = records.slice(0, 5);

  return (
    <div className="col-span-12 lg:col-span-4 bg-white p-8 rounded-xl border border-slate-200 shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)]">
      <div className="mb-6">
        <h3 className="text-h3 font-h3 text-slate-900">Recent Activity</h3>
        <p className="text-slate-500 text-sm font-body-sm">Your last 5 check-ins</p>
      </div>
      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-slate-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : recent.length > 0 ? (
          recent.map((record) => <ActivityItem key={record.id} record={record} />)
        ) : (
          <p className="text-slate-500 text-sm text-center py-4">No attendance records yet</p>
        )}
      </div>
      <Link href="/student/history">
        <button className="w-full mt-6 py-3 border border-slate-200 rounded-lg text-slate-600 text-sm font-bold hover:bg-slate-50 transition-all">
          View All Records
        </button>
      </Link>
    </div>
  );
}
