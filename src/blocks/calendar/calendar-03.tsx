"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const HOURS = Array.from({ length: 13 }, (_, i) => i + 7)

const events = [
  { startHour: 8, duration: 1, title: "Morning standup", color: "oklch(0.88 0.06 55)", col: 0 },
  { startHour: 9.5, duration: 2, title: "Technical deep dive: migration plan", color: "oklch(0.88 0.06 260)", col: 0 },
  { startHour: 10, duration: 1.5, title: "User research debrief", color: "oklch(0.88 0.06 145)", col: 1 },
  { startHour: 13, duration: 1, title: "Lunch with Karim", color: "oklch(0.92 0.02 0)", col: 0 },
  { startHour: 14.5, duration: 1.5, title: "Design critique", color: "oklch(0.88 0.06 25)", col: 0 },
  { startHour: 16.5, duration: 1, title: "Wrap-up & notes", color: "oklch(0.88 0.06 260)", col: 0 },
]

const ROW_HEIGHT = 60
const maxCols = 2

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Calendar03() {
  return (
    <div className="w-full max-w-lg">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight">Wednesday, April 8</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            <span className="font-mono tabular-nums">6</span> events today
          </p>
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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative grid grid-cols-[48px_1fr]"
        >
          <div>
            {HOURS.map((h) => (
              <div key={h} className="flex h-[60px] items-start justify-end pr-2.5 pt-0">
                <span className="font-mono text-[10px] tabular-nums text-muted-foreground -translate-y-1.5">
                  {h}:00
                </span>
              </div>
            ))}
          </div>

          <div className="relative border-l border-border/30">
            {HOURS.map((h) => (
              <div key={h} className="h-[60px] border-b border-border/15" />
            ))}

            {events.map((ev) => {
              const left = ev.col === 0 ? 4 : `calc(50% + 2px)`
              const right = ev.col === 0 && maxCols > 1 && events.some(
                (other) =>
                  other !== ev &&
                  other.col === 1 &&
                  other.startHour < ev.startHour + ev.duration &&
                  other.startHour + other.duration > ev.startHour
              )
                ? `calc(50% + 2px)`
                : "4px"

              return (
                <motion.div
                  key={ev.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                  className="absolute overflow-hidden rounded-lg px-3 py-2"
                  style={{
                    top: (ev.startHour - 7) * ROW_HEIGHT + 2,
                    height: ev.duration * ROW_HEIGHT - 4,
                    left,
                    right,
                    backgroundColor: ev.color,
                  }}
                >
                  <p className="truncate text-xs font-semibold tracking-tight text-foreground/80">
                    {ev.title}
                  </p>
                  <p className="font-mono text-[10px] tabular-nums text-foreground/50">
                    {Math.floor(ev.startHour)}:{ev.startHour % 1 ? "30" : "00"} - {Math.floor(ev.startHour + ev.duration)}:{(ev.startHour + ev.duration) % 1 ? "30" : "00"}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
