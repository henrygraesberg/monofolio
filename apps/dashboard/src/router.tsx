import { RouterProvider, createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router"
import { DashboardPage } from "@/screens/dashboard-page"
import { LandingPage } from "@/screens/landing-page"

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
  component: DashboardPage,
})

const routeTree = rootRoute.addChildren([indexRoute, dashboardRoute])

const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

export const AppRouter = () => <RouterProvider router={router} />
