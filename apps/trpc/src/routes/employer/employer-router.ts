import { withAdminAuthorization, withDatabaseTransaction } from "../../middleware"
import { procedure, router } from "../../trpc"
import { CreateEmployerSchema } from "./employer-types"

const findEmployersProcedure = procedure
	.use(withDatabaseTransaction())
	.query(async ({ ctx }) => {
		const items = ctx.employerService.findMany(ctx.handle)

		return items
	})

const createEmployerProcedure = procedure
	.input(CreateEmployerSchema)
	.use(withAdminAuthorization())
	.use(withDatabaseTransaction())
	.query(async ({ input, ctx }) => {
		const created = ctx.employerService.create(ctx.handle, input)

		return created
	})

export const employerRouter = router({
	findMany: findEmployersProcedure,
	create: createEmployerProcedure
})
