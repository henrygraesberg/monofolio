// 0001 | import { withAdminAuthorization, withDatabaseTransaction } from "../../middleware"
// 0002 | import { procedure, router } from "../../trpc"
// 0003 | import { CreateProjectSchema } from "./project-types"
// 0004 | 
// 0005 | const findProjectsProcedure = procedure
// 0006 | 	.use(withDatabaseTransaction())
// 0007 | 	.query(async ({ ctx }) => {
// 0008 | 		const items = ctx.projectService.findMany(ctx.handle)
// 0009 | 
// 0010 | 		return items
// 0011 | 	})
// 0012 | 
// 0013 | const createProjectProcedure = procedure
// 0014 | 	.input(CreateProjectSchema)
// 0015 | 	.use(withAdminAuthorization())
// 0016 | 	.use(withDatabaseTransaction())
// 0017 | 	.query(async ({ input, ctx }) => {
// 0018 | 		const created = ctx.projectService.create(ctx.handle, input)
// 0019 | 
// 0020 | 		return created
// 0021 | 	})
// 0022 | 
// 0023 | export const projectRouter = router({
// 0024 | 	findMany: findProjectsProcedure,
// 0025 | 	create: createProjectProcedure
// 0026 | })
