import LoginLeftPanel from '@/components/auth/LoginLeftPanel';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen w-full">
      <section className="hidden lg:flex w-1/2">
        <LoginLeftPanel />
      </section>
      <section className="w-full lg:w-1/2 flex items-center justify-center bg-[#f7f9fb] p-4">
        <div className="w-full max-w-[440px]">
          <div className="bg-white rounded-2xl border border-[#c6c6cd]/30 p-12 shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)]">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
