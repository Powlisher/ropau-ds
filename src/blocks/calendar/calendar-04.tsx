"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
const DAYS_IN_MONTH = 30
const START_OFFSET = 2

function buildGrid() {
  const cells: (number | null)[] = []
  for (let i = 0; i < START_OFFSET; i++) cells.push(null)
  for (let d = 1; d <= DAYS_IN_MONTH; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

export default function Calendar04() {
  const [selected, setSelected] = useState(8)
  const today = 8
  const cells = buildGrid()

  return (
    <div
      className="w-[280px] rounded-xl bg-card p-4 ring-1 ring-foreground/[0.06]"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <div className="mb-3 flex items-center justify-between">
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

      <div className="grid grid-cols-7 gap-0.5">
        {DAYS.map((d) => (
          <div key={d} className="flex h-8 items-center justify-center">
            <span className="text-[10px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
              {d}
            </span>
          </div>
        ))}

        {cells.map((day, i) => {
          const isToday = day === today
          const isSelected = day === selected
          return (
            <motion.button
              key={i}
              whileHover={day ? { scale: 1.15 } : undefined}
              whileTap={day ? { scale: 0.95 } : undefined}
              transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
              onClick={() => day && setSelected(day)}
              disabled={!day}
              className={`flex size-8 items-center justify-center rounded-lg font-mono text-xs tabular-nums transition-colors ${
                isSelected
                  ? "font-semibold text-white"
                  : isToday
                    ? "font-semibold text-foreground ring-1 ring-foreground/15"
                    : day
                      ? "text-foreground/70 hover:bg-muted/60"
                      : ""
              }`}
              style={isSelected ? { backgroundColor: "oklch(0.45 0.12 260)" } : undefined}
            >
              {day}
            </motion.button>
          )
        })}
      </div>

      <div className="mt-3 border-t border-border/50 pt-3 text-center">
        <Button size="sm" variant="ghost" className="h-7 text-xs font-medium text-muted-foreground">
          Today
        </Button>
      </div>
    </div>
  )
}
