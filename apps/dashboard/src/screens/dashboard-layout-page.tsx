import { useAuth0 } from "@auth0/auth0-react"
import { Link, Outlet, useLocation } from "@tanstack/react-router"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AdminGuard, useAdminSession } from "@/components/admin-guard"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Projects", to: "/dashboard" },
  { label: "Experience", to: "/dashboard/experience" },
  { label: "Education", to: "/dashboard/education" },
  { label: "Employers", to: "/dashboard/employers" },
  { label: "Schools", to: "/dashboard/schools" },
] as const

const DashboardFrame = () => {
  const location = useLocation()
  const { logout } = useAuth0()
  const { user, subject } = useAdminSession()

  return (
    <main className="mx-auto my-6 grid w-[min(1260px,calc(100%-2rem))] grid-cols-1 gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="grid h-fit content-start gap-4 rounded-panel border border-line bg-surface p-4 lg:sticky lg:top-4">
        <div className="grid gap-2">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-brandSoft">Portfolio Admin</p>
          <h2>Dashboard</h2>
        </div>
        <nav className="grid gap-1.5">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "rounded-[10px] border border-line bg-surfaceSoft px-3 py-2 font-semibold",
                location.pathname === item.to && "border-[#98b09f] bg-[#dce8df]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="grid gap-2 border-t border-line pt-3">
          <p className="text-sm text-textMuted">{user?.email ?? user?.name ?? subject ?? "Unknown user"}</p>
          <Button variant="ghost" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            <LogOut size={16} />
            Log out
          </Button>
        </div>
      </aside>
      <section className="grid gap-4">
        <Outlet />
      </section>
    </main>
  )
}

export const DashboardLayoutPage = () => (
  <AdminGuard>
    <DashboardFrame />
  </AdminGuard>
)
