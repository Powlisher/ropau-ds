"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"

const hours = [
  { time: "Now", temp: 23, condition: "sunny" },
  { time: "2 PM", temp: 24, condition: "sunny" },
  { time: "3 PM", temp: 24, condition: "partly-cloudy" },
  { time: "4 PM", temp: 23, condition: "partly-cloudy" },
  { time: "5 PM", temp: 21, condition: "cloudy" },
  { time: "6 PM", temp: 20, condition: "cloudy" },
  { time: "7 PM", temp: 18, condition: "cloudy" },
  { time: "8 PM", temp: 17, condition: "partly-cloudy" },
  { time: "9 PM", temp: 16, condition: "clear" },
  { time: "10 PM", temp: 15, condition: "clear" },
  { time: "11 PM", temp: 14, condition: "clear" },
  { time: "12 AM", temp: 13, condition: "clear" },
]

const conditionIcons: Record<string, string> = {
  sunny: "oklch(0.82 0.17 82)",
  "partly-cloudy": "oklch(0.75 0.08 80)",
  cloudy: "oklch(0.65 0.02 260)",
  clear: "oklch(0.70 0.10 260)",
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const maxTemp = Math.max(...hours.map((h) => h.temp))
const minTemp = Math.min(...hours.map((h) => h.temp))

export default function Weather03() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Hourly Forecast</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <ScrollArea className="w-full">
          <motion.div
            className="flex gap-1 pb-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {hours.map((hour, i) => {
              const heightPercent = ((hour.temp - minTemp) / (maxTemp - minTemp)) * 40 + 20
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                  className="flex min-w-[56px] flex-col items-center gap-2 rounded-xl px-2 py-3 transition-colors hover:bg-muted/50"
                >
                  <span className="text-[11px] font-medium text-muted-foreground">
                    {hour.time}
                  </span>
                  <div
                    className="size-3 rounded-full"
                    style={{ backgroundColor: conditionIcons[hour.condition] }}
                  />
                  <div className="flex flex-col items-center justify-end" style={{ height: 60 }}>
                    <div
                      className="w-1.5 rounded-full"
                      style={{
                        height: `${heightPercent}%`,
                        background: `linear-gradient(to top, oklch(0.70 0.12 250), ${conditionIcons[hour.condition]})`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold tabular-nums">{hour.temp}°</span>
                </motion.div>
              )
            })}
          </motion.div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
