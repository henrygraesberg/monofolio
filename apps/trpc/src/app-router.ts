import { router } from "./trpc"
import { experienceRouter } from "./routes/experience/experience-router"
import { projectRouter } from "./routes/project/project-router"
import { educationRouter } from "./routes/education/education-router"

export const appRouter = router({
	experience: experienceRouter,
	project: projectRouter,
	education: educationRouter
})

export type AppRouter = typeof appRouter
