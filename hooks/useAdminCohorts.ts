'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGet, usePost } from '@/hooks/useQueries';
import type { Cohort } from '@/types';
import { CohortFilterTab, NEW_COHORT_FORM_DEFAULTS } from '@/constants/admin-cohorts';

export const newCohortSchema = z.object({
  name: z.string().min(2, 'Cohort name is required'),
  description: z.string().min(1, 'Description is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  instructor: z.string().min(1, 'Please select an instructor'),
  autoAttendance: z.boolean(),
  publicRegistration: z.boolean(),
});

export type NewCohortFormValues = z.infer<typeof newCohortSchema>;

export function useCohortsPage() {
  const [activeTab, setActiveTab] = useState<CohortFilterTab>('Active');
  const [sheetOpen, setSheetOpen] = useState(false);

  const cohortsQuery = useGet<Cohort[]>(['admin', 'cohorts'], '/cohorts');
  const createCohort = usePost<Cohort, Omit<Cohort, 'id'>>('/cohorts', ['admin', 'cohorts']);

  const form = useForm<NewCohortFormValues>({
    resolver: zodResolver(newCohortSchema),
    defaultValues: NEW_COHORT_FORM_DEFAULTS,
  });

  const onSubmit = async (data: NewCohortFormValues) => {
    await createCohort.mutateAsync({
      name: data.name,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      instructor: data.instructor,
    });
    form.reset();
    setSheetOpen(false);
  };

  const filteredCohorts = (cohortsQuery.data ?? []).filter((c) => {
    if (activeTab === 'Active') return c.status === 'active';
    if (activeTab === 'Completed') return c.status === 'completed';
    if (activeTab === 'Drafts') return c.status === 'draft';
    return true;
  });

  // Insight metrics derived from all cohorts
  const allCohorts = cohortsQuery.data ?? [];
  const insights = {
    avgAttendance: 89, // would come from attendance records in real impl
    activeStudents: allCohorts.reduce((acc, c) => acc + (c.studentCount ?? 0), 0),
    upcomingExams: 8,
    instructorCapacity: 72,
  };

  return {
    activeTab,
    setActiveTab,
    sheetOpen,
    setSheetOpen,
    filteredCohorts,
    insights,
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending: createCohort.isPending,
  };
}
