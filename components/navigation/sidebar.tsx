"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { MapPin, Bell, Settings, BarChart3, Menu, X, Leaf, LogOut, LogIn, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  icon: typeof MapPin
  label: string
  href: string
  adminOnly?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { icon: BarChart3, label: "Dasbor", href: "/" },
  { icon: MapPin, label: "Peta", href: "/map" },
  { icon: Bell, label: "Peringatan", href: "/alerts" },
  { icon: Settings, label: "Pengaturan", href: "/settings" },
  { icon: Shield, label: "Panel Admin", href: "/admin", adminOnly: true },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout, isAuthenticated } = useAuth()

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  const handleLogin = () => {
    router.push("/login")
    setIsOpen(false)
  }

  const visibleNavItems = NAV_ITEMS.filter((item) => !item.adminOnly || (isAuthenticated && user?.role === "admin"))

  return (
    <>
      {/* Mobile Toggle */}
      <div className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-card px-4 md:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-primary">AirBloom</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-card transition-transform md:static md:top-0 md:h-screen md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo - Desktop Only */}
          <div className="hidden md:flex items-center gap-2 border-b p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-primary">AirBloom</span>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 flex flex-col gap-2 p-4">
            {visibleNavItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={cn("w-full justify-start gap-3", isActive && "bg-primary text-primary-foreground")}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              )
            })}
          </nav>

          <div className="border-t p-4 space-y-3">
            {isAuthenticated && user ? (
              <>
                <div className="px-3 py-2 bg-secondary rounded-lg">
                  <p className="text-xs text-muted-foreground">Masuk sebagai:</p>
                  <p className="font-medium text-sm text-foreground truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.role === "admin" ? "Administrator" : "Pengguna"}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10 bg-transparent"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Keluar</span>
                </Button>
              </>
            ) : (
              <Button
                variant="default"
                className="w-full justify-start gap-3 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleLogin}
              >
                <LogIn className="h-5 w-5" />
                <span>Masuk Admin</span>
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 top-16 z-30 bg-black/50 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
