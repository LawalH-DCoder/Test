export type ApiError = {
  error: string;
  message: string;
};

export type ApiResponse<T> = {
  data: T;
  message: string;
};

export type PaginatedResponse<T> = {
  page: number;
  page_size: number;
  total: number;
  data: T;
};

export type PaginatedApiResponse<T> = ApiResponse<PaginatedResponse<T>>;

export type PaginationParams = {
  page?: number;
  page_size?: number;
  [key: string]: unknown;
};

export type Role = 'student' | 'admin';

export type User = {
  id: string | number; // JSON server returns "1" string
  name: string;
  email: string;
  password: string;
  role: Role;
  cohortId: number | null;
  avatarInitials: string;
  enrolledDate: string | null;
};

export type Attendance = {
  id: string | number; // newer records use "c9Ws00n_zfM" strings
  studentId: string | number; // newer records use "2" string, older use 2 number
  cohortId: number;
  date: string;
  status: AttendanceStatus;
  checkInTime: string;
  note: string;
};

export type Cohort = {
  id: string | number; // JSON server returns "1" string, new ones "vByYW_AwrW8"
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  instructor: string;
  status?: 'active' | 'completed' | 'draft';
  studentCount?: number;
  capacity?: number;
  attendanceRate?: number;
  avgGrade?: string;
};

export type AttendanceStatus = 'present' | 'late' | 'excused' | 'absent';

export enum FormFieldType {
  INPUT = 'text',
  PASSWORD = 'password',
  NUMBER = 'number',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  DATE = 'date',
  SELECT = 'select',
  SKELETON = 'skeleton',
  EMAIL = 'email',
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface AttendanceRecord {
  id: number;
  studentId: number;
  cohortId: number;
  date: string; // 'YYYY-MM-DD'
  status: AttendanceStatus;
  checkInTime?: string; // ISO timestamp, present/late only
  note: string;
}
export interface MonthlySummary {
  month: string; // 'Feb 2026'
  total: number;
  present: number;
  late: number;
  excused: number;
  absent: number;
  percentage: number; // (present + late) / total * 100
}
