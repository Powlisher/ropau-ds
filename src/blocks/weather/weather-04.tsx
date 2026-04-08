"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropletsIcon, WindIcon, SunIcon, GaugeIcon, EyeIcon, ThermometerIcon } from "lucide-react"
import { motion } from "framer-motion"

const details = [
  { label: "Humidity", value: "58%", icon: DropletsIcon, bar: 58, color: "oklch(0.60 0.15 250)" },
  { label: "Wind Speed", value: "14 km/h", icon: WindIcon, bar: 35, color: "oklch(0.65 0.10 200)" },
  { label: "UV Index", value: "6 High", icon: SunIcon, bar: 55, color: "oklch(0.78 0.16 82)" },
  { label: "Pressure", value: "1,013 hPa", icon: GaugeIcon, bar: 68, color: "oklch(0.55 0.08 280)" },
  { label: "Visibility", value: "12.4 km", icon: EyeIcon, bar: 82, color: "oklch(0.70 0.06 230)" },
  { label: "Feels Like", value: "25°", icon: ThermometerIcon, bar: 72, color: "oklch(0.72 0.14 40)" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Weather04() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          className="grid grid-cols-2 gap-4 sm:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {details.map((detail) => (
            <motion.div
              key={detail.label}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              className="rounded-xl bg-muted/40 p-4"
            >
              <div className="flex items-center gap-2">
                <detail.icon className="size-4 text-muted-foreground/60" />
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {detail.label}
                </span>
              </div>
              <div className="mt-3 text-lg font-semibold tabular-nums tracking-tight">
                {detail.value}
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: detail.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${detail.bar}%` }}
                  transition={{ type: "spring" as const, stiffness: 60, damping: 18 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  )
}
