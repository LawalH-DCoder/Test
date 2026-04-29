interface AttendanceEmptyStateProps {
  date: string;
}

const AttendanceEmptyState = ({ date }: AttendanceEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-14 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-2xl">
        📋
      </span>
      <p className="text-sm font-semibold text-slate-500">No records found</p>
      <p className="text-xs text-slate-400">
        No attendance records for <span className="font-semibold text-slate-600">{date}</span>.
      </p>
    </div>
  );
};

export default AttendanceEmptyState;
