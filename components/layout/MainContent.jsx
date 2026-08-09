"use client";

/**
 * MainContent — wraps the page content and the footer, dynamically adjusting
 * the left offset to match the desktop sidebar width:
 *   collapsed → w-16  (lg:ml-16)
 *   expanded  → w-72  (lg:ml-72)
 *
 * Uses the shared SidebarContext so both the page and footer shift together.
 * This is a client component so it can read sidebar state; the root layout
 * stays a server component.
 */

import { useSidebar } from "@/lib/SidebarContext";

export default function MainContent({ children, footer, chatbot }) {
  const { collapsed } = useSidebar();

  return (
    <div
      className={`flex flex-col transition-all duration-250 ease-in-out lg:pt-0 ${
        collapsed ? "lg:ml-14" : "lg:ml-40"
      }`}
    >
      <main id="main-content" className="min-h-screen pt-0 lg:pt-0 flex-1">
        {children}
      </main>
      {footer}
      {chatbot}
    </div>
  );
}
