import { withAdminAuthorization, withDatabaseTransaction } from "../../middleware"
import { procedure, router } from "../../trpc"
import { CreateEducationSchema } from "./education-types"

const findDegreesProcedure = procedure
	.use(withDatabaseTransaction())
	.query(async ({ ctx }) => {
		const items = ctx.educationService.findMany(ctx.handle)

		return items
	})

const createEducationProcedure = procedure
	.input(CreateEducationSchema)
	.use(withAdminAuthorization())
	.use(withDatabaseTransaction())
	.query(async ({ input, ctx }) => {
		const created = ctx.educationService.create(ctx.handle, input)

		return created
	})

export const educationRouter = router({
	findMany: findDegreesProcedure,
	create: createEducationProcedure
})
