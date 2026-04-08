"use client"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function AboutStory() {
  return (
    <motion.article
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto w-full max-w-2xl"
    >
      <motion.header variants={itemVariants} className="mb-10">
        <Badge variant="secondary" className="mb-4">Our Story</Badge>
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          From a bakery office to 10,000 teams
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          How two engineers with a shared frustration built the infrastructure layer
          for the next generation of software teams.
        </p>
      </motion.header>

      <motion.div variants={itemVariants} className="space-y-6">
        <p className="text-sm leading-[1.8] text-foreground/90">
          In the summer of 2021, Sophie Laurent was sitting in a conference room at Stripe,
          watching a team of twelve engineers spend three weeks integrating a feature that,
          with the right primitives, should have taken three days. It was not a skill problem.
          The engineers were exceptional. It was an infrastructure problem.
        </p>

        <p className="text-sm leading-[1.8] text-foreground/90">
          Meanwhile, in a different timezone, Thomas Nguyen was hitting the same wall at Datadog.
          His anomaly detection pipeline processed 4.2 billion metrics per day, but the tooling
          around it -- the deployment scripts, the monitoring dashboards, the collaboration
          workflows -- felt like they were built for a different era.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="my-10">
        <div
          className="flex h-48 items-center justify-center rounded-2xl ring-1 ring-foreground/5"
          style={{
            background: "linear-gradient(135deg, oklch(0.95 0.01 3.6) 0%, oklch(0.92 0.015 25) 100%)",
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
          }}
        >
          <p className="max-w-xs px-6 text-center text-xs tracking-wide text-muted-foreground/60 uppercase">
            Lyon, 2021
          </p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-6">
        <p className="text-sm leading-[1.8] text-foreground/90">
          They met at a systems conference in Amsterdam. Over bad coffee and worse WiFi,
          they discovered they had been thinking about the same problem from different angles.
          Sophie saw it as a product challenge: how do you give small teams enterprise-grade
          infrastructure without enterprise-grade complexity? Thomas saw it as an engineering
          challenge: how do you build primitives that compose naturally?
        </p>

        <blockquote className="border-l-0 my-8 rounded-xl bg-muted/40 px-6 py-5 ring-1 ring-foreground/5">
          <p className="font-heading text-base font-medium italic leading-relaxed tracking-tight">
            &ldquo;The problem was never that small teams lack talent. It is that they lack
            leverage. We wanted to change the equation.&rdquo;
          </p>
          <footer className="mt-3 text-xs text-muted-foreground">
            -- Sophie Laurent, CEO
          </footer>
        </blockquote>

        <p className="text-sm leading-[1.8] text-foreground/90">
          Three months later, they had quit their jobs, raised a modest pre-seed round from
          Kima Ventures, and rented a 30-square-meter office above a bakery in Lyon.
          The croissant supply was excellent. The internet was not. They shipped the first
          version of the sync engine in four months, running on a single server that Thomas
          affectionately called &ldquo;Gertrude.&rdquo;
        </p>
      </motion.div>

      <Separator className="my-10" />

      <motion.div variants={itemVariants} className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="font-mono tabular-nums">2024</Badge>
          <span className="text-sm font-medium">The inflection point</span>
        </div>

        <p className="text-sm leading-[1.8] text-foreground/90">
          By 2024, Ropau was serving 10,000 teams across 23 countries. The sync engine had
          processed over 2 trillion operations without a single data loss incident. The team
          had grown to 42 people -- still small by design, still obsessed with leverage.
          They open-sourced the CRDT library, launched the plugin ecosystem, and started
          treating their design system as infrastructure rather than decoration.
        </p>

        <p className="text-sm leading-[1.8] text-foreground/90">
          Today, Ropau is not the biggest player in the space. It is the sharpest.
          Every feature ships in a week or does not ship at all. Every abstraction earns its
          complexity. Every new hire multiplies the team rather than just adding to it.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="my-10">
        <div
          className="flex h-48 items-center justify-center rounded-2xl ring-1 ring-foreground/5"
          style={{
            background: "linear-gradient(135deg, oklch(0.94 0.015 220) 0%, oklch(0.91 0.02 240) 100%)",
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
          }}
        >
          <p className="max-w-xs px-6 text-center text-xs tracking-wide text-muted-foreground/60 uppercase">
            The team, April 2025
          </p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <p className="text-sm leading-[1.8] text-foreground/90">
          The bakery is gone -- replaced by a proper office with actual internet. But
          Gertrude is still running. Some things you do not replace just because they are old.
          You replace them when they stop working. And Gertrude has never stopped working.
        </p>
      </motion.div>
    </motion.article>
  )
}
