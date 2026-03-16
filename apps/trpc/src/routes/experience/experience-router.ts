import { withAdminAuthorization, withDatabaseTransaction } from "../../middleware"
import { procedure, router } from "../../trpc"
import { CreateExperienceSchema } from "./experience-types"

const findExperienceProcedure = procedure
	.use(withDatabaseTransaction())
	.query(async ({ ctx }) => {
		const items = ctx.experienceService.findMany(ctx.handle)

		return items
	})

const createExperienceProcedure = procedure
	.input(CreateExperienceSchema)
	.use(withAdminAuthorization())
	.use(withDatabaseTransaction())
	.query(async ({ input, ctx }) => {
		const created = ctx.experienceService.create(ctx.handle, input)

		return created
	})

export const experienceRouter = router({
	findMany: findExperienceProcedure,
	create: createExperienceProcedure
})
