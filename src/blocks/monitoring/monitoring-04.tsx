"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Cpu, MemoryStick, HardDrive, Network, TrendingUp, TrendingDown } from "lucide-react"

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 120
  const h = 32
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(" ")

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-8" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`fill-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${points} ${w},${h}`} fill={`url(#fill-${color})`} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

const metrics = [
  {
    label: "CPU Usage",
    value: "67.3%",
    change: "+4.2%",
    trend: "up" as const,
    icon: Cpu,
    color: "oklch(0.637 0.237 25.5)",
    sparkline: [42, 45, 51, 48, 55, 62, 58, 64, 61, 67, 63, 68, 65, 71, 67],
    threshold: "80%",
  },
  {
    label: "Memory",
    value: "12.4 GB",
    change: "-0.8 GB",
    trend: "down" as const,
    icon: MemoryStick,
    color: "oklch(0.546 0.245 262.9)",
    sparkline: [14.2, 13.8, 14.5, 13.1, 12.9, 13.4, 12.7, 13.0, 12.6, 12.8, 12.5, 12.3, 12.6, 12.4, 12.4],
    threshold: "16 GB",
  },
  {
    label: "Disk I/O",
    value: "342 MB/s",
    change: "+18 MB/s",
    trend: "up" as const,
    icon: HardDrive,
    color: "oklch(0.627 0.209 145.1)",
    sparkline: [280, 295, 310, 290, 325, 340, 315, 330, 345, 320, 338, 342, 335, 340, 342],
    threshold: "500 MB/s",
  },
  {
    label: "Network",
    value: "2.18 Gbps",
    change: "+0.3 Gbps",
    trend: "up" as const,
    icon: Network,
    color: "oklch(0.704 0.191 60.6)",
    sparkline: [1.5, 1.7, 1.6, 1.8, 1.9, 2.0, 1.8, 2.1, 1.9, 2.0, 2.1, 2.2, 2.0, 2.1, 2.18],
    threshold: "10 Gbps",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Monitoring04() {
  return (
    <motion.div
      className="py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-6">
        <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">Server Metrics</h2>
        <p className="mt-1 text-sm text-muted-foreground">prod-eu-west-1a -- Last 15 minutes</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {metrics.map((metric) => {
          const Icon = metric.icon

          return (
            <motion.div
              key={metric.label}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            >
              <Card
                style={{
                  boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
                }}
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="size-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">{metric.label}</span>
                  </div>

                  <div className="flex items-end justify-between mb-3">
                    <div>
                      <div className="font-heading text-2xl font-bold tabular-nums tracking-tight text-foreground">
                        {metric.value}
                      </div>
                      <div className="mt-0.5 flex items-center gap-1 text-xs">
                        {metric.trend === "up" ? (
                          <TrendingUp className="size-3 text-amber-600" />
                        ) : (
                          <TrendingDown className="size-3 text-emerald-600" />
                        )}
                        <span className="font-mono tabular-nums text-muted-foreground">
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono tabular-nums text-muted-foreground/50">
                      max {metric.threshold}
                    </span>
                  </div>

                  <MiniSparkline data={metric.sparkline} color={metric.color} />
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
