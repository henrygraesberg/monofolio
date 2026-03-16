import { RouterProvider, createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router"
import { DashboardLayoutPage } from "@/screens/dashboard-layout-page"
import { EducationPage } from "@/screens/education-page"
import { EmployersPage } from "@/screens/employers-page"
import { ExperiencePage } from "@/screens/experience-page"
import { LandingPage } from "@/screens/landing-page"
import { ProjectsPage } from "@/screens/projects-page"
import { SchoolsPage } from "@/screens/schools-page"

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
})

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardLayoutPage,
})

const projectsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "/",
  component: ProjectsPage,
})

const experienceRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "/experience",
  component: ExperiencePage,
})

const educationRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "/education",
  component: EducationPage,
})

const employersRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "/employers",
  component: EmployersPage,
})

const schoolsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "/schools",
  component: SchoolsPage,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute.addChildren([projectsRoute, experienceRoute, educationRoute, employersRoute, schoolsRoute]),
])

const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

export const AppRouter = () => <RouterProvider router={router} />
