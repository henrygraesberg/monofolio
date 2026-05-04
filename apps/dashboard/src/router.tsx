// 0001 | import { RouterProvider, createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router"
// 0002 | import { DashboardLayoutPage } from "@/screens/dashboard-layout-page"
// 0003 | import { EducationPage } from "@/screens/education-page"
// 0004 | import { EmployersPage } from "@/screens/employers-page"
// 0005 | import { ExperiencePage } from "@/screens/experience-page"
// 0006 | import { LandingPage } from "@/screens/landing-page"
// 0007 | import { ProjectsPage } from "@/screens/projects-page"
// 0008 | import { SchoolsPage } from "@/screens/schools-page"
// 0009 | 
// 0010 | const rootRoute = createRootRoute({
// 0011 |   component: () => <Outlet />,
// 0012 | })
// 0013 | 
// 0014 | const indexRoute = createRoute({
// 0015 |   getParentRoute: () => rootRoute,
// 0016 |   path: "/",
// 0017 |   component: LandingPage,
// 0018 | })
// 0019 | 
// 0020 | const dashboardRoute = createRoute({
// 0021 |   getParentRoute: () => rootRoute,
// 0022 |   path: "/dashboard",
// 0023 |   component: DashboardLayoutPage,
// 0024 | })
// 0025 | 
// 0026 | const projectsRoute = createRoute({
// 0027 |   getParentRoute: () => dashboardRoute,
// 0028 |   path: "/",
// 0029 |   component: ProjectsPage,
// 0030 | })
// 0031 | 
// 0032 | const experienceRoute = createRoute({
// 0033 |   getParentRoute: () => dashboardRoute,
// 0034 |   path: "/experience",
// 0035 |   component: ExperiencePage,
// 0036 | })
// 0037 | 
// 0038 | const educationRoute = createRoute({
// 0039 |   getParentRoute: () => dashboardRoute,
// 0040 |   path: "/education",
// 0041 |   component: EducationPage,
// 0042 | })
// 0043 | 
// 0044 | const employersRoute = createRoute({
// 0045 |   getParentRoute: () => dashboardRoute,
// 0046 |   path: "/employers",
// 0047 |   component: EmployersPage,
// 0048 | })
// 0049 | 
// 0050 | const schoolsRoute = createRoute({
// 0051 |   getParentRoute: () => dashboardRoute,
// 0052 |   path: "/schools",
// 0053 |   component: SchoolsPage,
// 0054 | })
// 0055 | 
// 0056 | const routeTree = rootRoute.addChildren([
// 0057 |   indexRoute,
// 0058 |   dashboardRoute.addChildren([projectsRoute, experienceRoute, educationRoute, employersRoute, schoolsRoute]),
// 0059 | ])
// 0060 | 
// 0061 | const router = createRouter({ routeTree })
// 0062 | 
// 0063 | declare module "@tanstack/react-router" {
// 0064 |   interface Register {
// 0065 |     router: typeof router
// 0066 |   }
// 0067 | }
// 0068 | 
// 0069 | export const AppRouter = () => <RouterProvider router={router} />
