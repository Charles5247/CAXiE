"use client";

import { useState, useEffect } from "react";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminLogin from "@/components/admin/AdminLogin";

/**
 * CAXiE Technologies Ltd — Admin CMS entry point (/admin)
 *
 * This page previously lived in `app/(admin)/page.jsx`. Because `(admin)` is a
 * Next.js *route group*, the parentheses are stripped from the URL, so that
 * file actually resolved to `/` and collided with the public homepage
 * (`app/page.jsx`) — an unbuildable "two parallel pages resolve to the same
 * path" conflict. Meanwhile `/admin` itself called `notFound()`, so the CMS
 * had no reachable URL at all.
 *
 * The dashboard now lives at its real path, `/admin`, which is exactly what
 * the proxy (APP_MODE=admin) and render.yaml healthCheckPath expect.
 */
export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("caxie_admin_session");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.expiry > Date.now()) {
          setSession(parsed);
        } else {
          sessionStorage.removeItem("caxie_admin_session");
        }
      } catch {
        sessionStorage.removeItem("caxie_admin_session");
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (sessionData) => {
    const expiry = Date.now() + 8 * 60 * 60 * 1000;
    const data = { ...sessionData, expiry };
    sessionStorage.setItem("caxie_admin_session", JSON.stringify(data));
    setSession(data);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("caxie_admin_session");
    setSession(null);
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
      </div>
    );
  }

  if (!session) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} session={session} />;
}
