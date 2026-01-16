"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AQIBadge } from "@/components/ui/aqi-badge"
import { AnimatedWind, AnimatedPollution } from "@/components/ui/animated-weather"
import { Wind, AlertTriangle, Leaf } from "lucide-react"

interface AQIHeroProps {
  averageAQI: number
  aqiLevel: "good" | "moderate" | "unhealthy" | "severe"
  locationsCount: number
  bestAQI: number
  bestLocation: string
  worstAQI: number
  worstLocation: string
}

export function AQIHero({
  averageAQI,
  aqiLevel,
  locationsCount,
  bestAQI,
  bestLocation,
  worstAQI,
  worstLocation,
}: AQIHeroProps) {
  const getStatusLabel = (level: string): string => {
    const labels: Record<string, string> = {
      good: "Baik",
      moderate: "Sedang",
      unhealthy: "Tidak Sehat",
      severe: "Sangat Berbahaya",
    }
    return labels[level] || level
  }

  return (
    <div className="grid gap-4 md:gap-6 md:grid-cols-3">
      {/* Main AQI Card */}
      <Card className="md:col-span-1 border border-border/50 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-5 text-accent">
          <AnimatedWind />
        </div>
        <CardHeader className="pb-2 relative z-10">
          <CardTitle className="flex items-center gap-2 text-sm md:text-base">
            <Wind className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
            <span className="truncate">Rata-rata AQI</span>
          </CardTitle>
          <CardDescription className="text-xs">Pemantauan real-time</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 relative z-10">
          <div
            className={`text-3xl md:text-5xl font-bold transition-colors line-clamp-1 ${
              aqiLevel === "good"
                ? "text-green-600 dark:text-green-400"
                : aqiLevel === "moderate"
                  ? "text-yellow-600 dark:text-yellow-400"
                  : aqiLevel === "unhealthy"
                    ? "text-orange-600 dark:text-orange-400"
                    : "text-red-600 dark:text-red-400"
            }`}
          >
            {averageAQI}
          </div>
          <AQIBadge level={aqiLevel} aqi={averageAQI} />
          <p className="text-xs text-muted-foreground">Dari {locationsCount} lokasi</p>
        </CardContent>
      </Card>

      {/* Best Location */}
      <Card className="border border-border/50 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 text-green-600 dark:text-green-400">
          <AnimatedWind />
        </div>
        <CardHeader className="pb-2 relative z-10">
          <CardTitle className="flex items-center gap-2 text-xs md:text-sm">
            <Leaf className="h-4 w-4 text-accent flex-shrink-0" />
            <span className="truncate">Terbersih</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 relative z-10">
          <p className="text-2xl md:text-2xl font-bold text-accent line-clamp-1">{bestAQI}</p>
          <p className="text-xs md:text-sm font-medium text-foreground truncate">{bestLocation}</p>
          <p className="text-xs text-muted-foreground">Status: {getStatusLabel(aqiLevel)}</p>
        </CardContent>
      </Card>

      {/* Worst Location */}
      <Card className="border border-border/50 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 text-destructive">
          <AnimatedPollution />
        </div>
        <CardHeader className="pb-2 relative z-10">
          <CardTitle className="flex items-center gap-2 text-xs md:text-sm">
            <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0" />
            <span className="truncate">Tercemar</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 relative z-10">
          <p className="text-2xl md:text-2xl font-bold text-destructive line-clamp-1">{worstAQI}</p>
          <p className="text-xs md:text-sm font-medium text-foreground truncate">{worstLocation}</p>
          <p className="text-xs text-muted-foreground">Perlu perhatian</p>
        </CardContent>
      </Card>
    </div>
  )
}
