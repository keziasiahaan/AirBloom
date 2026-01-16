"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { SettingsIcon, Bell } from "lucide-react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)
  const [notifications, setNotifications] = useState(true)

  useEffect(() => {
    setMounted(true)
    const savedNotifications = localStorage.getItem("airbloom-notifications")
    if (savedNotifications !== null) {
      setNotifications(savedNotifications === "true")
    }
  }, [])

  const handleNotificationChange = (checked: boolean) => {
    setNotifications(checked)
    localStorage.setItem("airbloom-notifications", String(checked))

    toast({
      title: checked ? "Notifikasi diaktifkan" : "Notifikasi dinonaktifkan",
      description: checked ? "Anda akan menerima peringatan kualitas udara" : "Anda tidak akan menerima peringatan",
    })
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        <div className="flex flex-col gap-6 p-6 md:p-8 max-w-2xl">
          <div>
            <h1 className="text-3xl font-bold">Pengaturan</h1>
            <p className="text-muted-foreground mt-2">Kelola preferensi AirBloom Anda</p>
          </div>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5 text-primary" />
                Notifikasi
              </CardTitle>
              <CardDescription>Atur bagaimana Anda menerima peringatan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div className="flex flex-col">
                    <Label htmlFor="notifications" className="cursor-pointer">
                      Aktifkan notifikasi
                    </Label>
                    <p className="text-sm text-muted-foreground">Terima peringatan kualitas udara</p>
                  </div>
                </div>
                <Switch id="notifications" checked={notifications} onCheckedChange={handleNotificationChange} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
