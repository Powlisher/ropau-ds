"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { motion } from "framer-motion"

const eventDays = new Set([3, 8, 11, 15, 18, 22, 27])

const events = [
  { title: "Sprint Planning", time: "09:00 - 10:30", color: "bg-primary/15 text-primary" },
  { title: "Design Review with Sophie", time: "13:00 - 14:00", color: "bg-accent/15 text-accent" },
  { title: "1:1 with Thomas", time: "15:30 - 16:00", color: "bg-chart-3/15 text-chart-3" },
]

const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

function generateCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const offset = firstDay === 0 ? 6 : firstDay - 1
  const days: (number | null)[] = Array(offset).fill(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(i)
  while (days.length % 7 !== 0) days.push(null)
  return days
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function DashboardCalendarWidget() {
  const [currentMonth, setCurrentMonth] = useState(3)
  const [currentYear] = useState(2026)
  const today = 8

  const days = generateCalendarDays(currentYear, currentMonth)

  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold tracking-tight">
            {months[currentMonth]} {currentYear}
          </CardTitle>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => setCurrentMonth((m) => Math.max(0, m - 1))}
            >
              <ChevronLeftIcon />
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => setCurrentMonth((m) => Math.min(11, m + 1))}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <div className="mb-2 grid grid-cols-7 gap-1">
            {weekDays.map((d) => (
              <div key={d} className="text-center text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, i) => (
              <div
                key={i}
                className={`flex size-8 items-center justify-center rounded-md text-sm tabular-nums transition-colors ${
                  day === null
                    ? ""
                    : day === today
                      ? "bg-primary font-semibold text-primary-foreground"
                      : eventDays.has(day)
                        ? "bg-primary/10 font-medium text-primary"
                        : "hover:bg-muted"
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Today&apos;s Schedule
          </h3>
          <motion.div
            className="space-y-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {events.map((event) => (
              <motion.div
                key={event.title}
                variants={itemVariants}
                className="flex items-center gap-3 rounded-lg bg-muted/40 px-3 py-2.5"
              >
                <div className={`size-2 shrink-0 rounded-full ${event.color.split(" ")[0]}`} />
                <div className="flex-1">
                  <div className="text-sm font-medium">{event.title}</div>
                  <div className="text-[11px] tabular-nums text-muted-foreground">{event.time}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}
