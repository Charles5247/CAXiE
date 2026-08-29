"use client";

import { useState } from "react";
import AdminBlogPanel from "./panels/AdminBlogPanel";
import AdminJobsPanel from "./panels/AdminJobsPanel";
import AdminProductsPanel from "./panels/AdminProductsPanel";
import AdminCaseStudiesPanel from "./panels/AdminCaseStudiesPanel";
import AdminTeamPanel from "./panels/AdminTeamPanel";

// Public site URL — rendered in the admin "View site" links. Falls back to the
// live domain if NEXT_PUBLIC_SITE_URL isn't set (e.g. local dev).
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://caxietechnologies.com";

const navItems = [
  {
    id: "overview",
    label: "Overview",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    id: "blog",
    label: "Blog Posts",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
  },
  {
    id: "team",
    label: "Team Members",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    id: "jobs",
    label: "Job Listings",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: "products",
    label: "Products",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
  {
    id: "casestudies",
    label: "Case Studies",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
];

const stats = [
  {
    label: "Blog Posts",
    key: "blog",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    label: "Open Roles",
    key: "jobs",
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    label: "Products",
    key: "products",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    label: "Case Studies",
    key: "cases",
    color: "text-brand-400",
    bg: "bg-brand-600/10",
  },
];

export default function AdminDashboard({ onLogout, session }) {
  const [activePanel, setActivePanel] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPanel = () => {
    switch (activePanel) {
      case "blog":
        return <AdminBlogPanel />;
      case "team":
        return <AdminTeamPanel />;
      case "jobs":
        return <AdminJobsPanel />;
      case "products":
        return <AdminProductsPanel />;
      case "casestudies":
        return <AdminCaseStudiesPanel />;
      default:
        return <OverviewPanel />;
    }
  };

  return (
    <div className="min-h-screen bg-[#080510] flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-56 bg-[#0f0a1a] border-r border-white/10 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 flex-shrink-0 rounded-lg overflow-hidden bg-white flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/preview.png"
              alt="CAXiE Technologies Ltd Ltd"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="font-display font-bold text-white text-sm">
              CAXiE Admin
            </p>
            <p className="text-gray-600 text-xs">Content Manager</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1" aria-label="Admin navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActivePanel(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                activePanel === item.id
                  ? "bg-brand-600/20 text-brand-400 border border-brand-600/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-2 px-3 py-2 mb-1">
            <div className="w-7 h-7 bg-brand-600/30 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-brand-400 text-xs font-bold">
                {session?.email?.[0]?.toUpperCase() || "A"}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-medium truncate">
                {session?.email || "Admin"}
              </p>
              <p className="text-gray-600 text-xs capitalize">
                {session?.role || "administrator"}
              </p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 bg-[#0f0a1a]/80 backdrop-blur border-b border-white/10 flex items-center px-4 gap-4 sticky top-0 z-30">
          <button
            className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="font-display font-semibold text-white text-sm flex-1">
            {navItems.find((n) => n.id === activePanel)?.label || "Overview"}
          </h1>
          <a
            href={SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-brand-400 flex items-center gap-1 transition-colors"
          >
            View site
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </header>

        {/* Panel content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">{renderPanel()}</main>
      </div>
    </div>
  );
}

function OverviewPanel() {
  const contentTypes = [
    {
      label: "Blog Posts",
      desc: "Create and manage blog articles",
      panel: "blog",
      icon: "✍️",
      color: "border-blue-400/20 hover:border-blue-400/40",
    },
    {
      label: "Team Members",
      desc: "Add, edit, or remove team members on /about",
      panel: "team",
      icon: "👥",
      color: "border-purple-400/20 hover:border-purple-400/40",
    },
    {
      label: "Job Listings",
      desc: "Add, edit, or remove open roles",
      panel: "jobs",
      icon: "💼",
      color: "border-green-400/20 hover:border-green-400/40",
    },
    {
      label: "Products",
      desc: "Manage product listings and statuses",
      panel: "products",
      icon: "📦",
      color: "border-yellow-400/20 hover:border-yellow-400/40",
    },
    {
      label: "Case Studies",
      desc: "Update project case study details",
      panel: "casestudies",
      icon: "📄",
      color: "border-brand-600/20 hover:border-brand-600/40",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-white text-xl mb-1">
          Welcome back
        </h2>
        <p className="text-gray-500 text-sm">
          Manage your site content from here. Changes to Blog, Jobs, and
          Products are live immediately via the Supabase backend.
        </p>
      </div>

      {/* Content type cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contentTypes.map((ct) => (
          <button
            key={ct.panel}
            className={`p-5 bg-white/5 border rounded-xl text-left transition-colors group ${ct.color}`}
          >
            <div className="text-2xl mb-3">{ct.icon}</div>
            <h3 className="font-display font-semibold text-white mb-1 group-hover:text-brand-400 transition-colors">
              {ct.label}
            </h3>
            <p className="text-gray-500 text-sm">{ct.desc}</p>
          </button>
        ))}
      </div>

      {/* Info box */}
      <div className="bg-brand-600/10 border border-brand-600/20 rounded-xl p-4">
        <h3 className="font-semibold text-brand-300 text-sm mb-2 flex items-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Backend: Supabase
        </h3>
        <p className="text-gray-400 text-xs leading-relaxed">
          Blog posts are read from and written to Supabase. Job listings and
          Products are managed via JSON data files (
          <code className="text-brand-300">data/jobs.json</code>,{" "}
          <code className="text-brand-300">data/products.json</code>) —
          deployable on Render with zero database overhead. For a fully dynamic
          CMS without code deploys, migrate Jobs and Products to Supabase tables
          using the schema in{" "}
          <code className="text-brand-300">lib/supabase-server.js</code>.
        </p>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Homepage", href: `${SITE_URL}` },
          { label: "Blog", href: `${SITE_URL}/blog` },
          { label: "Careers", href: `${SITE_URL}/careers` },
          { label: "Products", href: `${SITE_URL}/products` },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white text-xs font-medium transition-colors hover:border-white/20"
          >
            {link.label} ↗
          </a>
        ))}
      </div>
    </div>
  );
}
