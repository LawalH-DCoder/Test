'use client';

import Link from 'next/link';
import { useStudentCheckIn } from '@/hooks/useStudentCheckIn';
import CustomButton from '@/components/shared/CustomButton';
import { CHECK_IN_WINDOW, COURSE_NAME } from '@/constants/checkIn';

export function StudentCheckIn() {
  const { currentDateLabel, hasCheckedIn, checkInTime, handleCheckIn, isSubmitting, message } =
    useStudentCheckIn();

  return (
    <div className="">
      <div className="w-full max-w-[480px]">
        <div className=" rounded-xl border border-slate-200 shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)] overflow-hidden transition-all hover:shadow-lg">
          <div className="p-8 text-center bg-slate-50/50">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="material-symbols-outlined text-indigo-600 text-sm" data-icon="event">
                event
              </span>
              <span className="text-slate-600 font-body-md font-semibold">{currentDateLabel}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              <span className="text-indigo-700 text-sm font-medium font-body-sm">
                Class is in session
              </span>
            </div>
          </div>

          <div className="border-t border-slate-100" />

          <div className="p-8 flex flex-col items-center text-center">
            <div className="relative mb-8 group">
              <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full scale-110 group-hover:scale-125 transition-transform duration-500" />
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-xl shadow-indigo-200">
                <span
                  className="material-symbols-outlined text-white text-6xl"
                  data-icon="qr_code_scanner"
                >
                  qr_code_scanner
                </span>
              </div>
            </div>

            <h2 className="font-h2 text-h2 text-slate-900 mb-3">
              {hasCheckedIn ? 'You have checked in' : 'You haven’t checked in yet'}
            </h2>
            <p className="text-slate-500 font-body-md max-w-[320px] mb-8">
              The check-in window for{' '}
              <span className="font-bold text-slate-700">{COURSE_NAME}</span> started at 09:00 AM.
              Please mark your presence now.
            </p>

            <div className="w-full space-y-4">
              <CustomButton
                title={hasCheckedIn ? `Checked in at ${checkInTime}` : 'Check In Now'}
                onPress={handleCheckIn}
                isLoading={isSubmitting}
                disabled={hasCheckedIn || isSubmitting}
                className="w-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              />

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-400" data-icon="info">
                    info
                  </span>
                  <span className="text-slate-500 text-sm font-body-sm">Checking window:</span>
                </div>
                <span className="text-slate-900 font-bold font-body-sm">{CHECK_IN_WINDOW}</span>
              </div>
            </div>

            {message ? <p className="mt-4 text-sm text-slate-600">{message}</p> : null}
          </div>

          <div className="px-8 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-body-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-xs" data-icon="location_on">
                location_on
              </span>
              Verified Campus Wi-Fi Required
            </span>
            <span className="text-xs font-bold text-slate-500 font-label-caps tracking-widest">
              v2.4.1
            </span>
          </div>
        </div>

        <p className="mt-6 text-center text-slate-400 font-body-sm px-10">
          Facing issues? Contact the{' '}
          <Link className="text-indigo-500 hover:underline" href="#">
            Academic Office
          </Link>{' '}
          or use the help button at the top.
        </p>
      </div>

      <div className="fixed bottom-0 right-0 -z-10 opacity-[0.03] pointer-events-none">
        <span className="material-symbols-outlined text-[400px]" data-icon="school">
          school
        </span>
      </div>
    </div>
  );
}
