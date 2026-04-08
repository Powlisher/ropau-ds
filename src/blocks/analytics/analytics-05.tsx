"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { GlobeIcon } from "lucide-react"
import { motion } from "framer-motion"

const regions = [
  { name: "Western Europe", code: "EU-W", users: 34218, share: 38.2, color: "oklch(0.55 0.18 250)" },
  { name: "North America", code: "NA", users: 28741, share: 32.1, color: "oklch(0.55 0.15 160)" },
  { name: "Asia Pacific", code: "APAC", users: 12893, share: 14.4, color: "oklch(0.65 0.17 82)" },
  { name: "Latin America", code: "LATAM", users: 6472, share: 7.2, color: "oklch(0.60 0.18 30)" },
  { name: "Eastern Europe", code: "EU-E", users: 4181, share: 4.7, color: "oklch(0.55 0.12 280)" },
  { name: "Rest of World", code: "ROW", users: 3042, share: 3.4, color: "oklch(0.70 0.04 260)" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Analytics05() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold tracking-tight">Geographic Distribution</CardTitle>
            <CardDescription>User base by region, last 30 days</CardDescription>
          </div>
          <GlobeIcon className="size-5 text-muted-foreground/40" />
        </div>
      </CardHeader>
      <CardContent>
        <motion.div
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {regions.map((region) => (
            <motion.div
              key={region.code}
              variants={itemVariants}
              whileHover={{ x: 2 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              className="group"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full" style={{ backgroundColor: region.color }} />
                  <span className="text-sm font-medium">{region.name}</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60">
                    {region.code}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {region.users.toLocaleString()}
                  </span>
                  <span className="w-10 text-right text-xs font-semibold tabular-nums">
                    {region.share}%
                  </span>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: region.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${region.share}%` }}
                  transition={{ type: "spring" as const, stiffness: 60, damping: 18 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
          <span>Total: <span className="font-semibold tabular-nums text-foreground">89,547</span> users</span>
          <span className="tabular-nums">Updated 4m ago</span>
        </div>
      </CardContent>
    </Card>
  )
}
