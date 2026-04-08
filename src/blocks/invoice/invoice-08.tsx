"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { TrendingUpIcon, TrendingDownIcon, ClockIcon, CheckCircleIcon, AlertCircleIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

const premiumShadow =
  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const metrics = [
  {
    label: "Outstanding",
    value: 20438,
    change: "+12%",
    trend: "up" as const,
    icon: ClockIcon,
    color: "text-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/20",
  },
  {
    label: "Paid This Month",
    value: 8520,
    change: "+34%",
    trend: "up" as const,
    icon: CheckCircleIcon,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
  },
  {
    label: "Overdue",
    value: 7850,
    change: "-8%",
    trend: "down" as const,
    icon: AlertCircleIcon,
    color: "text-rose-600",
    bgColor: "bg-rose-50 dark:bg-rose-950/20",
  },
]

const recentActivity = [
  { client: "Maison Colbert", amount: 4320, action: "Payment received", time: "2h ago" },
  { client: "Pelletier Consulting", amount: 12588, action: "Invoice sent", time: "5h ago" },
  { client: "Vignoble Saint-Emilion", amount: 2175, action: "Payment received", time: "1d ago" },
  { client: "Atelier Bonheur", amount: 7850, action: "Reminder sent", time: "2d ago" },
  { client: "Rue Rivoli Capital", amount: 9440, action: "Draft created", time: "3d ago" },
]

const monthlyBreakdown = [
  { month: "Jan", invoiced: 14200, collected: 11800 },
  { month: "Feb", invoiced: 18900, collected: 16400 },
  { month: "Mar", invoiced: 22150, collected: 17100 },
  { month: "Apr", invoiced: 12588, collected: 8520 },
]

export default function Invoice08() {
  return (
    <Card className="w-full max-w-2xl" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">Invoice Summary</CardTitle>
            <CardDescription>
              Overview of your invoicing activity for April 2026.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3">
            {metrics.map((m) => {
              const Icon = m.icon
              return (
                <div
                  key={m.label}
                  className={`rounded-xl ${m.bgColor} p-4`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`size-4 ${m.color}`} />
                    <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
                      {m.label}
                    </span>
                  </div>
                  <p className="text-2xl font-semibold tabular-nums tracking-tight text-foreground">
                    ${m.value.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {m.trend === "up" ? (
                      <TrendingUpIcon className="size-3 text-emerald-500" />
                    ) : (
                      <TrendingDownIcon className="size-3 text-rose-500" />
                    )}
                    <span className={`text-xs tabular-nums font-medium ${
                      m.trend === "up" && m.label !== "Overdue" ? "text-emerald-600" :
                      m.trend === "down" && m.label === "Overdue" ? "text-emerald-600" :
                      "text-rose-600"
                    }`}>
                      {m.change}
                    </span>
                    <span className="text-[10px] text-muted-foreground">vs last month</span>
                  </div>
                </div>
              )
            })}
          </motion.div>

          <motion.div variants={itemVariants}>
            <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
              Monthly Breakdown
            </span>
            <div className="flex flex-col gap-2 mt-3">
              {monthlyBreakdown.map((m) => {
                const maxVal = 22150
                const invoicedWidth = (m.invoiced / maxVal) * 100
                const collectedWidth = (m.collected / maxVal) * 100
                return (
                  <div key={m.month} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-8 tabular-nums">{m.month}</span>
                    <div className="flex-1 flex flex-col gap-0.5">
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary/30"
                          style={{ width: `${invoicedWidth}%` }}
                        />
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-emerald-500/60"
                          style={{ width: `${collectedWidth}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-20 text-right">
                      <p className="text-xs tabular-nums text-foreground font-medium">
                        ${m.invoiced.toLocaleString()}
                      </p>
                      <p className="text-[10px] tabular-nums text-emerald-600">
                        ${m.collected.toLocaleString()}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex items-center gap-4 mt-2 text-[10px] text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-primary/30" />
                Invoiced
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald-500/60" />
                Collected
              </div>
            </div>
          </motion.div>

          <Separator />

          <motion.div variants={itemVariants}>
            <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
              Recent Activity
            </span>
            <div className="flex flex-col mt-2">
              {recentActivity.map((a, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between py-2.5 ${
                    i < recentActivity.length - 1 ? "border-b border-border/50" : ""
                  }`}
                >
                  <div>
                    <span className="text-sm font-medium text-foreground">{a.client}</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="secondary" className="text-[10px]">{a.action}</Badge>
                      <span className="text-[10px] text-muted-foreground tabular-nums">{a.time}</span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold tabular-nums text-foreground">
                    ${a.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
