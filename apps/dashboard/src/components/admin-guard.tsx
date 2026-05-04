// 0001 | import { useAuth0 } from "@auth0/auth0-react"
// 0002 | import { useQuery } from "@tanstack/react-query"
// 0003 | import type { User } from "@auth0/auth0-react"
// 0004 | import { createContext, useContext, type ReactNode } from "react"
// 0005 | import { Link } from "@tanstack/react-router"
// 0006 | import { Lock, LogOut } from "lucide-react"
// 0007 | import { Button } from "@/components/ui/button"
// 0008 | import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// 0009 | import { hasAdminAccess } from "@/lib/auth"
// 0010 | import { env } from "@/lib/env"
// 0011 | import { createDashboardTrpcClient } from "@/lib/trpc-client"
// 0012 | 
// 0013 | type AdminSession = {
// 0014 |   trpcClient: ReturnType<typeof createDashboardTrpcClient>
// 0015 |   user: User | undefined
// 0016 |   subject: string | null
// 0017 | }
// 0018 | 
// 0019 | const AdminSessionContext = createContext<AdminSession | null>(null)
// 0020 | 
// 0021 | export const useAdminSession = () => {
// 0022 |   const context = useContext(AdminSessionContext)
// 0023 |   if (!context) {
// 0024 |     throw new Error("useAdminSession must be used inside AdminGuard")
// 0025 |   }
// 0026 | 
// 0027 |   return context
// 0028 | }
// 0029 | 
// 0030 | export const AdminGuard = ({ children }: { children: ReactNode }) => {
// 0031 |   const { isAuthenticated, isLoading, loginWithRedirect, logout, getAccessTokenSilently, user } = useAuth0()
// 0032 | 
// 0033 |   const tokenQuery = useQuery({
// 0034 |     queryKey: ["auth", "token"],
// 0035 |     enabled: isAuthenticated,
// 0036 |     queryFn: () =>
// 0037 |       getAccessTokenSilently({
// 0038 |         authorizationParams: {
// 0039 |           audience: env.auth0Audience,
// 0040 |         },
// 0041 |       }),
// 0042 |   })
// 0043 | 
// 0044 |   const adminGate = tokenQuery.data ? hasAdminAccess(tokenQuery.data) : { isAdmin: false, subject: null }
// 0045 | 
// 0046 |   if (isLoading) {
// 0047 |     return (
// 0048 |       <main className="mx-auto my-10 grid w-[min(1120px,calc(100%-2.5rem))] gap-4">
// 0049 |         <Card>
// 0050 |           <CardHeader>
// 0051 |             <CardTitle>Checking session...</CardTitle>
// 0052 |             <CardDescription>Loading Auth0 session details.</CardDescription>
// 0053 |           </CardHeader>
// 0054 |         </Card>
// 0055 |       </main>
// 0056 |     )
// 0057 |   }
// 0058 | 
// 0059 |   if (!isAuthenticated) {
// 0060 |     return (
// 0061 |       <main className="mx-auto my-10 grid w-[min(1120px,calc(100%-2.5rem))] gap-4">
// 0062 |         <Card>
// 0063 |           <CardHeader>
// 0064 |             <CardTitle>Admin login required</CardTitle>
// 0065 |             <CardDescription>Use Auth0 to log into the dashboard.</CardDescription>
// 0066 |           </CardHeader>
// 0067 |           <CardContent className="flex flex-wrap items-center gap-2.5">
// 0068 |             <Button onClick={() => loginWithRedirect()}>
// 0069 |               <Lock size={16} />
// 0070 |               Log in with Auth0
// 0071 |             </Button>
// 0072 |             <Link to="/">
// 0073 |               <Button variant="ghost">Back to home</Button>
// 0074 |             </Link>
// 0075 |           </CardContent>
// 0076 |         </Card>
// 0077 |       </main>
// 0078 |     )
// 0079 |   }
// 0080 | 
// 0081 |   if (tokenQuery.isPending) {
// 0082 |     return (
// 0083 |       <main className="mx-auto my-10 grid w-[min(1120px,calc(100%-2.5rem))] gap-4">
// 0084 |         <Card>
// 0085 |           <CardHeader>
// 0086 |             <CardTitle>Getting access token...</CardTitle>
// 0087 |             <CardDescription>Loading your API token for dashboard requests.</CardDescription>
// 0088 |           </CardHeader>
// 0089 |         </Card>
// 0090 |       </main>
// 0091 |     )
// 0092 |   }
// 0093 | 
// 0094 |   if (tokenQuery.isError) {
// 0095 |     return (
// 0096 |       <main className="mx-auto my-10 grid w-[min(1120px,calc(100%-2.5rem))] gap-4">
// 0097 |         <Card>
// 0098 |           <CardHeader>
// 0099 |             <CardTitle>Token error</CardTitle>
// 0100 |             <CardDescription>Could not get an Auth0 API token for dashboard access.</CardDescription>
// 0101 |           </CardHeader>
// 0102 |           <CardContent>
// 0103 |             <p className="text-textMuted">{tokenQuery.error.message}</p>
// 0104 |           </CardContent>
// 0105 |         </Card>
// 0106 |       </main>
// 0107 |     )
// 0108 |   }
// 0109 | 
// 0110 |   if (!adminGate.isAdmin) {
// 0111 |     return (
// 0112 |       <main className="mx-auto my-10 grid w-[min(1120px,calc(100%-2.5rem))] gap-4">
// 0113 |         <Card>
// 0114 |           <CardHeader>
// 0115 |             <CardTitle>Access denied</CardTitle>
// 0116 |             <CardDescription>Your account is authenticated but does not have admin access.</CardDescription>
// 0117 |           </CardHeader>
// 0118 |           <CardContent className="grid gap-2">
// 0119 |             <p className="text-textMuted">Signed in as {user?.email ?? user?.name ?? "Unknown user"}</p>
// 0120 |             <p className="text-textMuted">Subject: {adminGate.subject ?? "Unavailable"}</p>
// 0121 |             <Button variant="ghost" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
// 0122 |               <LogOut size={16} />
// 0123 |               Log out
// 0124 |             </Button>
// 0125 |           </CardContent>
// 0126 |         </Card>
// 0127 |       </main>
// 0128 |     )
// 0129 |   }
// 0130 | 
// 0131 |   return (
// 0132 |     <AdminSessionContext.Provider
// 0133 |       value={{
// 0134 |         trpcClient: createDashboardTrpcClient(tokenQuery.data),
// 0135 |         user,
// 0136 |         subject: adminGate.subject,
// 0137 |       }}
// 0138 |     >
// 0139 |       {children}
// 0140 |     </AdminSessionContext.Provider>
// 0141 |   )
// 0142 | }
