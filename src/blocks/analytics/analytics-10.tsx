"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, TrendingUpIcon, TrendingDownIcon, UsersIcon, DollarSignIcon, ActivityIcon, BarChart3Icon } from "lucide-react"
import { motion } from "framer-motion"

const metrics = [
  { label: "Total Revenue", value: "$152,480", change: "+11.2%", trend: "up" as const, icon: DollarSignIcon },
  { label: "Active Users", value: "12,847", change: "+6.3%", trend: "up" as const, icon: UsersIcon },
  { label: "Conversion", value: "3.78%", change: "+0.32%", trend: "up" as const, icon: ActivityIcon },
  { label: "Avg. Session", value: "4m 12s", change: "-8.1%", trend: "down" as const, icon: BarChart3Icon },
]

const topPages = [
  { path: "/pricing", views: 24831, convRate: 7.2 },
  { path: "/features", views: 18492, convRate: 3.1 },
  { path: "/docs/quickstart", views: 12374, convRate: 12.8 },
  { path: "/blog/ai-launch", views: 9847, convRate: 1.4 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Analytics10() {
  return (
    <motion.div
      className="space-y-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Analytics Overview</h2>
          <p className="text-sm text-muted-foreground">Performance summary for your workspace</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 text-xs">
          <CalendarIcon className="size-3.5" />
          Mar 1 - Mar 31
        </Button>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <Card
            key={m.label}
            style={{
              boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{m.label}</span>
                <m.icon className="size-4 text-muted-foreground/50" />
              </div>
              <div className="mt-2 text-2xl font-semibold tabular-nums tracking-tight">{m.value}</div>
              <div className="mt-1.5">
                <Badge variant={m.trend === "up" ? "secondary" : "destructive"} className="text-[10px]">
                  {m.trend === "up" ? <TrendingUpIcon className="size-2.5" /> : <TrendingDownIcon className="size-2.5" />}
                  {m.change}
                </Badge>
                <span className="ml-1.5 text-[10px] text-muted-foreground">vs prev. period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card
          style={{
            boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold tracking-tight">Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-[1fr_80px_80px] gap-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-2">
              <span>Page</span>
              <span className="text-right">Views</span>
              <span className="text-right">Conv. Rate</span>
            </div>
            <Separator className="mb-3" />
            <div className="space-y-3">
              {topPages.map((page) => (
                <div key={page.path} className="grid grid-cols-[1fr_80px_80px] items-center gap-2">
                  <span className="truncate text-sm font-mono text-muted-foreground">{page.path}</span>
                  <span className="text-right text-sm tabular-nums font-medium">{page.views.toLocaleString()}</span>
                  <span className="text-right text-sm tabular-nums font-semibold">{page.convRate}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
