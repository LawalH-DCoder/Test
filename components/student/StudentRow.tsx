import { CustomImage } from '@/components/shared/CustomImage';

interface StudentRowProps {
  name: string;
  role: string;
  email: string;
  avatarInitials: string;
  attendanceRate: number;
  cohortId?: number | null;
}

const StudentRow = ({
  name,
  role,
  email,
  avatarInitials,
  attendanceRate,
  cohortId,
}: StudentRowProps) => {
  const attendanceColor =
    attendanceRate >= 80
      ? 'text-emerald-600 bg-emerald-50 ring-emerald-200'
      : attendanceRate >= 50
        ? 'text-amber-600 bg-amber-50 ring-amber-200'
        : 'text-red-500 bg-red-50 ring-red-200';

  return (
    <div className="grid grid-cols-12 items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 px-5 py-3.5 transition-colors hover:bg-slate-100">
      {/* Student */}
      <div className="col-span-5 flex items-center gap-3">
        <CustomImage src={undefined} style="w-9 h-9 rounded-full shrink-0" alt={avatarInitials} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">{name}</p>
          <p className="truncate text-xs capitalize text-slate-400">{role}</p>
        </div>
      </div>

      {/* Email */}
      <div className="col-span-3 truncate text-xs text-slate-500">{email}</div>

      {/* Attendance */}
      <div className="col-span-2">
        <span
          className={`inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-bold ring-1 ${attendanceColor}`}
        >
          {attendanceRate}%
        </span>
      </div>

      {/* Cohort */}
      <div className="col-span-2">
        {cohortId ? (
          <span className="inline-flex items-center rounded-lg bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-600 ring-1 ring-indigo-100">
            #{cohortId}
          </span>
        ) : (
          <span className="text-xs text-slate-400">Unassigned</span>
        )}
      </div>
    </div>
  );
};

export default StudentRow;
