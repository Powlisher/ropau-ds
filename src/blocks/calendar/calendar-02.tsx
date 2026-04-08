"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const HOURS = Array.from({ length: 11 }, (_, i) => i + 8)
const WEEKDAYS = [
  { short: "Mon", date: 6 },
  { short: "Tue", date: 7 },
  { short: "Wed", date: 8 },
  { short: "Thu", date: 9 },
  { short: "Fri", date: 10 },
]

const events = [
  { day: 0, startHour: 9, duration: 1.5, title: "Design review", color: "oklch(0.88 0.06 260)" },
  { day: 0, startHour: 14, duration: 1, title: "1:1 with Elise", color: "oklch(0.88 0.06 145)" },
  { day: 1, startHour: 10, duration: 2, title: "Sprint planning", color: "oklch(0.88 0.06 25)" },
  { day: 2, startHour: 8, duration: 0.75, title: "Standup", color: "oklch(0.88 0.06 55)" },
  { day: 2, startHour: 13, duration: 1.5, title: "User interviews", color: "oklch(0.88 0.06 145)" },
  { day: 3, startHour: 11, duration: 1, title: "Architecture sync", color: "oklch(0.88 0.06 260)" },
  { day: 3, startHour: 15, duration: 2, title: "Deep work block", color: "oklch(0.92 0.02 0)" },
  { day: 4, startHour: 9, duration: 1, title: "Weekly demo", color: "oklch(0.88 0.06 25)" },
  { day: 4, startHour: 14, duration: 1.5, title: "Retro", color: "oklch(0.88 0.06 145)" },
]

const ROW_HEIGHT = 52

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Calendar02() {
  return (
    <div className="w-full max-w-4xl">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold tracking-tight">
          Apr 6 - 10, 2026
        </h2>
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
        <div className="grid grid-cols-[56px_repeat(5,1fr)] border-b border-border/50">
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
          className="relative grid grid-cols-[56px_repeat(5,1fr)]"
        >
          <div>
            {HOURS.map((h) => (
              <div key={h} className="flex h-[52px] items-start justify-end pr-3 pt-0">
                <span className="font-mono text-[10px] tabular-nums text-muted-foreground -translate-y-1.5">
                  {h}:00
                </span>
              </div>
            ))}
          </div>

          {WEEKDAYS.map((_, dayIdx) => (
            <div key={dayIdx} className="relative border-l border-border/30">
              {HOURS.map((h) => (
                <div key={h} className="h-[52px] border-b border-border/15" />
              ))}

              {events
                .filter((e) => e.day === dayIdx)
                .map((ev) => (
                  <motion.div
                    key={ev.title}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                    className="absolute inset-x-1 overflow-hidden rounded-md px-2 py-1.5"
                    style={{
                      top: (ev.startHour - 8) * ROW_HEIGHT + 2,
                      height: ev.duration * ROW_HEIGHT - 4,
                      backgroundColor: ev.color,
                    }}
                  >
                    <p className="truncate text-xs font-semibold tracking-tight text-foreground/80">
                      {ev.title}
                    </p>
                    <p className="font-mono text-[10px] tabular-nums text-foreground/50">
                      {ev.startHour}:00
                    </p>
                  </motion.div>
                ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
