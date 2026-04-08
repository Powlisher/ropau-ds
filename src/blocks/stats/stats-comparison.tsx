"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"
import { motion } from "framer-motion"

const metrics = [
  { label: "Revenue", current: "$48,293", previous: "$41,870", change: "+15.3%", trend: "up" as const },
  { label: "Orders", current: "1,847", previous: "1,623", change: "+13.8%", trend: "up" as const },
  { label: "Avg. Session", current: "4m 32s", previous: "5m 10s", change: "-12.3%", trend: "down" as const },
  { label: "Bounce Rate", current: "38.2%", previous: "42.7%", change: "-10.5%", trend: "up" as const },
  { label: "Support Tickets", current: "127", previous: "98", change: "+29.6%", trend: "down" as const },
  { label: "NPS Score", current: "72", previous: "68", change: "+5.9%", trend: "up" as const },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function StatsComparison() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Period Comparison</CardTitle>
        <CardDescription>Mar 1 - Mar 31 vs Feb 1 - Feb 28</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-6 text-sm">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">This Period</span>
          <span />
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Last Period</span>
        </div>
        <Separator className="my-3" />
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {metrics.map((metric) => (
            <motion.div
              key={metric.label}
              variants={itemVariants}
              className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-6"
            >
              <div>
                <div className="text-lg font-semibold tabular-nums tracking-tight">{metric.current}</div>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-xs font-medium text-muted-foreground">{metric.label}</span>
                <Badge variant={metric.trend === "up" ? "secondary" : "destructive"} className="text-[10px]">
                  {metric.trend === "up" ? <TrendingUpIcon className="size-2.5" /> : <TrendingDownIcon className="size-2.5" />}
                  {metric.change}
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-lg tabular-nums tracking-tight text-muted-foreground">{metric.previous}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  )
}
