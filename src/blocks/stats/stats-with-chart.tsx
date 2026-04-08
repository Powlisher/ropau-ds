"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"
import { motion } from "framer-motion"

const stats = [
  {
    label: "Monthly Revenue",
    value: "$32,471",
    change: "+18.3%",
    trend: "up" as const,
    description: "Strong Q2 performance",
    sparkline: [28, 35, 42, 38, 52, 48, 65, 58, 72, 68, 78, 85],
  },
  {
    label: "New Signups",
    value: "1,293",
    change: "+5.7%",
    trend: "up" as const,
    description: "Organic growth steady",
    sparkline: [20, 25, 18, 30, 28, 35, 32, 40, 38, 42, 45, 48],
  },
  {
    label: "Churn Rate",
    value: "2.8%",
    change: "+0.3%",
    trend: "down" as const,
    description: "Needs retention focus",
    sparkline: [15, 18, 22, 20, 25, 28, 24, 30, 32, 28, 35, 32],
  },
]

function Sparkline({ data, trend }: { data: number[]; trend: "up" | "down" }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const width = 120
  const height = 32
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`)
    .join(" ")

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`spark-${trend}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={trend === "up" ? "oklch(0.478 0.227 3.6)" : "oklch(0.577 0.245 27.325)"} stopOpacity="0.3" />
          <stop offset="100%" stopColor={trend === "up" ? "oklch(0.478 0.227 3.6)" : "oklch(0.577 0.245 27.325)"} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${height} ${points} ${width},${height}`}
        fill={`url(#spark-${trend})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={trend === "up" ? "oklch(0.478 0.227 3.6)" : "oklch(0.577 0.245 27.325)"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
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

export default function StatsWithChart() {
  return (
    <motion.div
      className="grid grid-cols-1 gap-5 md:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat) => (
        <motion.div key={stat.label} variants={itemVariants}>
          <Card
            style={{
              boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardDescription>{stat.label}</CardDescription>
                <Badge variant={stat.trend === "up" ? "secondary" : "destructive"}>
                  {stat.trend === "up" ? <TrendingUpIcon className="size-3" /> : <TrendingDownIcon className="size-3" />}
                  {stat.change}
                </Badge>
              </div>
              <CardTitle className="text-2xl font-semibold tracking-tight tabular-nums">
                {stat.value}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-end justify-between gap-4">
              <span className="text-xs text-muted-foreground">{stat.description}</span>
              <Sparkline data={stat.sparkline} trend={stat.trend} />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
