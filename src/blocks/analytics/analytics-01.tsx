"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUpIcon, TrendingDownIcon, UsersIcon, DollarSignIcon, MousePointerClickIcon, EyeIcon } from "lucide-react"
import { motion } from "framer-motion"

const kpis = [
  {
    label: "Revenue",
    value: "$127,493",
    change: "+12.4%",
    trend: "up" as const,
    icon: DollarSignIcon,
    sparkline: [32, 38, 35, 42, 40, 48, 52, 50, 55, 58, 62, 68],
    color: "oklch(0.55 0.15 160)",
  },
  {
    label: "Active Users",
    value: "8,241",
    change: "+5.7%",
    trend: "up" as const,
    icon: UsersIcon,
    sparkline: [45, 42, 48, 50, 47, 52, 55, 53, 58, 56, 60, 57],
    color: "oklch(0.55 0.18 250)",
  },
  {
    label: "Click Rate",
    value: "4.32%",
    change: "-0.8%",
    trend: "down" as const,
    icon: MousePointerClickIcon,
    sparkline: [60, 58, 55, 57, 52, 50, 48, 51, 47, 45, 44, 42],
    color: "oklch(0.65 0.20 30)",
  },
  {
    label: "Page Views",
    value: "342.1K",
    change: "+18.3%",
    trend: "up" as const,
    icon: EyeIcon,
    sparkline: [20, 25, 28, 32, 35, 38, 42, 48, 55, 60, 65, 72],
    color: "oklch(0.60 0.15 280)",
  },
]

function Sparkline({ data, color, width = 80, height = 32 }: { data: number[]; color: string; width?: number; height?: number }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const padding = 2

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * (width - padding * 2) + padding
    const y = height - padding - ((v - min) / range) * (height - padding * 2)
    return `${x},${y}`
  })

  const areaPoints = [...points, `${width - padding},${height}`, `${padding},${height}`]

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`spark-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints.join(" ")} fill={`url(#spark-${color})`} />
      <motion.polyline
        points={points.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </svg>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Analytics01() {
  return (
    <motion.div
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {kpis.map((kpi) => (
        <motion.div key={kpi.label} variants={itemVariants}>
          <Card
            className="transition-all"
            style={{
              boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {kpi.label}
                </span>
                <kpi.icon className="size-4 text-muted-foreground/50" />
              </div>
              <CardTitle className="text-2xl font-semibold tabular-nums tracking-tight">
                {kpi.value}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between gap-3">
                <Badge variant={kpi.trend === "up" ? "secondary" : "destructive"} className="text-[10px]">
                  {kpi.trend === "up" ? <TrendingUpIcon className="size-2.5" /> : <TrendingDownIcon className="size-2.5" />}
                  {kpi.change}
                </Badge>
                <Sparkline data={kpi.sparkline} color={kpi.color} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
