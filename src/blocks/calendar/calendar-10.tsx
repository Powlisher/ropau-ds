"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"]
const DATES = [
  { day: "Mon", date: 6 },
  { day: "Tue", date: 7 },
  { day: "Wed", date: 8 },
  { day: "Thu", date: 9 },
  { day: "Fri", date: 10 },
]

const SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
]

const unavailable: Record<number, string[]> = {
  6: ["09:00", "09:30", "10:00", "14:00", "14:30"],
  7: ["11:00", "11:30", "13:00"],
  8: ["09:00", "09:30", "10:00", "10:30", "15:00", "15:30", "16:00", "16:30"],
  9: ["13:00", "13:30", "14:00"],
  10: ["09:00", "15:00", "15:30", "16:00", "16:30"],
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.02 } },
}

const slotVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Calendar10() {
  const [selected, setSelected] = useState<{ date: number; time: string } | null>(null)

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight">Book a time</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            30 min consultation -- select an available slot
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
        <div className="grid grid-cols-5 border-b border-border/50">
          {DATES.map((d) => (
            <div key={d.date} className="flex flex-col items-center py-3">
              <span className="text-[10px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                {d.day}
              </span>
              <span className="mt-0.5 font-mono text-sm tabular-nums font-medium text-foreground/80">
                Apr {d.date}
              </span>
            </div>
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-5 gap-px bg-border/20 p-3"
        >
          {DATES.map((d) => (
            <div key={d.date} className="space-y-1.5 px-1">
              {SLOTS.map((slot) => {
                const isUnavailable = unavailable[d.date]?.includes(slot)
                const isSelected = selected?.date === d.date && selected?.time === slot

                return (
                  <motion.button
                    key={`${d.date}-${slot}`}
                    variants={slotVariants}
                    whileHover={!isUnavailable ? { scale: 1.05 } : undefined}
                    whileTap={!isUnavailable ? { scale: 0.97 } : undefined}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
                    disabled={isUnavailable}
                    onClick={() => setSelected({ date: d.date, time: slot })}
                    className={`flex w-full items-center justify-center rounded-lg py-2 font-mono text-xs tabular-nums transition-colors ${
                      isUnavailable
                        ? "cursor-not-allowed bg-muted/30 text-muted-foreground/30"
                        : isSelected
                          ? "font-semibold text-white"
                          : "bg-muted/50 text-foreground/70 ring-1 ring-foreground/[0.04] hover:bg-muted/80 hover:text-foreground"
                    }`}
                    style={isSelected ? { backgroundColor: "oklch(0.45 0.12 260)" } : undefined}
                  >
                    {isSelected ? (
                      <span className="flex items-center gap-1">
                        <Check className="size-3" strokeWidth={3} />
                        {slot}
                      </span>
                    ) : (
                      slot
                    )}
                  </motion.button>
                )
              })}
            </div>
          ))}
        </motion.div>
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
          className="mt-4 flex items-center justify-between rounded-lg bg-muted/40 px-4 py-3"
        >
          <p className="text-sm text-foreground/80">
            <span className="font-semibold">Apr {selected.date}</span> at{" "}
            <span className="font-mono tabular-nums font-semibold">{selected.time}</span>
          </p>
          <Button size="sm">Confirm booking</Button>
        </motion.div>
      )}
    </div>
  )
}
