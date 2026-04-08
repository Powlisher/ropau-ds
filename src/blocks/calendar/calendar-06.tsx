"use client"

import { motion } from "framer-motion"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const DAYS = ["Mon", "", "Wed", "", "Fri", "", ""]

function generateHeatmapData() {
  const data: number[][] = []
  for (let week = 0; week < 52; week++) {
    const weekData: number[] = []
    for (let day = 0; day < 7; day++) {
      const base = Math.sin(week / 8) * 2 + 2
      const noise = Math.random() * 4
      const dayFactor = day >= 5 ? 0.3 : 1
      weekData.push(Math.max(0, Math.round((base + noise) * dayFactor)))
    }
    data.push(weekData)
  }
  return data
}

const heatmapData = generateHeatmapData()

function getColor(count: number): string {
  if (count === 0) return "oklch(0.95 0.005 145)"
  if (count <= 2) return "oklch(0.87 0.06 145)"
  if (count <= 4) return "oklch(0.72 0.12 145)"
  if (count <= 6) return "oklch(0.58 0.15 145)"
  return "oklch(0.45 0.14 145)"
}

const totalContributions = heatmapData.flat().reduce((a, b) => a + b, 0)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.002 } },
}

const cellVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 400, damping: 20 } },
}

export default function Calendar06() {
  return (
    <div className="w-full max-w-4xl">
      <div className="mb-5 flex items-baseline gap-3">
        <h2 className="font-heading text-lg font-semibold tracking-tight">Activity</h2>
        <span className="text-sm text-muted-foreground">
          <span className="font-mono tabular-nums font-medium text-foreground">{totalContributions.toLocaleString()}</span>{" "}
          contributions in the last year
        </span>
      </div>

      <div
        className="overflow-x-auto rounded-xl bg-card p-5 ring-1 ring-foreground/[0.06]"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <div className="mb-2 flex gap-[3px] pl-8">
          {MONTHS.map((m, i) => (
            <div
              key={m}
              className="text-[10px] font-medium text-muted-foreground"
              style={{ width: i === 1 ? "30px" : `${(52 / 12) * 13}px` }}
            >
              {m}
            </div>
          ))}
        </div>

        <div className="flex gap-0">
          <div className="flex flex-col gap-[3px] pr-2 pt-0">
            {DAYS.map((d, i) => (
              <div key={i} className="flex h-[11px] items-center">
                <span className="text-[10px] text-muted-foreground">{d}</span>
              </div>
            ))}
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex gap-[3px]"
          >
            {heatmapData.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((count, di) => (
                  <motion.div
                    key={di}
                    variants={cellVariants}
                    title={`${count} contributions`}
                    className="size-[11px] rounded-[2px] cursor-default"
                    style={{ backgroundColor: getColor(count) }}
                  />
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-3 flex items-center justify-end gap-1.5">
          <span className="mr-1 text-[10px] text-muted-foreground">Less</span>
          {[0, 1, 3, 5, 7].map((val) => (
            <div
              key={val}
              className="size-[11px] rounded-[2px]"
              style={{ backgroundColor: getColor(val) }}
            />
          ))}
          <span className="ml-1 text-[10px] text-muted-foreground">More</span>
        </div>
      </div>
    </div>
  )
}
