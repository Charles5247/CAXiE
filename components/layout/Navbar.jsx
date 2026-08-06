'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/lib/SidebarContext';
import logoImage from '@/components/ui/logo.png';
import logoMark from '@/components/ui/logo192.png';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/products', label: 'Products' },
  { href: '/case-studies/dala-orthopedic', label: 'Case Studies' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
];

/** Icon-only nav link icons (in the same order as navLinks) */
const navIcons = [
  // Home
  <svg key="home" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  // About
  <svg key="about" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  // Services
  <svg key="services" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" /></svg>,
  // Products
  <svg key="products" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
  // Case Studies
  <svg key="cases" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  // Pricing
  <svg key="pricing" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  // Blog
  <svg key="blog" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
  // Careers
  <svg key="careers" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  // Contact
  <svg key="contact" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { collapsed, toggle } = useSidebar();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ── MOBILE top bar (lg:hidden) ────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 lg:hidden ${
          scrolled
            ? 'bg-[#0f0a1a]/95 backdrop-blur-xl border-b border-white/10 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0" aria-label="CAXiE Technologies home">
            <Image src={logoMark} alt="CAXiE logo" width={36} height={36} className="rounded-lg object-contain" priority />
            <span className="font-display font-bold text-white text-base hidden sm:block">CAXiE</span>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/2348165443398?text=Hi%20CAXiE%20Technologies%2C%20I%27d%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp hidden sm:inline-flex text-sm px-4 py-2"
              aria-label="Chat on WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span className="hidden md:inline">Let&apos;s Chat</span>
            </a>

            <button
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-500"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="bg-[#0f0a1a]/98 backdrop-blur-xl border-b border-white/10 animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-xl font-medium text-base transition-colors ${
                    pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                      ? 'text-brand-400 bg-brand-600/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://wa.me/2348165443398?text=Hi%20CAXiE%20Technologies%2C%20I%27d%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp mt-2 justify-center"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ── DESKTOP sidebar (hidden on mobile) ───────────────────────── */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-40 hidden lg:flex flex-col border-r border-white/10 bg-[#0f0a1a]/95 backdrop-blur-xl shadow-2xl transition-all duration-250 ease-in-out ${
          collapsed ? 'w-16' : 'w-72'
        }`}
        aria-label="Site navigation"
      >
        {/* Logo row + collapse toggle */}
        <div className={`flex items-center border-b border-white/10 transition-all duration-250 ${collapsed ? 'px-3 py-5 justify-center' : 'px-6 py-8 justify-between'}`}>
          {/* Logo — full when expanded, mark-only when collapsed */}
          <Link href="/" aria-label="CAXiE Technologies home" className="flex-shrink-0">
            {collapsed ? (
              <Image src={logoMark} alt="CAXiE" width={32} height={32} className="rounded-lg object-contain" priority />
            ) : (
              <Image src={logoImage} alt="CAXiE Technologies logo" width={110} height={52} className="h-12 w-auto object-contain" priority />
            )}
          </Link>

          {/* Collapse / expand toggle (always visible) */}
          <button
            onClick={toggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!collapsed}
            className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 ${
              collapsed ? 'mt-0' : ''
            }`}
          >
            {collapsed ? (
              /* Chevrons right (expand) */
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M6 5l7 7-7 7" />
              </svg>
            ) : (
              /* Chevrons left (collapse) */
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation links */}
        <nav className={`flex-1 py-6 space-y-1 transition-all duration-250 ${collapsed ? 'px-2' : 'px-4'}`} aria-label="Main navigation">
          {navLinks.map((link, idx) => {
            const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                title={collapsed ? link.label : undefined}
                className={`flex items-center rounded-2xl transition-all duration-150 group ${
                  collapsed ? 'justify-center px-2 py-3' : 'gap-3 px-4 py-3'
                } text-sm font-medium ${
                  active
                    ? 'bg-brand-600/20 text-brand-300 shadow-brand'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {/* Icon (always shown) */}
                <span className={`flex-shrink-0 ${active ? 'text-brand-400' : 'text-gray-400 group-hover:text-white'}`}>
                  {navIcons[idx]}
                </span>

                {/* Label (hidden when collapsed) */}
                {!collapsed && (
                  <span className="truncate">{link.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* WhatsApp CTA footer */}
        <div className="border-t border-white/10 p-3">
          {collapsed ? (
            <a
              href="https://wa.me/2348165443398?text=Hi%20CAXiE%20Technologies%2C%20I%27d%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex items-center justify-center w-10 h-10 mx-auto rounded-2xl bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-all"
            >
              <WhatsAppIcon className="w-5 h-5" />
            </a>
          ) : (
            <a
              href="https://wa.me/2348165443398?text=Hi%20CAXiE%20Technologies%2C%20I%27d%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full justify-center"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Let&apos;s Chat
            </a>
          )}
        </div>
      </aside>
    </>
  );
}

function WhatsAppIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
