import { useAuth0 } from "@auth0/auth0-react"
import { getRouteApi, Link } from "@tanstack/react-router"
import { LockKeyhole, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const routeApi = getRouteApi("/")

export const LandingPage = () => {
  const { isAuthenticated, isLoading, loginWithRedirect, logout, user } = useAuth0()

  return (
    <main className="py-10 grid gap-4 h-screen w-screen mx-4 place-content-center">
      <Card className="w-[85vw] max-w-[55rem] h-min">
        <CardHeader className="w-full flex justify-center">
          <CardTitle>Portfolio Dashboard</CardTitle>
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
            <Button className="w-full" disabled={isLoading} onClick={() => loginWithRedirect()}>
              <LockKeyhole size={16} />
              Log in with Auth0
            </Button>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
