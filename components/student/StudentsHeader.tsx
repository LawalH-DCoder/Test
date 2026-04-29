'use client';

import Link from 'next/link';

interface StudentsHeaderProps {
  count: number;
}

const StudentsHeader = ({ count }: StudentsHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white px-6 py-5 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-400">
          Management
        </p>
        <h1 className="mt-0.5 text-2xl font-extrabold tracking-tight text-slate-900">
          Student roster
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          {count > 0
            ? `${count} student${count !== 1 ? 's' : ''} enrolled`
            : 'View students and attendance rates.'}
        </p>
      </div>
      <Link
        href="/admin/students/new"
        className="inline-flex items-center gap-2 self-start rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold tracking-wide text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md md:self-auto"
      >
        <span className="text-base leading-none">+</span>
        Add student
      </Link>
    </div>
  );
};

export default StudentsHeader;
