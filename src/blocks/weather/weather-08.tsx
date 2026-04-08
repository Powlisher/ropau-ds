"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { WindIcon } from "lucide-react"
import { motion } from "framer-motion"

const aqiValue = 72
const aqiLabel = "Moderate"

const pollutants = [
  { name: "PM2.5", value: 18.3, unit: "ug/m3", max: 75 },
  { name: "PM10", value: 34.7, unit: "ug/m3", max: 150 },
  { name: "O3", value: 52.1, unit: "ppb", max: 120 },
  { name: "NO2", value: 24.8, unit: "ppb", max: 100 },
]

const scaleStops = [
  { label: "Good", from: 0, to: 50, color: "oklch(0.72 0.18 148)" },
  { label: "Moderate", from: 50, to: 100, color: "oklch(0.80 0.16 82)" },
  { label: "Unhealthy (S)", from: 100, to: 150, color: "oklch(0.72 0.18 50)" },
  { label: "Unhealthy", from: 150, to: 200, color: "oklch(0.62 0.22 25)" },
  { label: "Very Unhealthy", from: 200, to: 300, color: "oklch(0.50 0.20 320)" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Weather08() {
  const markerPosition = Math.min((aqiValue / 300) * 100, 100)

  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold tracking-tight">Air Quality</CardTitle>
            <CardDescription>Real-time air quality index</CardDescription>
          </div>
          <Badge variant="secondary" className="gap-1">
            <WindIcon className="size-3" />
            AQI {aqiValue}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div variants={itemVariants} className="text-center">
            <div className="text-5xl font-semibold tabular-nums tracking-tight">{aqiValue}</div>
            <div className="mt-1 text-sm text-muted-foreground">{aqiLabel}</div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <div className="flex h-3 overflow-hidden rounded-full">
              {scaleStops.map((stop) => (
                <div
                  key={stop.label}
                  className="h-full"
                  style={{
                    flex: stop.to - stop.from,
                    backgroundColor: stop.color,
                  }}
                />
              ))}
            </div>
            <motion.div
              className="absolute top-0 h-3 w-1 rounded-full bg-foreground"
              style={{ left: `${markerPosition}%` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 20, delay: 0.3 }}
            />
            <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
              <span>Good</span>
              <span>Moderate</span>
              <span>Unhealthy</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
            {pollutants.map((p) => (
              <div key={p.name} className="rounded-lg bg-muted/40 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {p.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{p.unit}</span>
                </div>
                <div className="mt-1.5 text-base font-semibold tabular-nums">{p.value}</div>
                <div className="mt-1.5 h-1 rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: "oklch(0.65 0.12 200)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(p.value / p.max) * 100}%` }}
                    transition={{ type: "spring" as const, stiffness: 60, damping: 18 }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
