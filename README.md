c# CAXiE Technologies Ltd

CAXiE Technologies Ltd is a modern consultancy website for digital transformation, cybersecurity, infrastructure, and product delivery. The repository now contains a Next.js marketing site plus a separate React admin dashboard that can be started independently.

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

## Deploy on Render

This repository already includes a Render config file at `render.yaml`, so deployment is straightforward.

### Option 1: Automatic via Render dashboard

1. Sign in to Render and create a new Web Service.
2. Connect this GitHub repository.
3. Render should detect the existing `render.yaml` configuration automatically.
4. Review the service settings:
   - Build command: `npm ci && npm run build`
   - Start command: `npm run start`
5. Add the required environment variables in the Render dashboard:
   - `NODE_ENV=production`
   - `NODE_VERSION=20.18.0`
   - `NEXT_TELEMETRY_DISABLED=1`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_FORMSPREE_ENDPOINT`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
6. Click Deploy.

### Option 2: Manual setup if Render does not detect the config

Use these values when creating the service:

- Runtime: Node
- Build command: `npm ci && npm run build`
- Start command: `npm run start`
- Root directory: repository root

After deployment, Render will give you a public URL for the site.

## Contact

- Email: johneme2022@gmail.com
- Phone: +234 81 6544 3398
- Location: Kano, Nigeria
