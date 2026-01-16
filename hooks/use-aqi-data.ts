"use client"

import { useState, useEffect } from "react"

export interface AQIReading {
  id: string
  location: string
  aqi: number
  pm25: number
  pm10: number
  o3: number
  no2: number
  co: number
  timestamp: Date
  lat: number
  lng: number
}

export interface AQIAlert {
  id: string
  location: string
  level: "good" | "moderate" | "unhealthy" | "severe"
  message: string
  timestamp: Date
}

// Mock data for development
const MOCK_AQI_DATA: AQIReading[] = [
  {
    id: "1",
    location: "Kampus Utama",
    aqi: 78,
    pm25: 22.4,
    pm10: 45.8,
    o3: 42,
    no2: 28,
    co: 1.1,
    timestamp: new Date(),
    lat: -6.1467,
    lng: 106.7293,
  },
  {
    id: "2",
    location: "Laboratorium Gedung A",
    aqi: 92,
    pm25: 31.2,
    pm10: 58.4,
    o3: 55,
    no2: 38,
    co: 1.5,
    timestamp: new Date(),
    lat: -6.147,
    lng: 106.7298,
  },
  {
    id: "3",
    location: "Kompleks Olahraga",
    aqi: 65,
    pm25: 18.5,
    pm10: 38.2,
    o3: 35,
    no2: 22,
    co: 0.9,
    timestamp: new Date(),
    lat: -6.1464,
    lng: 106.729,
  },
  {
    id: "4",
    location: "Pusat Mahasiswa",
    aqi: 84,
    pm25: 27.8,
    pm10: 51.3,
    o3: 48,
    no2: 32,
    co: 1.3,
    timestamp: new Date(),
    lat: -6.1473,
    lng: 106.7301,
  },
]

export function useAQIData() {
  const [readings, setReadings] = useState<AQIReading[]>(MOCK_AQI_DATA)
  const [alerts, setAlerts] = useState<AQIAlert[]>([
    {
      id: "1",
      location: "Laboratorium Gedung A",
      level: "moderate",
      message: "Kualitas udara sedang. Individu sensitif disarankan membatasi aktivitas di luar ruangan.",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Simulate data refresh
    const interval = setInterval(() => {
      setReadings((prev) =>
        prev.map((reading) => ({
          ...reading,
          aqi: Math.max(30, Math.min(150, reading.aqi + (Math.random() - 0.5) * 8)),
          pm25: Math.max(5, Math.min(80, reading.pm25 + (Math.random() - 0.5) * 3)),
          timestamp: new Date(),
        })),
      )
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const getAverageAQI = () => {
    const avg = readings.reduce((sum, r) => sum + r.aqi, 0) / readings.length
    return Math.round(avg)
  }

  const getAQILevel = (aqi: number): "good" | "moderate" | "unhealthy" | "severe" => {
    if (aqi <= 50) return "good"
    if (aqi <= 100) return "moderate"
    if (aqi <= 150) return "unhealthy"
    return "severe"
  }

  const getAQILevelLabel = (level: "good" | "moderate" | "unhealthy" | "severe"): string => {
    const labels: Record<"good" | "moderate" | "unhealthy" | "severe", string> = {
      good: "Baik",
      moderate: "Sedang",
      unhealthy: "Tidak Sehat",
      severe: "Sangat Berbahaya",
    }
    return labels[level]
  }

  const getAQIColor = (aqi: number): string => {
    const level = getAQILevel(aqi)
    switch (level) {
      case "good":
        return "text-green-600"
      case "moderate":
        return "text-yellow-600"
      case "unhealthy":
        return "text-orange-600"
      case "severe":
        return "text-red-600"
    }
  }

  return {
    readings,
    alerts,
    isLoading,
    getAverageAQI,
    getAQILevel,
    getAQILevelLabel,
    getAQIColor,
  }
}
