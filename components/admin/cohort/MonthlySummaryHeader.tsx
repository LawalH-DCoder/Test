'use client';

import Link from 'next/link';
import type { User } from '@/types';
import { MONTH_TABS, MonthTab } from '@/constants/monthly-summary';

interface MonthlySummaryHeaderProps {
  user: User | null;
  activeMonth: MonthTab;
  onMonthChange: (month: MonthTab) => void;
}

const MonthlySummaryHeader = ({ user, activeMonth, onMonthChange }: MonthlySummaryHeaderProps) => {
  return (
    <div className="mb-6 flex items-end justify-between">
      <div>
        {/* Back nav */}
        <Link href="/admin/students" className="flex items-center gap-2 text-slate-500 mb-2">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span className="text-xs font-bold uppercase tracking-wider">Back to Cohort 3 List</span>
        </Link>

        <h2 className="text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-slate-900 mb-1">
          Monthly Summary
        </h2>

        {/* Student info */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
            {user?.avatarInitials ?? 'ST'}
          </div>
          <div>
            <p className="text-[20px] font-semibold leading-tight tracking-[-0.01em] text-slate-900">
              {user?.name ?? 'Student'}
            </p>
            <p className="text-sm text-slate-500">
              Cohort 3 · ID: STU-{String(user?.id ?? '0000').padStart(4, '0')}
            </p>
          </div>
        </div>
      </div>

      {/* Month picker */}
      <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200">
        {MONTH_TABS.map((month) => (
          <button
            key={month}
            onClick={() => onMonthChange(month)}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeMonth === month
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MonthlySummaryHeader;
