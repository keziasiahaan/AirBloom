"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, TrendingDown, TrendingUp } from "lucide-react"

interface HistoricalDataModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Generate sample historical data for the past 7 days
const generateHistoricalData = () => {
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]
  const data = []
  const baseAQI = 75

  for (let i = 6; i >= 0; i--) {
    const dayIndex = (new Date().getDay() - i + 7) % 7
    const variation = Math.random() * 30 - 15
    const aqi = Math.round(baseAQI + variation)

    data.push({
      day: days[dayIndex],
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
      }),
      aqi: aqi,
      pm25: Math.round(aqi * 0.4 + Math.random() * 10),
      pm10: Math.round(aqi * 0.6 + Math.random() * 15),
      trend: i === 0 ? 0 : Math.random() > 0.5 ? 1 : -1,
    })
  }

  return data
}

const getAQILevel = (aqi: number) => {
  if (aqi <= 50) return { label: "Baik", color: "text-green-600" }
  if (aqi <= 100) return { label: "Sedang", color: "text-yellow-600" }
  if (aqi <= 150) return { label: "Tidak Sehat", color: "text-orange-600" }
  return { label: "Berbahaya", color: "text-red-600" }
}

export function HistoricalDataModal({ open, onOpenChange }: HistoricalDataModalProps) {
  const historicalData = generateHistoricalData()
  const weeklyAverage = Math.round(historicalData.reduce((sum, d) => sum + d.aqi, 0) / historicalData.length)
  const weeklyLevel = getAQILevel(weeklyAverage)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Data Historis Kualitas Udara
          </DialogTitle>
          <DialogDescription>Data pemantauan kualitas udara 7 hari terakhir</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary Card */}
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Rata-rata Mingguan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold">{weeklyAverage}</span>
                <span className={`text-lg font-semibold ${weeklyLevel.color}`}>{weeklyLevel.label}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Berdasarkan rata-rata 7 hari terakhir</p>
            </CardContent>
          </Card>

          {/* Tabs for different views */}
          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="daily">Harian</TabsTrigger>
              <TabsTrigger value="pollutants">Polutan</TabsTrigger>
            </TabsList>

            <TabsContent value="daily" className="space-y-3 mt-4">
              {historicalData.map((data, index) => {
                const level = getAQILevel(data.aqi)
                return (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{data.day}</span>
                            <span className="text-sm text-muted-foreground">{data.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold">{data.aqi}</span>
                            <span className={`text-sm font-medium ${level.color}`}>{level.label}</span>
                            {data.trend !== 0 && (
                              <span className="flex items-center text-xs text-muted-foreground">
                                {data.trend > 0 ? (
                                  <TrendingUp className="h-3 w-3 text-red-500" />
                                ) : (
                                  <TrendingDown className="h-3 w-3 text-green-500" />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-4 text-right">
                          <div>
                            <p className="text-xs text-muted-foreground">PM2.5</p>
                            <p className="text-lg font-semibold">{data.pm25}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">PM10</p>
                            <p className="text-lg font-semibold">{data.pm10}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </TabsContent>

            <TabsContent value="pollutants" className="space-y-3 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">PM2.5 (Partikulat Halus)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {historicalData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                      <span className="text-sm font-medium">{data.day}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${Math.min((data.pm25 / 100) * 100, 100)}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold w-12 text-right">{data.pm25}</span>
                        <span className="text-xs text-muted-foreground">µg/m³</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">PM10 (Partikulat Kasar)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {historicalData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                      <span className="text-sm font-medium">{data.day}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-cyan-500 rounded-full"
                            style={{ width: `${Math.min((data.pm10 / 150) * 100, 100)}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold w-12 text-right">{data.pm10}</span>
                        <span className="text-xs text-muted-foreground">µg/m³</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
