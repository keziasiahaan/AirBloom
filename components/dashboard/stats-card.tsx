import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  description?: string
  value: string | number
  icon?: LucideIcon
  location?: string
  trend?: {
    value: number
    direction: "up" | "down"
  }
  variant?: "default" | "accent" | "warning" | "danger"
}

export function StatsCard({
  title,
  description,
  value,
  icon: Icon,
  location,
  trend,
  variant = "default",
}: StatsCardProps) {
  const variantStyles = {
    default: "border-primary/20",
    accent: "border-accent/30 bg-accent/5",
    warning: "border-yellow-200/50 dark:border-yellow-900/50",
    danger: "border-red-200/50 dark:border-red-900/50",
  }

  return (
    <Card className={`border-2 ${variantStyles[variant]}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 flex-1 min-w-0">
            <CardTitle className="text-sm md:text-base font-medium truncate">{title}</CardTitle>
            {description && <CardDescription className="text-xs truncate">{description}</CardDescription>}
            {location && <CardDescription className="text-xs truncate">{location}</CardDescription>}
          </div>
          {Icon && <Icon className="h-4 w-4 text-primary opacity-60 flex-shrink-0" />}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 min-w-0">
          <div className="text-2xl md:text-3xl font-bold truncate">{value}</div>
          {trend && (
            <div className={`text-xs font-medium ${trend.direction === "up" ? "text-orange-600" : "text-green-600"}`}>
              {trend.direction === "up" ? "↑" : "↓"} {Math.abs(trend.value)}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
