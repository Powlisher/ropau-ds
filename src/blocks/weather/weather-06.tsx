"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SunriseIcon, SunsetIcon } from "lucide-react"
import { motion } from "framer-motion"

const sunriseMinutes = 6 * 60 + 42
const sunsetMinutes = 20 * 60 + 31
const nowMinutes = 15 * 60 + 20
const dayLength = sunsetMinutes - sunriseMinutes
const progress = Math.min(Math.max((nowMinutes - sunriseMinutes) / dayLength, 0), 1)

function SunArc() {
  const width = 280
  const height = 100
  const padding = 20
  const arcWidth = width - padding * 2
  const arcHeight = height - 20

  const points: string[] = []
  for (let i = 0; i <= 100; i++) {
    const t = i / 100
    const x = padding + t * arcWidth
    const y = height - 10 - Math.sin(t * Math.PI) * arcHeight
    points.push(`${x},${y}`)
  }
  const pathD = `M ${points.join(" L ")}`

  const sunX = padding + progress * arcWidth
  const sunY = height - 10 - Math.sin(progress * Math.PI) * arcHeight

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ maxWidth: 320 }}>
      <defs>
        <linearGradient id="arc-gradient" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="oklch(0.78 0.14 82)" stopOpacity="0.2" />
          <stop offset={`${progress * 100}%`} stopColor="oklch(0.78 0.14 82)" stopOpacity="0.6" />
          <stop offset={`${progress * 100}%`} stopColor="oklch(0.60 0.05 260)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="oklch(0.60 0.05 260)" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <line
        x1={padding}
        y1={height - 10}
        x2={width - padding}
        y2={height - 10}
        stroke="currentColor"
        className="text-border"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <path
        d={pathD}
        fill="none"
        stroke="url(#arc-gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <motion.circle
        cx={sunX}
        cy={sunY}
        r="8"
        fill="oklch(0.82 0.17 82)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring" as const, stiffness: 200, damping: 15, delay: 0.3 }}
      />
      <motion.circle
        cx={sunX}
        cy={sunY}
        r="14"
        fill="oklch(0.82 0.17 82)"
        opacity="0.15"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring" as const, stiffness: 200, damping: 15, delay: 0.4 }}
      />
    </svg>
  )
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

export default function Weather06() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Sunrise & Sunset</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-4"
        >
          <motion.div variants={itemVariants}>
            <SunArc />
          </motion.div>
          <motion.div variants={itemVariants} className="flex w-full items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <SunriseIcon className="size-4 text-muted-foreground/60" />
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Sunrise</div>
                <div className="text-sm font-semibold tabular-nums">6:42 AM</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Daylight</div>
              <div className="text-sm font-semibold tabular-nums">13h 49m</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Sunset</div>
                <div className="text-sm font-semibold tabular-nums">8:31 PM</div>
              </div>
              <SunsetIcon className="size-4 text-muted-foreground/60" />
            </div>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
