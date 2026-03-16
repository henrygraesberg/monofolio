const requireEnv = (value: string | undefined, name: string) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

const parseCsv = (value: string | undefined) => {
  if (!value) {
    return []
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
}

export const env = {
  auth0Domain: requireEnv(import.meta.env.VITE_AUTH0_DOMAIN, "VITE_AUTH0_DOMAIN"),
  auth0ClientId: requireEnv(import.meta.env.VITE_AUTH0_CLIENT_ID, "VITE_AUTH0_CLIENT_ID"),
  auth0Audience: requireEnv(import.meta.env.VITE_AUTH0_AUDIENCE, "VITE_AUTH0_AUDIENCE"),
  auth0AdminSubjects: parseCsv(import.meta.env.VITE_AUTH0_ADMIN_SUBJECTS),
  auth0AdminPermission: import.meta.env.VITE_AUTH0_ADMIN_PERMISSION ?? "admin",
  trpcUrl: (import.meta.env.VITE_TRPC_URL ?? "http://localhost:8787/trpc").replace(/\/$/, ""),
}
