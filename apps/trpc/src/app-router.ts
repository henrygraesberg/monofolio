// 0001 | import { router } from "./trpc"
// 0002 | import { experienceRouter } from "./routes/experience/experience-router"
// 0003 | import { projectRouter } from "./routes/project/project-router"
// 0004 | import { educationRouter } from "./routes/education/education-router"
// 0005 | import { employerRouter } from "./routes/employer/employer-router"
// 0006 | import { schoolRouter } from "./routes/school/school-router"
// 0007 | 
// 0008 | export const appRouter = router({
// 0009 | 	experience: experienceRouter,
// 0010 | 	project: projectRouter,
// 0011 | 	education: educationRouter,
// 0012 | 	employer: employerRouter,
// 0013 | 	school: schoolRouter
// 0014 | })
// 0015 | 
// 0016 | export type AppRouter = typeof appRouter
