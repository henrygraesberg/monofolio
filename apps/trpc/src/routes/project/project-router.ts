import { withAdminAuthorization, withDatabaseTransaction } from "../../middleware"
import { procedure, router } from "../../trpc"
import { CreateProjectSchema } from "./project-types"

const findProjectsProcedure = procedure
	.use(withDatabaseTransaction())
	.query(async ({ ctx }) => {
		const items = ctx.projectService.findMany(ctx.handle)

		return items
	})

const createProjectProcedure = procedure
	.input(CreateProjectSchema)
	.use(withAdminAuthorization())
	.use(withDatabaseTransaction())
	.query(async ({ input, ctx }) => {
		const created = ctx.projectService.create(ctx.handle, input)

		return created
	})

export const projectRouter = router({
	findMany: findProjectsProcedure,
	create: createProjectProcedure
})
