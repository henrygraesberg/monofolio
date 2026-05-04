// 0001 | import { useAuth0 } from "@auth0/auth0-react"
// 0002 | import { getRouteApi, Link } from "@tanstack/react-router"
// 0003 | import { LockKeyhole, ShieldCheck } from "lucide-react"
// 0004 | import { Button } from "@/components/ui/button"
// 0005 | import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// 0006 | 
// 0007 | const routeApi = getRouteApi("/")
// 0008 | 
// 0009 | export const LandingPage = () => {
// 0010 |   const { isAuthenticated, isLoading, loginWithRedirect, logout, user } = useAuth0()
// 0011 | 
// 0012 |   return (
// 0013 |     <main className="py-10 grid gap-4 h-screen w-screen mx-4 place-content-center">
// 0014 |       <Card className="w-[85vw] max-w-[55rem] h-min">
// 0015 |         <CardHeader className="w-full flex justify-center">
// 0016 |           <CardTitle>Portfolio Dashboard</CardTitle>
// 0017 |         </CardHeader>
// 0018 |         <CardContent className="grid gap-3">
// 0019 |           {isAuthenticated ? (
// 0020 |             <>
// 0021 |               <p className="text-textMuted">Signed in as {user?.email ?? user?.name ?? "Unknown user"}</p>
// 0022 |               <div className="flex flex-wrap items-center gap-2.5">
// 0023 |                 <Link to="/dashboard">
// 0024 |                   <Button>
// 0025 |                     <ShieldCheck size={16} />
// 0026 |                     Open dashboard
// 0027 |                   </Button>
// 0028 |                 </Link>
// 0029 |                 <Button variant="ghost" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
// 0030 |                   <LockKeyhole size={16} />
// 0031 |                   Log out
// 0032 |                 </Button>
// 0033 |               </div>
// 0034 |             </>
// 0035 |           ) : (
// 0036 |             <Button className="w-full" disabled={isLoading} onClick={() => loginWithRedirect()}>
// 0037 |               <LockKeyhole size={16} />
// 0038 |               Log in with Auth0
// 0039 |             </Button>
// 0040 |           )}
// 0041 |         </CardContent>
// 0042 |       </Card>
// 0043 |     </main>
// 0044 |   )
// 0045 | }
