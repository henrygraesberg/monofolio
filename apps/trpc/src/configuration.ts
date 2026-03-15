type Environment = {
  ALLOWED_ORIGINS?: string
  DATABASE_URL?: string
}

const requireConfig = (name: keyof Environment, value: string | undefined) => {
  console.log(value)

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

export type Configuration = ReturnType<typeof createConfiguration>
export const createConfiguration = (env: Environment) => ({
  ALLOWED_ORIGINS: env.ALLOWED_ORIGINS,
  DATABASE_URL: requireConfig("DATABASE_URL", env.DATABASE_URL),
})
