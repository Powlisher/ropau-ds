"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Shield, CheckCircle2, AlertTriangle, XCircle } from "lucide-react"

type Compliance = "met" | "at-risk" | "breached"

const complianceConfig: Record<Compliance, { icon: typeof CheckCircle2; color: string; badge: string; label: string }> = {
  met: { icon: CheckCircle2, color: "text-emerald-600", badge: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Met" },
  "at-risk": { icon: AlertTriangle, color: "text-amber-600", badge: "bg-amber-50 text-amber-700 border-amber-200", label: "At Risk" },
  breached: { icon: XCircle, color: "text-rose-600", badge: "bg-rose-50 text-rose-700 border-rose-200", label: "Breached" },
}

const slas = [
  {
    name: "API Uptime",
    target: "99.95%",
    current: "99.98%",
    compliance: "met" as Compliance,
    remaining: "4.38 min",
    period: "Monthly",
    detail: "Downtime used: 0.87 min of 21.6 min allowed",
  },
  {
    name: "P95 Response Time",
    target: "< 200ms",
    current: "142ms",
    compliance: "met" as Compliance,
    remaining: "58ms buffer",
    period: "Rolling 7d",
    detail: "Current P95 across all endpoints, measured every 60s",
  },
  {
    name: "Error Rate",
    target: "< 0.5%",
    current: "0.41%",
    compliance: "at-risk" as Compliance,
    remaining: "0.09% buffer",
    period: "Rolling 24h",
    detail: "Approaching threshold due to inventory service issues this morning",
  },
  {
    name: "Incident Response",
    target: "< 15 min",
    current: "8 min avg",
    compliance: "met" as Compliance,
    remaining: "7 min buffer",
    period: "Quarterly",
    detail: "Average first response time for P1/P2 incidents",
  },
  {
    name: "Data Backup RPO",
    target: "< 1 hour",
    current: "34 min",
    compliance: "met" as Compliance,
    remaining: "26 min buffer",
    period: "Continuous",
    detail: "WAL shipping to secondary region with 34 min lag",
  },
  {
    name: "Scheduled Maintenance",
    target: "< 4h/month",
    current: "5.2h",
    compliance: "breached" as Compliance,
    remaining: "1.2h over",
    period: "Monthly",
    detail: "Database migration on Apr 2 took 3.8h instead of estimated 2h",
  },
]

const metCount = slas.filter((s) => s.compliance === "met").length
const atRiskCount = slas.filter((s) => s.compliance === "at-risk").length
const breachedCount = slas.filter((s) => s.compliance === "breached").length

function ProgressBar({ current, target, compliance }: { current: string; target: string; compliance: Compliance }) {
  const numericCurrent = parseFloat(current)
  const numericTarget = parseFloat(target.replace(/[<>%ms ]/g, ""))

  let percentage = 0
  if (target.includes("%") && !target.includes("<")) {
    percentage = Math.min((numericCurrent / numericTarget) * 100, 100)
  } else if (target.includes("<")) {
    percentage = Math.min((numericCurrent / numericTarget) * 100, 120)
  } else {
    percentage = 75
  }

  const barColor = compliance === "met" ? "bg-emerald-500" : compliance === "at-risk" ? "bg-amber-500" : "bg-rose-500"

  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <motion.div
        className={`h-full rounded-full ${barColor}`}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(percentage, 100)}%` }}
        transition={{ type: "spring" as const, stiffness: 80, damping: 18, delay: 0.2 }}
      />
    </div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Monitoring10() {
  return (
    <motion.div
      className="mx-auto max-w-2xl py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-6 grid grid-cols-3 gap-3">
        {[
          { label: "Met", count: metCount, color: "bg-emerald-50 ring-emerald-200/60 text-emerald-700" },
          { label: "At Risk", count: atRiskCount, color: "bg-amber-50 ring-amber-200/60 text-amber-700" },
          { label: "Breached", count: breachedCount, color: "bg-rose-50 ring-rose-200/60 text-rose-700" },
        ].map((stat) => (
          <Card
            key={stat.label}
            className={`${stat.count > 0 ? `${stat.color} ring-1` : ""}`}
            style={{
              boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
            }}
          >
            <CardContent className="p-3.5 text-center">
              <div className={`font-heading text-2xl font-bold tabular-nums tracking-tight ${stat.count > 0 ? "" : "text-muted-foreground"}`}>
                {stat.count}
              </div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <Card
        style={{
          boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="size-4 text-muted-foreground" />
            <CardTitle className="font-heading text-lg tracking-tight">SLA Compliance</CardTitle>
          </div>
          <CardDescription>Service Level Agreement targets and current performance</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {slas.map((sla) => {
            const config = complianceConfig[sla.compliance]
            const Icon = config.icon

            return (
              <motion.div
                key={sla.name}
                variants={itemVariants}
                className={`rounded-xl p-4 ${
                  sla.compliance === "breached"
                    ? "bg-rose-50/40 ring-1 ring-rose-200/50"
                    : sla.compliance === "at-risk"
                      ? "bg-amber-50/30 ring-1 ring-amber-200/40"
                      : "hover:bg-muted/30 transition-colors"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-foreground">{sla.name}</h3>
                      <Badge variant="outline" className={`text-[9px] uppercase tracking-wider font-medium px-1.5 py-0 ${config.badge}`}>
                        <Icon className={`size-2.5 mr-0.5 ${config.color}`} />
                        {config.label}
                      </Badge>
                    </div>
                    <p className="mt-0.5 text-[12px] text-muted-foreground">{sla.detail}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-mono text-sm font-bold tabular-nums text-foreground">{sla.current}</div>
                    <div className="text-[10px] font-mono tabular-nums text-muted-foreground">target: {sla.target}</div>
                  </div>
                </div>

                <ProgressBar current={sla.current} target={sla.target} compliance={sla.compliance} />

                <div className="mt-1.5 flex items-center justify-between text-[10px] text-muted-foreground/70">
                  <span className="font-mono">{sla.period}</span>
                  <span className="font-mono tabular-nums">{sla.remaining}</span>
                </div>
              </motion.div>
            )
          })}
        </CardContent>
      </Card>
    </motion.div>
  )
}
