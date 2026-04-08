"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const testimonials = [
  {
    company: "Finvest",
    companyInitial: "F",
    industry: "Financial Services",
    metrics: [
      { label: "Deployment frequency", value: "12x/day", prev: "2x/month" },
      { label: "MTTR", value: "4 min", prev: "2.3 hours" },
      { label: "Annual savings", value: "$187K", prev: "" },
    ],
    quote:
      "We evaluated building an internal platform team versus adopting an external solution. The build estimate was 18 months with 4 engineers. We were fully operational in 3 days. The compliance features alone, SOC 2 audit logging, RBAC, and data residency controls, would have added another 6 months to any internal build. A year in, our platform team focuses on business logic instead of infrastructure plumbing.",
    name: "Luca Ferretti",
    role: "CTO",
    initials: "LF",
  },
  {
    company: "PayBridge",
    companyInitial: "P",
    industry: "Payments",
    metrics: [
      { label: "p99 latency", value: "23ms", prev: "340ms" },
      { label: "Uptime", value: "99.997%", prev: "99.92%" },
      { label: "Compute savings", value: "63%", prev: "" },
    ],
    quote:
      "Payment processing leaves zero margin for error. We need sub-50ms response times at 99th percentile, and we need them 24/7. The platform delivered observability granular enough to trace individual transactions across 14 microservices. When we caught a connection pool leak at 3am, the auto-remediation restarted the affected pods before any customer-facing impact. That single incident would have cost us six figures in SLA penalties.",
    name: "Chen Wei",
    role: "SRE Director",
    initials: "CW",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function TestimonialsEnterprise() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
      <div className="mb-14 max-w-2xl">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Enterprise case studies
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Detailed outcomes from teams operating at scale.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {testimonials.map((t) => (
          <motion.div key={t.company} variants={itemVariants}>
            <Card
              style={{
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
              }}
            >
              <CardContent className="space-y-6 p-6 sm:p-8">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-foreground/5">
                      <span className="text-sm font-semibold text-foreground/60">
                        {t.companyInitial}
                      </span>
                    </div>
                    <div>
                      <p className="text-base font-semibold text-foreground">
                        {t.company}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t.industry}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">{t.industry}</Badge>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {t.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-lg bg-muted/40 p-3"
                    >
                      <p className="text-[0.65rem] font-medium uppercase tracking-widest text-muted-foreground">
                        {m.label}
                      </p>
                      <p className="mt-1 font-heading text-lg font-semibold tabular-nums tracking-tight text-foreground">
                        {m.value}
                      </p>
                      {m.prev && (
                        <p className="text-[0.65rem] tabular-nums text-muted-foreground">
                          from {m.prev}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <blockquote className="text-sm leading-relaxed text-foreground/80">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{t.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
