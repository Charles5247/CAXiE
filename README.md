# CAXiE Technologies

CAXiE Technologies is a modern consultancy website for digital transformation, cybersecurity, infrastructure, and product delivery. The repository now contains a Next.js marketing site plus a separate React admin dashboard that can be started independently.

## What changed
- Fixed the admin app’s broken Supabase fallback client so the build compiles again.
- Reworked the landing hero so the carousel behaves as a full-bleed background behind the hero content.
- Added a repo-root admin launcher script for easier local development.
- Removed noisy debug logging and simplified a few placeholder/stub components to make the codebase easier to navigate.
- Updated the CSS and config files to remove the main editor warnings that were surfacing during development.

## Current stack
- Main site: Next.js 16 + React 18 + Tailwind CSS
- Admin app: Create React App + React Router + Supabase
- Styling: Tailwind with shared global styles
- Data: Supabase-backed content and media management

## Run locally

### Main website
```bash
npm install
npm run dev
```
Open http://localhost:3000

### Admin dashboard
```bash
cd admin
npm install --legacy-peer-deps
npm start
```
Or from the repo root:
```bash
npm run admin
```
Open http://localhost:3001

## Verified status
The following checks were run successfully:
- Main app production build: `npm run build`
- Admin app production build: `cd admin && npm run build`
- Admin app HTTP check: http://127.0.0.1:3001 returned HTTP 200

## Project layout
- `app/` — Next.js marketing site pages and route components
- `components/` — shared UI components such as the hero carousel and footer
- `src/` — older React entry points and page components kept for compatibility
- `admin/` — standalone admin dashboard app
- `public/` — static assets and policy pages

## Notes
- The admin app expects Supabase environment variables when full database access is required.
- If those variables are not set, the app will still start in a safe fallback mode.

## Contact
- Email: johneme2022@gmail.com
- Phone: +234 81 6544 3398
- Location: Kano, Nigeria
