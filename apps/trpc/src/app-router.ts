import { router } from "./trpc"
import { experienceRouter } from "./routes/experience/experience-router"
import { projectRouter } from "./routes/project/project-router"

export const appRouter = router({
	experience: experienceRouter,
	project: projectRouter
})

export type AppRouter = typeof appRouter
