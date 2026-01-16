"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AnimatedWind, AnimatedClouds, AnimatedSun, AnimatedPollution } from "@/components/ui/animated-weather"
import { TrendingUp, Activity } from "lucide-react"
import { HistoricalDataModal } from "./historical-data-modal"
import { ActivityRecommendationsModal } from "./activity-recommendations-modal"

export function QuickActions() {
  const [showHistoricalData, setShowHistoricalData] = useState(false)
  const [showActivityRecommendations, setShowActivityRecommendations] = useState(false)

  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg p-4 flex flex-col items-center justify-center gap-2 border border-blue-200 dark:border-blue-800">
            <div className="text-blue-600 dark:text-blue-300">
              <AnimatedWind />
            </div>
            <span className="text-xs font-medium text-blue-900 dark:text-blue-100">Angin</span>
            <span className="text-xs text-blue-700 dark:text-blue-200">5.2 m/s</span>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950 dark:to-cyan-900 rounded-lg p-4 flex flex-col items-center justify-center gap-2 border border-cyan-200 dark:border-cyan-800">
            <div className="text-cyan-600 dark:text-cyan-300">
              <AnimatedClouds />
            </div>
            <span className="text-xs font-medium text-cyan-900 dark:text-cyan-100">Kelembaban</span>
            <span className="text-xs text-cyan-700 dark:text-cyan-200">75%</span>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 rounded-lg p-4 flex flex-col items-center justify-center gap-2 border border-yellow-200 dark:border-yellow-800">
            <div className="text-yellow-600 dark:text-yellow-300">
              <AnimatedSun />
            </div>
            <span className="text-xs font-medium text-yellow-900 dark:text-yellow-100">Suhu</span>
            <span className="text-xs text-yellow-700 dark:text-yellow-200">28°C</span>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-orange-100 dark:from-red-950 dark:to-orange-900 rounded-lg p-4 flex flex-col items-center justify-center gap-2 border border-red-200 dark:border-orange-800">
            <div className="text-red-600 dark:text-red-300">
              <AnimatedPollution />
            </div>
            <span className="text-xs font-medium text-red-900 dark:text-orange-100">Polusi</span>
            <span className="text-xs text-red-700 dark:text-orange-200">Sedang</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            className="bg-gradient-to-br from-sky-100 to-blue-200 hover:from-sky-200 hover:to-blue-300 text-blue-900 border-blue-300 shadow-sm hover:shadow-md transition-all"
            onClick={() => setShowHistoricalData(true)}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Data Historis
          </Button>
          <Button
            className="bg-gradient-to-br from-sky-100 to-blue-200 hover:from-sky-200 hover:to-blue-300 text-blue-900 border-blue-300 shadow-sm hover:shadow-md transition-all"
            onClick={() => setShowActivityRecommendations(true)}
          >
            <Activity className="h-4 w-4 mr-2" />
            Rekomendasi Aktivitas
          </Button>
        </div>
      </div>

      <HistoricalDataModal open={showHistoricalData} onOpenChange={setShowHistoricalData} />
      <ActivityRecommendationsModal open={showActivityRecommendations} onOpenChange={setShowActivityRecommendations} />
    </>
  )
}
