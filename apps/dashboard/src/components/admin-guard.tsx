import { useAuth0 } from "@auth0/auth0-react"
import { useQuery } from "@tanstack/react-query"
import type { User } from "@auth0/auth0-react"
import { createContext, useContext, type ReactNode } from "react"
import { Link } from "@tanstack/react-router"
import { Lock, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { hasAdminAccess } from "@/lib/auth"
import { env } from "@/lib/env"
import { createDashboardTrpcClient } from "@/lib/trpc-client"

type AdminSession = {
  trpcClient: ReturnType<typeof createDashboardTrpcClient>
  user: User | undefined
  subject: string | null
}

const AdminSessionContext = createContext<AdminSession | null>(null)

export const useAdminSession = () => {
  const context = useContext(AdminSessionContext)
  if (!context) {
    throw new Error("useAdminSession must be used inside AdminGuard")
  }

  return context
}

export const AdminGuard = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading, loginWithRedirect, logout, getAccessTokenSilently, user } = useAuth0()

  const tokenQuery = useQuery({
    queryKey: ["auth", "token"],
    enabled: isAuthenticated,
    queryFn: () =>
      getAccessTokenSilently({
        authorizationParams: {
          audience: env.auth0Audience,
        },
      }),
  })

  const adminGate = tokenQuery.data ? hasAdminAccess(tokenQuery.data) : { isAdmin: false, subject: null }

  if (isLoading) {
    return (
      <main className="mx-auto my-10 grid w-[min(1120px,calc(100%-2.5rem))] gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Checking session...</CardTitle>
            <CardDescription>Loading Auth0 session details.</CardDescription>
          </CardHeader>
        </Card>
      </main>
    )
  }

  if (!isAuthenticated) {
    return (
      <main className="mx-auto my-10 grid w-[min(1120px,calc(100%-2.5rem))] gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Admin login required</CardTitle>
            <CardDescription>Use Auth0 to log into the dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-2.5">
            <Button onClick={() => loginWithRedirect()}>
              <Lock size={16} />
              Log in with Auth0
            </Button>
            <Link to="/">
              <Button variant="ghost">Back to home</Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    )
  }

  if (tokenQuery.isPending) {
    return (
      <main className="mx-auto my-10 grid w-[min(1120px,calc(100%-2.5rem))] gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Getting access token...</CardTitle>
            <CardDescription>Loading your API token for dashboard requests.</CardDescription>
          </CardHeader>
        </Card>
      </main>
    )
  }

  if (tokenQuery.isError) {
    return (
      <main className="mx-auto my-10 grid w-[min(1120px,calc(100%-2.5rem))] gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Token error</CardTitle>
            <CardDescription>Could not get an Auth0 API token for dashboard access.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-textMuted">{tokenQuery.error.message}</p>
          </CardContent>
        </Card>
      </main>
    )
  }

  if (!adminGate.isAdmin) {
    return (
      <main className="mx-auto my-10 grid w-[min(1120px,calc(100%-2.5rem))] gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Access denied</CardTitle>
            <CardDescription>Your account is authenticated but does not have admin access.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <p className="text-textMuted">Signed in as {user?.email ?? user?.name ?? "Unknown user"}</p>
            <p className="text-textMuted">Subject: {adminGate.subject ?? "Unavailable"}</p>
            <Button variant="ghost" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              <LogOut size={16} />
              Log out
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <AdminSessionContext.Provider
      value={{
        trpcClient: createDashboardTrpcClient(tokenQuery.data),
        user,
        subject: adminGate.subject,
      }}
    >
      {children}
    </AdminSessionContext.Provider>
  )
}
