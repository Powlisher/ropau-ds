"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const investors = [
  { name: "Accel", type: "Lead, Series A", initials: "AC" },
  { name: "Point Nine", type: "Co-lead, Series A", initials: "P9" },
  { name: "La Famille", type: "Seed", initials: "LF" },
  { name: "Kima Ventures", type: "Pre-seed", initials: "KV" },
  { name: "Datadog Ventures", type: "Strategic", initials: "DD" },
  { name: "Vercel", type: "Strategic Partner", initials: "VC" },
  { name: "Supabase", type: "Ecosystem Partner", initials: "SB" },
  { name: "Figma", type: "Design Partner", initials: "FG" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function AboutInvestors() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <div className="mb-8 text-center">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Backed by the best
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Investors and partners who believe in what we are building.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {investors.map((inv) => (
          <motion.div
            key={inv.name}
            variants={itemVariants}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex flex-col items-center gap-3 rounded-xl bg-card px-4 py-6 ring-1 ring-foreground/5 text-center transition-all"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
            }}
          >
            <div className="flex size-14 items-center justify-center rounded-xl bg-muted text-base font-bold tracking-tight text-muted-foreground">
              {inv.initials}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold">{inv.name}</p>
              <Badge variant="outline" className="text-[11px]">{inv.type}</Badge>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
