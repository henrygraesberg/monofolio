type Environment = {
  ALLOWED_ORIGINS?: string
  DATABASE_URL?: string
  AUTH0_ISSUER_BASE_URL?: string
  AUTH0_AUDIENCE?: string
  AUTH0_ADMIN_SUBJECTS?: string
}

const requireConfig = (name: keyof Environment, value: string | undefined) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

export type Configuration = ReturnType<typeof createConfiguration>

const parseCsv = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0)

export const createConfiguration = (env: Environment) => ({
  ALLOWED_ORIGINS: env.ALLOWED_ORIGINS,
  DATABASE_URL: requireConfig("DATABASE_URL", env.DATABASE_URL),
  AUTH0_ISSUER_BASE_URL: requireConfig("AUTH0_ISSUER_BASE_URL", env.AUTH0_ISSUER_BASE_URL).replace(/\/$/, ""),
  AUTH0_AUDIENCE: requireConfig("AUTH0_AUDIENCE", env.AUTH0_AUDIENCE),
  AUTH0_ADMIN_SUBJECTS: parseCsv(requireConfig("AUTH0_ADMIN_SUBJECTS", env.AUTH0_ADMIN_SUBJECTS)),
})
