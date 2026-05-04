// 0001 | import { withAdminAuthorization, withDatabaseTransaction } from "../../middleware"
// 0002 | import { procedure, router } from "../../trpc"
// 0003 | import { CreateSchoolSchema } from "./school-types"
// 0004 | 
// 0005 | const findSchoolsProcedure = procedure
// 0006 | 	.use(withDatabaseTransaction())
// 0007 | 	.query(async ({ ctx }) => {
// 0008 | 		const items = ctx.schoolService.findMany(ctx.handle)
// 0009 | 
// 0010 | 		return items
// 0011 | 	})
// 0012 | 
// 0013 | const createSchoolProcedure = procedure
// 0014 | 	.input(CreateSchoolSchema)
// 0015 | 	.use(withAdminAuthorization())
// 0016 | 	.use(withDatabaseTransaction())
// 0017 | 	.query(async ({ input, ctx }) => {
// 0018 | 		const created = ctx.schoolService.create(ctx.handle, input)
// 0019 | 
// 0020 | 		return created
// 0021 | 	})
// 0022 | 
// 0023 | export const schoolRouter = router({
// 0024 | 	findMany: findSchoolsProcedure,
// 0025 | 	create: createSchoolProcedure
// 0026 | })
