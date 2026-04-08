"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ZapIcon, ClockIcon, RocketIcon, FuelIcon, InfoIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"
const shadowLg = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)"

const speeds = [
  {
    id: "slow",
    label: "Slow",
    icon: ClockIcon,
    gwei: "14",
    time: "~8 min",
    cost: "$1.82",
    description: "Next 15-30 blocks",
    color: "text-muted-foreground",
    bgActive: "bg-muted border-border",
  },
  {
    id: "standard",
    label: "Standard",
    icon: ZapIcon,
    gwei: "23",
    time: "~3 min",
    cost: "$2.97",
    description: "Next 3-5 blocks",
    color: "text-blue-600",
    bgActive: "bg-blue-50 border-blue-200 ring-2 ring-blue-100",
  },
  {
    id: "fast",
    label: "Fast",
    icon: RocketIcon,
    gwei: "31",
    time: "~30 sec",
    cost: "$4.13",
    description: "Next block",
    color: "text-orange-600",
    bgActive: "bg-orange-50 border-orange-200 ring-2 ring-orange-100",
  },
]

const networkStats = [
  { label: "Base Fee", value: "12.4 Gwei" },
  { label: "Priority Fee", value: "1.8 Gwei" },
  { label: "Gas Limit", value: "21,000" },
  { label: "Network", value: "Ethereum" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Web3GasEstimator() {
  const [selected, setSelected] = useState("standard")

  return (
    <motion.div
      className="mx-auto max-w-md space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadowLg }}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                <FuelIcon className="size-4 text-foreground" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold tracking-tight">Gas Estimator</CardTitle>
                <CardDescription className="text-xs">Current network conditions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {speeds.map((speed) => {
                const Icon = speed.icon
                const isActive = selected === speed.id
                return (
                  <motion.button
                    key={speed.id}
                    onClick={() => setSelected(speed.id)}
                    className={`relative flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all ${
                      isActive ? speed.bgActive : "border-border bg-card hover:bg-muted/50"
                    }`}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                    style={{ boxShadow: isActive ? shadow : undefined }}
                  >
                    <Icon className={`size-5 ${isActive ? speed.color : "text-muted-foreground"}`} />
                    <div className={`text-sm font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                      {speed.label}
                    </div>
                    <div className="text-lg font-semibold tracking-tight tabular-nums">{speed.gwei}</div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">Gwei</div>
                    <Badge variant="secondary" className="text-[10px] tabular-nums mt-1">
                      {speed.time}
                    </Badge>
                  </motion.button>
                )
              })}
            </div>

            <div className="rounded-xl bg-muted/50 p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Estimated Cost</span>
                <span className="text-lg font-semibold tabular-nums tracking-tight">
                  {speeds.find((s) => s.id === selected)?.cost}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Confirmation</span>
                <span className="text-sm font-medium tabular-nums">
                  {speeds.find((s) => s.id === selected)?.description}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1">
              {networkStats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                  <span className="text-xs font-medium tabular-nums text-foreground">{stat.value}</span>
                </div>
              ))}
            </div>

            <Button className="w-full mt-2">
              Confirm Transaction
            </Button>

            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <InfoIcon className="size-3" />
              <span>Gas prices update every 12 seconds</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
