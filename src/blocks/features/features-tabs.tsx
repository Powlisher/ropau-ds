"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const categories = [
  {
    id: "deploy",
    label: "Deploy",
    title: "Ship in seconds, not hours",
    description:
      "Push-to-deploy with automatic preview URLs for every branch. Atomic deployments mean zero downtime, and instant rollbacks let you recover from mistakes in under 4 seconds. Every deployment gets a unique immutable URL for auditing.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4v10m0 0l4-4m-4 4l-4-4M4 18l2 2h12l2-2" />
      </svg>
    ),
  },
  {
    id: "observe",
    label: "Observe",
    title: "See everything, miss nothing",
    description:
      "Distributed tracing across your entire stack, auto-instrumented. Metrics, logs, and traces in a unified timeline. Set alerts on any signal with intelligent noise reduction that learns your system behavior over time.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12h3l2.5-6 3.5 12 2.5-6H20" />
      </svg>
    ),
  },
  {
    id: "secure",
    label: "Secure",
    title: "Security without the friction",
    description:
      "Fine-grained RBAC, SSO with SAML and OIDC, and audit logs retained for up to 7 years. Secrets management with automatic rotation. SOC 2 Type II compliant out of the box, no configuration marathon required.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 15v2m-4-6a4 4 0 118 0v2H8v-2zm10 7H6a2 2 0 01-2-2v-4a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: "scale",
    label: "Scale",
    title: "Grow without re-architecting",
    description:
      "Auto-scaling compute that responds to traffic in under 2 seconds. Edge functions at 300+ PoPs globally. Connection pooling, CDN caching, and intelligent request routing are built in, not bolted on.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20V10m4 10V6m4 14V4m4 16v-8m4 8v-4" />
      </svg>
    ),
  },
]

export default function FeaturesTabs() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <div className="mb-14 max-w-2xl">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Built for every stage
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          From first deploy to planet-scale traffic, the platform grows with
          you.
        </p>
      </div>

      <Tabs defaultValue="deploy">
        <TabsList>
          {categories.map((cat) => (
            <TabsTrigger key={cat.id} value={cat.id}>
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat.id} value={cat.id}>
            <AnimatePresence mode="wait">
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  type: "spring" as const,
                  stiffness: 300,
                  damping: 24,
                }}
                className="mt-6 grid gap-8 sm:grid-cols-[auto_1fr]"
              >
                <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {cat.icon}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                    {cat.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {cat.description}
                  </p>
                  <div
                    className="mt-6 h-40 rounded-lg bg-gradient-to-br from-primary/8 via-primary/3 to-transparent"
                    aria-hidden="true"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}
