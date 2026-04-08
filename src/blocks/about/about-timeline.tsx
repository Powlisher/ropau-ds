"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const milestones = [
  { year: "2021", title: "Founded in Lyon", description: "Sophie and Thomas quit their jobs, raise a pre-seed round, and start building from a tiny office above a bakery." },
  { year: "2022", title: "First 100 users", description: "Launch the beta. The sync engine handles its first real-time collaboration session without a single dropped packet." },
  { year: "2023", title: "Series A", description: "Raise $12M from Accel and Point Nine. Hire the first 8 team members across engineering, design, and product." },
  { year: "2024", title: "10,000 teams", description: "Cross the 10k mark. Launch the plugin ecosystem. Open source the core CRDT library." },
  { year: "2025", title: "Design system launch", description: "Ship the component library that powers the UI. Start treating design as infrastructure, not decoration." },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function AboutTimeline() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-3xl"
    >
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">Our Journey</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          From a bakery office to 10,000 teams.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border sm:left-1/2 sm:-ml-px" />

        <div className="space-y-10">
          {milestones.map((milestone, i) => (
            <motion.div
              key={milestone.year}
              variants={itemVariants}
              className={`relative flex items-start gap-6 sm:gap-10 ${
                i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
              }`}
            >
              <div className={`hidden flex-1 sm:block ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                <div
                  className="rounded-xl bg-card p-5 ring-1 ring-foreground/5"
                  style={{
                    boxShadow:
                      "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
                  }}
                >
                  <p className="font-heading text-base font-semibold tracking-tight">
                    {milestone.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex shrink-0 items-center justify-center">
                <Badge className="font-mono tabular-nums">{milestone.year}</Badge>
              </div>

              <div className="flex-1 sm:hidden">
                <div
                  className="rounded-xl bg-card p-4 ring-1 ring-foreground/5"
                  style={{
                    boxShadow:
                      "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
                  }}
                >
                  <p className="font-heading text-sm font-semibold tracking-tight">
                    {milestone.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </div>

              <div className="hidden flex-1 sm:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
