import { getUser, setUser, clearUser, requireRole } from '@/lib/auth';
import type { User } from '@/types';

const mockStudent: User = {
  id: 2,
  name: 'Ada Okafor',
  email: 'ada@academy.com',
  password: 'Student123!',
  role: 'student',
  cohortId: 1,
  avatarInitials: 'AO',
  enrolledDate: '2026-02-03',
};
beforeEach(() => localStorage.clear());
describe('setUser / getUser', () => {
  it('stores and retrieves a user', () => {
    setUser(mockStudent);
    expect(getUser()).toEqual(mockStudent);
  });
  it('returns null when nothing is stored', () => {
    expect(getUser()).toBeNull();
  });
});
describe('clearUser', () => {
  it('removes the user from storage', () => {
    setUser(mockStudent);
    clearUser();
    expect(getUser()).toBeNull();
  });
});
describe('requireRole', () => {
  it('returns user when role matches', () => {
    setUser(mockStudent);
    expect(requireRole('student')).toEqual(mockStudent);
  });
  it('returns null when role does not match', () => {
    setUser(mockStudent);
    expect(requireRole('admin')).toBeNull();
  });
  it('returns null when no user is stored', () => {
    expect(requireRole('student')).toBeNull();
  });
});
