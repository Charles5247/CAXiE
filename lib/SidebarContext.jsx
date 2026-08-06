'use client';

/**
 * SidebarContext — persists the desktop sidebar collapsed/expanded state
 * across client-side navigations within a session.
 *
 * Uses sessionStorage (not localStorage) because:
 *  – the project already uses sessionStorage for admin sessions
 *  – collapse preference is session-scoped UI state, not a persistent setting
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SESSION_KEY = 'caxie_sidebar_collapsed';

const SidebarContext = createContext({
  collapsed: false,
  toggle: () => {},
});

export function SidebarProvider({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Read from sessionStorage on mount (client-only)
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored === 'true') setCollapsed(true);
    } catch {
      // sessionStorage may not be available in some environments — no-op
    }
    setHydrated(true);
  }, []);

  const toggle = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        if (next) {
          sessionStorage.setItem(SESSION_KEY, 'true');
        } else {
          sessionStorage.removeItem(SESSION_KEY);
        }
      } catch {
        // no-op
      }
      return next;
    });
  }, []);

  // Avoid hydration mismatch — render as expanded until sessionStorage is read
  return (
    <SidebarContext.Provider value={{ collapsed: hydrated ? collapsed : false, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
