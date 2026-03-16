# Dashboard setup

This app uses Auth0 for login and checks admin access in two places:

1. Frontend gate in `apps/dashboard` before loading data.
2. API middleware in `apps/trpc` (`requireAdmin`) for real authorization.

## 1) Create Auth0 tenant and API

- Create a tenant at <https://auth0.com>
- Create one API (Applications -> APIs -> Create API)
  - Identifier (audience): `https://api.monofolio.local`
  - Signing algorithm: `RS256`
  - Enable RBAC
  - Enable "Add Permissions in the Access Token"
  - Add permission: `admin`

## 2) Create Auth0 SPA app

- Applications -> Applications -> Create Application
- Type: Single Page Application
- In app settings, configure:
  - Allowed Callback URLs: `http://localhost:5173`
  - Allowed Logout URLs: `http://localhost:5173`
  - Allowed Web Origins: `http://localhost:5173`

Copy domain and client id into env.

## 3) Environment variables

Copy `.env.example` to `.env` in `apps/dashboard` and fill values.

Also set these for `apps/trpc` worker:

- `AUTH0_ISSUER_BASE_URL=https://YOUR_TENANT.us.auth0.com`
- `AUTH0_AUDIENCE=https://api.monofolio.local`
- `AUTH0_ADMIN_SUBJECTS=auth0|...`

## 4) Make yourself admin

Use one method (or both):

- Assign API permission `admin` to your user.
- Add your Auth0 user subject (`sub`) to `AUTH0_ADMIN_SUBJECTS` and `VITE_AUTH0_ADMIN_SUBJECTS`.

## 5) Run

- API: run your trpc worker locally.
- Dashboard: `pnpm run dev:dashboard`

Open <http://localhost:5173>.
