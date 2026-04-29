import StudentRow from './StudentRow';

interface StudentWithRate {
  id: number;
  name: string;
  role: string;
  email: string;
  avatarInitials: string;
  attendanceRate: number;
  cohortId?: number | null;
}

interface StudentsTableProps {
  rows: StudentWithRate[];
}

const StudentsTable = ({ rows }: StudentsTableProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      {/* Column headers */}
      <div className="grid grid-cols-12 gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3">
        <span className="col-span-5 text-[0.6rem] font-bold uppercase tracking-widest text-slate-400">
          Student
        </span>
        <span className="col-span-3 text-[0.6rem] font-bold uppercase tracking-widest text-slate-400">
          Email
        </span>
        <span className="col-span-2 text-[0.6rem] font-bold uppercase tracking-widest text-slate-400">
          Attendance
        </span>
        <span className="col-span-2 text-[0.6rem] font-bold uppercase tracking-widest text-slate-400">
          Cohort
        </span>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-2 p-4">
        {rows.length > 0 ? (
          rows.map((student) => <StudentRow key={student.id} {...student} />)
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 py-14 text-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl">
              🎓
            </span>
            <p className="text-sm font-semibold text-slate-500">No students found yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsTable;
