import { withDatabaseTransaction } from "../../middleware"
import { procedure, router } from "../../trpc"

const findProjectsProcedure = procedure
	.use(withDatabaseTransaction())
	.query(async ({ ctx }) => {
		const items = ctx.projectService.findMany(ctx.handle)

		return items
	})

export const projectRouter = router({
	findMany: findProjectsProcedure
})
