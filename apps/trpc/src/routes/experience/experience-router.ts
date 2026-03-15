import { withDatabaseTransaction } from "../../middleware"
import { procedure, router } from "../../trpc"

const findExperienceProcedure = procedure
	.use(withDatabaseTransaction())
	.query(async ({ ctx }) => {
		const items = ctx.experienceService.findMany(ctx.handle)

		return items
	})

export const experienceRouter = router({
	findMany: findExperienceProcedure
})
