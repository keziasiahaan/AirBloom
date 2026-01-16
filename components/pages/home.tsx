"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AQIBadge } from "@/components/ui/aqi-badge"
import { DashboardHeader } from "@/components/dashboard/header"
import { AQIHero } from "@/components/dashboard/aqi-hero"
import { StatsCard } from "@/components/dashboard/stats-card"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { AnimatedWind, AnimatedClouds, AnimatedPollution } from "@/components/ui/animated-weather"
import { useAQIData } from "@/hooks/use-aqi-data"
import { AlertTriangle, MapPin } from "lucide-react"

export function Home() {
  const { readings, alerts, getAverageAQI, getAQILevel } = useAQIData()
  const averageAQI = getAverageAQI()
  const aqiLevel = getAQILevel(averageAQI)

  const topReading = readings.reduce((max, r) => (r.aqi > max.aqi ? r : max))
  const bestReading = readings.reduce((min, r) => (r.aqi < min.aqi ? r : min))

  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader />

      {/* Main Content */}
      <div className="flex flex-col gap-8 p-6 md:p-8">
        {/* Hero Section */}
        <AQIHero
          averageAQI={averageAQI}
          aqiLevel={aqiLevel}
          locationsCount={readings.length}
          bestAQI={bestReading.aqi}
          bestLocation={bestReading.location}
          worstAQI={topReading.aqi}
          worstLocation={topReading.location}
        />

        <section>
          <QuickActions />
        </section>

        {/* Alerts */}
        {alerts.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Peringatan Aktif</h2>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <Alert
                  key={alert.id}
                  className={
                    alert.level === "severe"
                      ? "border-destructive/30 bg-destructive/5"
                      : "border-yellow-200/40 bg-yellow-50/50 dark:bg-yellow-900/15 dark:border-yellow-800/30"
                  }
                >
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>{alert.location}</strong> - {alert.message}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </section>
        )}

        {/* Stats Section */}
        <section className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          <StatsCard title="Lokasi Terersih" value={bestReading.aqi} location={bestReading.location} icon={MapPin} />
          <StatsCard
            title="Paling Tercemar"
            value={topReading.aqi}
            location={topReading.location}
            icon={AlertTriangle}
            variant="danger"
          />
        </section>

        {/* All Locations Grid */}
        <section className="space-y-4">
          <h2 className="text-base md:text-lg font-semibold">Lokasi Pemantauan</h2>
          <div className="grid gap-3 md:gap-4 md:grid-cols-2 lg:grid-cols-3">
            {readings.map((reading) => (
              <Card
                key={reading.id}
                className="border border-border/50 hover:border-border transition-colors shadow-sm relative overflow-hidden group"
              >
                <div className="absolute top-2 right-2 opacity-5 group-hover:opacity-10 transition-opacity">
                  {reading.aqi > 100 ? <AnimatedPollution /> : reading.aqi > 50 ? <AnimatedClouds /> : <AnimatedWind />}
                </div>

                <CardHeader className="pb-2 relative z-10">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 flex-1 min-w-0">
                      <CardTitle className="text-sm md:text-base flex items-center gap-2 truncate">
                        <MapPin className="h-3 w-3 md:h-4 md:w-4 text-primary flex-shrink-0" />
                        <span className="truncate">{reading.location}</span>
                      </CardTitle>
                    </div>
                    <div className="flex-shrink-0">
                      <AQIBadge level={getAQILevel(reading.aqi)} aqi={reading.aqi} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1 min-w-0">
                      <p className="text-xs font-medium text-muted-foreground">PM2.5</p>
                      <p className="text-lg md:text-xl font-semibold truncate">{reading.pm25.toFixed(1)}</p>
                      <p className="text-xs text-muted-foreground">µg/m³</p>
                    </div>
                    <div className="space-y-1 min-w-0">
                      <p className="text-xs font-medium text-muted-foreground">PM10</p>
                      <p className="text-lg md:text-xl font-semibold truncate">{reading.pm10.toFixed(1)}</p>
                      <p className="text-xs text-muted-foreground">µg/m³</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
