'use client';

import { useCohortsPage } from '@/hooks/useAdminCohorts';
import type { Cohort } from '@/types';
import CohortsHeader from './CohortsHeader';
import CreateCohortCard from './CreateCohortCard';
import CohortCard from './CohortCard';
import CohortInsights from './CohortInsights';
import NewCohortSheet from './NewCohortSheet';

const AdminCohorts = () => {
  const {
    activeTab,
    setActiveTab,
    sheetOpen,
    setSheetOpen,
    filteredCohorts,
    insights,
    form,
    onSubmit,
    isPending,
  } = useCohortsPage();

  const handleDetails = (cohort: Cohort) => {
    console.log('cohort details', cohort.id);
  };

  return (
    <div>
        {/* Header + filter tabs */}
        <CohortsHeader activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Bento grid — create card always first, then API cohorts */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <CreateCohortCard onClick={() => setSheetOpen(true)} />
          {filteredCohorts.map((cohort) => (
            <CohortCard key={cohort.id} cohort={cohort} onDetails={handleDetails} />
          ))}
        </div>

        {/* Insights metrics */}
        <CohortInsights
          avgAttendance={insights.avgAttendance}
          activeStudents={insights.activeStudents}
          upcomingExams={insights.upcomingExams}
          instructorCapacity={insights.instructorCapacity}
        />

      {/* New Cohort slide-over — uses SheetWrapper */}
      <NewCohortSheet
        open={sheetOpen}
        setOpen={setSheetOpen}
        form={form}
        onSubmit={onSubmit}
        isPending={isPending}
      />
    </div>
  );
};

export default AdminCohorts;
