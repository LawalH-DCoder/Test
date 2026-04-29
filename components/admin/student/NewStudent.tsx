'use client';

import { useState } from 'react';
import { useGet } from '@/hooks/useQueries';
import type { User } from '@/types';
import { useNewStudentForm } from '@/hooks/useNewStudentForm';
import PersonalDetailsSection from './PersonalDetailsSection';
import CohortAssignmentSection from './CohortAssignmentSection';
import FormActions from './FormActions';
import RegistrationStatsSidebar from './RegistrationStatsSidebar';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { NEW_STUDENT_BREADCRUMBS } from '@/constants/new-student';
import Toast from '@/components/shared/Toast';

const NewStudent = () => {
  const { form, onSubmit, regeneratePassword, cohorts, isPending, isSuccess } = useNewStudentForm();
  const [toastDismissed, setToastDismissed] = useState(false);

  const studentsQuery = useGet<User[]>(['admin', 'students'], '/users?role=student');
  const totalStudents = studentsQuery.data?.length ?? 0;
  const createdName = form.getValues('name');

  return (
    <div className="w-full">
      {/* Success toast */}
      {isSuccess && !toastDismissed && (
        <Toast
          type="success"
          title="Student created successfully!"
          message={`${createdName} can now log in.`}
          onClose={() => setToastDismissed(true)}
        />
      )}

      {/* Breadcrumb */}
      <Breadcrumb items={NEW_STUDENT_BREADCRUMBS} />

      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-[26px] font-bold leading-tight tracking-[-0.02em] text-slate-900">
          Add New Student
        </h2>
        <p className="text-slate-500 mt-2 text-base">
          Register a new student to the academy attendance system.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)] overflow-hidden">
        <form onSubmit={onSubmit} className="divide-y divide-slate-100">
          <PersonalDetailsSection form={form} onRegenerate={regeneratePassword} />
          <CohortAssignmentSection form={form} cohorts={cohorts} />
          <FormActions isPending={isPending} />
        </form>
      </div>

      {/* Bottom grid — sidebar on right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">{/* reserved for future content */}</div>
        <div>
          <RegistrationStatsSidebar totalStudents={totalStudents} />
        </div>
      </div>
    </div>
  );
};

export default NewStudent;
