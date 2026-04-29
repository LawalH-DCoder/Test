'use client';

import { useAuth } from '@/hooks/useAuth';

export function TopBar() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <header className="flex items-center justify-between px-8 h-16 bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md">
          <span
            className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg"
            data-icon="search"
          >
            search
          </span>
          <input
            className="w-full bg-slate-50 border-none rounded-lg py-2 pl-10 text-sm focus:ring-2 focus:ring-indigo-500/20"
            placeholder="Search attendance records..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-all">
          <span className="material-symbols-outlined" data-icon="notifications">
            notifications
          </span>
        </button>
        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-all">
          <span className="material-symbols-outlined" data-icon="help_outline">
            help_outline
          </span>
        </button>
        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-900">{user.name}</span>
          <div className="h-8 w-8 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center">
            <span className="material-symbols-outlined text-slate-400" data-icon="person">
              person
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
