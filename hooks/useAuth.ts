'use client';

import { isAxiosError } from 'axios';
import type { User } from '@/types';
import { apiClient } from '@/lib/api/client';
import { useAuthStore } from '@/store/auth-store';
import { AuthState } from '@/types/auth';
import { useEffect, useState } from 'react';

function useAuth() {
  const user = useAuthStore((state: AuthState) => state.user);
  const login = useAuthStore((state: AuthState) => state.login);
  const logout = useAuthStore((state: AuthState) => state.logout);
  const requireRole = useAuthStore((state: AuthState) => state.requireRole);

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    if (useAuthStore.persist.hasHydrated()) {
      setHydrated(true);
    }

    return () => unsub();
  }, []);

  return { user, login, logout, requireRole, hydrated };
}

async function authenticate(email: string, password: string): Promise<User | null> {
  try {
    const response = await apiClient.get<User[]>(
      `/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
    );

    return response.data[0] ?? null;
  } catch (error) {
    let message = 'Unable to authenticate. Please try again.';

    if (isAxiosError(error)) {
      message =
        error.response?.data?.message ?? error.response?.statusText ?? error.message ?? message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    console.error('Authentication failed:', message, error);
    throw new Error(message);
  }
}

export { useAuth, authenticate };
