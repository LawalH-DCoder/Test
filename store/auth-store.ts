'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Role, User } from '@/types';
import { AuthState } from '@/types/auth';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,

      login: (user: User) => set({ user }),

      logout: () => set({ user: null }),

      requireRole: (role: Role) => {
        const currentUser = get().user;
        if (!currentUser || currentUser.role !== role) return null;
        return currentUser;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
      }),
    },
  ),
);
