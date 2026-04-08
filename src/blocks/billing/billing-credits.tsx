"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { CoinsIcon } from "lucide-react"

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

const recentUsage = [
  { date: "Apr 7", amount: -42 },
  { date: "Apr 6", amount: -18 },
  { date: "Apr 5", amount: -67 },
  { date: "Apr 4", amount: -31 },
  { date: "Apr 3", amount: +500 },
  { date: "Apr 2", amount: -55 },
  { date: "Apr 1", amount: -23 },
]

export default function BillingCredits() {
  return (
    <Card className="w-full max-w-lg" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">Credits</CardTitle>
            <CardDescription>
              Prepaid credits for on-demand compute and API overages.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
              <CoinsIcon className="size-6 text-primary" />
            </div>
            <div>
              <p className="text-3xl font-semibold tracking-tight tabular-nums text-foreground">
                1,264
              </p>
              <p className="text-xs text-muted-foreground">credits remaining</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
              Recent Activity
            </span>
            <div className="flex flex-col">
              {recentUsage.map((entry) => (
                <div
                  key={entry.date}
                  className="flex items-center justify-between border-b border-border/50 py-2 last:border-0"
                >
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {entry.date}
                  </span>
                  <span
                    className={`text-sm font-medium tabular-nums ${
                      entry.amount > 0
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-foreground"
                    }`}
                  >
                    {entry.amount > 0 ? "+" : ""}
                    {entry.amount}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between rounded-xl border px-4 py-3"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
            }}
          >
            <div className="flex flex-col">
              <Label>Auto-recharge</Label>
              <p className="text-xs text-muted-foreground">
                Add 500 credits when balance drops below 100
              </p>
            </div>
            <Switch defaultChecked />
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-end">
            <Button>Buy credits</Button>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
