# CAXiE Technologies Ltd

CAXiE Technologies Ltd is a modern consultancy website for digital transformation, cybersecurity, infrastructure, and product delivery. The repository contains a Next.js marketing site plus a built-in admin CMS at `/admin`, which can also be deployed as a fully separate service.

## Current stack

- Main site: Next.js 16 + React 18 + Tailwind CSS
- Admin CMS: Native Next.js route at `/admin` (App Router)
- Styling: Tailwind with shared global styles
- Data: Supabase-backed content and media management
- Deployment: Render (two services — public site + separate admin)

## Run locally

### Prerequisites

Create a `.env.local` file in the project root (copy from `.env.example`):

```bash
cp .env.example .env.local
```

At minimum, set the admin credentials so you can log in to the admin portal:

```
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=your-strong-password
```

### Main website

```bash
npm install
npm run dev
```

Open http://localhost:3000

### Admin portal

The admin CMS is a native Next.js route — no separate app to start. With the dev server running:

1. Open **http://localhost:3000/admin**
2. Log in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in `.env.local`

> In local development both the public site and the admin portal are served from the same dev server (http://localhost:3000). In production they are deployed as two separate services (see "Deploy on Render" below).

## Verified status

The following checks were run successfully:

- Production build: `npm run build`
- `/admin` route returns HTTP 200
- Admin auth API returns 401 for invalid credentials
- Public site blocks `/admin` (404) and admin service blocks public routes (404)

## Project layout

- `app/` — Next.js pages and route components (including `app/admin/` for the admin CMS)
- `components/` — shared UI components, including `components/admin/` for admin panels
- `app/api/admin/` — admin API routes (auth, blog, jobs, products, team, case studies)
- `data/` — JSON data files managed via the admin CMS (jobs, products, team)
- `public/` — static assets and policy pages
- `proxy.js` — route isolation proxy (separates public vs admin traffic)

## Notes

- The admin CMS expects Supabase environment variables when full database access is required (blog posts).
- If those variables are not set, the app will still start in a safe fallback mode.
- Admin credentials are validated **only** against `ADMIN_EMAIL` / `ADMIN_PASSWORD` environment variables — there are no hardcoded credentials.

## Deploy on Render

This repository includes a Render config file at `render.yaml` that defines **two separate services**:

| Service | URL | Purpose |
|---------|-----|---------|
| `caxie-public` | `https://caxietechnologies.com` | Public marketing site (blocks `/admin`) |
| `admin-caxie` | `https://admin-caxie.onrender.com` | Separate admin portal (only serves `/admin`) |

### Option 1: Automatic via Render dashboard

1. Sign in to Render and create a new Web Service.
2. Connect this GitHub repository.
3. Render should detect the existing `render.yaml` configuration automatically and create both services.
4. Review the service settings:
   - Build command: `npm ci && npm run build`
   - Start command: `npm run start`
5. Add the required environment variables in the Render dashboard for **both** services:
   - `NODE_ENV=production`
   - `NODE_VERSION=20.18.0`
   - `NEXT_TELEMETRY_DISABLED=1`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_FORMSPREE_ENDPOINT` (public service only)
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
6. Click Deploy.

### Option 2: Manual setup if Render does not detect the config

Create **two** Web Services from the same repo:

**Public site (`caxie-public`):**
- Runtime: Node
- Build command: `npm ci && npm run build`
- Start command: `npm run start`
- Health check path: `/`
- Env var: `APP_MODE=public`

**Admin portal (`admin-caxie`):**
- Runtime: Node
- Build command: `npm ci && npm run build`
- Start command: `npm run start`
- Health check path: `/admin`
- Env var: `APP_MODE=admin`
- Env var: `NEXT_PUBLIC_SITE_URL=https://caxietechnologies.com`

After deployment, the admin portal will be live at `https://admin-caxie.onrender.com` (visiting the root redirects to `/admin`).

## Contact

- Email: johneme2022@gmail.com
- Phone: +234 81 6544 3398
- Location: Kano, Nigeria