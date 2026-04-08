"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"

const founders = [
  {
    name: "Sophie Laurent",
    title: "CEO & Co-founder",
    gradient: "linear-gradient(135deg, oklch(0.45 0.22 3.6) 0%, oklch(0.38 0.18 350) 100%)",
    initials: "SL",
    bio: "Sophie spent 8 years at Stripe building payment infrastructure before realizing the real bottleneck was tooling, not technology. She started Ropau to give small teams the same leverage that only large engineering orgs had. She leads strategy and fundraising, and still reviews every major product decision.",
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "X", href: "#" },
    ],
  },
  {
    name: "Thomas Nguyen",
    title: "CTO & Co-founder",
    gradient: "linear-gradient(135deg, oklch(0.48 0.15 250) 0%, oklch(0.40 0.20 270) 100%)",
    initials: "TN",
    bio: "Thomas was a principal engineer at Datadog where he built the real-time anomaly detection pipeline. He is obsessed with making distributed systems feel simple. At Ropau, he architects the sync engine and mentors the engineering team. He believes the best infrastructure is the kind you never think about.",
    socials: [
      { label: "GitHub", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function TeamFounders() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Meet the Founders
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          The people who started this thing and somehow kept going.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {founders.map((founder) => (
          <motion.div key={founder.name} variants={itemVariants}>
            <Card
              className="overflow-hidden"
              style={{
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04)",
              }}
            >
              <div
                className="flex h-48 items-end justify-center"
                style={{ background: founder.gradient }}
              >
                <div className="flex size-24 -mb-12 items-center justify-center rounded-2xl bg-card text-2xl font-bold ring-4 ring-card">
                  {founder.initials}
                </div>
              </div>
              <CardContent className="mt-14 space-y-4 text-center">
                <div>
                  <h3 className="font-heading text-lg font-semibold tracking-tight">
                    {founder.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{founder.title}</p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {founder.bio}
                </p>
                <Separator />
                <div className="flex justify-center gap-4">
                  {founder.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
