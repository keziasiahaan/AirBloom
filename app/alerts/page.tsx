"use client"

import { useEffect, useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

type AlertData = {
  id: number
  title: string
  location: string
  level: string
  message: string
  createdAt: string
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<AlertData[]>([])

  useEffect(() => {
    fetch("/api/alerts")
      .then((res) => res.json())
      .then((data) => setAlerts(data))
      .catch((error) => console.error("Gagal mengambil data alert:", error))
  }, [])

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        <div className="flex flex-col gap-6 p-6 md:p-8">
          <div>
            <h1 className="text-3xl font-bold">Peringatan & Notifikasi</h1>
            <p className="text-muted-foreground mt-2">
              Peringatan kualitas udara untuk lokasi kampus
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Peringatan Aktif ({alerts.length})
              </CardTitle>
            </CardHeader>

            <CardContent>
              {alerts.length === 0 ? (
                <p className="text-muted-foreground">
                  Tidak ada peringatan aktif
                </p>
              ) : (
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <Alert
                      key={alert.id}
                      className={
                        alert.level === "Berbahaya" ||
                        alert.level === "Tidak Sehat" ||
                        alert.level === "severe"
                          ? "border-destructive/50 bg-destructive/10"
                          : "border-yellow-200/50 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800/50"
                      }
                    >
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>{alert.location}</strong> - {alert.message}
                        <br />
                        <span className="text-xs text-muted-foreground">
                          Status: {alert.level} | Tanggal: {alert.createdAt}
                        </span>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}