"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

const pillars = [
  {
    title: "Deep work is sacred",
    description: "We protect focus time aggressively. No meeting Tuesdays and Thursdays. Slack expectations are async by default. The best ideas come from uninterrupted thinking, not from real-time chat.",
    gradient: "linear-gradient(135deg, oklch(0.93 0.015 3.6) 0%, oklch(0.90 0.02 20) 100%)",
  },
  {
    title: "Context over control",
    description: "We share the why, not just the what. Every major decision is documented in a memo before it is made. If you understand the context, you can make the right call without asking permission.",
    gradient: "linear-gradient(135deg, oklch(0.93 0.01 220) 0%, oklch(0.90 0.015 240) 100%)",
  },
  {
    title: "Ship, learn, repeat",
    description: "We optimize for learning speed, not perfection. A feature in users hands teaches us more in a day than a month of internal discussion. We ship weekly and course-correct daily.",
    gradient: "linear-gradient(135deg, oklch(0.93 0.012 140) 0%, oklch(0.90 0.018 160) 100%)",
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

export default function AboutCulture() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <div className="mb-10 max-w-xl">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Culture pillars
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          These are not aspirational statements. They are how we actually operate, every day,
          in meetings, in code reviews, in how we hire.
        </p>
      </div>

      <div className="space-y-16">
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.title}
            variants={itemVariants}
            className={`flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10 ${
              i % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div
              className="flex h-56 flex-1 items-center justify-center overflow-hidden rounded-2xl ring-1 ring-foreground/5 lg:h-64"
              style={{
                background: pillar.gradient,
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,255,255,0.3),transparent_70%)]" />
            </div>

            <div className="flex-1 space-y-3">
              <span className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                Pillar {i + 1}
              </span>
              <h3 className="font-heading text-xl font-semibold tracking-tight">
                {pillar.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
