// 0001 | import { initTRPC } from "@trpc/server"
// 0002 | import type { Configuration } from "./configuration"
// 0003 | import { ServiceLayer } from "./routes/core"
// 0004 | import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
// 0005 | 
// 0006 | export type AuthClaims = {
// 0007 | 	sub: string
// 0008 | 	permissions: string[]
// 0009 | }
// 0010 | 
// 0011 | export const createTrpcContext = (
// 0012 | 	{ req, resHeaders }: FetchCreateContextFnOptions,
// 0013 | 	context: ServiceLayer,
// 0014 | 	configuration: Configuration
// 0015 | ) => {
// 0016 | 	const authorization = req.headers.get("authorization")
// 0017 | 	const jwt = authorization?.match(/^Bearer\s+(.+)$/i)?.[1]?.trim() ?? null
// 0018 | 
// 0019 | 	return {
// 0020 | 		jwt,
// 0021 | 		authClaims: null as AuthClaims | null,
// 0022 | 		resHeaders,
// 0023 | 		configuration,
// 0024 | 		...context
// 0025 | 	}
// 0026 | }
// 0027 | 
// 0028 | export type TrpcContext = Awaited<ReturnType<typeof createTrpcContext>>
// 0029 | 
// 0030 | const t = initTRPC.context<TrpcContext>().create()
// 0031 | 
// 0032 | export const router = t.router
// 0033 | export const procedure = t.procedure
