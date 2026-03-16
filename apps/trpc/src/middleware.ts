import type { DBHandle } from "../../db/src"
import type { Prisma } from "../../db/src"
import { TRPCError } from "@trpc/server"
import type * as trpc from "@trpc/server/unstable-core-do-not-import"
import { createRemoteJWKSet, jwtVerify } from "jose"
import type { JWTPayload } from "jose"
import type { TrpcContext } from "./trpc"
import type { AuthClaims } from "./trpc"

type MiddlewareFunction<TContextIn, TContextOut, TInputOut> = trpc.MiddlewareFunction<
  TrpcContext,
  // Our procedure chain has no metadata
  Record<never, never>,
  TContextIn,
  TContextOut,
  TInputOut
>

type WithTransaction = {
  handle: DBHandle
}

type WithAdminAuth = {
  authClaims: AuthClaims
}

const jwksCache = new Map<string, ReturnType<typeof createRemoteJWKSet>>()

const normalizeIssuerBaseUrl = (issuerBaseUrl: string) => {
  const trimmed = issuerBaseUrl.trim().replace(/^"|"$/g, "")
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed
  }

  return `https://${trimmed}`
}

const getIssuer = (issuerBaseUrl: string) => `${normalizeIssuerBaseUrl(issuerBaseUrl).replace(/\/$/, "")}/`

const getJwks = (issuerBaseUrl: string) => {
  const jwksUrl = new URL("/.well-known/jwks.json", getIssuer(issuerBaseUrl))
  const cacheKey = jwksUrl.toString()
  const existing = jwksCache.get(cacheKey)

  if (existing) {
    return existing
  }

  const created = createRemoteJWKSet(jwksUrl)
  jwksCache.set(cacheKey, created)
  return created
}

const getPermissions = (payload: JWTPayload, audience: string) => {
  const candidateKeys = ["permissions", `${audience}/permissions`] as const
  const rawPermissions = candidateKeys
    .map((key) => payload[key])
    .find((value) => Array.isArray(value))

  if (!Array.isArray(rawPermissions)) {
    return []
  }

  return rawPermissions.filter((permission): permission is string => typeof permission === "string")
}

const getSubject = (payload: JWTPayload) => {
  if (typeof payload.sub === "string" && payload.sub.length > 0) {
    return payload.sub
  }

  return null
}

export function withAdminAuthorization<TContext extends TrpcContext, TInput>() {
  const handler: MiddlewareFunction<TContext, TContext & WithAdminAuth, TInput> = async ({ ctx, next }) => {
    const token = ctx.jwt
    if (!token) {
      console.log("Missing token")
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Missing bearer token" })
    }

    let payload: JWTPayload
    try {
      const verified = await jwtVerify(token, getJwks(ctx.configuration.AUTH0_ISSUER_BASE_URL), {
        issuer: getIssuer(ctx.configuration.AUTH0_ISSUER_BASE_URL),
        audience: ctx.configuration.AUTH0_AUDIENCE,
      })
      payload = verified.payload
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Unknown verification error"
      console.log("Invalid token", reason)
      throw new TRPCError({ code: "UNAUTHORIZED", message: `Invalid token: ${reason}` })
    }

    const subject = getSubject(payload)
    if (!subject) {
      console.log("Missing sub")
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Token subject is missing" })
    }

    const isAdminSubject = ctx.configuration.AUTH0_ADMIN_SUBJECTS.includes(subject)
    const permissions = getPermissions(payload, ctx.configuration.AUTH0_AUDIENCE)
    const hasAdminPermission = permissions.includes("admin")

    if (!isAdminSubject && !hasAdminPermission) {
      throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" })
    }

    return await next({
      ctx: Object.assign(ctx, {
        authClaims: {
          sub: subject,
          permissions,
        },
      }),
    })
  }

  return handler
}

export function withDatabaseTransaction<TContext extends TrpcContext, TInput>(
  isolationLevel: Prisma.TransactionIsolationLevel = "ReadCommitted"
) {
  const handler: MiddlewareFunction<TContext, TContext & WithTransaction, TInput> = async ({ ctx, next }) => {
    return await ctx.prisma.$transaction(
      async (handle) => {
        return await next({
          ctx: Object.assign(ctx, {
            handle,
          }),
        })
      },
      {
        isolationLevel,
      }
    )
  }
  return handler
}
