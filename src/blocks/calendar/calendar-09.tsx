"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react"

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const HOURS = Array.from({ length: 10 }, (_, i) => i + 8)
const ROW_HEIGHT = 48

const calendars = [
  {
    id: "personal",
    label: "Personal",
    color: "oklch(0.60 0.18 260)",
    lightColor: "oklch(0.90 0.06 260)",
    events: [
      { day: 1, startHour: 8, duration: 1, title: "Gym" },
      { day: 2, startHour: 12, duration: 1, title: "Dentist" },
      { day: 3, startHour: 17, duration: 1.5, title: "Dinner with Ana" },
      { day: 4, startHour: 9, duration: 0.75, title: "Grocery pickup" },
    ],
  },
  {
    id: "work",
    label: "Work",
    color: "oklch(0.60 0.18 145)",
    lightColor: "oklch(0.90 0.06 145)",
    events: [
      { day: 0, startHour: 9, duration: 1.5, title: "Sprint planning" },
      { day: 0, startHour: 14, duration: 1, title: "1:1 with manager" },
      { day: 1, startHour: 10, duration: 2, title: "Architecture review" },
      { day: 2, startHour: 9, duration: 0.5, title: "Standup" },
      { day: 2, startHour: 14, duration: 1.5, title: "Client demo" },
      { day: 3, startHour: 10, duration: 1, title: "Design critique" },
      { day: 4, startHour: 11, duration: 1, title: "Friday demo" },
      { day: 4, startHour: 15, duration: 1, title: "Retro" },
    ],
  },
]

const WEEKDAYS = [
  { short: "Mon", date: 6 },
  { short: "Tue", date: 7 },
  { short: "Wed", date: 8 },
  { short: "Thu", date: 9 },
  { short: "Fri", date: 10 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Calendar09() {
  const [visible, setVisible] = useState<Record<string, boolean>>({
    personal: true,
    work: true,
  })

  const toggleCalendar = (id: string) => {
    setVisible((v) => ({ ...v, [id]: !v[id] }))
  }

  return (
    <div className="w-full max-w-4xl">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="font-heading text-lg font-semibold tracking-tight">
            Apr 6 - 10, 2026
          </h2>
          <div className="flex gap-2">
            {calendars.map((cal) => (
              <button
                key={cal.id}
                onClick={() => toggleCalendar(cal.id)}
                className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-opacity hover:opacity-80"
                style={{ opacity: visible[cal.id] ? 1 : 0.4 }}
              >
                <div className="size-2.5 rounded-sm" style={{ backgroundColor: cal.color }} />
                {cal.label}
                {visible[cal.id] ? (
                  <Eye className="ml-0.5 size-3 text-muted-foreground" />
                ) : (
                  <EyeOff className="ml-0.5 size-3 text-muted-foreground" />
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" className="size-8 p-0">
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="outline" size="sm" className="size-8 p-0">
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      <div
        className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/[0.06]"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <div className="grid grid-cols-[48px_repeat(5,1fr)] border-b border-border/50">
          <div />
          {WEEKDAYS.map((wd) => (
            <div key={wd.short} className="flex flex-col items-center py-2.5">
              <span className="text-[10px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                {wd.short}
              </span>
              <span className="mt-0.5 font-mono text-sm tabular-nums font-medium text-foreground/80">
                {wd.date}
              </span>
            </div>
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative grid grid-cols-[48px_repeat(5,1fr)]"
        >
          <div>
            {HOURS.map((h) => (
              <div key={h} className="flex h-[48px] items-start justify-end pr-2.5">
                <span className="font-mono text-[10px] tabular-nums text-muted-foreground -translate-y-1.5">
                  {h}:00
                </span>
              </div>
            ))}
          </div>

          {WEEKDAYS.map((_, dayIdx) => (
            <div key={dayIdx} className="relative border-l border-border/30">
              {HOURS.map((h) => (
                <div key={h} className="h-[48px] border-b border-border/15" />
              ))}

              {calendars.map((cal) =>
                visible[cal.id]
                  ? cal.events
                      .filter((e) => e.day === dayIdx)
                      .map((ev) => (
                        <motion.div
                          key={`${cal.id}-${ev.title}`}
                          variants={itemVariants}
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                          className="absolute inset-x-1 overflow-hidden rounded-md px-2 py-1"
                          style={{
                            top: (ev.startHour - 8) * ROW_HEIGHT + 2,
                            height: ev.duration * ROW_HEIGHT - 4,
                            backgroundColor: cal.lightColor,
                            borderLeft: `2px solid ${cal.color}`,
                          }}
                        >
                          <p className="truncate text-[11px] font-semibold tracking-tight text-foreground/75">
                            {ev.title}
                          </p>
                        </motion.div>
                      ))
                  : null
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
