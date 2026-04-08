"use client"

import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

const features = [
  {
    title: "Real-time Collaboration",
    description:
      "Multi-cursor editing with conflict-free sync across devices. Changes propagate in under 50ms.",
    span: "sm:col-span-2",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 10a5 5 0 01-5 5m5-5a5 5 0 00-5-5m5 5H5m5 5a5 5 0 01-5-5m5 5v-1m0-9a5 5 0 00-5 5m5-5v1m0 0a3 3 0 013 3m-3-3a3 3 0 00-3 3m3 5a3 3 0 003-3m-3 3a3 3 0 01-3-3m6 0h-1m-5 0H4" />
      </svg>
    ),
  },
  {
    title: "Instant Deployments",
    description:
      "Push to deploy with automatic preview URLs. Rollbacks in under 4 seconds.",
    span: "",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 3v8m0 0l3-3m-3 3L7 8M3 14l1.5 2h11L17 14" />
      </svg>
    ),
  },
  {
    title: "Edge Functions",
    description:
      "Server-side logic at 300+ PoPs. Cold start under 5ms with persistent connections.",
    span: "",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 3L5 11h4l-1 6 6-8h-4l1-6z" />
      </svg>
    ),
  },
  {
    title: "Observability",
    description:
      "Distributed tracing, metrics, and logs in one view. Auto-instrumented for zero-config setup across your entire stack.",
    span: "sm:col-span-2",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10h2l2-5 3 10 2-5h5" />
      </svg>
    ),
  },
  {
    title: "Access Control",
    description:
      "Fine-grained RBAC with SSO integration. Audit logs retained for 7 years.",
    span: "",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 12v2m-3-4a3 3 0 116 0v2H7v-2zm8 6H5a2 2 0 01-2-2v-3a2 2 0 012-2h10a2 2 0 012 2v3a2 2 0 01-2 2z" />
      </svg>
    ),
  },
]

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

export default function FeaturesBentoGrid() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <div className="mb-14 max-w-2xl">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Everything you need to ship
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          A complete platform for teams that value speed and reliability
          equally.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-5 sm:grid-cols-3"
      >
        {features.map((f) => (
          <motion.div
            key={f.title}
            variants={itemVariants}
            className={f.span}
          >
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            >
              <Card
                className="h-full transition-shadow duration-200 hover:[box-shadow:0_1px_2px_rgba(20,20,15,0.04),0_2px_4px_rgba(20,20,15,0.04),0_4px_8px_rgba(20,20,15,0.04),0_8px_16px_rgba(20,20,15,0.04)]"
                style={{
                  boxShadow:
                    "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                }}
              >
                <CardHeader>
                  <div className="mb-1 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {f.icon}
                  </div>
                  <CardTitle>{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {f.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
