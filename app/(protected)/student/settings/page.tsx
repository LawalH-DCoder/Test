'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function StudentSettingsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);

  if (!user) return null;

  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-h1 text-h1 text-slate-900">Settings</h1>
        <p className="font-body-md text-slate-500 mt-1">Manage your account preferences</p>
      </div>

      {/* Profile Settings */}
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)]">
        <h2 className="text-h3 font-h3 text-slate-900 mb-6">Profile Information</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <input
                type="text"
                value={user.name}
                readOnly
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Cohort</label>
            <input
              type="text"
              value="Frontend Engineering · Cohort 3"
              readOnly
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500"
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)]">
        <h2 className="text-h3 font-h3 text-slate-900 mb-6">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-900">Push Notifications</h3>
              <p className="text-sm text-slate-500">
                Receive notifications about attendance updates
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-900">Email Updates</h3>
              <p className="text-sm text-slate-500">
                Receive weekly attendance summaries via email
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emailUpdates}
                onChange={(e) => setEmailUpdates(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)]">
        <h2 className="text-h3 font-h3 text-slate-900 mb-6">Account Actions</h2>
        <div className="space-y-4">
          <button className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            Change Password
          </button>
          <button className="w-full md:w-auto px-6 py-3 ml-0 md:ml-4 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors">
            Download Attendance Data
          </button>
        </div>
      </div>
    </div>
  );
}
