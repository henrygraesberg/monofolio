import { withAdminAuthorization, withDatabaseTransaction } from "../../middleware"
import { procedure, router } from "../../trpc"
import { CreateSchoolSchema } from "./school-types"

const findSchoolsProcedure = procedure
	.use(withDatabaseTransaction())
	.query(async ({ ctx }) => {
		const items = ctx.schoolService.findMany(ctx.handle)

		return items
	})

const createSchoolProcedure = procedure
	.input(CreateSchoolSchema)
	.use(withAdminAuthorization())
	.use(withDatabaseTransaction())
	.query(async ({ input, ctx }) => {
		const created = ctx.schoolService.create(ctx.handle, input)

		return created
	})

export const schoolRouter = router({
	findMany: findSchoolsProcedure,
	create: createSchoolProcedure
})
