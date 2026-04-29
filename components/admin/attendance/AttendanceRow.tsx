'use client';

import type { Attendance, User } from '@/types';
import { CustomModal } from '@/components/shared/CustomDialog';
import CustomButton from '@/components/shared/CustomButton';
import StatusBadge from '@/components/shared/StatusBadge';

interface AttendanceRowProps {
  record: Attendance;
  student?: User;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">{label}</p>
      <div className="text-sm font-semibold text-slate-800">{children}</div>
    </div>
  );
}

const AttendanceRow = ({ record, student }: AttendanceRowProps) => {
  // console.log('Rendering AttendanceRow for record:', record, 'student:', student);
  return (
    <div className="grid grid-cols-2 items-center gap-4 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm transition-shadow hover:shadow-md md:grid-cols-4">
      <Field label="Student">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
            {student?.name?.charAt(0).toUpperCase() ?? '?'}
          </span>
          <span>{student?.name ?? 'Unknown'}</span>
        </div>
      </Field>

      <Field label="Status">
        <StatusBadge status={record.status} />
      </Field>

      <Field label="Check-in time">
        {record.checkInTime || <span className="text-slate-300">—</span>}
      </Field>

      <div className="flex items-center justify-end">
        <CustomModal
          title="Attendance details"
          description={`Record for ${student?.name ?? 'student'}`}
          trigger={
            <CustomButton
              title="Details"
              className="rounded-xl bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
            />
          }
        >
          <div className="flex flex-col gap-4">
            <Field label="Date">{record.date}</Field>
            <Field label="Status">
              <StatusBadge status={record.status} />
            </Field>
            <Field label="Note">
              {record.note ?? <span className="text-slate-400 font-normal">No note provided.</span>}
            </Field>
          </div>
        </CustomModal>
      </div>
    </div>
  );
};

export default AttendanceRow;
