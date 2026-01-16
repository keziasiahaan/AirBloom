"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SensorManagement } from "./sensor-management"
import { SystemMonitoring } from "./system-monitoring"
import { Activity, Database, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { QuickActions } from "@/components/dashboard/quick-actions"

export function AdminDashboard() {
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <Link href="/">
        <Button variant="ghost" className="gap-2 -ml-2 mb-2">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Dashboard
        </Button>
      </Link>

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
          <Activity className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Panel Admin</h1>
          <p className="text-sm text-muted-foreground">Manajemen sistem monitoring kualitas udara</p>
        </div>
      </div>

      <QuickActions />

      <Tabs defaultValue="monitoring" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="monitoring" className="gap-2">
            <Activity className="h-4 w-4" />
            Monitoring
          </TabsTrigger>
          <TabsTrigger value="sensors" className="gap-2">
            <Database className="h-4 w-4" />
            Manajemen Sensor
          </TabsTrigger>
        </TabsList>

        <TabsContent value="monitoring" className="space-y-4">
          <SystemMonitoring />
        </TabsContent>

        <TabsContent value="sensors" className="space-y-4">
          <SensorManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}
