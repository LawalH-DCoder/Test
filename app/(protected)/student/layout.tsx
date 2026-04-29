'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user || user.role !== 'student') {
      router.push('/login');
    }
  }, [router, user]);

  if (!user || user.role !== 'student') return null;

  return <>{children}</>;
}
