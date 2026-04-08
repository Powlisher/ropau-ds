"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"

const founders = [
  {
    name: "Sophie Laurent",
    title: "CEO & Co-founder",
    initials: "SL",
    gradient: "linear-gradient(135deg, oklch(0.45 0.22 3.6) 0%, oklch(0.55 0.15 20) 100%)",
    bio: "8 years at Stripe building payment infrastructure. Sophie realized the real bottleneck for most teams was not technology but tooling. She started Ropau to give small teams the same infrastructure leverage that only large engineering organizations had access to.",
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "X", href: "#" },
    ],
  },
  {
    name: "Thomas Nguyen",
    title: "CTO & Co-founder",
    initials: "TN",
    gradient: "linear-gradient(135deg, oklch(0.42 0.12 240) 0%, oklch(0.50 0.18 260) 100%)",
    bio: "Principal engineer at Datadog, where he built the real-time anomaly detection pipeline processing billions of metrics daily. Thomas believes the best infrastructure is invisible. At Ropau, he leads the sync engine architecture and ensures every millisecond counts.",
    socials: [
      { label: "GitHub", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function AboutFounders() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Founders
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          The two people who started Ropau -- and why.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {founders.map((f) => (
          <motion.div key={f.name} variants={itemVariants}>
            <Card
              className="overflow-hidden"
              style={{
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04)",
              }}
            >
              <div
                className="flex h-44 items-end justify-center"
                style={{ background: f.gradient }}
              >
                <div className="flex size-20 -mb-10 items-center justify-center rounded-2xl bg-card text-xl font-bold ring-4 ring-card">
                  {f.initials}
                </div>
              </div>
              <CardContent className="mt-12 space-y-4 text-center">
                <div>
                  <h3 className="font-heading text-lg font-semibold tracking-tight">
                    {f.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{f.title}</p>
                </div>
                <p className="text-left text-sm leading-relaxed text-muted-foreground">
                  {f.bio}
                </p>
                <Separator />
                <div className="flex justify-center gap-4">
                  {f.socials.map((s) => (
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
