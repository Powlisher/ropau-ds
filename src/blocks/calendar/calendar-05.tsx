"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const START_OFFSET = 2

function buildGrid() {
  const cells: (number | null)[] = []
  for (let i = 0; i < START_OFFSET; i++) cells.push(null)
  for (let d = 1; d <= 30; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

const allEvents: Record<number, { time: string; title: string; color: string }[]> = {
  3: [{ time: "10:00", title: "Product sync", color: "oklch(0.60 0.18 260)" }],
  8: [
    { time: "09:00", title: "Standup", color: "oklch(0.60 0.18 55)" },
    { time: "11:30", title: "Design review with Lena", color: "oklch(0.60 0.18 260)" },
    { time: "15:00", title: "Client call: Meridian Corp", color: "oklch(0.60 0.18 25)" },
  ],
  12: [
    { time: "14:00", title: "Sprint retro", color: "oklch(0.60 0.18 145)" },
    { time: "16:30", title: "1:1 with Marcus", color: "oklch(0.60 0.18 260)" },
  ],
  15: [{ time: "10:00", title: "Quarterly planning", color: "oklch(0.60 0.18 25)" }],
  18: [{ time: "09:30", title: "Infrastructure review", color: "oklch(0.60 0.18 145)" }],
  24: [
    { time: "11:00", title: "Demo prep", color: "oklch(0.60 0.18 55)" },
    { time: "14:00", title: "All hands", color: "oklch(0.60 0.18 260)" },
  ],
  27: [{ time: "13:00", title: "External audit meeting", color: "oklch(0.60 0.18 25)" }],
}

export default function Calendar05() {
  const [selected, setSelected] = useState(8)
  const cells = buildGrid()
  const dayEvents = allEvents[selected] || []

  return (
    <div className="flex w-full max-w-3xl gap-5">
      <div
        className="flex-1 overflow-hidden rounded-xl bg-card ring-1 ring-foreground/[0.06]"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
          <span className="font-heading text-sm font-semibold tracking-tight">April 2026</span>
          <div className="flex gap-0.5">
            <Button variant="ghost" size="sm" className="size-7 p-0">
              <ChevronLeft className="size-3.5" />
            </Button>
            <Button variant="ghost" size="sm" className="size-7 p-0">
              <ChevronRight className="size-3.5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7">
          {DAYS.map((d) => (
            <div key={d} className="py-2 text-center text-[10px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
              {d}
            </div>
          ))}
          {cells.map((day, i) => {
            const hasEvents = day ? !!allEvents[day] : false
            const isSelected = day === selected
            return (
              <button
                key={i}
                onClick={() => day && setSelected(day)}
                disabled={!day}
                className={`flex flex-col items-center justify-center py-2 transition-colors ${
                  isSelected
                    ? "bg-muted/60"
                    : day
                      ? "hover:bg-muted/30"
                      : ""
                }`}
              >
                {day && (
                  <>
                    <span
                      className={`flex size-7 items-center justify-center rounded-full font-mono text-xs tabular-nums ${
                        isSelected ? "font-semibold text-white" : "text-foreground/75"
                      }`}
                      style={isSelected ? { backgroundColor: "oklch(0.45 0.12 260)" } : undefined}
                    >
                      {day}
                    </span>
                    {hasEvents && (
                      <div className="mt-1 size-1 rounded-full" style={{ backgroundColor: "oklch(0.60 0.18 260)" }} />
                    )}
                  </>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div className="w-64 shrink-0">
        <h3 className="mb-3 font-heading text-sm font-semibold tracking-tight">
          April {selected}
        </h3>

        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
            className="space-y-2"
          >
            {dayEvents.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No events scheduled
              </p>
            ) : (
              dayEvents.map((ev) => (
                <motion.div
                  key={ev.title}
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                  className="rounded-lg bg-card p-3 ring-1 ring-foreground/[0.06]"
                  style={{
                    boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                  }}
                >
                  <div className="mb-1.5 flex items-center gap-1.5">
                    <div className="size-2 rounded-full" style={{ backgroundColor: ev.color }} />
                    <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                      {ev.time}
                    </span>
                  </div>
                  <p className="text-sm font-medium tracking-tight text-foreground/85">
                    {ev.title}
                  </p>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
