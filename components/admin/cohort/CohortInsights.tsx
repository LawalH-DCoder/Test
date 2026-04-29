interface CohortInsightsProps {
  avgAttendance: number;
  activeStudents: number;
  upcomingExams: number;
  instructorCapacity: number;
}

const CohortInsights = ({
  avgAttendance,
  activeStudents,
  upcomingExams,
  instructorCapacity,
}: CohortInsightsProps) => {
  return (
    <div className="mt-12">
      <h4 className="text-[20px] font-semibold leading-tight tracking-[-0.01em] text-slate-900 mb-6">
        Cohort Insights
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Average Attendance */}
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <p className="text-sm text-slate-500">Average Attendance</p>
          <h2 className="text-[26px] font-bold leading-[1.1] tracking-[-0.02em] text-indigo-600 mt-2">
            {avgAttendance}%
          </h2>
          <div className="mt-4 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full"
              style={{ width: `${avgAttendance}%` }}
            />
          </div>
        </div>

        {/* Active Students */}
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <p className="text-sm text-slate-500">Active Students</p>
          <h2 className="text-[26px] font-bold leading-[1.1] tracking-[-0.02em] text-slate-900 mt-2">
            {String(activeStudents).padStart(3, '0')}
          </h2>
          <p className="text-xs text-green-600 mt-2 font-bold">+12 from last month</p>
        </div>

        {/* Upcoming Exams */}
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <p className="text-sm text-slate-500">Upcoming Exams</p>
          <h2 className="text-[26px] font-bold leading-[1.1] tracking-[-0.02em] text-slate-900 mt-2">
            {String(upcomingExams).padStart(2, '0')}
          </h2>
          <p className="text-xs text-slate-400 mt-2 font-bold">In next 14 days</p>
        </div>

        {/* Instructor Capacity */}
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <p className="text-sm text-slate-500">Instructor Capacity</p>
          <h2 className="text-[26px] font-bold leading-[1.1] tracking-[-0.02em] text-slate-900 mt-2">
            {instructorCapacity}%
          </h2>
          <p className="text-xs text-amber-600 mt-2 font-bold">3 instructors available</p>
        </div>
      </div>
    </div>
  );
};

export default CohortInsights;
