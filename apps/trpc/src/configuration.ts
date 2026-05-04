// 0001 | type Environment = {
// 0002 |   ALLOWED_ORIGINS?: string
// 0003 |   DATABASE_URL?: string
// 0004 |   AUTH0_ISSUER_BASE_URL?: string
// 0005 |   AUTH0_AUDIENCE?: string
// 0006 |   AUTH0_ADMIN_SUBJECTS?: string
// 0007 | }
// 0008 | 
// 0009 | const requireConfig = (name: keyof Environment, value: string | undefined) => {
// 0010 |   if (!value) {
// 0011 |     throw new Error(`Missing required environment variable: ${name}`)
// 0012 |   }
// 0013 | 
// 0014 |   return value
// 0015 | }
// 0016 | 
// 0017 | export type Configuration = ReturnType<typeof createConfiguration>
// 0018 | 
// 0019 | const parseCsv = (value: string) =>
// 0020 |   value
// 0021 |     .split(",")
// 0022 |     .map((item) => item.trim())
// 0023 |     .filter((item) => item.length > 0)
// 0024 | 
// 0025 | export const createConfiguration = (env: Environment) => ({
// 0026 |   ALLOWED_ORIGINS: env.ALLOWED_ORIGINS,
// 0027 |   DATABASE_URL: requireConfig("DATABASE_URL", env.DATABASE_URL),
// 0028 |   AUTH0_ISSUER_BASE_URL: requireConfig("AUTH0_ISSUER_BASE_URL", env.AUTH0_ISSUER_BASE_URL).replace(/\/$/, ""),
// 0029 |   AUTH0_AUDIENCE: requireConfig("AUTH0_AUDIENCE", env.AUTH0_AUDIENCE),
// 0030 |   AUTH0_ADMIN_SUBJECTS: parseCsv(requireConfig("AUTH0_ADMIN_SUBJECTS", env.AUTH0_ADMIN_SUBJECTS)),
// 0031 | })
