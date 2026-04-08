"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"
import { motion } from "framer-motion"

const channels = [
  { name: "Subscriptions", revenue: 67420, change: "+8.3%", trend: "up" as const, color: "oklch(0.55 0.18 250)", icon: "recurring" },
  { name: "One-time Purchases", revenue: 34890, change: "+22.1%", trend: "up" as const, color: "oklch(0.55 0.15 160)", icon: "cart" },
  { name: "Enterprise Contracts", revenue: 28500, change: "-4.2%", trend: "down" as const, color: "oklch(0.65 0.17 82)", icon: "building" },
  { name: "Add-ons & Upgrades", revenue: 12740, change: "+31.7%", trend: "up" as const, color: "oklch(0.60 0.18 30)", icon: "plus" },
  { name: "API Usage (Metered)", revenue: 8930, change: "+14.8%", trend: "up" as const, color: "oklch(0.55 0.12 280)", icon: "code" },
]

const totalRevenue = channels.reduce((s, c) => s + c.revenue, 0)

function DonutChart() {
  const size = 140
  const strokeWidth = 20
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {channels.map((ch) => {
          const share = ch.revenue / totalRevenue
          const dashLength = share * circumference
          const dashOffset = -offset
          offset += dashLength
          return (
            <motion.circle
              key={ch.name}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={ch.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dashLength} ${circumference - dashLength}`}
              strokeDashoffset={dashOffset}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            />
          )
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-semibold tabular-nums tracking-tight">
          ${(totalRevenue / 1000).toFixed(0)}K
        </span>
        <span className="text-[10px] text-muted-foreground">total</span>
      </div>
    </div>
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

export default function Analytics09() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Revenue Breakdown</CardTitle>
        <CardDescription>Revenue by channel, March 2026</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div variants={itemVariants} className="flex justify-center py-2">
            <DonutChart />
          </motion.div>

          <div className="space-y-3">
            {channels.map((ch) => {
              const share = ((ch.revenue / totalRevenue) * 100).toFixed(1)
              return (
                <motion.div
                  key={ch.name}
                  variants={itemVariants}
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="size-2.5 rounded-full" style={{ backgroundColor: ch.color }} />
                    <span className="text-sm font-medium">{ch.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={ch.trend === "up" ? "secondary" : "destructive"} className="text-[10px] tabular-nums">
                      {ch.trend === "up" ? <TrendingUpIcon className="size-2.5" /> : <TrendingDownIcon className="size-2.5" />}
                      {ch.change}
                    </Badge>
                    <span className="w-16 text-right text-sm font-semibold tabular-nums">
                      ${(ch.revenue / 1000).toFixed(1)}K
                    </span>
                    <span className="w-10 text-right text-[10px] tabular-nums text-muted-foreground">{share}%</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
