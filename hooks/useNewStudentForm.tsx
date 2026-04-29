'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGet, usePost } from '@/hooks/useQueries';
import type { Cohort, User } from '@/types';
import { generatePassword } from '@/lib/new-student-utils';

export const newStudentSchema = z.object({
  name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  cohortId: z.string().min(1, 'Please select a cohort'),
  enrolledDate: z.string().min(1, 'Enrolment date is required'),
});

export type NewStudentFormValues = z.infer<typeof newStudentSchema>;

export function useNewStudentForm() {
  const router = useRouter();

  const cohortsQuery = useGet<Cohort[]>(['admin', 'cohorts'], '/cohorts');
  const createStudent = usePost<User, Omit<User, 'id'>>('/users', ['admin', 'students']);

  const form = useForm<NewStudentFormValues>({
    resolver: zodResolver(newStudentSchema),
    defaultValues: {
      name: '',
      email: '',
      password: generatePassword(),
      cohortId: '',
      enrolledDate: new Date().toISOString().slice(0, 10),
    },
  });

  const onSubmit = async (data: NewStudentFormValues) => {
    await createStudent.mutateAsync({
      name: data.name,
      email: data.email,
      password: data.password,
      role: 'student',
      cohortId: Number(data.cohortId),
      avatarInitials: data.name
        .split(' ')
        .map((p) => p[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
      enrolledDate: data.enrolledDate,
    });
    router.push('/admin/students');
  };

  const regeneratePassword = () => {
    form.setValue('password', generatePassword(), { shouldValidate: true });
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    regeneratePassword,
    cohorts: cohortsQuery.data ?? [],
    isPending: createStudent.isPending,
    isSuccess: createStudent.isSuccess,
  };
}
