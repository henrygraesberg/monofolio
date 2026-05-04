// 0001 | const requireEnv = (value: string | undefined, name: string) => {
// 0002 |   if (!value) {
// 0003 |     throw new Error(`Missing required environment variable: ${name}`)
// 0004 |   }
// 0005 | 
// 0006 |   return value
// 0007 | }
// 0008 | 
// 0009 | const parseCsv = (value: string | undefined) => {
// 0010 |   if (!value) {
// 0011 |     return []
// 0012 |   }
// 0013 | 
// 0014 |   return value
// 0015 |     .split(",")
// 0016 |     .map((item) => item.trim())
// 0017 |     .filter((item) => item.length > 0)
// 0018 | }
// 0019 | 
// 0020 | export const env = {
// 0021 |   auth0Domain: requireEnv(import.meta.env.VITE_AUTH0_DOMAIN, "VITE_AUTH0_DOMAIN"),
// 0022 |   auth0ClientId: requireEnv(import.meta.env.VITE_AUTH0_CLIENT_ID, "VITE_AUTH0_CLIENT_ID"),
// 0023 |   auth0Audience: requireEnv(import.meta.env.VITE_AUTH0_AUDIENCE, "VITE_AUTH0_AUDIENCE"),
// 0024 |   auth0AdminSubjects: parseCsv(import.meta.env.VITE_AUTH0_ADMIN_SUBJECTS),
// 0025 |   auth0AdminPermission: import.meta.env.VITE_AUTH0_ADMIN_PERMISSION ?? "admin",
// 0026 |   trpcUrl: (import.meta.env.VITE_TRPC_URL ?? "http://localhost:8787/trpc").replace(/\/$/, ""),
// 0027 | }
