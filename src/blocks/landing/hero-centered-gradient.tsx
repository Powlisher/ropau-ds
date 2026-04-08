"use client"

import { motion } from "framer-motion"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

const stats = [
  { value: "12,493", label: "Components shipped" },
  { value: "99.7%", label: "Uptime SLA" },
  { value: "3.2s", label: "Avg. build time" },
]

export default function HeroCenteredGradient() {
  return (
    <section className="relative w-full overflow-hidden px-6 py-24 md:px-12 lg:py-36">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, oklch(0.478 0.227 3.6 / 0.08), transparent)",
        }}
      />

      <motion.div
        className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Badge variant="secondary">New release</Badge>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-heading text-5xl font-bold tracking-tight text-foreground sm:text-6xl"
          style={{
            backgroundImage:
              "linear-gradient(135deg, oklch(0.478 0.227 3.6), oklch(0.519 0.292 25.1))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Design systems
          <br />
          that feel inevitable
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="max-w-lg text-lg leading-relaxed text-muted-foreground"
        >
          Stop rebuilding the same patterns. Start with a foundation that scales
          from prototype to production without breaking a sweat.
        </motion.p>

        <motion.div variants={itemVariants} className="pt-2">
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
          >
            <Button size="lg">Start building</Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-wrap items-center justify-center gap-10 md:gap-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="font-heading text-2xl font-bold tabular-nums tracking-tight text-foreground">
                {stat.value}
              </span>
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
