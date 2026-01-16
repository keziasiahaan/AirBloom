"use client"

import { Button } from "@/components/ui/button"
import { AnimatedSun } from "@/components/ui/animated-weather"
import { Settings } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-card backdrop-blur supports-[backdrop-filter]:bg-card/95">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <AnimatedSun />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary">AirBloom</h1>
            <p className="text-xs text-muted-foreground">Monitor Kualitas Udara Kampus</p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
