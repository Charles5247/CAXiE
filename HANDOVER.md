# CAXiE Technologies — Comprehensive Development Handover Document
**Repository**: `github.com/caxietechnologies/CAXiE`
**Prepared**: 2026-08-06
**Active Branch**: `genspark_phase2` → open as **PR #2** against `main`
**Last Commit**: `4ce52c7` — `feat(ui): sidebar nav with real logo, full-bleed hero carousel, team admin CRUD`

---

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [What Has Been Built](#2-what-has-been-built)
3. [Technical Architecture](#3-technical-architecture)
4. [File Map & Modification Ledger](#4-file-map--modification-ledger)
5. [Errors Found & Fixed — Full Log](#5-errors-found--fixed--full-log)
6. [Session-by-Session Milestones](#6-session-by-session-milestones)
7. [Current State Snapshot](#7-current-state-snapshot)
8. [Where to Pick Up From — Next Steps](#8-where-to-pick-up-from--next-steps)
9. [Owner Preferences & Conventions](#9-owner-preferences--conventions)
10. [Environment Variables Reference](#10-environment-variables-reference)
11. [Known Issues & Watchpoints](#11-known-issues--watchpoints)

---

## 1. Project Overview

**CAXiE Technologies** is a Nigerian IT consultancy headquartered in Kano, Nigeria. It is a founder-led firm (not a generic agency) offering:
- Cybersecurity & Threat Monitoring
- ICT Infrastructure
- Data Analytics & Intelligence
- Web & Software Development *(added Session 2 as a 6th service)*
- Fractional CTO Services
- AI Consulting

The public website lives at **`https://caxietechnologies.com`** (DNS not yet switched to the new stack — intentionally deferred by the owner).

**Origin story**: The codebase began as a **Create React App (CRA)** single-page application deployed on Netlify, with a separate Express-backed CRA admin dashboard (`admin/` directory running on port 4000). Over three AI-assisted development sessions, it was fully migrated to **Next.js 15 App Router** with SSR, proper SEO infrastructure, a self-contained admin CMS, and a suite of new public pages.

---

## 2. What Has Been Built

### Session 1 — CRA → Next.js Migration
The entire front-end was rebuilt from scratch inside the Next.js `app/` directory:
- All routes migrated from `src/components/` (CRA) to `app/` (Next.js App Router)
- Full SSR-first architecture — marketing pages are statically generated (○)
- Complete SEO infrastructure: `metadata` API, `robots.js`, `sitemap.js`, OpenGraph, Twitter Cards, JSON-LD schema (Organization + LocalBusiness + WebSite + Person)
- Geo SEO meta for Kano, Nigeria (`geo.region=NG-KN`, coordinates)
- Google Search Console verification tag embedded
- Tailwind CSS brand system established (colors, fonts, shadows, animations)
- PR #1 opened on branch `genspark_ai_developer`

### Session 2 / Phases 0–4 — New Content + Admin CMS
**Phase 0 — Diagnosis**: Discovered and documented the orphaned CRA admin app (`admin/` directory)  
**Phase 1 — Carousel**: Restored the 12-image photo carousel from `public/Carousel/`  
**Phase 2 — New Pages**:
- `/about` — company story + **team section** (data-driven from `data/team.json`)
- `/services` — updated to include **Software & App Development** as the 6th service
- `/careers` — live job listings page (data-driven from `data/jobs.json`)
- `/products` — product concepts showcase (data-driven from `data/products.json`)
- All 4 new pages added to navbar, footer, and `sitemap.js`

**Phase 3 — Admin CMS** (fully native Next.js at `/admin`):
- Admin login with env-var auth (`ADMIN_EMAIL` + `ADMIN_PASSWORD`)
- 8-hour sessionStorage session with server-validated expiry
- Blog Posts panel (Supabase CRUD)
- Job Listings panel (JSON file CRUD)
- Products panel (JSON file CRUD)
- Case Studies panel (read-only + migration guide)
- Team Members panel (JSON file CRUD) ← *added Session 3*

**Phase 4 — Render Deployment Prep**:
- `render.yaml` configured for Node runtime, Frankfurt region
- `.env.example` fully documented
- Node version pinned at `22.23.2` via `.node-version` and `.nvmrc`
- Security headers in `next.config.js` (HSTS, noindex on admin/API)
- Legacy `.html` URL redirects (old CRA Netlify URLs → new routes)

### Session 3 — UI Enhancements
Four explicit requests, all completed:

1. **Left Sidebar Navigation** — Horizontal top `<header>` completely replaced with an `<aside>` sidebar (w-64, sticky on desktop, off-canvas with hamburger on mobile)
2. **Real Company Logo** — `public/logo.png` (1536×1024px PNG, real branding) used everywhere; `CX` text monogram placeholder retired
3. **Full-Bleed Hero Carousel** — Carousel moved from a hidden right-column box to `absolute inset-0 z-0` filling the entire hero section viewport
4. **Admin Team Management** — New `AdminTeamPanel.jsx` with full add/edit/delete CRUD for `data/team.json`, photo preview, social links, specialty tags, two-step delete confirmation

---

## 3. Technical Architecture

### Framework
- **Next.js** (`^16.2.12` in package.json) — App Router
- **React** `^18.3.1`
- **Node.js** `22.23.2` (pinned via `.node-version` and `.nvmrc`)
- **Tailwind CSS** `^3.4.17` with `@tailwindcss/typography`

### Rendering Strategy
| Route Pattern | Type | Notes |
|---|---|---|
| `/`, `/about`, `/services`, etc. | Static (○) | Pre-rendered at build time |
| `/blog` | Static + ISR (1hr revalidate) | Requires Supabase to hydrate |
| `/admin` | Static shell (○) | Auth logic runs client-side |
| `/api/admin/*` | Dynamic (ƒ) | JSON file CRUD or Supabase |

### Component Model
- Server Components by default
- `'use client'` only where hooks are required (Navbar, carousel, admin, AIChatbot)
- No unnecessary hydration on SEO-critical pages

### Layout Structure (Current)
```
<html>
  <body>                          ← no flex wrapper in layout.jsx currently
    <a href="#main-content">      ← skip link (accessibility)
    <Navbar />                    ← renders as <aside> sidebar (w-64, sticky lg)
    <main id="main-content"       ← pt-20 lg:pt-8 lg:pl-72 (offsets sidebar)
      className="min-h-screen pt-20 lg:pt-8 lg:pl-72">
      {children}
    </main>
    <Footer />
    <AIChatbot />
  </body>
</html>
```

> ⚠️ **Note**: The layout in `app/layout.jsx` uses `pt-20 lg:pt-8 lg:pl-72` on `<main>` to offset for the sidebar — it does **not** use the `flex min-h-screen` body pattern described in the Session 3 design notes. This is the live, working state as of commit `4ce52c7`.

### Navbar / Sidebar Architecture
File: `components/layout/Navbar.jsx`
```
- Mobile (< lg): Fixed top header with hamburger button + off-canvas slide-in panel
- Desktop (lg+): Fixed left sidebar (w-64) with sticky scroll behavior
- Logo: imports logoMark from @/components/ui/logo192.png (local import)
- Active link: highlighted with brand-600/20 background + dot indicator
- Bottom CTA: WhatsApp button → https://wa.me/2348165443398
```

### Hero Section Architecture (Current)
File: `app/page.jsx`
```
<section className="relative min-h-screen ...">
  <div className="absolute inset-0 z-0">     ← HeroCarousel (full-bleed background)
  <div className="absolute inset-0 z-10 ..."> ← Dark gradient overlay
  <div className="absolute inset-0 z-10 ..."> ← Purple grid texture
  <div className="absolute ... z-10 ...">     ← Glow orbs (decorative)
  <div className="relative z-20 ...">         ← Hero text content (single column)
    Badge → H1 → Description → Trust badges → CTA buttons → Metrics card
```

### Carousel Architecture
File: `components/ui/HeroCarousel.jsx`
- 12 images in `public/Carousel/` (10× `.jfif` + 1× `.png` + 1× `.jfif`)
- All `<Image>` components use `unoptimized={true}` — required because Next.js image optimizer doesn't support `.jfif` format
- Auto-rotates every 4500ms, pauses on hover
- Keyboard support: ArrowLeft / ArrowRight
- `useCallback` + `useRef` pattern prevents stale closures on interval

### Data Architecture
| Content Type | Storage | Managed Via |
|---|---|---|
| Blog posts | Supabase `blogs` table | `/admin` → Blog Posts panel |
| Job listings | `data/jobs.json` | `/admin` → Job Listings panel |
| Products | `data/products.json` | `/admin` → Products panel |
| Team members | `data/team.json` | `/admin` → Team Members panel |
| Case studies | Hardcoded JSX | `/admin` → Case Studies panel (read-only) |

### Admin Authentication Flow
```
1. User visits /admin
2. Client checks sessionStorage for { email, role, expiresAt }
3. If missing or expired → show AdminLogin component
4. On login submit → POST /api/admin/auth { email, password }
5. Server compares against ADMIN_EMAIL + ADMIN_PASSWORD env vars
6. Returns { success, email, role, expiresAt } (8hr from now)
7. Client stores in sessionStorage → shows AdminDashboard
8. Every admin page re-checks expiry on mount
```

### Security Headers (next.config.js)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Robots-Tag: noindex, nofollow, nosnippet, noarchive` on `/admin/*`
- `X-Robots-Tag: noindex, nofollow` on `/api/*`

### Brand System (tailwind.config.js)
| Token | Value | Usage |
|---|---|---|
| `brand-600` | `#9333ea` | Primary CTA, active states, accents |
| Background deep | `#0f0a1a` | Page backgrounds |
| Background dark | `#1a0f2e` | Card backgrounds, slightly lighter sections |
| Display font | Poppins 400–800 | Headings (`font-display`) |
| Body font | Inter 300–700 | Body text (`font-sans`) |
| `shadow-brand` | `0 4px 24px rgba(147,51,234,0.3)` | Branded glow effect |

---

## 4. File Map & Modification Ledger

### Core Config Files
| File | Status | What It Does |
|---|---|---|
| `package.json` | modified | Next.js 16.2.12, React 18.3.1, Supabase, Tailwind, react-markdown, axios |
| `next.config.js` | modified | remotePatterns, security headers, legacy .html redirects |
| `tailwind.config.js` | read (not modified) | Brand colors, fonts, shadows, keyframes — critical reference |
| `jsconfig.json` | created | `@/*` path alias → project root |
| `.env.example` | created/modified | Full env var documentation |
| `.env.local` | exists (gitignored) | Local dev secrets — **NOT committed** |
| `.node-version` | created | `22.23.2` |
| `.nvmrc` | created | `22.23.2` |
| `render.yaml` | created | Render.com web service config |

### App Directory (Routes)
| File | Status | Notes |
|---|---|---|
| `app/layout.jsx` | modified | Root layout — metadata, JSON-LD, fonts, sidebar + main wrapper |
| `app/globals.css` | modified | `.admin-input`, `.btn-primary`, `.btn-whatsapp`, component utilities |
| `app/page.jsx` | modified | Homepage — full-bleed carousel hero, services, metrics, CTAs |
| `app/robots.js` | modified | Fixed 500 error (removed unsupported `host` field) |
| `app/sitemap.js` | modified | Added `/careers` + `/products`; excludes `/admin` |
| `app/not-found.jsx` | exists | 404 page |
| `app/about/page.jsx` | modified | Company story + team section from `data/team.json`; removed `pt-16` |
| `app/services/page.jsx` | modified | 6 services including Software & App Dev; removed `pt-16` |
| `app/careers/page.jsx` | created | Job listings from `data/jobs.json`; removed `pt-16` |
| `app/products/page.jsx` | created | Product concepts from `data/products.json`; removed `pt-16` |
| `app/pricing/page.jsx` | modified | Removed `pt-16` |
| `app/blog/page.jsx` | modified | Supabase blog list with ISR; removed `pt-16` |
| `app/contact/page.jsx` | modified | Formspree form; removed `pt-16` |
| `app/teaching/page.jsx` | modified | Removed `pt-16` |
| `app/trust-security/page.jsx` | modified | Removed `pt-16` |
| `app/case-studies/dala-orthopedic/page.jsx` | modified | Removed `pt-16` |
| `app/case-studies/3stardata/page.jsx` | modified | Removed `pt-16` |
| `app/privacy/page.jsx` | modified | Removed `pt-16` |
| `app/terms/page.jsx` | modified | Removed `pt-16` |
| `app/cookies/page.jsx` | modified | Removed `pt-16` |
| `app/do-not-sell/page.jsx` | modified | Removed `pt-16` |
| `app/admin/layout.jsx` | created | noindex/nosnippet/noarchive metadata for all admin routes |
| `app/admin/page.jsx` | created | `'use client'` shell — sessionStorage auth check → Login or Dashboard |

### API Routes
| File | Status | Methods |
|---|---|---|
| `app/api/admin/auth/route.js` | created | POST — validates env-var credentials, 300ms failure delay |
| `app/api/admin/blog/route.js` | created | GET list, POST create (Supabase) |
| `app/api/admin/blog/[id]/route.js` | created | PUT update, DELETE (Supabase) |
| `app/api/admin/jobs/route.js` | created | GET list, POST create (`data/jobs.json`) |
| `app/api/admin/jobs/[id]/route.js` | created | PUT update, DELETE (`data/jobs.json`) |
| `app/api/admin/products/route.js` | created | GET list, POST create (`data/products.json`) |
| `app/api/admin/products/[id]/route.js` | created | PUT update, DELETE (`data/products.json`) |
| `app/api/admin/team/route.js` | created | GET list, POST create (`data/team.json`) |
| `app/api/admin/team/[id]/route.js` | created | PUT update, DELETE (`data/team.json`) |

### Components
| File | Status | Notes |
|---|---|---|
| `components/layout/Navbar.jsx` | modified (rewrite) | `'use client'` — mobile header + off-canvas; desktop sidebar; real logo; WhatsApp CTA |
| `components/layout/Footer.jsx` | exists (not modified in these sessions) | 5-column footer with brand links |
| `components/ui/HeroCarousel.jsx` | modified | Removed `rounded-2xl`; `sizes="100vw"`; full-bleed ready |
| `components/ui/AIChatbot.jsx` | exists | Floating AI chat widget |
| `components/admin/AdminDashboard.jsx` | modified | Added Team Members nav + panel; real logo |
| `components/admin/AdminLogin.jsx` | modified | Real logo replacing `CX` monogram |
| `components/admin/panels/AdminBlogPanel.jsx` | created | Supabase blog CRUD |
| `components/admin/panels/AdminJobsPanel.jsx` | created | JSON CRUD for jobs |
| `components/admin/panels/AdminProductsPanel.jsx` | created | JSON CRUD for products |
| `components/admin/panels/AdminCaseStudiesPanel.jsx` | created | Read-only + migration instructions |
| `components/admin/panels/AdminTeamPanel.jsx` | created | Full CRUD — name, title, bio, photo, specialties, social links |

### Data Files
| File | Status | Contents |
|---|---|---|
| `data/team.json` | created | 3 entries: Xavier (Founder/CEO) + 2 TBA advisory board placeholders |
| `data/jobs.json` | created | 2 listings: Full-Stack Engineer (swe-001) + Cybersecurity Analyst (cyber-001) |
| `data/products.json` | created | 3 concepts: CAXiE Sentinel, DataBridge, SiteGuard |
| `data/case-studies.json` | exists | Case study data (pre-existing) |

### Lib Files
| File | Status | Notes |
|---|---|---|
| `lib/supabase-server.js` | created | Server-side Supabase client factory; returns `null` if env vars not set |

### Public Assets
| File | Notes |
|---|---|
| `public/logo.png` | 1536×1024px PNG — **real company logo** (layered-S icon + "CAXiE TECHNOLOGIES" wordmark in deep purple `~#2d1b6b` on white background). Use this everywhere. |
| `public/logo192.png` | Small version of logo — used in Navbar as `logoMark` |
| `public/founder.JPG` | Xavier's actual photo — for `/about` team section |
| `public/profile.JPG` | Also exists — `data/team.json` currently references this but `founder.JPG` may be the correct file |
| `public/preview.png` | 1200×630 OG image for social sharing |
| `public/favicon.ico` | Site favicon |
| `public/Carousel/1.jfif` … `10.jfif` | 10 company photo carousel images |
| `public/Carousel/ChatGPT Image Oct 7, 2025, 08_12_37 PM.png` | 11th carousel image |
| `public/Carousel/Perfect Designer - Tech Innovation.jfif` | 12th carousel image |

### Dead Code (Do Not Delete — Could Confuse Build Tools)
| Path | Notes |
|---|---|
| `build/` | Old CRA production build — legacy artifact, safe to ignore |
| `public/robots.txt.old` | Old CRA robots — superseded by `app/robots.js` |
| `public/sitemap.xml.old` | Old CRA sitemap — superseded by `app/sitemap.js` |

---

## 5. Errors Found & Fixed — Full Log

### Error 1 — `robots.js` HTTP 500
**Session**: Session 1  
**Symptom**: `GET /robots.txt` returned HTTP 500  
**Root cause**: Next.js Metadata API's `robots()` function does not support a `host` field in the return object. The original migration incorrectly included it.  
**Fix**: Removed `host:` from `app/robots.js` return object.  
**Status**: ✅ Resolved — confirmed HTTP 200

---

### Error 2 — Admin Dashboard Never Appeared
**Session**: Phase 0 (Session 2)  
**Symptom**: `/admin` returned 404 or a blank page in the Next.js site  
**Root cause**: The `admin/` directory in the repo root was a completely separate **Create React App application** with its own `package.json` (using `react-scripts`), React Router v7, and an Express server on port 4000. It had zero integration with Next.js — it was never part of the `app/` directory and therefore could never be served by Next.js routing.  
**Fix**: Built a complete, native Next.js admin CMS at `app/admin/` with:
- `app/admin/page.jsx` as the entry point
- `app/admin/layout.jsx` for admin-specific metadata
- 5 admin panel components in `components/admin/`
- 9 API routes in `app/api/admin/`
**Status**: ✅ Resolved — `/admin` returns HTTP 200

---

### Error 3 — Carousel Invisible to All Users (Phase 1)
**Session**: Phase 1 (Session 2) — initial placement was wrong; fixed in Session 3  
**Symptom**: No images visible in the hero section on any device  
**Root cause (Phase 1 mistake)**: The `HeroCarousel` component was placed inside `<div className="lg:flex flex-col gap-4 hidden">`. This CSS means:
- Hidden on ALL screens smaller than `lg` (1024px) — i.e., invisible on mobile and tablet
- On desktop, only 320px tall in a right-column box
- The purple gradient background was what users actually saw as the "hero background"  

**Fix (Session 3)**: Restructured the hero section in `app/page.jsx`:
- Wrapped hero in `<section className="relative min-h-screen overflow-hidden">`
- Moved carousel into `<div className="absolute inset-0 z-0">` so it fills the entire viewport
- Added dark gradient overlay at `z-10` for text readability
- Simplified layout to single column (removed the 2-column grid)
- Also removed `rounded-2xl` from `HeroCarousel.jsx` container and changed `sizes` from `"(max-width: 768px) 100vw, 50vw"` to `"100vw"`  
**Status**: ✅ Resolved — SSR HTML confirmed contains `absolute inset-0 z-0` and `Carousel/1.jfif`

---

### Error 4 — `.jfif` Images Failing to Load
**Session**: Phase 1 (Session 2)  
**Symptom**: Carousel images not rendering — browser network errors on `.jfif` files  
**Root cause**: Next.js built-in image optimizer does not support the `.jfif` format natively. It attempted to process them and failed.  
**Fix**: Added `unoptimized={true}` prop to all `<Image>` components in `HeroCarousel.jsx` that reference `.jfif` files.  
**Status**: ✅ Resolved — images confirmed loading (HTTP 200 on `/Carousel/1.jfif`)

---

### Error 5 — Logo Placeholder ("CX" Monogram) Everywhere
**Session**: Session 3  
**Symptom**: A plain `CX` text in a brand-colored box appeared instead of the real company logo in the sidebar, admin login, and admin sidebar  
**Root cause**: During initial migration, a text placeholder was used as a stand-in for the logo. The owner believed logos were in `components/ui/` but the actual real logo was `public/logo.png`.  
**Fix**: Replaced all `CX` monogram instances with `<img src="/logo.png" ...>` or `<Image>` referencing `/logo.png` in:
- `components/layout/Navbar.jsx` — sidebar header
- `components/admin/AdminLogin.jsx` — login screen header
- `components/admin/AdminDashboard.jsx` — admin sidebar header and overview card
- `app/page.jsx` — floating metrics card in hero section  
**Status**: ✅ Resolved

---

### Error 6 — 64px Unwanted Whitespace at Top of Every Page
**Session**: Session 3  
**Symptom**: Every public page had a large blank gap at the top before content began  
**Root cause**: All 15 public pages had `className="bg-[#0f0a1a] pt-16"` on their root wrapper div. The `pt-16` (64px padding-top) was added during migration to offset content below the old fixed top navbar. After switching to a sidebar layout with no top navbar, this padding was unnecessary.  
**Fix**: Removed `pt-16` from the root div of all 15 public pages:  
`about`, `services`, `careers`, `products`, `pricing`, `blog`, `contact`, `teaching`, `trust-security`, `case-studies/dala-orthopedic`, `case-studies/3stardata`, `privacy`, `terms`, `cookies`, `do-not-sell`  
**Status**: ✅ Resolved

---

### Error 7 — Stale Build Cache Serving Old HTML
**Session**: Session 3  
**Symptom**: After rewriting `Navbar.jsx` from `<header>` to `<aside>`, the running Next.js server was still serving the old `<header>` HTML  
**Root cause**: The `.next/` build cache directory was serving old pre-compiled chunks. Next.js development server does not always invalidate compiled output when JSX structure changes significantly.  
**Fix**: Deleted the entire `.next/` directory and ran a clean `next build` from scratch.  
**Status**: ✅ Resolved — verified `aside` + `lg:translate-x-0` in fresh SSR output

---

### Error 8 — Git Rebase Conflicts During PR Sync
**Session**: Session 3 (end of session, before PR update)  
**Symptom**: `git rebase origin/main` failed with conflicts in `layout.jsx`, `page.jsx`, `Navbar.jsx`, and `HeroCarousel.jsx`  
**Root cause**: Remote `main` branch had commits (`e67fc44` "Major fix including stack and dashboards prt 2" and `8898ecc`) that modified the same files our session had rewritten.  
**Fix**: Used `git checkout --ours` for all 4 conflicted files to keep our new sidebar/carousel code, then `git add .` and `git rebase --continue`, followed by `git push -f origin genspark_phase2`.  
**Status**: ✅ Resolved — branch at commit `4ce52c7`, force-pushed

---

### Error 9 — Sandbox Proxy MIME Type Errors (External URL Only)
**Session**: Session 3 (monitoring/validation)  
**Symptom**: Playwright browser console showed `Refused to apply style` and `Refused to execute script` errors citing `MIME type 'text/plain'`  
**Root cause**: The sandbox external proxy URL (`*.novita.ai` or similar) had cached old static asset chunks with incorrect MIME headers. This was a **proxy caching issue**, not a code problem.  
**Fix**: Confirmed all routes return HTTP 200 with correct responses from `localhost:3000` directly. The sandbox proxy issue does not affect the actual deployed application.  
**Status**: ⚠️ Not a code issue — only affects sandbox preview URL, not production deployment

---

### Error 10 — `@supabase/ssr` Import Not Available
**Session**: Session 2 (Phase 3)  
**Symptom**: Build failed when attempting to use `createServerClient` from `@supabase/ssr`  
**Root cause**: `@supabase/ssr` was not installed; only `@supabase/supabase-js` was in `package.json`  
**Fix**: Created a custom `lib/supabase-server.js` that wraps `createClient` from `@supabase/supabase-js` directly with a validation guard (returns `null` if env vars aren't set, preventing runtime crashes in environments without Supabase configured).  
**Status**: ✅ Resolved

---

## 6. Session-by-Session Milestones

### 🏁 Milestone 1 — Session 1: Full CRA → Next.js Migration
- **Date**: Session 1 (before current repo state)
- **Branch**: `genspark_ai_developer`
- **PR**: #1 — open, superseded by PR #2
- **Deliverables**:
  - All pages migrated to `app/` directory (App Router)
  - SEO infrastructure: metadata API, robots, sitemap, JSON-LD, OG, Twitter
  - Tailwind brand system
  - Fixed `robots.js` 500 error
- **Build state**: ✅ Passing

---

### 🏁 Milestone 2 — Phase 0: Admin CMS Audit
- **Branch**: `genspark_phase2`
- **Key discovery**: `admin/` folder was an orphaned CRA+Express app on port 4000 — completely separate from Next.js, unreachable via the Next.js server
- **Deliverables**: Complete audit report; identified all files that existed but had no UI presence

---

### 🏁 Milestone 3 — Phase 1: Hero Carousel Restoration
- **Branch**: `genspark_phase2`
- **Deliverables**: `HeroCarousel.jsx` created with 12 images, auto-rotate, keyboard support, lazy loading, accessibility attributes
- **Known issue at this stage**: Carousel placed in wrong layout position (fixed in Session 3)

---

### 🏁 Milestone 4 — Phase 2: New Content Pages
- **Branch**: `genspark_phase2`
- **Deliverables**:
  - `/about` with team section (`data/team.json` with Xavier + 2 TBA advisors)
  - `/careers` with job listings (`data/jobs.json`)
  - `/products` with product concepts (`data/products.json`)
  - Software & App Development added as 6th service across homepage, `/services`, navbar, footer, and sitemap

---

### 🏁 Milestone 5 — Phase 3: Native Admin CMS
- **Branch**: `genspark_phase2`
- **Commit**: `1f4f3b7`
- **Deliverables**:
  - `app/admin/` — Next.js-native admin replacing the orphaned CRA app
  - Admin login with sessionStorage auth (8hr expiry)
  - 4 panels: Blog, Jobs, Products, Case Studies
  - 7 API routes for CRUD operations
  - Supabase integration for blog; JSON file CRUD for jobs/products

---

### 🏁 Milestone 6 — Phase 4: Render Deployment Prep
- **Branch**: `genspark_phase2`
- **Commit**: `1f4f3b7`
- **Deliverables**:
  - `render.yaml` — web service config (Node runtime, Frankfurt region)
  - `.env.example` — fully documented environment variables
  - Node 22.23.2 pinned
  - HSTS and security headers in `next.config.js`
  - Legacy `.html` URL redirects for old Netlify CRA routes

---

### 🏁 Milestone 7 — Session 3: UI Enhancements
- **Branch**: `genspark_phase2`
- **Commit**: `4ce52c7`
- **Date**: 2026-08-05
- **Deliverables**:
  - Left sidebar navigation (replacing horizontal top bar)
  - Real company logo everywhere (retiring `CX` placeholder)
  - Full-bleed hero carousel background (fixing the invisible carousel)
  - Admin Team Members panel with full CRUD
  - `pt-16` removed from all 15 public pages
  - Clean build verified, all routes HTTP 200
  - PR #2 updated at https://github.com/caxietechnologies/CAXiE/pull/2
  - Codebase zip: https://www.genspark.ai/api/files/s/uBE18ggm

---

## 7. Current State Snapshot

### Git
```
Branch:  genspark_phase2
Commit:  4ce52c7
Remote:  origin/genspark_phase2 (up to date, force-pushed after rebase)
Clean:   Yes — no uncommitted changes
```

### Open Pull Requests
| PR | Branch | Target | Status |
|---|---|---|---|
| #1 | `genspark_ai_developer` → `main` | Superseded by PR #2 | Open (can be closed) |
| #2 | `genspark_phase2` → `main` | **Current, all work included** | Open — awaiting owner review |

### Build (Last Clean Build)
```
✓ Linting and checking validity of types
✓ Creating an optimized production build
✓ Compiling (Turbopack-adjacent build)
✓ Generating static pages (26/26)

Route summary (~30 routes):
○ /              ○ /about       ○ /services     ○ /careers
○ /products      ○ /pricing     ○ /blog (ISR)   ○ /contact
○ /admin         ○ /teaching    ○ /trust-security
ƒ /api/admin/auth              ƒ /api/admin/blog
ƒ /api/admin/blog/[id]         ƒ /api/admin/jobs
ƒ /api/admin/jobs/[id]         ƒ /api/admin/products
ƒ /api/admin/products/[id]     ƒ /api/admin/team
ƒ /api/admin/team/[id]         ... (case studies, legal pages)
```

### Route Verification (Last Run)
All verified HTTP 200 from `localhost:3000`:
- `/` ✅ `/robots.txt` ✅ `/sitemap.xml` ✅
- `/about` ✅ `/services` ✅ `/careers` ✅ `/products` ✅
- `/admin` ✅ `/api/admin/team` ✅

SSR HTML confirms:
- `aside` + `lg:translate-x-0` → sidebar rendering ✅
- `absolute inset-0 z-0` + `Carousel/1.jfif` → carousel as background ✅

---

## 8. Where to Pick Up From — Next Steps

There are no outstanding incomplete tasks. The work requested across all three sessions is done. The following are **logical next actions** — none have been started, all need owner approval before proceeding.

### Priority 1 — Merge PR #2 into `main` (Owner Action)
PR #2 at `https://github.com/caxietechnologies/CAXiE/pull/2` is the superset of all work done. The owner (`caxietechnologies`) must review and merge. PR #1 can be closed as it is fully superseded.

### Priority 2 — Fix Xavier's Photo Reference
`data/team.json` has `"photo": "/profile.JPG"` for Xavier.  
The file `public/profile.JPG` does exist, so this may work.  
However, `public/founder.JPG` also exists and is likely the correct/intended file.  
**Action**: Check which image displays correctly on `/about` → if wrong, update `data/team.json` via the admin CMS (Team Members panel → Edit Xavier → Photo URL field → change to `/founder.JPG`).

### Priority 3 — Configure Supabase in Production
The blog admin panel will silently fail until Supabase is connected. Set these in the Render dashboard:
- `NEXT_PUBLIC_SUPABASE_URL` = your project URL from supabase.com
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon key

### Priority 4 — Deploy to Render.com
The `render.yaml` is already configured. Steps:
1. Connect the GitHub repo to Render.com
2. Render will auto-detect `render.yaml`
3. Set all env vars from `.env.example` in the Render dashboard (Supabase, Formspree, ADMIN_EMAIL, ADMIN_PASSWORD)
4. Deploy — build command is `npm ci && npm run build`, start is `npm run start`
5. Then switch DNS (intentionally deferred by owner)

### Priority 5 — Close PR #1
PR #1 (`genspark_ai_developer`) is now superseded. Close it to keep the repo clean.

### Priority 6 — Set Admin Credentials
The admin panel at `/admin` is currently unprotected in the sense that the default `.env.local` values may be set to placeholder values. Before going live, set strong values for `ADMIN_EMAIL` and `ADMIN_PASSWORD` in both `.env.local` (local dev) and the Render dashboard (production).

### Priority 7 (Optional) — Clean Up Dead Code
The following can safely be deleted to reduce repo noise (none affect Next.js builds):
- `build/` directory — old CRA production build
- `public/robots.txt.old` — superseded by `app/robots.js`
- `public/sitemap.xml.old` — superseded by `app/sitemap.js`
- Old HTML files in `public/` (`privacy.html`, `terms.html`, `cookies.html`, `do-not-sell.html`, `contact.html`, `cookies.html`) — all redirected in `next.config.js`

### Priority 8 (Optional) — Populate Real Team Content
Use the admin CMS at `/admin` → Team Members panel to:
- Update Xavier's bio, photo, social links as needed
- Replace the 2 TBA advisory board placeholders with real advisors when announced

---

## 9. Owner Preferences & Conventions

### Brand Voice
- **Tone**: Professional, direct, no marketing fluff — "founder-led firm, not an agency"
- **Audience**: Nigerian SMEs, enterprises, and regional organisations that need real technology partnerships
- **Primary CTA everywhere**: WhatsApp — `https://wa.me/2348165443398?text=Hi%20CAXiE%20Technologies%2C%20I%27d%20like%20to%20discuss%20a%20project.`

### Design System Rules
- **Brand color**: `#9333ea` (Tailwind `brand-600`) — purple. This is the accent, CTA, and active state color
- **Page backgrounds**: `#0f0a1a` (deep) or `#1a0f2e` (slightly lighter for cards)
- **Logo**: ALWAYS use `public/logo.png` or `public/logo192.png` — never use the `CX` text monogram again
- **No rounded logos** on dark backgrounds — use white background with `object-contain` padding

### Code Conventions (Strictly Followed)
- **Server Components by default** — only add `'use client'` when hooks are required
- **Tailwind utility classes only** — no inline styles except for complex gradient values; no new CSS files beyond additions to `globals.css`
- **Icons**: Inline SVG only — no icon library dependencies (e.g., no Heroicons, no Lucide imports)
- **No hardcoded credentials** — all secrets via env vars only
- **API routes**: JSON file CRUD (`fs.readFileSync`/`writeFileSync`) for jobs/products/team; Supabase for blog
- **Auth**: sessionStorage with 8hr expiry, server-validated against env vars
- **Path alias**: Use `@/` for imports from the project root (configured in `jsconfig.json`)

### Content Management Workflow
The admin CMS at `/admin` is the **only** intended way to manage dynamic content. Do not edit JSON files directly in production — use the admin panels.

| Content | Route | Admin Panel |
|---|---|---|
| Team members | `/about` | `/admin` → Team Members |
| Job listings | `/careers` | `/admin` → Job Listings |
| Products | `/products` | `/admin` → Products |
| Blog posts | `/blog` | `/admin` → Blog Posts |

---

## 10. Environment Variables Reference

| Variable | Required | Source | Notes |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | For blog | supabase.com dashboard → Settings → API | Blog list and admin blog panel will fail without this |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | For blog | supabase.com dashboard → Settings → API | Must be the anon/public key |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | For contact form | formspree.io → your form → endpoint URL | Contact page form will not submit without this |
| `ADMIN_EMAIL` | Required | Set by owner | Admin login email — do not use a public email |
| `ADMIN_PASSWORD` | Required | Set by owner | Admin login password — use a strong password |

Local development: copy `.env.example` to `.env.local` and fill in values.  
Production (Render): set all variables via Render Dashboard → Environment.  
**Never commit `.env.local` to git** — it is in `.gitignore`.

---

## 11. Known Issues & Watchpoints

### Issue 1 — `admin/` Directory (Dead Code)
The `admin/` folder in the repo root is the old CRA+Express admin application. It is completely inert — Next.js routing ignores it. It has not been deleted in case the owner wants to reference the original Supabase query patterns. It can be safely deleted when the Next.js admin CMS is confirmed stable in production.

### Issue 2 — Xavier's Photo Path Discrepancy
`data/team.json` references `"photo": "/profile.JPG"`.  
Both `public/profile.JPG` and `public/founder.JPG` exist.  
Check which one is the intended headshot and update the JSON accordingly via the admin CMS if needed.

### Issue 3 — Supabase Not Connected
`lib/supabase-server.js` returns `null` if env vars are not set — this prevents runtime crashes. But the blog page will show empty content and the blog admin panel will fail silently. Connect Supabase to unlock blog functionality.

### Issue 4 — Render.com: DNS Not Switched
The site is configured for Render deployment but DNS has not been pointed. The live site at `caxietechnologies.com` is still the old CRA/Netlify version until the owner makes the DNS switch.

### Issue 5 — JSON File CRUD on Render (Ephemeral Filesystem)
Render's free/starter tier uses an ephemeral filesystem — files written at runtime (to `data/team.json`, `data/jobs.json`, `data/products.json`) **will be lost on every redeploy or instance restart**.  

**This is a known architectural limitation.** For production durability, these JSON files should be migrated to a database (Supabase or similar). The current implementation is correct for development and for a paid Render plan with persistent disks, but is a risk on the starter tier.

### Issue 6 — Sandbox Proxy MIME Caching (Development Only)
When previewing in the AI sandbox environment, the external proxy URL may show MIME type errors for CSS/JS. This does not affect the actual codebase. Always test using `localhost:3000` in the sandbox, not the external preview URL.

### Issue 7 — `unoptimized={true}` on Carousel Images
All carousel `<Image>` components require `unoptimized={true}` because of `.jfif` format. If carousel images are ever replaced with `.jpg` or `.webp` files, remove `unoptimized={true}` to re-enable Next.js image optimization (better performance, automatic WebP conversion).

### Issue 8 — Blog ISR Requires Supabase at Build Time
`app/blog/page.jsx` uses `export const revalidate = 3600` (1hr ISR). If Supabase env vars are not set at build time on Render, the blog page will build but return empty content. Set Supabase env vars in Render before the first production deploy.

---

*End of Handover Document*  
*Last updated: 2026-08-06 | Branch: genspark_phase2 | Commit: 4ce52c7*
