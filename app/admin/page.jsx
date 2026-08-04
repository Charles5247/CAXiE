'use client';

import { useState, useEffect } from 'react';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminLogin from '@/components/admin/AdminLogin';

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored admin session
    const stored = sessionStorage.getItem('caxie_admin_session');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Session expires after 8 hours
        if (parsed.expiry > Date.now()) {
          setSession(parsed);
        } else {
          sessionStorage.removeItem('caxie_admin_session');
        }
      } catch {
        sessionStorage.removeItem('caxie_admin_session');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (sessionData) => {
    const expiry = Date.now() + 8 * 60 * 60 * 1000; // 8 hours
    const data = { ...sessionData, expiry };
    sessionStorage.setItem('caxie_admin_session', JSON.stringify(data));
    setSession(data);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('caxie_admin_session');
    setSession(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080510] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} session={session} />;
}
