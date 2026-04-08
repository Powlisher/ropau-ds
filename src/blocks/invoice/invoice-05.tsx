"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { RepeatIcon, CalendarIcon } from "lucide-react"

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

const frequencies = [
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
  { id: "quarterly", label: "Quarterly" },
  { id: "yearly", label: "Yearly" },
]

const existingRecurring = [
  {
    client: "Pelletier Consulting",
    amount: 3600,
    frequency: "Monthly",
    nextDate: "May 1, 2026",
    active: true,
  },
  {
    client: "Vignoble Saint-Emilion",
    amount: 1250,
    frequency: "Quarterly",
    nextDate: "Jul 1, 2026",
    active: true,
  },
  {
    client: "Atelier Bonheur",
    amount: 890,
    frequency: "Monthly",
    nextDate: "May 1, 2026",
    active: false,
  },
]

export default function Invoice05() {
  const [frequency, setFrequency] = useState("monthly")
  const [autoSend, setAutoSend] = useState(true)

  return (
    <Card className="w-full max-w-lg" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight flex items-center gap-2">
              <RepeatIcon className="size-5 text-primary" />
              Recurring Invoices
            </CardTitle>
            <CardDescription>
              Automate billing for retainer clients with recurring schedules.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <motion.div variants={itemVariants}>
            <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
              Active Schedules
            </span>
            <div className="flex flex-col gap-2 mt-2">
              {existingRecurring.map((r, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                    r.active ? "border-border" : "border-border/50 opacity-60"
                  }`}
                >
                  <div>
                    <span className="text-sm font-semibold text-foreground">{r.client}</span>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                      <Badge variant="secondary" className="text-[10px]">{r.frequency}</Badge>
                      <span className="flex items-center gap-1 tabular-nums">
                        <CalendarIcon className="size-3" />
                        Next: {r.nextDate}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold tabular-nums text-foreground">
                    ${r.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <Separator />

          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
              New Recurring Invoice
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium">Client</Label>
                <Input placeholder="Client name" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium">Amount</Label>
                <Input type="number" placeholder="3600" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-xs font-medium">Frequency</Label>
              <div className="grid grid-cols-4 gap-1.5">
                {frequencies.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFrequency(f.id)}
                    className={`rounded-lg border px-2 py-2 text-xs font-medium transition-colors ${
                      frequency === f.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50 text-foreground"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium">Start Date</Label>
                <Input type="date" defaultValue="2026-05-01" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium">End Date (optional)</Label>
                <Input type="date" />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-send" className="text-sm font-medium text-foreground">
                Auto-send
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Automatically email invoice on creation date
              </p>
            </div>
            <Switch id="auto-send" checked={autoSend} onCheckedChange={setAutoSend} />
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              Cancel
            </Button>
            <Button size="sm" className="flex-1">
              Create Schedule
            </Button>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
