"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { Spinner } from "@/components/ui/spinner"

export default function AdminPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "admin")) {
      router.push("/login")
    }
  }, [isAuthenticated, user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null
  }

  return (
    <div className="relative">
      <button
        onClick={() => router.push("/admin/alerts")}
        className="absolute right-6 top-6 z-10 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Kelola Alert
      </button>

      <AdminDashboard />
    </div>
  )
}