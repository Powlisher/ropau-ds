"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"
import { motion } from "framer-motion"

function MiniBar({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values)
  return (
    <div className="flex items-end gap-0.5" style={{ height: 28 }}>
      {values.map((v, i) => (
        <motion.div
          key={i}
          className="w-1.5 rounded-full"
          style={{ backgroundColor: color, opacity: 0.2 + (v / max) * 0.8 }}
          initial={{ height: 0 }}
          animate={{ height: (v / max) * 28 }}
          transition={{ type: "spring" as const, stiffness: 200, damping: 20, delay: i * 0.03 }}
        />
      ))}
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

const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

export default function StatsBento() {
  return (
    <motion.div
      className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:grid-rows-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="col-span-2 row-span-2">
        <Card className="h-full" style={{ boxShadow: shadow }}>
          <CardHeader>
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-3xl font-bold tabular-nums tracking-tight">$284,930</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-between gap-6">
            <div className="flex items-center gap-2">
              <Badge variant="secondary"><TrendingUpIcon className="size-3" />+22.4%</Badge>
              <span className="text-xs text-muted-foreground">vs last quarter</span>
            </div>
            <MiniBar
              values={[18, 32, 28, 45, 38, 52, 48, 65, 58, 72, 68, 85, 78, 92, 88]}
              color="oklch(0.478 0.227 3.6)"
            />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadow }}>
          <CardContent className="pt-1">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Active Users</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums tracking-tight">12,847</div>
            <Badge variant="secondary" className="mt-2"><TrendingUpIcon className="size-3" />+8.1%</Badge>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadow }}>
          <CardContent className="pt-1">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Conversion</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums tracking-tight">4.28%</div>
            <Badge variant="destructive" className="mt-2"><TrendingDownIcon className="size-3" />-0.3%</Badge>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadow }}>
          <CardContent className="pt-1">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Avg. LTV</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums tracking-tight">$1,847</div>
            <MiniBar values={[22, 35, 28, 42, 38, 50, 45]} color="oklch(0.519 0.292 25.1)" />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadow }}>
          <CardContent className="pt-1">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">MRR</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums tracking-tight">$23,744</div>
            <Badge variant="secondary" className="mt-2"><TrendingUpIcon className="size-3" />+3.6%</Badge>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
