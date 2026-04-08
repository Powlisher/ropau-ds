"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const events: Record<number, { color: string; count: number }[]> = {
  3: [{ color: "oklch(0.60 0.18 260)", count: 1 }],
  7: [{ color: "oklch(0.60 0.18 145)", count: 2 }],
  8: [{ color: "oklch(0.60 0.18 25)", count: 1 }],
  12: [{ color: "oklch(0.60 0.18 260)", count: 1 }, { color: "oklch(0.60 0.18 145)", count: 1 }],
  15: [{ color: "oklch(0.60 0.18 55)", count: 1 }],
  18: [{ color: "oklch(0.60 0.18 145)", count: 3 }],
  21: [{ color: "oklch(0.60 0.18 25)", count: 1 }],
  24: [{ color: "oklch(0.60 0.18 260)", count: 1 }],
  27: [{ color: "oklch(0.60 0.18 145)", count: 1 }, { color: "oklch(0.60 0.18 55)", count: 1 }],
  30: [{ color: "oklch(0.60 0.18 25)", count: 2 }],
}

function buildGrid() {
  const startOffset = 1
  const daysInMonth = 30
  const cells: (number | null)[] = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.015 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Calendar01() {
  const [today] = useState(8)
  const cells = buildGrid()

  return (
    <div className="w-full max-w-md">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold tracking-tight">April 2026</h2>
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
        <div className="grid grid-cols-7 border-b border-border/50">
          {DAYS.map((d) => (
            <div key={d} className="py-2.5 text-center text-xs font-semibold tracking-[0.06em] text-muted-foreground uppercase">
              {d}
            </div>
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-7"
        >
          {cells.map((day, i) => {
            const isToday = day === today
            const dayEvents = day ? events[day] : undefined
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`flex flex-col items-center justify-start border-b border-r border-border/20 py-2.5 last:border-r-0 ${
                  !day ? "bg-muted/20" : "cursor-pointer transition-colors hover:bg-muted/40"
                }`}
                style={{ minHeight: 56 }}
              >
                {day && (
                  <>
                    <span
                      className={`flex size-7 items-center justify-center rounded-full font-mono text-xs tabular-nums ${
                        isToday
                          ? "font-semibold text-white"
                          : "text-foreground/80"
                      }`}
                      style={isToday ? { backgroundColor: "oklch(0.45 0.12 260)" } : undefined}
                    >
                      {day}
                    </span>
                    {dayEvents && (
                      <div className="mt-1.5 flex gap-0.5">
                        {dayEvents.map((ev, j) => (
                          <div
                            key={j}
                            className="size-1.5 rounded-full"
                            style={{ backgroundColor: ev.color }}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
