import { withDatabaseTransaction } from "../../middleware"
import { procedure, router } from "../../trpc"

const findDegreesProcedure = procedure
	.use(withDatabaseTransaction())
	.query(async ({ ctx }) => {
		const items = ctx.educationService.findMany(ctx.handle)

		return items
	})

export const educationRouter = router({
	findMany: findDegreesProcedure
})
