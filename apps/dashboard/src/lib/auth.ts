// 0001 | import { decodeJwt } from "jose"
// 0002 | import { env } from "./env"
// 0003 | 
// 0004 | type Claims = {
// 0005 |   sub?: string
// 0006 |   permissions?: unknown
// 0007 | }
// 0008 | 
// 0009 | const readPermissions = (claims: Claims) => {
// 0010 |   if (!Array.isArray(claims.permissions)) {
// 0011 |     return [] as string[]
// 0012 |   }
// 0013 | 
// 0014 |   return claims.permissions.filter((item): item is string => typeof item === "string")
// 0015 | }
// 0016 | 
// 0017 | export const getClaimsFromToken = (accessToken: string) => {
// 0018 |   const decoded = decodeJwt(accessToken)
// 0019 |   return decoded as Claims
// 0020 | }
// 0021 | 
// 0022 | export const hasAdminAccess = (accessToken: string) => {
// 0023 |   console.log(accessToken)
// 0024 |   const claims = getClaimsFromToken(accessToken)
// 0025 |   const permissions = readPermissions(claims)
// 0026 |   const hasAdminPermission = permissions.includes(env.auth0AdminPermission)
// 0027 |   const hasAllowListedSubject =
// 0028 |     typeof claims.sub === "string" && env.auth0AdminSubjects.includes(claims.sub)
// 0029 | 
// 0030 |   return {
// 0031 |     isAdmin: hasAdminPermission || hasAllowListedSubject,
// 0032 |     subject: claims.sub ?? null,
// 0033 |     permissions,
// 0034 |   }
// 0035 | }
