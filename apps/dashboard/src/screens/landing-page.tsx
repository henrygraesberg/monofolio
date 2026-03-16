import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "@tanstack/react-router"
import { LockKeyhole, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const LandingPage = () => {
  const { isAuthenticated, isLoading, loginWithRedirect, logout, user } = useAuth0()

  return (
    <main className="layout-shell">
      <Card className="hero-card">
        <CardHeader>
          <CardTitle>Monofolio Dashboard</CardTitle>
          <CardDescription>
            Sign in with Auth0 and only admin users can access the management dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="hero-actions">
          {isAuthenticated ? (
            <>
              <p className="muted">Signed in as {user?.email ?? user?.name ?? "Unknown user"}</p>
              <div className="row-actions">
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
