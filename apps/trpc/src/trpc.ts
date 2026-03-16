import { initTRPC } from "@trpc/server"
import type { Configuration } from "./configuration"
import { ServiceLayer } from "./routes/core"
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

export type AuthClaims = {
	sub: string
	permissions: string[]
}

export const createTrpcContext = (
	{ req, resHeaders }: FetchCreateContextFnOptions,
	context: ServiceLayer,
	configuration: Configuration
) => {
	const authorization = req.headers.get("authorization")
	const jwt = authorization?.match(/^Bearer\s+(.+)$/i)?.[1]?.trim() ?? null

	return {
		jwt,
		authClaims: null as AuthClaims | null,
		resHeaders,
		configuration,
		...context
	}
}

export type TrpcContext = Awaited<ReturnType<typeof createTrpcContext>>

const t = initTRPC.context<TrpcContext>().create()

export const router = t.router
export const procedure = t.procedure
