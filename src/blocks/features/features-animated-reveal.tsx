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
    title: "Push-to-Deploy",
    description:
      "Every git push triggers an atomic deployment. Preview URLs generate automatically for every branch. Rollback to any version in under 4 seconds.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 3v8m0 0l3-3m-3 3L7 8M3 14l1.5 2h11L17 14" />
      </svg>
    ),
  },
  {
    title: "Auto-Instrumented Tracing",
    description:
      "Distributed traces propagate through HTTP, gRPC, and message queues without code changes. Waterfall views show latency per service.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10h2l2-5 3 10 2-5h5" />
      </svg>
    ),
  },
  {
    title: "Edge Functions",
    description:
      "Server-side logic deployed to 300+ global PoPs. V8 isolates cold-start in 5ms with persistent connection support for stateful workloads.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 3L5 11h4l-1 6 6-8h-4l1-6z" />
      </svg>
    ),
  },
  {
    title: "Intelligent Alerting",
    description:
      "Machine-learned baselines detect anomalies without manual thresholds. Reduces alert noise by 89% while catching real issues faster.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v1m0 14v1m-7-8h1m14 0h1m-3.5-5.5l-.7.7M5.2 14.8l-.7.7m0-11l.7.7m9.6 9.6l.7.7M13 10a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Fine-Grained RBAC",
    description:
      "Define permissions at the resource level with attribute-based policies. SSO via SAML 2.0 and OIDC. Audit logs with 7-year retention.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 12v2m-3-4a3 3 0 116 0v2H7v-2zm8 6H5a2 2 0 01-2-2v-3a2 2 0 012-2h10a2 2 0 012 2v3a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Auto-Scaling Compute",
    description:
      "Scales in under 2 seconds based on real-time traffic. Connection pooling, CDN caching, and request routing built into every deploy.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 17V9m3 8V5m3 12V3m3 14v-6m3 6v-3" />
      </svg>
    ),
  },
]

export default function FeaturesAnimatedReveal() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <div className="mb-14 max-w-2xl">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          What makes it different
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Scroll to discover the features that set the platform apart.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, idx) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              type: "spring" as const,
              stiffness: 260,
              damping: 24,
              delay: idx * 0.06,
            }}
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
      </div>
    </section>
  )
}
