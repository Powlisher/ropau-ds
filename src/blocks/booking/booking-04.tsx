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
import { motion } from "framer-motion"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

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

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

type AvailabilityStatus = "available" | "limited" | "booked" | "closed"

const calendarData: { day: number; status: AvailabilityStatus }[] = Array.from(
  { length: 30 },
  (_, i) => {
    const d = i + 1
    if ([6, 7, 13, 14, 20, 21, 27, 28].includes(d)) return { day: d, status: "closed" as const }
    if ([3, 9, 16, 24].includes(d)) return { day: d, status: "booked" as const }
    if ([5, 11, 18, 23, 29].includes(d)) return { day: d, status: "limited" as const }
    return { day: d, status: "available" as const }
  }
)

const statusColors: Record<AvailabilityStatus, string> = {
  available: "bg-emerald-500",
  limited: "bg-amber-500",
  booked: "bg-rose-400",
  closed: "bg-muted-foreground/20",
}

const statusLabels: Record<AvailabilityStatus, string> = {
  available: "Available",
  limited: "Limited",
  booked: "Fully Booked",
  closed: "Closed",
}

const cellStyles: Record<AvailabilityStatus, string> = {
  available: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-950/40 cursor-pointer",
  limited: "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-950/40 cursor-pointer",
  booked: "bg-rose-50 dark:bg-rose-950/20 text-rose-400 dark:text-rose-500 cursor-not-allowed",
  closed: "bg-muted/50 text-muted-foreground/40 cursor-not-allowed",
}

export default function Booking04() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  return (
    <Card className="w-full max-w-md" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">Availability</CardTitle>
            <CardDescription>
              April 2026 calendar view with booking status per day.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <Button variant="ghost" size="sm">
              <ChevronLeftIcon className="size-4" />
            </Button>
            <span className="text-sm font-semibold tracking-tight text-foreground">April 2026</span>
            <Button variant="ghost" size="sm">
              <ChevronRightIcon className="size-4" />
            </Button>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {daysOfWeek.map((d) => (
                <span
                  key={d}
                  className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground pb-1"
                >
                  {d}
                </span>
              ))}
              {[null, null].map((_, i) => (
                <span key={`empty-${i}`} />
              ))}
              {calendarData.map((d) => (
                <motion.button
                  key={d.day}
                  whileHover={
                    d.status === "available" || d.status === "limited"
                      ? { scale: 1.08 }
                      : {}
                  }
                  transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                  onClick={() =>
                    (d.status === "available" || d.status === "limited") &&
                    setSelectedDay(d.day)
                  }
                  className={`
                    h-9 rounded-lg text-sm tabular-nums font-medium transition-colors
                    ${cellStyles[d.status]}
                    ${selectedDay === d.day ? "ring-2 ring-primary ring-offset-1" : ""}
                  `}
                >
                  {d.day}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1">
            {(Object.keys(statusLabels) as AvailabilityStatus[]).map((status) => (
              <div key={status} className="flex items-center gap-1.5">
                <span className={`size-2 rounded-full ${statusColors[status]}`} />
                <span className="text-[11px] text-muted-foreground">{statusLabels[status]}</span>
              </div>
            ))}
          </motion.div>

          {selectedDay && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
              className="flex items-center justify-between rounded-lg bg-primary/5 px-4 py-3"
            >
              <span className="text-sm text-foreground">
                April {selectedDay} selected
              </span>
              <Button size="sm">View Slots</Button>
            </motion.div>
          )}
        </CardContent>
      </motion.div>
    </Card>
  )
}
