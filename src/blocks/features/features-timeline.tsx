"use client"

import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const releases = [
  {
    date: "Q1 2026",
    version: "v3.14",
    title: "Real-time Collaboration Engine",
    description:
      "Multi-cursor editing, presence indicators, and CRDT-based conflict resolution. Works across all document types with sub-50ms sync.",
  },
  {
    date: "Q4 2025",
    version: "v3.10",
    title: "Unified Observability Dashboard",
    description:
      "Traces, metrics, and logs in a single timeline view. Auto-instrumented for Node, Python, Go, and Rust runtimes with zero config changes.",
  },
  {
    date: "Q3 2025",
    version: "v3.7",
    title: "Edge Function Runtime",
    description:
      "Server-side logic deployed to 300+ PoPs. V8 isolate-based with 5ms cold starts and persistent connections for stateful workloads.",
  },
  {
    date: "Q2 2025",
    version: "v3.4",
    title: "Advanced RBAC and Audit Logging",
    description:
      "Custom role definitions, attribute-based access control, and audit logs with 7-year retention. SOC 2 Type II certification achieved.",
  },
  {
    date: "Q1 2025",
    version: "v3.0",
    title: "Platform V3 Launch",
    description:
      "Complete rewrite of the deployment pipeline. Atomic deployments, instant rollbacks, and preview environments for every branch.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function FeaturesTimeline() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
      <div className="mb-14">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Feature timeline
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          A year of shipping, from platform rewrite to real-time collaboration.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

        <div className="space-y-8">
          {releases.map((r) => (
            <motion.div
              key={r.version}
              variants={itemVariants}
              className="relative pl-8"
            >
              <div className="absolute left-0 top-3 size-[15px] rounded-full border-2 border-primary/40 bg-primary/10" />
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs font-medium tabular-nums tracking-wide text-muted-foreground">
                  {r.date}
                </span>
                <Badge variant="outline" className="font-mono text-[0.7rem]">
                  {r.version}
                </Badge>
              </div>
              <Card
                className="transition-shadow duration-200 hover:[box-shadow:0_1px_2px_rgba(20,20,15,0.04),0_2px_4px_rgba(20,20,15,0.04),0_4px_8px_rgba(20,20,15,0.04),0_8px_16px_rgba(20,20,15,0.04)]"
                style={{
                  boxShadow:
                    "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                }}
              >
                <CardHeader>
                  <CardTitle>{r.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {r.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
