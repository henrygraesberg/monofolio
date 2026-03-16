import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "@tanstack/react-router"
import { LockKeyhole, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const LandingPage = () => {
  const { isAuthenticated, isLoading, loginWithRedirect, logout, user } = useAuth0()

  return (
    <main className="mx-auto my-10 grid w-[min(1120px,calc(100%-2.5rem))] gap-4">
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Portfolio Dashboard</CardTitle>
          <CardDescription>
            Sign in with Auth0 and only admin users can access the management dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {isAuthenticated ? (
            <>
              <p className="text-textMuted">Signed in as {user?.email ?? user?.name ?? "Unknown user"}</p>
              <div className="flex flex-wrap items-center gap-2.5">
                <Link to="/dashboard">
                  <Button>
                    <ShieldCheck size={16} />
                    Open dashboard
                  </Button>
                </Link>
                <Button variant="ghost" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                  <LockKeyhole size={16} />
                  Log out
                </Button>
              </div>
            </>
          ) : (
            <Button disabled={isLoading} onClick={() => loginWithRedirect()}>
              <LockKeyhole size={16} />
              Log in with Auth0
            </Button>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
