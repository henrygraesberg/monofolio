// 0001 | import { useAuth0 } from "@auth0/auth0-react"
// 0002 | import { Link, Outlet, useLocation } from "@tanstack/react-router"
// 0003 | import { LogOut } from "lucide-react"
// 0004 | import { Button } from "@/components/ui/button"
// 0005 | import { AdminGuard, useAdminSession } from "@/components/admin-guard"
// 0006 | import { cn } from "@/lib/utils"
// 0007 | 
// 0008 | const navItems = [
// 0009 |   { label: "Projects", to: "/dashboard" },
// 0010 |   { label: "Experience", to: "/dashboard/experience" },
// 0011 |   { label: "Education", to: "/dashboard/education" },
// 0012 |   { label: "Employers", to: "/dashboard/employers" },
// 0013 |   { label: "Schools", to: "/dashboard/schools" },
// 0014 | ] as const
// 0015 | 
// 0016 | const DashboardFrame = () => {
// 0017 |   const location = useLocation()
// 0018 |   const { logout } = useAuth0()
// 0019 |   const { user, subject } = useAdminSession()
// 0020 | 
// 0021 |   return (
// 0022 |     <main className="mx-auto my-6 grid w-[min(1260px,calc(100%-2rem))] grid-cols-1 gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
// 0023 |       <aside className="grid h-fit content-start gap-4 rounded-panel border border-line bg-surface p-4 lg:sticky lg:top-4">
// 0024 |         <div className="grid gap-2">
// 0025 |           <p className="text-xs font-bold uppercase tracking-[0.08em] text-brandSoft">Portfolio Admin</p>
// 0026 |           <h2>Dashboard</h2>
// 0027 |         </div>
// 0028 |         <nav className="grid gap-1.5">
// 0029 |           {navItems.map((item) => (
// 0030 |             <Link
// 0031 |               key={item.to}
// 0032 |               to={item.to}
// 0033 |               className={cn(
// 0034 |                 "rounded-[10px] border border-line bg-surfaceSoft px-3 py-2 font-semibold",
// 0035 |                 location.pathname === item.to && "border-[#98b09f] bg-[#dce8df]"
// 0036 |               )}
// 0037 |             >
// 0038 |               {item.label}
// 0039 |             </Link>
// 0040 |           ))}
// 0041 |         </nav>
// 0042 |         <div className="grid gap-2 border-t border-line pt-3">
// 0043 |           <p className="text-sm text-textMuted">{user?.email ?? user?.name ?? subject ?? "Unknown user"}</p>
// 0044 |           <Button variant="ghost" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
// 0045 |             <LogOut size={16} />
// 0046 |             Log out
// 0047 |           </Button>
// 0048 |         </div>
// 0049 |       </aside>
// 0050 |       <section className="grid gap-4">
// 0051 |         <Outlet />
// 0052 |       </section>
// 0053 |     </main>
// 0054 |   )
// 0055 | }
// 0056 | 
// 0057 | export const DashboardLayoutPage = () => (
// 0058 |   <AdminGuard>
// 0059 |     <DashboardFrame />
// 0060 |   </AdminGuard>
// 0061 | )
