interface AtRiskStudent {
  student: { id: string | number; name: string; avatarInitials?: string };
  rate: number;
  absences: number;
}

interface StudentsAtRiskProps {
  atRiskStudents: AtRiskStudent[];
  onGenerateReport?: () => void;
}

const StudentsAtRisk = ({ atRiskStudents, onGenerateReport }: StudentsAtRiskProps) => {
  const avatarBg = (rate: number) => (rate < 65 ? 'bg-red-100' : 'bg-amber-100');
  const avatarText = (rate: number) => (rate < 65 ? 'text-red-700' : 'text-amber-700');

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-[20px] font-semibold leading-tight tracking-[-0.01em] text-slate-900">
          Students At Risk
        </h3>
        <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-bold">
          URGENT
        </span>
      </div>

      {/* List */}
      <div className="p-2">
        {atRiskStudents.length === 0 && (
          <p className="text-center text-sm text-slate-400 py-6">
            No students at risk. Great work!
          </p>
        )}
        {atRiskStudents.map(({ student, rate, absences }) => (
          <div
            key={student.id}
            className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full ${avatarBg(rate)} flex items-center justify-center font-bold ${avatarText(rate)}`}
              >
                {student.avatarInitials ?? student.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{student.name}</p>
                <p className="text-slate-500 text-xs">{absences} absences this month</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-red-600 font-extrabold">{rate}%</p>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Attendance</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer action */}
      <div className="p-4 bg-slate-50 border-t border-slate-100">
        <button
          onClick={onGenerateReport}
          className="w-full py-2 bg-white border border-slate-200 rounded-lg text-slate-700 text-sm font-bold hover:bg-slate-100 transition-colors"
        >
          Generate Warning Reports
        </button>
      </div>
    </div>
  );
};

export default StudentsAtRisk;
