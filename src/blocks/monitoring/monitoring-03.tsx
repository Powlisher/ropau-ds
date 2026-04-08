"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { AlertTriangle, AlertOctagon, Info, Bell } from "lucide-react"

type Severity = "critical" | "warning" | "info"

const severityConfig: Record<Severity, { icon: typeof AlertOctagon; badge: string; wrapper: string }> = {
  critical: {
    icon: AlertOctagon,
    badge: "bg-rose-100 text-rose-700 border-rose-200",
    wrapper: "bg-rose-50/50 ring-1 ring-rose-200/60 p-4",
  },
  warning: {
    icon: AlertTriangle,
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    wrapper: "bg-amber-50/30 ring-1 ring-amber-200/40 p-4",
  },
  info: {
    icon: Info,
    badge: "bg-sky-100 text-sky-700 border-sky-200",
    wrapper: "p-3.5",
  },
}

const alerts = [
  {
    severity: "critical" as Severity,
    title: "Database connection pool exhausted",
    message: "Primary database at db-prod-eu-1 reached 100% connection utilization. Automatic failover initiated. 47 queries queued.",
    time: "2 min ago",
    source: "PostgreSQL Monitor",
  },
  {
    severity: "warning" as Severity,
    title: "Disk usage above 85% on worker-03",
    message: "Volume /data on worker-03.prod is at 87.4% capacity. Growth rate suggests 100% in ~6 days at current pace.",
    time: "18 min ago",
    source: "Infrastructure",
  },
  {
    severity: "warning" as Severity,
    title: "Elevated error rate on /api/checkout",
    message: "Error rate for POST /api/checkout increased to 2.8% (baseline: 0.3%). Majority are 503 responses from inventory service.",
    time: "34 min ago",
    source: "API Gateway",
  },
  {
    severity: "info" as Severity,
    title: "SSL certificate renewal scheduled",
    message: "Certificate for *.platform.io expires in 14 days. Automatic renewal via Let's Encrypt is queued for Apr 15.",
    time: "1h ago",
    source: "Certificate Manager",
  },
  {
    severity: "info" as Severity,
    title: "Deployment completed successfully",
    message: "Version v3.9.1 deployed to all 8 production nodes. Zero-downtime rolling update completed in 4m 12s.",
    time: "2h ago",
    source: "CI/CD Pipeline",
  },
  {
    severity: "info" as Severity,
    title: "Scheduled maintenance window reminder",
    message: "Planned maintenance on database replicas scheduled for Apr 10, 02:00-04:00 UTC. Read traffic will route to primary.",
    time: "3h ago",
    source: "Operations",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Monitoring03() {
  const criticalCount = alerts.filter((a) => a.severity === "critical").length
  const warningCount = alerts.filter((a) => a.severity === "warning").length

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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="size-4 text-muted-foreground" />
              <CardTitle className="font-heading text-lg tracking-tight">Alert Feed</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              {criticalCount > 0 && (
                <Badge variant="outline" className="bg-rose-100 text-rose-700 border-rose-200 text-[10px] font-mono tabular-nums">
                  {criticalCount} critical
                </Badge>
              )}
              {warningCount > 0 && (
                <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200 text-[10px] font-mono tabular-nums">
                  {warningCount} warning
                </Badge>
              )}
            </div>
          </div>
          <CardDescription>Real-time alerts from all monitoring sources</CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          {alerts.map((alert, i) => {
            const config = severityConfig[alert.severity]
            const Icon = config.icon

            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ x: 1 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
                className={`rounded-xl ${config.wrapper}`}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`size-4 shrink-0 mt-0.5 ${
                    alert.severity === "critical" ? "text-rose-600" : alert.severity === "warning" ? "text-amber-600" : "text-sky-600"
                  }`} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className={`text-sm font-semibold tracking-tight ${alert.severity === "critical" ? "text-rose-900" : "text-foreground"}`}>
                        {alert.title}
                      </h3>
                    </div>
                    <p className="text-[13px] leading-relaxed text-muted-foreground">
                      {alert.message}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2 text-[11px] text-muted-foreground/70">
                      <span className="font-mono tabular-nums">{alert.time}</span>
                      <span>--</span>
                      <span>{alert.source}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </CardContent>
      </Card>
    </motion.div>
  )
}
