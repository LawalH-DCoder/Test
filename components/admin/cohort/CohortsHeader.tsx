'use client';

import { COHORT_FILTER_TABS, CohortFilterTab } from "@/constants/admin-cohorts";


interface CohortsHeaderProps {
  activeTab: CohortFilterTab;
  onTabChange: (tab: CohortFilterTab) => void;
}

const CohortsHeader = ({ activeTab, onTabChange }: CohortsHeaderProps) => {
  return (
    <div className="flex justify-between items-end mb-10 w-full">
      <div>
        <h2 className="text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-slate-900">
          Cohorts
        </h2>
        <p className="text-slate-500 mt-1">
          Manage and track all active and historical student groups.
        </p>
      </div>
      <div className="flex gap-3">
        <div className="flex bg-white border border-slate-200 rounded-lg p-1">
          {COHORT_FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CohortsHeader;
