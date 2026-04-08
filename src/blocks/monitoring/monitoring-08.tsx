"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Clock, TrendingUp, TrendingDown, Minus } from "lucide-react"

function ResponseChart({ data, height = 120 }: { data: number[]; height?: number }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 600
  const h = height

  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h * 0.85)}`)
    .join(" ")

  const p50Line = h - ((percentile(data, 50) - min) / range) * (h * 0.85)
  const p95Line = h - ((percentile(data, 95) - min) / range) * (h * 0.85)

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" style={{ height }}>
      <defs>
        <linearGradient id="response-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.546 0.245 262.9)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="oklch(0.546 0.245 262.9)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <line x1="0" y1={p95Line} x2={w} y2={p95Line} stroke="oklch(0.637 0.237 25.5)" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" vectorEffect="non-scaling-stroke" />
      <line x1="0" y1={p50Line} x2={w} y2={p50Line} stroke="oklch(0.546 0.245 262.9)" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" vectorEffect="non-scaling-stroke" />

      <polygon points={`0,${h} ${points} ${w},${h}`} fill="url(#response-fill)" />
      <polyline
        points={points}
        fill="none"
        stroke="oklch(0.546 0.245 262.9)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

function percentile(data: number[], p: number): number {
  const sorted = [...data].sort((a, b) => a - b)
  const i = (p / 100) * (sorted.length - 1)
  const lower = Math.floor(i)
  const upper = Math.ceil(i)
  if (lower === upper) return sorted[lower]
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (i - lower)
}

const responseData = [
  42, 38, 45, 51, 39, 44, 48, 52, 41, 55, 89, 134, 98, 67, 53,
  47, 44, 41, 39, 43, 46, 42, 38, 41, 44, 39, 47, 52, 48, 43,
  41, 38, 45, 42, 39, 44, 41, 43, 47, 45, 42, 39, 55, 62, 48,
  44, 41, 38, 42, 45, 39, 43, 41, 44, 42, 38, 41, 39, 43, 45,
]

const stats = [
  { label: "P50", value: `${percentile(responseData, 50).toFixed(0)}ms`, change: "-3ms", trend: "down" as const },
  { label: "P95", value: `${percentile(responseData, 95).toFixed(0)}ms`, change: "+12ms", trend: "up" as const },
  { label: "P99", value: `${percentile(responseData, 99).toFixed(0)}ms`, change: "+8ms", trend: "up" as const },
  { label: "Avg", value: `${(responseData.reduce((a, b) => a + b, 0) / responseData.length).toFixed(0)}ms`, change: "0ms", trend: "flat" as const },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Monitoring08() {
  return (
    <motion.div
      className="mx-auto max-w-2xl py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card
        style={{
          boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-muted-foreground" />
              <CardTitle className="font-heading text-lg tracking-tight">Response Times</CardTitle>
            </div>
            <Badge variant="secondary" className="font-mono text-[10px] tabular-nums">Last 60 min</Badge>
          </div>
          <CardDescription>API response time distribution across all endpoints</CardDescription>
        </CardHeader>

        <CardContent>
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 mb-5 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-lg bg-muted/50 p-3">
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{stat.label}</span>
                <div className="mt-0.5 font-heading text-xl font-bold tabular-nums tracking-tight text-foreground font-mono">
                  {stat.value}
                </div>
                <div className="mt-0.5 flex items-center gap-1 text-[11px]">
                  {stat.trend === "up" ? (
                    <TrendingUp className="size-3 text-amber-600" />
                  ) : stat.trend === "down" ? (
                    <TrendingDown className="size-3 text-emerald-600" />
                  ) : (
                    <Minus className="size-3 text-muted-foreground" />
                  )}
                  <span className="font-mono tabular-nums text-muted-foreground">{stat.change}</span>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <ResponseChart data={responseData} />
            <div className="absolute right-0 top-[20%] text-[10px] font-mono tabular-nums text-rose-500/60">P95</div>
            <div className="absolute right-0 top-[55%] text-[10px] font-mono tabular-nums text-violet-500/60">P50</div>
          </motion.div>

          <div className="mt-2 flex justify-between text-[10px] font-mono tabular-nums text-muted-foreground/50">
            <span>60 min ago</span>
            <span>Now</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
