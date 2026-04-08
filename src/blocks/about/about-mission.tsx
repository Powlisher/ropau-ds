"use client"

import { motion } from "framer-motion"

export default function AboutMission() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="relative overflow-hidden rounded-2xl px-8 py-16 sm:px-12 sm:py-24"
      style={{
        background: "linear-gradient(135deg, oklch(0.97 0.005 3.6) 0%, oklch(0.95 0.01 25) 50%, oklch(0.97 0.003 40) 100%)",
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.6),transparent_70%)]" />

      <div className="relative mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.1 }}
          className="text-xs font-semibold tracking-[0.15em] text-primary uppercase"
        >
          Our Mission
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.2 }}
          className="mt-6"
        >
          <p className="font-heading text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Give small teams the infrastructure leverage that used to require a hundred engineers.
          </p>
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.3 }}
          className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          We believe the future of software belongs to small, focused teams with great tools.
          Ropau builds the primitives that make four people feel like forty.
        </motion.p>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 inline-block text-xs font-medium tracking-wide text-muted-foreground/60"
        >
          -- Ropau, since 2021
        </motion.span>
      </div>
    </motion.section>
  )
}
