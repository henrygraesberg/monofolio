// 0001 | import { withAdminAuthorization, withDatabaseTransaction } from "../../middleware"
// 0002 | import { procedure, router } from "../../trpc"
// 0003 | import { CreateEducationSchema } from "./education-types"
// 0004 | 
// 0005 | const findDegreesProcedure = procedure
// 0006 | 	.use(withDatabaseTransaction())
// 0007 | 	.query(async ({ ctx }) => {
// 0008 | 		const items = ctx.educationService.findMany(ctx.handle)
// 0009 | 
// 0010 | 		return items
// 0011 | 	})
// 0012 | 
// 0013 | const createEducationProcedure = procedure
// 0014 | 	.input(CreateEducationSchema)
// 0015 | 	.use(withAdminAuthorization())
// 0016 | 	.use(withDatabaseTransaction())
// 0017 | 	.query(async ({ input, ctx }) => {
// 0018 | 		const created = ctx.educationService.create(ctx.handle, input)
// 0019 | 
// 0020 | 		return created
// 0021 | 	})
// 0022 | 
// 0023 | export const educationRouter = router({
// 0024 | 	findMany: findDegreesProcedure,
// 0025 | 	create: createEducationProcedure
// 0026 | })
