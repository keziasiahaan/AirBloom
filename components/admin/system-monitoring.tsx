"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Wifi, Database, Zap, Users, AlertTriangle } from "lucide-react"
import { useEffect, useState } from "react"

interface SystemStats {
  activeSensors: number
  totalSensors: number
  dataPoints: number
  activeUsers: number
  systemUptime: number
  lastUpdate: string
}

export function SystemMonitoring() {
  const [stats, setStats] = useState<SystemStats>({
    activeSensors: 8,
    totalSensors: 10,
    dataPoints: 1543,
    activeUsers: 23,
    systemUptime: 99.8,
    lastUpdate: new Date().toLocaleTimeString("id-ID"),
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        dataPoints: prev.dataPoints + Math.floor(Math.random() * 5),
        activeUsers: Math.max(15, Math.min(30, prev.activeUsers + Math.floor(Math.random() * 3) - 1)),
        lastUpdate: new Date().toLocaleTimeString("id-ID"),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const sensorUptime = (stats.activeSensors / stats.totalSensors) * 100

  return (
    <div className="space-y-4">
      {/* System Status Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status Sensor</CardTitle>
            <Wifi className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.activeSensors}/{stats.totalSensors}
            </div>
            <p className="text-xs text-muted-foreground">Sensor aktif</p>
            <Progress value={sensorUptime} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Points</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.dataPoints.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Data hari ini</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pengguna Aktif</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">Pengguna online</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.systemUptime}%</div>
            <p className="text-xs text-muted-foreground">30 hari terakhir</p>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Aktivitas Real-time
          </CardTitle>
          <CardDescription>Update terakhir: {stats.lastUpdate}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <Wifi className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Sensor PM2.5-01</p>
                  <p className="text-xs text-muted-foreground">Data baru diterima</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Online
              </Badge>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <Database className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Database Sync</p>
                  <p className="text-xs text-muted-foreground">Sinkronisasi data selesai</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Success
              </Badge>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Sensor PM10-03</p>
                  <p className="text-xs text-muted-foreground">Koneksi tidak stabil</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                Warning
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
