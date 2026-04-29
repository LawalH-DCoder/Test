type MenuItem = {
  label: string;
  href: string;
  icon: string;
};

export const REQUIRED_DAYS = 20;

export const studentMenuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    href: '/student/dashboard',
    icon: 'dashboard',
  },
  {
    label: 'Check In',
    href: '/student/check-in',
    icon: 'qr_code_scanner',
  },
  {
    label: 'Attendance',
    href: '/student/history',
    icon: 'calendar_today',
  },
  {
    label: 'History',
    href: '/student/history',
    icon: 'history',
  },
  {
    label: 'Settings',
    href: '/student/settings',
    icon: 'settings',
  },
];

export const AdminMenuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: 'dashboard',
  },
  {
    label: 'Attendance',
    href: '/admin/attendance',
    icon: 'qr_code_scanner',
  },
  {
    label: 'Students',
    href: '/admin/students/new',
    icon: 'group',
  },
  {
    label: 'Cohorts',
    href: '/admin/cohorts',
    icon: 'layers',
  },
  {
    label: 'Check In',
    href: '/admin/check-in',
    icon: 'qr_code_scanner',
  },
  {
    label: 'Settings',
    href: '/student/settings',
    icon: 'settings',
  },
];