"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"

const metrics = [
  { label: "Storage Used", value: 73, display: "73%", detail: "14.6 GB of 20 GB", color: "oklch(0.478 0.227 3.6)" },
  { label: "Sprint Progress", value: 58, display: "58%", detail: "23 of 40 tasks done", color: "oklch(0.519 0.292 25.1)" },
  { label: "Budget Spent", value: 41, display: "41%", detail: "$8,240 of $20,000", color: "oklch(0.556 0 0)" },
]

function RingProgress({ value, color, display }: { value: number; color: string; display: string }) {
  const size = 120
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-muted"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ type: "spring" as const, stiffness: 60, damping: 20 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-semibold tabular-nums tracking-tight">{display}</span>
      </div>
    </div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function StatsRingProgress() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Resource Utilization</CardTitle>
        <CardDescription>Current usage across key resources</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          className="flex flex-wrap items-center justify-around gap-8 py-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {metrics.map((metric) => (
            <motion.div key={metric.label} variants={itemVariants} className="flex flex-col items-center gap-3">
              <RingProgress value={metric.value} color={metric.color} display={metric.display} />
              <div className="text-center">
                <div className="text-sm font-medium">{metric.label}</div>
                <div className="text-xs text-muted-foreground tabular-nums">{metric.detail}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  )
}
