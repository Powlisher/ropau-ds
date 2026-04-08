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
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { RepeatIcon, CalendarIcon, ClockIcon } from "lucide-react"

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
  { id: "weekly", label: "Weekly", desc: "Same day & time each week" },
  { id: "biweekly", label: "Bi-weekly", desc: "Every two weeks" },
  { id: "monthly", label: "Monthly", desc: "Same date each month" },
]

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const timeOptions = ["8:00 AM", "9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM", "5:00 PM"]

export default function Booking07() {
  const [frequency, setFrequency] = useState("weekly")
  const [selectedDays, setSelectedDays] = useState<string[]>(["Tue", "Thu"])
  const [selectedTime, setSelectedTime] = useState("9:00 AM")
  const [autoRenew, setAutoRenew] = useState(true)

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  return (
    <Card className="w-full max-w-md" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight flex items-center gap-2">
              <RepeatIcon className="size-5 text-primary" />
              Recurring Booking
            </CardTitle>
            <CardDescription>
              Set up a regular schedule for your appointments.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground flex items-center gap-1.5">
              <CalendarIcon className="size-3" />
              Frequency
            </span>
            <div className="grid grid-cols-3 gap-2">
              {frequencies.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFrequency(f.id)}
                  className={`rounded-xl border p-3 text-left transition-colors ${
                    frequency === f.id
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <span className="text-sm font-semibold text-foreground block">{f.label}</span>
                  <span className="text-[10px] text-muted-foreground">{f.desc}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {frequency === "weekly" && (
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
                Days
              </span>
              <div className="flex gap-1.5">
                {weekdays.map((day) => (
                  <motion.button
                    key={day}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                    onClick={() => toggleDay(day)}
                    className={`flex-1 rounded-lg py-2 text-xs font-medium transition-colors ${
                      selectedDays.includes(day)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {day}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground flex items-center gap-1.5">
              <ClockIcon className="size-3" />
              Preferred Time
            </span>
            <div className="grid grid-cols-3 gap-2">
              {timeOptions.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={`rounded-lg border px-3 py-2 text-sm tabular-nums font-medium transition-colors ${
                    selectedTime === t
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </motion.div>

          <Separator />

          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-renew" className="text-sm font-medium text-foreground">
                Auto-renew
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Automatically rebook each period
              </p>
            </div>
            <Switch
              id="auto-renew"
              checked={autoRenew}
              onCheckedChange={setAutoRenew}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="rounded-xl bg-muted/50 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
                Schedule Summary
              </span>
              <Badge variant="secondary" className="text-[10px]">
                {autoRenew ? "Auto-renew on" : "Manual renewal"}
              </Badge>
            </div>
            <p className="text-sm text-foreground">
              {frequency === "weekly" && `Every ${selectedDays.join(" & ")} at ${selectedTime}`}
              {frequency === "biweekly" && `Every 2 weeks at ${selectedTime}`}
              {frequency === "monthly" && `Monthly on the 15th at ${selectedTime}`}
            </p>
            <p className="text-xs text-muted-foreground mt-1 tabular-nums">
              Next 4 weeks: {frequency === "weekly" ? selectedDays.length * 4 : frequency === "biweekly" ? 2 : 1} sessions
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              Save Draft
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
