// import { apiClient } from './client';
// import type { Attendance, Cohort, User } from '@/types';

// // Users API
// export const usersApi = {
//   getAll: () => apiClient.get<User[]>('/users'),
//   getById: (id: number) => apiClient.get<User>(`/users/${id}`),
//   create: (user: Omit<User, 'id'>) => apiClient.post<User>('/users', user),
//   update: (id: number, user: Partial<User>) => apiClient.put<User>(`/users/${id}`, user),
//   delete: (id: number) => apiClient.delete<void>(`/users/${id}`),
// };

// // Cohorts API
// export const cohortsApi = {
//   getAll: () => apiClient.get<Cohort[]>('/cohorts'),
//   getById: (id: number) => apiClient.get<Cohort>(`/cohorts/${id}`),
//   create: (cohort: Omit<Cohort, 'id'>) => apiClient.post<Cohort>('/cohorts', cohort),
//   update: (id: number, cohort: Partial<Cohort>) => apiClient.put<Cohort>(`/cohorts/${id}`, cohort),
//   delete: (id: number) => apiClient.delete<void>(`/cohorts/${id}`),
// };

// // Attendance API
// export const attendanceApi = {
//   getAll: () => apiClient.get<Attendance[]>('/attendance'),
//   getById: (id: number) => apiClient.get<Attendance>(`/attendance/${id}`),
//   getByStudent: (studentId: number) =>
//     apiClient.get<Attendance[]>(`/attendance?studentId=${studentId}`),
//   getByCohort: (cohortId: number) =>
//     apiClient.get<Attendance[]>(`/attendance?cohortId=${cohortId}`),
//   getByDate: (date: string) => apiClient.get<Attendance[]>(`/attendance?date=${date}`),
//   create: (attendance: Omit<Attendance, 'id'>) =>
//     apiClient.post<Attendance>('/attendance', attendance),
//   update: (id: number, attendance: Partial<Attendance>) =>
//     apiClient.put<Attendance>(`/attendance/${id}`, attendance),
//   delete: (id: number) => apiClient.delete<void>(`/attendance/${id}`),
// };

// export const api = {
//   users: usersApi,
//   cohorts: cohortsApi,
//   attendance: attendanceApi,
// };
