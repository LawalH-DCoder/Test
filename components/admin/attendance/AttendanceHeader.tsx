'use client';

interface AttendanceHeaderProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

const AttendanceHeader = ({ selectedDate, onDateChange }: AttendanceHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white px-6 py-5 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-400">
          Attendance
        </p>
        <h1 className="mt-0.5 text-2xl font-extrabold tracking-tight text-slate-900">
          Roster by date
        </h1>
        <p className="mt-1 text-xs text-slate-400">Review check-ins for the selected day.</p>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5">
        <label
          htmlFor="attendance-date"
          className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400"
        >
          Date
        </label>
        <input
          id="attendance-date"
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="bg-transparent text-sm font-semibold text-slate-800 outline-none"
        />
      </div>
    </div>
  );
};

export default AttendanceHeader;
