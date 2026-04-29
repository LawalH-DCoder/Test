import { Role, User } from '.';

export interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  requireRole: (role: Role) => User | null;
}
