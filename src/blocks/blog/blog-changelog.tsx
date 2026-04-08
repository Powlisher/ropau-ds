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

const entries = [
  {
    date: "Mar 22, 2026",
    version: "v3.14.0",
    title: "Real-time collaboration cursors",
    description:
      "Multi-user cursors now show in all document types. Presence indicators update at 60fps with conflict-free position sync.",
    type: "Feature" as const,
  },
  {
    date: "Mar 15, 2026",
    version: "v3.13.2",
    title: "Query engine memory leak fix",
    description:
      "Resolved a leak in the connection pool that caused memory usage to grow 4MB/hour under sustained load. Affected deployments running longer than 72 hours.",
    type: "Fix" as const,
  },
  {
    date: "Mar 8, 2026",
    version: "v3.13.0",
    title: "Custom webhook filters",
    description:
      "Webhook endpoints now support JSONPath-based filtering. Only matching events trigger delivery, reducing noise by up to 89% for high-volume integrations.",
    type: "Feature" as const,
  },
  {
    date: "Feb 27, 2026",
    version: "v3.12.1",
    title: "Dashboard loading performance",
    description:
      "Main dashboard initial load improved from 2.1s to 0.8s via query parallelization and component-level code splitting.",
    type: "Improvement" as const,
  },
  {
    date: "Feb 19, 2026",
    version: "v3.12.0",
    title: "Audit log export and retention policies",
    description:
      "Audit logs can now be exported as CSV or streamed to S3. Configurable retention from 30 days to 7 years for compliance needs.",
    type: "Feature" as const,
  },
]

const badgeVariant = (type: string) => {
  if (type === "Fix") return "destructive" as const
  if (type === "Improvement") return "outline" as const
  return "secondary" as const
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function BlogChangelog() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
      <div className="mb-14">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Changelog
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          What shipped, what broke, and what got better.
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
          {entries.map((entry) => (
            <motion.div
              key={entry.version}
              variants={itemVariants}
              className="relative pl-8"
            >
              <div className="absolute left-0 top-3 size-[15px] rounded-full border-2 border-border bg-card" />
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium tabular-nums tracking-wide text-muted-foreground">
                  {entry.date}
                </span>
                <Badge variant="outline" className="font-mono text-[0.7rem]">
                  {entry.version}
                </Badge>
                <Badge variant={badgeVariant(entry.type)}>{entry.type}</Badge>
              </div>
              <Card
                className="transition-shadow duration-200 hover:[box-shadow:0_1px_2px_rgba(20,20,15,0.04),0_2px_4px_rgba(20,20,15,0.04),0_4px_8px_rgba(20,20,15,0.04),0_8px_16px_rgba(20,20,15,0.04)]"
                style={{
                  boxShadow:
                    "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                }}
              >
                <CardHeader>
                  <CardTitle>{entry.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {entry.description}
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
