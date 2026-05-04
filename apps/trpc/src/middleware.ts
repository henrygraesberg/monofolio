// 0001 | import type { DBHandle } from "../../db/src"
// 0002 | import type { Prisma } from "../../db/src"
// 0003 | import { TRPCError } from "@trpc/server"
// 0004 | import type * as trpc from "@trpc/server/unstable-core-do-not-import"
// 0005 | import { createRemoteJWKSet, jwtVerify } from "jose"
// 0006 | import type { JWTPayload } from "jose"
// 0007 | import type { TrpcContext } from "./trpc"
// 0008 | import type { AuthClaims } from "./trpc"
// 0009 | 
// 0010 | type MiddlewareFunction<TContextIn, TContextOut, TInputOut> = trpc.MiddlewareFunction<
// 0011 |   TrpcContext,
// 0012 |   // Our procedure chain has no metadata
// 0013 |   Record<never, never>,
// 0014 |   TContextIn,
// 0015 |   TContextOut,
// 0016 |   TInputOut
// 0017 | >
// 0018 | 
// 0019 | type WithTransaction = {
// 0020 |   handle: DBHandle
// 0021 | }
// 0022 | 
// 0023 | type WithAdminAuth = {
// 0024 |   authClaims: AuthClaims
// 0025 | }
// 0026 | 
// 0027 | const jwksCache = new Map<string, ReturnType<typeof createRemoteJWKSet>>()
// 0028 | 
// 0029 | const normalizeIssuerBaseUrl = (issuerBaseUrl: string) => {
// 0030 |   const trimmed = issuerBaseUrl.trim().replace(/^"|"$/g, "")
// 0031 |   if (/^https?:\/\//i.test(trimmed)) {
// 0032 |     return trimmed
// 0033 |   }
// 0034 | 
// 0035 |   return `https://${trimmed}`
// 0036 | }
// 0037 | 
// 0038 | const getIssuer = (issuerBaseUrl: string) => `${normalizeIssuerBaseUrl(issuerBaseUrl).replace(/\/$/, "")}/`
// 0039 | 
// 0040 | const getJwks = (issuerBaseUrl: string) => {
// 0041 |   const jwksUrl = new URL("/.well-known/jwks.json", getIssuer(issuerBaseUrl))
// 0042 |   const cacheKey = jwksUrl.toString()
// 0043 |   const existing = jwksCache.get(cacheKey)
// 0044 | 
// 0045 |   if (existing) {
// 0046 |     return existing
// 0047 |   }
// 0048 | 
// 0049 |   const created = createRemoteJWKSet(jwksUrl)
// 0050 |   jwksCache.set(cacheKey, created)
// 0051 |   return created
// 0052 | }
// 0053 | 
// 0054 | const getPermissions = (payload: JWTPayload, audience: string) => {
// 0055 |   const candidateKeys = ["permissions", `${audience}/permissions`] as const
// 0056 |   const rawPermissions = candidateKeys
// 0057 |     .map((key) => payload[key])
// 0058 |     .find((value) => Array.isArray(value))
// 0059 | 
// 0060 |   if (!Array.isArray(rawPermissions)) {
// 0061 |     return []
// 0062 |   }
// 0063 | 
// 0064 |   return rawPermissions.filter((permission): permission is string => typeof permission === "string")
// 0065 | }
// 0066 | 
// 0067 | const getSubject = (payload: JWTPayload) => {
// 0068 |   if (typeof payload.sub === "string" && payload.sub.length > 0) {
// 0069 |     return payload.sub
// 0070 |   }
// 0071 | 
// 0072 |   return null
// 0073 | }
// 0074 | 
// 0075 | export function withAdminAuthorization<TContext extends TrpcContext, TInput>() {
// 0076 |   const handler: MiddlewareFunction<TContext, TContext & WithAdminAuth, TInput> = async ({ ctx, next }) => {
// 0077 |     const token = ctx.jwt
// 0078 |     if (!token) {
// 0079 |       console.log("Missing token")
// 0080 |       throw new TRPCError({ code: "UNAUTHORIZED", message: "Missing bearer token" })
// 0081 |     }
// 0082 | 
// 0083 |     let payload: JWTPayload
// 0084 |     try {
// 0085 |       const verified = await jwtVerify(token, getJwks(ctx.configuration.AUTH0_ISSUER_BASE_URL), {
// 0086 |         issuer: getIssuer(ctx.configuration.AUTH0_ISSUER_BASE_URL),
// 0087 |         audience: ctx.configuration.AUTH0_AUDIENCE,
// 0088 |       })
// 0089 |       payload = verified.payload
// 0090 |     } catch (error) {
// 0091 |       const reason = error instanceof Error ? error.message : "Unknown verification error"
// 0092 |       console.log("Invalid token", reason)
// 0093 |       throw new TRPCError({ code: "UNAUTHORIZED", message: `Invalid token: ${reason}` })
// 0094 |     }
// 0095 | 
// 0096 |     const subject = getSubject(payload)
// 0097 |     if (!subject) {
// 0098 |       console.log("Missing sub")
// 0099 |       throw new TRPCError({ code: "UNAUTHORIZED", message: "Token subject is missing" })
// 0100 |     }
// 0101 | 
// 0102 |     const isAdminSubject = ctx.configuration.AUTH0_ADMIN_SUBJECTS.includes(subject)
// 0103 |     const permissions = getPermissions(payload, ctx.configuration.AUTH0_AUDIENCE)
// 0104 |     const hasAdminPermission = permissions.includes("admin")
// 0105 | 
// 0106 |     if (!isAdminSubject && !hasAdminPermission) {
// 0107 |       throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" })
// 0108 |     }
// 0109 | 
// 0110 |     return await next({
// 0111 |       ctx: Object.assign(ctx, {
// 0112 |         authClaims: {
// 0113 |           sub: subject,
// 0114 |           permissions,
// 0115 |         },
// 0116 |       }),
// 0117 |     })
// 0118 |   }
// 0119 | 
// 0120 |   return handler
// 0121 | }
// 0122 | 
// 0123 | export function withDatabaseTransaction<TContext extends TrpcContext, TInput>(
// 0124 |   isolationLevel: Prisma.TransactionIsolationLevel = "ReadCommitted"
// 0125 | ) {
// 0126 |   const handler: MiddlewareFunction<TContext, TContext & WithTransaction, TInput> = async ({ ctx, next }) => {
// 0127 |     return await ctx.prisma.$transaction(
// 0128 |       async (handle) => {
// 0129 |         return await next({
// 0130 |           ctx: Object.assign(ctx, {
// 0131 |             handle,
// 0132 |           }),
// 0133 |         })
// 0134 |       },
// 0135 |       {
// 0136 |         isolationLevel,
// 0137 |       }
// 0138 |     )
// 0139 |   }
// 0140 |   return handler
// 0141 | }
