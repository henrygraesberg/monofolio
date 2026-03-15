import type { DBHandle } from "@henrygraesberg/portfolio-db"
import type { Prisma } from "@henrygraesberg/portfolio-db"
import type * as trpc from "@trpc/server/unstable-core-do-not-import"
import type { TrpcContext } from "./trpc"

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
