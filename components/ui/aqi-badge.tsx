import { cn } from "@/lib/utils"

interface AQIBadgeProps {
  level: "good" | "moderate" | "unhealthy" | "severe"
  aqi: number
}

export function AQIBadge({ level, aqi }: AQIBadgeProps) {
  const colors = {
    good: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    moderate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
    unhealthy: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
    severe: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  }

  const labels = {
    good: "Baik",
    moderate: "Sedang",
    unhealthy: "Tidak Sehat",
    severe: "Sangat Berbahaya",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap min-w-fit",
        colors[level],
      )}
    >
      {labels[level]} ({Math.round(aqi)})
    </span>
  )
}
