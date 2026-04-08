"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangleIcon, XIcon, ChevronRightIcon } from "lucide-react"
import { motion } from "framer-motion"

const alerts = [
  {
    severity: "critical" as const,
    title: "Severe Thunderstorm Warning",
    description: "Damaging winds up to 90 km/h and heavy rainfall expected between 4 PM and 9 PM. Seek shelter immediately.",
    region: "Gironde, Nouvelle-Aquitaine",
    issued: "1:23 PM",
  },
  {
    severity: "warning" as const,
    title: "Heat Advisory",
    description: "Temperatures reaching 38°C expected tomorrow. Stay hydrated and limit outdoor activity during peak hours.",
    region: "Bordeaux Metro Area",
    issued: "11:45 AM",
  },
]

const severityStyles = {
  critical: {
    bg: "oklch(0.95 0.04 25)",
    ring: "oklch(0.65 0.22 25)",
    icon: "oklch(0.58 0.22 25)",
    badge: "oklch(0.58 0.22 25)",
  },
  warning: {
    bg: "oklch(0.96 0.04 82)",
    ring: "oklch(0.75 0.15 82)",
    icon: "oklch(0.70 0.17 82)",
    badge: "oklch(0.70 0.17 82)",
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Weather05() {
  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {alerts.map((alert) => {
        const style = severityStyles[alert.severity]
        return (
          <motion.div key={alert.title} variants={itemVariants}>
            <Card
              className="overflow-hidden"
              style={{
                backgroundColor: style.bg,
                boxShadow:
                  alert.severity === "critical"
                    ? `0 0 0 1px ${style.ring}, 0 1px 2px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.06), 0 8px 16px rgba(20,20,15,0.06), 0 16px 32px rgba(20,20,15,0.04)`
                    : `0 0 0 1px ${style.ring}40, 0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)`,
              }}
            >
              <CardContent className={alert.severity === "critical" ? "p-6" : "p-5"}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${style.icon}20` }}
                    >
                      <AlertTriangleIcon className="size-4" style={{ color: style.icon }} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3
                          className={`font-semibold tracking-tight ${alert.severity === "critical" ? "text-lg" : "text-base"}`}
                        >
                          {alert.title}
                        </h3>
                        <Badge
                          variant="outline"
                          className="border-0 text-[10px] font-semibold uppercase tracking-wider text-white"
                          style={{ backgroundColor: style.badge }}
                        >
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                        {alert.description}
                      </p>
                      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{alert.region}</span>
                        <span className="tabular-nums">Issued {alert.issued}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="shrink-0 size-8">
                    <XIcon className="size-4" />
                  </Button>
                </div>
                {alert.severity === "critical" && (
                  <div className="mt-4 flex items-center justify-end">
                    <Button variant="outline" size="sm" className="gap-1 text-xs bg-white/60">
                      View full advisory
                      <ChevronRightIcon className="size-3.5" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
