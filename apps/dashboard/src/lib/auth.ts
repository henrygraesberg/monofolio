import { decodeJwt } from "jose"
import { env } from "./env"

type Claims = {
  sub?: string
  permissions?: unknown
}

const readPermissions = (claims: Claims) => {
  if (!Array.isArray(claims.permissions)) {
    return [] as string[]
  }

  return claims.permissions.filter((item): item is string => typeof item === "string")
}

export const getClaimsFromToken = (accessToken: string) => {
  const decoded = decodeJwt(accessToken)
  return decoded as Claims
}

export const hasAdminAccess = (accessToken: string) => {
  console.log(accessToken)
  const claims = getClaimsFromToken(accessToken)
  const permissions = readPermissions(claims)
  const hasAdminPermission = permissions.includes(env.auth0AdminPermission)
  const hasAllowListedSubject =
    typeof claims.sub === "string" && env.auth0AdminSubjects.includes(claims.sub)

  return {
    isAdmin: hasAdminPermission || hasAllowListedSubject,
    subject: claims.sub ?? null,
    permissions,
  }
}
