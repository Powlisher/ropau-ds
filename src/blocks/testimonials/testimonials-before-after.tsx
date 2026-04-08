"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    before: { label: "Build time", value: "45 min" },
    after: { label: "Build time", value: "7 min 48s" },
    improvement: "83% faster",
    quote:
      "CI was our biggest bottleneck. Engineers would start a build, switch context, and lose 20 minutes of focus every cycle.",
    name: "Camille Bernstein",
    role: "Staff Engineer, Tidepool",
    initials: "CB",
  },
  {
    before: { label: "Incidents/month", value: "34" },
    after: { label: "Incidents/month", value: "7" },
    improvement: "79% reduction",
    quote:
      "Most of our incidents were noise from poorly tuned alerts. The intelligent routing cut through that immediately.",
    name: "Tomas Eriksson",
    role: "SRE Lead, Nordlight",
    initials: "TE",
  },
  {
    before: { label: "Onboarding", value: "5 days" },
    after: { label: "Onboarding", value: "4 hours" },
    improvement: "10x faster",
    quote:
      "New hires used to spend their first week just setting up tooling. Now they push their first PR on day one.",
    name: "Fatima Al-Rashidi",
    role: "Engineering Manager, Mosaic Health",
    initials: "FA",
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

export default function TestimonialsBeforeAfter() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <div className="mb-14 max-w-2xl">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Real results, measured
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Before and after, from the teams that made the switch.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {testimonials.map((t) => (
          <motion.div key={t.name} variants={itemVariants}>
            <Card
              className="h-full transition-shadow duration-200 hover:[box-shadow:0_1px_2px_rgba(20,20,15,0.04),0_2px_4px_rgba(20,20,15,0.04),0_4px_8px_rgba(20,20,15,0.04),0_8px_16px_rgba(20,20,15,0.04)]"
              style={{
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
              }}
            >
              <CardContent className="flex h-full flex-col pt-2">
                <div className="mb-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                  <div className="rounded-lg bg-muted/60 p-3 text-center">
                    <p className="text-[0.65rem] font-medium uppercase tracking-widest text-muted-foreground">
                      Before
                    </p>
                    <p className="mt-1 font-heading text-lg font-semibold tabular-nums text-foreground/60 line-through decoration-foreground/20">
                      {t.before.value}
                    </p>
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground"
                  >
                    <path d="M4 8h8m0 0l-3-3m3 3l-3 3" />
                  </svg>
                  <div className="rounded-lg bg-primary/5 p-3 text-center ring-1 ring-primary/10">
                    <p className="text-[0.65rem] font-medium uppercase tracking-widest text-primary/70">
                      After
                    </p>
                    <p className="mt-1 font-heading text-lg font-semibold tabular-nums text-primary">
                      {t.after.value}
                    </p>
                  </div>
                </div>
                <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-primary/80">
                  {t.improvement}
                </p>
                <blockquote className="flex-1 text-sm leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar size="sm">
                    <AvatarFallback>{t.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
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
