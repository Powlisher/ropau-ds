"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const features = [
  {
    title: "Real-time Collaboration",
    summary: "Multi-cursor editing with conflict-free sync.",
    detail:
      "CRDT-based conflict resolution allows multiple users to edit simultaneously without merge conflicts. Presence indicators show cursor positions in real-time, syncing at 60fps across all connected clients. Works with documents, spreadsheets, and code files.",
  },
  {
    title: "Instant Deployments",
    summary: "Push-to-deploy with automatic preview URLs.",
    detail:
      "Every git push triggers an atomic deployment. Each branch gets a unique preview URL for QA and stakeholder review. Rollbacks complete in under 4 seconds by pointing traffic to the previous immutable artifact. Zero-downtime guaranteed.",
  },
  {
    title: "Distributed Tracing",
    summary: "Auto-instrumented traces across your stack.",
    detail:
      "Traces propagate automatically through HTTP, gRPC, and message queue boundaries. No SDK changes needed for Node, Python, Go, or Rust. Waterfall views show latency breakdown per service, with anomaly detection highlighting degraded spans.",
  },
  {
    title: "Advanced RBAC",
    summary: "Fine-grained access control with custom roles.",
    detail:
      "Define roles with granular permissions at the resource level. Attribute-based policies support complex rules like 'engineers can deploy to staging but only leads deploy to production'. SSO integration with SAML 2.0 and OIDC. Full audit trail with 7-year retention.",
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

export default function FeaturesExpandableCards() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
      <div className="mb-14 max-w-2xl">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Dig into the details
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Click any feature to learn how it works under the hood.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {features.map((f) => {
          const isOpen = expanded === f.title
          return (
            <motion.div key={f.title} variants={itemVariants}>
              <Card
                className="cursor-pointer transition-shadow duration-200 hover:[box-shadow:0_1px_2px_rgba(20,20,15,0.04),0_2px_4px_rgba(20,20,15,0.04),0_4px_8px_rgba(20,20,15,0.04),0_8px_16px_rgba(20,20,15,0.04)]"
                style={{
                  boxShadow:
                    "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                }}
                onClick={() => setExpanded(isOpen ? null : f.title)}
              >
                <CardHeader className="flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base">{f.title}</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {f.summary}
                    </p>
                  </div>
                  <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{
                      type: "spring" as const,
                      stiffness: 300,
                      damping: 24,
                    }}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-muted-foreground"
                  >
                    <path d="M4 6l4 4 4-4" />
                  </motion.svg>
                </CardHeader>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        type: "spring" as const,
                        stiffness: 300,
                        damping: 28,
                      }}
                      className="overflow-hidden"
                    >
                      <CardContent className="pt-0">
                        <p className="text-sm leading-relaxed text-foreground/80">
                          {f.detail}
                        </p>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
