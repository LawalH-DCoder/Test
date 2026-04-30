'use client';

import LoginLeftPanel from '@/components/auth/LoginLeftPanel';
import RoleSwitcher from '@/components/auth/RoleSwitcher';
import { useState } from 'react';

type UserRole = 'student' | 'admin';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>('student');
  return (
    <main className="flex h-screen w-full">
      <section className="hidden lg:flex w-1/2">
        <LoginLeftPanel />
      </section>
      <section className="h-screen overflow-auto w-full lg:w-1/2 flex items-center justify-center bg-[#f7f9fb] px-4 py-12">
        <div className="w-full max-w-[440px]">
          <div className="bg-white rounded-2xl border border-[#c6c6cd]/30 p-12 shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)]">
            {children}
          </div>

          <RoleSwitcher role={role} onChange={setRole} />
        </div>
      </section>
    </main>
  );
}
