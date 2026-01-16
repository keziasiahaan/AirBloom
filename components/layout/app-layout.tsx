"use client"

import type React from "react"
import { Sidebar } from "@/components/navigation/sidebar"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
