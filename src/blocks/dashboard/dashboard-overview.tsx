"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUpIcon, TrendingDownIcon, ArrowRightIcon } from "lucide-react"
import { motion } from "framer-motion"

const stats = [
  { label: "Total Sales", value: "$127,430", change: "+9.2%", trend: "up" as const },
  { label: "Active Subscriptions", value: "3,847", change: "+4.1%", trend: "up" as const },
  { label: "Refund Rate", value: "1.8%", change: "-0.6%", trend: "up" as const },
  { label: "Support CSAT", value: "94.3%", change: "+1.7%", trend: "up" as const },
]

const chartBars = [
  { month: "Oct", value: 68 },
  { month: "Nov", value: 82 },
  { month: "Dec", value: 74 },
  { month: "Jan", value: 91 },
  { month: "Feb", value: 87 },
  { month: "Mar", value: 95 },
]

const recentItems = [
  { title: "Enterprise plan upgrade", description: "Acme Corp upgraded to Enterprise", time: "2h ago", status: "Completed" },
  { title: "Refund processed", description: "Invoice #4821 refunded to Globex Ltd", time: "4h ago", status: "Processed" },
  { title: "New trial started", description: "Hooli Inc started 14-day trial", time: "5h ago", status: "Active" },
  { title: "Subscription cancelled", description: "Initech paused their Pro plan", time: "8h ago", status: "Cancelled" },
  { title: "Payment received", description: "Umbrella Corp paid $2,340", time: "12h ago", status: "Completed" },
]

const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function DashboardOverview() {
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
            <Card style={{ boxShadow: shadow }}>
              <CardHeader className="pb-2">
                <CardDescription>{stat.label}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold tabular-nums tracking-tight">{stat.value}</div>
                <Badge variant="secondary" className="mt-1.5">
                  {stat.trend === "up" ? <TrendingUpIcon className="size-3" /> : <TrendingDownIcon className="size-3" />}
                  {stat.change}
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <motion.div variants={itemVariants} className="lg:col-span-3">
          <Card className="h-full" style={{ boxShadow: shadow }}>
            <CardHeader>
              <CardTitle className="text-lg font-semibold tracking-tight">Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3" style={{ height: 180 }}>
                {chartBars.map((bar) => (
                  <div key={bar.month} className="flex flex-1 flex-col items-center gap-1.5">
                    <motion.div
                      className="w-full rounded-md bg-primary/80"
                      initial={{ height: 0 }}
                      animate={{ height: `${bar.value}%` }}
                      transition={{ type: "spring" as const, stiffness: 120, damping: 20 }}
                    />
                    <span className="text-[11px] tabular-nums text-muted-foreground">{bar.month}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="h-full" style={{ boxShadow: shadow }}>
            <CardHeader>
              <CardTitle className="text-lg font-semibold tracking-tight">Recent Events</CardTitle>
              <CardAction>
                <Button variant="ghost" size="sm">
                  View all <ArrowRightIcon />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentItems.map((item, i) => (
                <div key={i} className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{item.title}</div>
                    <div className="truncate text-xs text-muted-foreground">{item.description}</div>
                  </div>
                  <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
