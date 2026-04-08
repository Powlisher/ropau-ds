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
import { motion } from "framer-motion"
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon } from "lucide-react"

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

const slots = [
  { time: "9:00 AM", available: true },
  { time: "9:30 AM", available: false },
  { time: "10:00 AM", available: true },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: false },
  { time: "11:30 AM", available: true },
  { time: "1:00 PM", available: true },
  { time: "1:30 PM", available: false },
  { time: "2:00 PM", available: true },
  { time: "2:30 PM", available: true },
  { time: "3:00 PM", available: false },
  { time: "3:30 PM", available: true },
]

const calendarDays = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  available: ![3, 7, 10, 14, 21, 25, 28].includes(i + 1),
}))

export default function Booking01() {
  const [selectedDay, setSelectedDay] = useState(15)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

  return (
    <Card className="w-full max-w-xl" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight flex items-center gap-2">
              <CalendarIcon className="size-5 text-primary" />
              Pick a Date & Time
            </CardTitle>
            <CardDescription>
              Select an available date, then choose a time slot.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-3">
              <Button variant="ghost" size="sm">
                <ChevronLeftIcon className="size-4" />
              </Button>
              <span className="text-sm font-semibold tracking-tight text-foreground">
                April 2026
              </span>
              <Button variant="ghost" size="sm">
                <ChevronRightIcon className="size-4" />
              </Button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
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
              {calendarDays.map((d) => (
                <motion.button
                  key={d.day}
                  whileHover={d.available ? { scale: 1.1 } : {}}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                  onClick={() => d.available && setSelectedDay(d.day)}
                  className={`
                    h-8 rounded-lg text-sm tabular-nums font-medium transition-colors
                    ${!d.available ? "text-muted-foreground/40 cursor-not-allowed" : ""}
                    ${d.day === selectedDay && d.available ? "bg-primary text-primary-foreground" : ""}
                    ${d.day !== selectedDay && d.available ? "hover:bg-muted text-foreground cursor-pointer" : ""}
                  `}
                  disabled={!d.available}
                >
                  {d.day}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <ClockIcon className="size-4 text-muted-foreground" />
              <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
                Available Slots for April {selectedDay}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {slots.map((slot) => (
                <motion.button
                  key={slot.time}
                  whileHover={slot.available ? { y: -1 } : {}}
                  whileTap={slot.available ? { scale: 0.97 } : {}}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                  onClick={() => slot.available && setSelectedSlot(slot.time)}
                  disabled={!slot.available}
                  className={`
                    rounded-lg border px-3 py-2.5 text-sm tabular-nums font-medium transition-colors
                    ${!slot.available ? "border-border/40 text-muted-foreground/40 cursor-not-allowed bg-muted/30" : ""}
                    ${slot.time === selectedSlot ? "border-primary bg-primary/10 text-primary" : ""}
                    ${slot.time !== selectedSlot && slot.available ? "border-border hover:border-primary/50 text-foreground cursor-pointer" : ""}
                  `}
                >
                  {slot.time}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center justify-between pt-2">
            {selectedSlot ? (
              <Badge variant="secondary" className="text-xs tabular-nums">
                April {selectedDay} at {selectedSlot}
              </Badge>
            ) : (
              <span className="text-xs text-muted-foreground">No slot selected</span>
            )}
            <Button disabled={!selectedSlot} size="sm">
              Continue
            </Button>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
