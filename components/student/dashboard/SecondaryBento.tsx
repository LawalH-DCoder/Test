interface SecondaryBentoProps {
  milestonePercentage?: number;
}

export function SecondaryBento({ milestonePercentage = 75 }: SecondaryBentoProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Cohort Milestones */}
      <div className="bg-indigo-600 rounded-xl p-8 text-white relative overflow-hidden group">
        <div className="relative z-10">
          <h4 className="font-h3 text-h3 mb-2">Cohort Milestones</h4>
          <p className="text-indigo-100 text-sm mb-6">
            You've completed {milestonePercentage}% of your current module's attendance
            requirements.
          </p>
          <div className="w-full bg-indigo-500/50 h-2 rounded-full overflow-hidden">
            <div
              className="bg-white h-full rounded-full"
              style={{ width: `${milestonePercentage}%` }}
            />
          </div>
        </div>
        <div className="absolute -right-10 -bottom-10 opacity-10 scale-150 transform group-hover:rotate-12 transition-transform duration-500">
          <span className="material-symbols-outlined text-[120px]" data-icon="auto_awesome">
            auto_awesome
          </span>
        </div>
      </div>

      {/* Upcoming Assessment */}
      <div className="bg-white border border-slate-200 p-8 rounded-xl flex items-center gap-6">
        <div className="bg-amber-100 h-16 w-16 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
          <span className="material-symbols-outlined text-3xl" data-icon="event_note">
            event_note
          </span>
        </div>
        <div>
          <span className="text-amber-600 text-[10px] font-bold uppercase">Reminder</span>
          <h4 className="font-h3 text-lg text-slate-900">Module 4 Review</h4>
          <p className="text-slate-500 text-sm">Tomorrow · 10:00 AM</p>
        </div>
      </div>

      {/* Teacher Feedback */}
      <div className="bg-white border border-slate-200 p-8 rounded-xl flex items-center gap-6">
        <div className="h-16 w-16 rounded-full overflow-hidden shrink-0 bg-slate-200 flex items-center justify-center">
          <span className="material-symbols-outlined text-4xl text-slate-400" data-icon="person">
            person
          </span>
        </div>
        <div>
          <span className="text-indigo-600 text-[10px] font-bold uppercase">Feedback</span>
          <p className="text-slate-900 text-sm font-medium italic">
            "Great consistency this week! Keep it up."
          </p>
          <p className="text-slate-500 text-xs mt-1">— Prof. Sarah Jenkins</p>
        </div>
      </div>
    </div>
  );
}
