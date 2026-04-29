'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { AdminMenuItems, studentMenuItems } from '@/constants/dashboard';

const SidebarMain = ({ role }: { role: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const getMenuItems = () => {
    if (role === 'student') return studentMenuItems;
    if (role === 'admin') return AdminMenuItems;
    return [];
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  console.log(pathname);

  return (
    <Sidebar>
      <SidebarHeader className="p-8 mb-10 flex flex-col gap-1">
        <span className="text-xl font-bold text-white font-h2">Academy Portal</span>
        <span className="text-slate-400 text-xs font-label-caps tracking-wider">
          Attendance System
        </span>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <div className="px-2 mb-8">
          <div className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-xl border border-slate-700/50">
            <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs">
              {user?.name?.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-white text-sm font-semibold">{user?.name}</span>
              <span className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                Student · Cohort 3
              </span>
            </div>
          </div>
        </div>

        <SidebarMenu>
          {getMenuItems().map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                className={`flex items-center gap-3 px-4 !py-6 rounded-lg transition-all w-full ${
                  pathname === item.href
                    ? '!bg-indigo-600 !text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Link href={item.href} className="flex items-center gap-3">
                  <span className="material-symbols-outlined" data-icon={item.icon}>
                    {item.icon}
                  </span>
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="px-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
            >
              <span className="material-symbols-outlined" data-icon="logout">
                logout
              </span>
              <span className="font-medium text-sm">Sign Out</span>
            </button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarMain;
