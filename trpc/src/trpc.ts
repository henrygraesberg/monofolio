import { initTRPC } from "@trpc/server"
import { ServiceLayer } from "./routes/core"
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'


export const createTrpcContext = (
	{ req, resHeaders }: FetchCreateContextFnOptions,
	context: ServiceLayer
) => {
	const jwt = req.headers.get("Bearer-Token")

	return {
		jwt,
		resHeaders,
		...context
	}
}

export type TrpcContext = Awaited<ReturnType<typeof createTrpcContext>>

const t = initTRPC.context<TrpcContext>().create()

export const router = t.router
export const procedure = t.procedure
