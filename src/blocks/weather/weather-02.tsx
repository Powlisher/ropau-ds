"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const forecast = [
  { day: "Mon", high: 24, low: 16, condition: "sunny" },
  { day: "Tue", high: 22, low: 15, condition: "partly-cloudy" },
  { day: "Wed", high: 19, low: 13, condition: "cloudy" },
  { day: "Thu", high: 17, low: 11, condition: "rainy" },
  { day: "Fri", high: 20, low: 14, condition: "partly-cloudy" },
  { day: "Sat", high: 23, low: 16, condition: "sunny" },
  { day: "Sun", high: 25, low: 17, condition: "sunny" },
]

const maxTemp = Math.max(...forecast.map((d) => d.high))
const minTemp = Math.min(...forecast.map((d) => d.low))
const range = maxTemp - minTemp

function ConditionDot({ condition }: { condition: string }) {
  const colors: Record<string, string> = {
    sunny: "oklch(0.82 0.17 82)",
    "partly-cloudy": "oklch(0.75 0.08 80)",
    cloudy: "oklch(0.65 0.02 260)",
    rainy: "oklch(0.60 0.12 250)",
  }
  return (
    <div
      className="size-2.5 rounded-full"
      style={{ backgroundColor: colors[condition] ?? colors.cloudy }}
    />
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Weather02() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">7-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {forecast.map((day) => {
            const barLeft = ((day.low - minTemp) / range) * 100
            const barWidth = ((day.high - day.low) / range) * 100
            return (
              <motion.div
                key={day.day}
                variants={itemVariants}
                className="grid grid-cols-[40px_24px_1fr_36px_36px] items-center gap-3"
              >
                <span className="text-sm font-medium text-foreground">{day.day}</span>
                <ConditionDot condition={day.condition} />
                <div className="relative h-2 rounded-full bg-muted">
                  <motion.div
                    className="absolute inset-y-0 rounded-full"
                    style={{
                      left: `${barLeft}%`,
                      background: "linear-gradient(90deg, oklch(0.70 0.12 250), oklch(0.82 0.17 82))",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${barWidth}%` }}
                    transition={{ type: "spring" as const, stiffness: 80, damping: 18, delay: 0.1 }}
                  />
                </div>
                <span className="text-right text-xs tabular-nums text-muted-foreground">{day.low}°</span>
                <span className="text-right text-xs font-medium tabular-nums">{day.high}°</span>
              </motion.div>
            )
          })}
        </motion.div>
      </CardContent>
    </Card>
  )
}
