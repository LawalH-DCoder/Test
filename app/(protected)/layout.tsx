'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { TopBar } from '@/components/navigation/TopBar';
import { SidebarProvider } from '@/components/ui/sidebar';
import SidebarMain from '@/components/navigation/SidebarMain';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, hydrated } = useAuth();

  useEffect(() => {
    if (!hydrated) return;

    if (!user) {
      router.replace('/login');
    }
  }, [router, user, hydrated]);

  if (!hydrated) return null;
  if (!user) return null;

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-slate-50">
        {user.role === 'student' && <SidebarMain role="student" />}
        {user.role === 'admin' && <SidebarMain role="admin" />}
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-auto ">
            <div className="pt-8 min-h-screen mx-auto w-full flex   p-8 text-on-background antialiased">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
