"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const DAYS_IN_MONTH = 30
const START_OFFSET = 2

function buildGrid() {
  const cells: (number | null)[] = []
  for (let i = 0; i < START_OFFSET; i++) cells.push(null)
  for (let d = 1; d <= DAYS_IN_MONTH; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

const cells = buildGrid()

export default function Calendar08() {
  const [range, setRange] = useState<{ start: number | null; end: number | null }>({
    start: 12,
    end: 18,
  })
  const [dragging, setDragging] = useState(false)

  const handleMouseDown = useCallback((day: number) => {
    setRange({ start: day, end: day })
    setDragging(true)
  }, [])

  const handleMouseEnter = useCallback(
    (day: number) => {
      if (dragging && range.start !== null) {
        setRange((r) => ({ ...r, end: day }))
      }
    },
    [dragging, range.start]
  )

  const handleMouseUp = useCallback(() => {
    setDragging(false)
  }, [])

  const isInRange = useCallback(
    (day: number) => {
      if (range.start === null || range.end === null) return false
      const min = Math.min(range.start, range.end)
      const max = Math.max(range.start, range.end)
      return day >= min && day <= max
    },
    [range]
  )

  const isStart = useCallback(
    (day: number) => {
      if (range.start === null || range.end === null) return false
      return day === Math.min(range.start, range.end)
    },
    [range]
  )

  const isEnd = useCallback(
    (day: number) => {
      if (range.start === null || range.end === null) return false
      return day === Math.max(range.start, range.end)
    },
    [range]
  )

  const rangeLength =
    range.start !== null && range.end !== null
      ? Math.abs(range.end - range.start) + 1
      : 0

  return (
    <div className="w-full max-w-md" onMouseUp={handleMouseUp}>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight">Select dates</h2>
          {rangeLength > 0 && (
            <p className="mt-0.5 text-xs text-muted-foreground">
              <span className="font-mono tabular-nums font-medium text-foreground">{rangeLength}</span>{" "}
              {rangeLength === 1 ? "day" : "days"} selected
            </p>
          )}
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
        className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/[0.06] select-none"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <div className="grid grid-cols-7 border-b border-border/50">
          {DAYS.map((d) => (
            <div key={d} className="py-2.5 text-center text-[10px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {cells.map((day, i) => {
            const inRange = day ? isInRange(day) : false
            const start = day ? isStart(day) : false
            const end = day ? isEnd(day) : false

            return (
              <div
                key={i}
                onMouseDown={() => day && handleMouseDown(day)}
                onMouseEnter={() => day && handleMouseEnter(day)}
                className={`flex items-center justify-center py-2 ${
                  !day ? "" : "cursor-pointer"
                } ${
                  inRange && !start && !end ? "bg-[oklch(0.94_0.04_260)]" : ""
                } ${start ? "rounded-l-lg bg-[oklch(0.94_0.04_260)]" : ""} ${
                  end ? "rounded-r-lg bg-[oklch(0.94_0.04_260)]" : ""
                }`}
              >
                {day && (
                  <motion.span
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
                    className={`flex size-8 items-center justify-center rounded-full font-mono text-xs tabular-nums ${
                      start || end
                        ? "font-semibold text-white"
                        : inRange
                          ? "font-medium text-foreground"
                          : "text-foreground/70 hover:bg-muted/50"
                    }`}
                    style={start || end ? { backgroundColor: "oklch(0.45 0.12 260)" } : undefined}
                  >
                    {day}
                  </motion.span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setRange({ start: null, end: null })}
        >
          Clear
        </Button>
        <Button size="sm">Apply</Button>
      </div>
    </div>
  )
}
