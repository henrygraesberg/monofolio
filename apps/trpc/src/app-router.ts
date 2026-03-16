import { router } from "./trpc"
import { experienceRouter } from "./routes/experience/experience-router"
import { projectRouter } from "./routes/project/project-router"
import { educationRouter } from "./routes/education/education-router"
import { employerRouter } from "./routes/employer/employer-router"
import { schoolRouter } from "./routes/school/school-router"

export const appRouter = router({
	experience: experienceRouter,
	project: projectRouter,
	education: educationRouter,
	employer: employerRouter,
	school: schoolRouter
})

export type AppRouter = typeof appRouter
