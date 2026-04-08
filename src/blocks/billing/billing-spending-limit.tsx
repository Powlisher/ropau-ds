"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

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

export default function BillingSpendingLimit() {
  const [limit, setLimit] = useState([150])
  const currentSpend = 87.42

  return (
    <Card className="w-full max-w-lg" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">Spending Limit</CardTitle>
            <CardDescription>
              Set a monthly cap to prevent unexpected charges.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Label>Monthly limit</Label>
              <span className="text-lg font-semibold tabular-nums tracking-tight text-foreground">
                ${limit[0]}
              </span>
            </div>
            <Slider
              value={limit}
              onValueChange={(val) => setLimit(val as number[])}
              min={50}
              max={500}
              defaultValue={[150]}
            />
            <div className="flex justify-between text-xs tabular-nums text-muted-foreground">
              <span>$50</span>
              <span>$500</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Current spend</span>
              <span className="text-sm font-medium tabular-nums text-foreground">
                ${currentSpend.toFixed(2)}{" "}
                <span className="text-muted-foreground font-normal">
                  / ${limit[0]}
                </span>
              </span>
            </div>
            <Progress value={(currentSpend / limit[0]) * 100} />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="alert-threshold">Alert threshold</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="alert-threshold"
                  type="number"
                  defaultValue="80"
                  className="w-20 tabular-nums"
                />
                <span className="text-sm text-muted-foreground">
                  % of monthly limit
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border px-4 py-3"
              style={{
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
              }}
            >
              <div className="flex flex-col">
                <Label>Email notifications</Label>
                <p className="text-xs text-muted-foreground">
                  Get notified when approaching the limit
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
