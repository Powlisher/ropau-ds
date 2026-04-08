"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"

const services = [
  { name: "API Gateway", uptime: 99.98, days: generateDays(99.98) },
  { name: "Web Application", uptime: 99.95, days: generateDays(99.95) },
  { name: "Database Primary", uptime: 99.99, days: generateDays(99.99) },
  { name: "Authentication", uptime: 100.0, days: generateDays(100) },
  { name: "Payment Processing", uptime: 99.91, days: generateDays(99.91) },
  { name: "Email Delivery", uptime: 99.87, days: generateDays(99.87) },
  { name: "Search Engine", uptime: 99.94, days: generateDays(99.94) },
]

function generateDays(uptime: number): ("up" | "degraded" | "down")[] {
  const days: ("up" | "degraded" | "down")[] = Array(90).fill("up")
  const downDays = Math.round((100 - uptime) * 3)
  const degradedDays = Math.round(downDays * 1.5)

  for (let i = 0; i < downDays && i < days.length; i++) {
    const idx = Math.floor(Math.random() * 70) + 10
    days[idx] = "down"
  }
  for (let i = 0; i < degradedDays && i < days.length; i++) {
    const idx = Math.floor(Math.random() * 80) + 5
    if (days[idx] === "up") days[idx] = "degraded"
  }
  return days
}

const dayColors = {
  up: "bg-emerald-500",
  degraded: "bg-amber-400",
  down: "bg-rose-500",
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Monitoring02() {
  return (
    <motion.div
      className="mx-auto max-w-2xl py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card
        style={{
          boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <CardHeader>
          <CardTitle className="font-heading text-lg tracking-tight">Uptime Monitor</CardTitle>
          <CardDescription>Last 90 days of service availability</CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {services.map((service) => (
            <motion.div key={service.name} variants={itemVariants}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-foreground">{service.name}</span>
                <span className={`text-sm font-mono tabular-nums font-semibold ${
                  service.uptime >= 99.95 ? "text-emerald-600" : service.uptime >= 99.9 ? "text-amber-600" : "text-rose-600"
                }`}>
                  {service.uptime.toFixed(2)}%
                </span>
              </div>

              <div className="flex gap-px">
                {service.days.map((day, i) => (
                  <div
                    key={i}
                    className={`h-6 flex-1 rounded-[2px] ${dayColors[day]} transition-opacity hover:opacity-70`}
                    title={`Day ${i + 1}: ${day}`}
                  />
                ))}
              </div>

              <div className="mt-1 flex justify-between text-[10px] font-mono tabular-nums text-muted-foreground/60">
                <span>90 days ago</span>
                <span>Today</span>
              </div>
            </motion.div>
          ))}

          <div className="flex items-center gap-4 pt-2 border-t border-border text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <div className="size-2.5 rounded-sm bg-emerald-500" /> Operational
            </span>
            <span className="flex items-center gap-1.5">
              <div className="size-2.5 rounded-sm bg-amber-400" /> Degraded
            </span>
            <span className="flex items-center gap-1.5">
              <div className="size-2.5 rounded-sm bg-rose-500" /> Outage
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
