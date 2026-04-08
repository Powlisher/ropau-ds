"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"

const channels = [
  { name: "Organic Search", conversions: 847, revenue: 42350, share: 34.2, color: "oklch(0.55 0.18 250)" },
  { name: "Direct", conversions: 623, revenue: 31150, share: 25.2, color: "oklch(0.55 0.15 160)" },
  { name: "Paid Social", conversions: 412, revenue: 20600, share: 16.7, color: "oklch(0.65 0.17 82)" },
  { name: "Email Campaigns", conversions: 289, revenue: 14450, share: 11.7, color: "oklch(0.60 0.18 30)" },
  { name: "Referral", conversions: 198, revenue: 9900, share: 8.0, color: "oklch(0.55 0.12 280)" },
  { name: "Affiliate", conversions: 104, revenue: 5200, share: 4.2, color: "oklch(0.70 0.06 200)" },
]

const totalRevenue = channels.reduce((s, c) => s + c.revenue, 0)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Analytics08() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Attribution Model</CardTitle>
        <CardDescription>Last-touch attribution, last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-5"
        >
          <motion.div variants={itemVariants} className="flex h-4 overflow-hidden rounded-full">
            {channels.map((ch) => (
              <motion.div
                key={ch.name}
                style={{ backgroundColor: ch.color, flex: ch.share }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ type: "spring" as const, stiffness: 60, damping: 18 }}
              />
            ))}
          </motion.div>

          <div className="space-y-2.5">
            {channels.map((ch) => (
              <motion.div
                key={ch.name}
                variants={itemVariants}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="size-2.5 rounded-full" style={{ backgroundColor: ch.color }} />
                  <span className="text-sm font-medium">{ch.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {ch.conversions} conv.
                  </span>
                  <span className="w-16 text-right text-sm font-semibold tabular-nums">
                    ${(ch.revenue / 1000).toFixed(1)}K
                  </span>
                  <Badge variant="outline" className="w-12 justify-center text-[10px] tabular-nums">
                    {ch.share}%
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>

          <Separator />

          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Total Attributed</span>
            <span className="text-lg font-semibold tabular-nums tracking-tight">
              ${(totalRevenue / 1000).toFixed(1)}K
            </span>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
