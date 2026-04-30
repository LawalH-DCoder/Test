'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-6 text-center">
      {/* Background Glow Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-600/20 blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Large Icon matching your sidebar style */}
        <div className="h-24 w-24 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-indigo-500 mb-8 shadow-xl">
          <span className="material-symbols-outlined !text-6xl">running_with_errors</span>
        </div>

        {/* Error Messaging */}
        <h1 className="text-7xl font-bold text-white mb-4 font-h2 tracking-tight">404</h1>
        <h2 className="text-xl font-semibold text-slate-200 mb-2">Page Not Found</h2>
        <p className="text-slate-400 max-w-md mb-10 leading-relaxed">
          The portal page you are looking for doesn't exist or has been moved. Please check the URL
          or head back to your dashboard.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-indigo-500/20"
          >
            <span className="material-symbols-outlined text-sm">home</span>
            Back to Dashboard
          </Link>

          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-8 py-3 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 border border-slate-700/50 rounded-xl font-medium transition-all"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Go Back
          </button>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="mt-20 flex flex-col items-center gap-1 opacity-50">
        <span className="text-white font-bold text-sm tracking-wide">Academy Portal</span>
        <span className="text-slate-400 text-[10px] uppercase tracking-[0.2em]">
          Attendance System
        </span>
      </div>
    </div>
  );
}
