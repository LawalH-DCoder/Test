import type { User } from '@/types';
const AUTH_KEY = 'academy_user';
export const getUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(AUTH_KEY);
  return raw ? (JSON.parse(raw) as User) : null;
};
export const setUser = (user: User): void => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
};
export const clearUser = (): void => {
  localStorage.removeItem(AUTH_KEY);
};
export const requireRole = (role: 'student' | 'admin'): User | null => {
  const user = getUser();
  if (!user || user.role !== role) return null;
  return user;
};
