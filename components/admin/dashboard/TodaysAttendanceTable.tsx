import Link from 'next/link';
import type { User, Attendance } from '@/types';
import CustomTable, { type TableColumn, type TableRowData } from '@/components/shared/CustomTable';
import { STATUS_CONFIG } from '@/constants/admin-dashboard';

interface TodayRow {
  student: User;
  record: Attendance | null;
}

interface TodaysAttendanceTableProps {
  rows: TodayRow[];
}

const COLUMNS: TableColumn[] = [
  { key: 'student', label: 'Student Name' },
  { key: 'checkIn', label: 'Check-In Time' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions', align: 'right' },
];

const TodaysAttendanceTable = ({ rows }: TodaysAttendanceTableProps) => {
  const tableRows: TableRowData[] = rows.map(({ student, record }) => {
    const cfg = STATUS_CONFIG[record?.status ?? 'absent'];
    const initials = student.avatarInitials ?? student.name.slice(0, 2).toUpperCase();

    return {
      student: (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs">
            {initials}
          </div>
          <span className="font-medium text-slate-900">{student.name}</span>
        </div>
      ),
      checkIn: <span className="text-sm text-slate-600">{record?.checkInTime ?? '—'}</span>,
      status: (
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${cfg.bg} ${cfg.text}`}>
          {cfg.label}
        </span>
      ),
      actions: (
        <button className="text-slate-400 hover:text-indigo-600">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      ),
      rawData: { student, record },
    };
  });

  return (
    <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)] overflow-hidden h-full">
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-[20px] font-semibold leading-tight tracking-[-0.01em] text-slate-900">
          Today's Attendance
        </h3>
        <Link
          href="/admin/attendance"
          className="text-indigo-600 text-sm font-semibold hover:underline"
        >
          View All Records
        </Link>
      </div>
      <div className="overflow-x-auto">
        <CustomTable
          columns={COLUMNS}
          rows={tableRows}
          emptyMessage="No attendance records for today."
          tableHeaderClassName="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider"
        />
      </div>
    </div>
  );
};

export default TodaysAttendanceTable;
