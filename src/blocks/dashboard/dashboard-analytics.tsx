"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"
import { motion } from "framer-motion"

const stats = [
  { label: "Page Views", value: "284,930", change: "+18.2%", trend: "up" as const },
  { label: "Unique Visitors", value: "47,283", change: "+7.4%", trend: "up" as const },
  { label: "Bounce Rate", value: "32.1%", change: "-4.8%", trend: "up" as const },
  { label: "Avg. Duration", value: "3m 48s", change: "+11.3%", trend: "up" as const },
]

const chartData = [18, 32, 28, 45, 38, 52, 48, 65, 58, 72, 68, 85, 78, 92, 88, 95, 82, 98, 90, 105, 95, 110, 102, 118]

const activities = [
  { user: "EM", name: "Elena Marchetti", action: "deployed v2.14.3 to production", time: "12 min ago" },
  { user: "TR", name: "Thomas Reiner", action: "merged PR #847 into main", time: "38 min ago" },
  { user: "SD", name: "Sophie Duval", action: "created issue: Optimize image pipeline", time: "1h ago" },
  { user: "MC", name: "Marcus Chen", action: "updated pricing page copy", time: "2h ago" },
  { user: "AP", name: "Aisha Patel", action: "resolved 3 support tickets", time: "3h ago" },
]

function AreaChart({ data }: { data: number[] }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 600
  const h = 200
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(" ")

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.478 0.227 3.6)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="oklch(0.478 0.227 3.6)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${points} ${w},${h}`} fill="url(#chart-fill)" />
      <polyline
        points={points}
        fill="none"
        stroke="oklch(0.478 0.227 3.6)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
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

export default function DashboardAnalytics() {
  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={itemVariants}>
            <Card
              style={{
                boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
              }}
            >
              <CardHeader className="pb-2">
                <CardDescription>{stat.label}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold tabular-nums tracking-tight">{stat.value}</div>
                <div className="mt-1 flex items-center gap-1">
                  {stat.trend === "up" ? (
                    <TrendingUpIcon className="size-3 text-emerald-600" />
                  ) : (
                    <TrendingDownIcon className="size-3 text-red-500" />
                  )}
                  <span className="text-xs font-medium tabular-nums text-muted-foreground">{stat.change}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div variants={itemVariants}>
        <Card
          style={{
            boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold tracking-tight">Traffic Overview</CardTitle>
            <CardDescription>Page views over the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <AreaChart data={chartData} />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card
          style={{
            boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold tracking-tight">Recent Activity</CardTitle>
            <CardDescription>Latest team actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activities.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <Avatar size="sm">
                  <AvatarFallback>{activity.user}</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-sm">
                  <span className="font-medium">{activity.name}</span>{" "}
                  <span className="text-muted-foreground">{activity.action}</span>
                </div>
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
