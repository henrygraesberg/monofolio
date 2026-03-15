import { router } from "./trpc"
import { experienceRouter } from "./routes/experience/experience-router"

export const appRouter = router({
	experience: experienceRouter
})

export type AppRouter = typeof appRouter
