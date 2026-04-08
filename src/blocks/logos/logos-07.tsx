"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const companies = [
  { name: "Meridian Group", letters: "MR", description: "Enterprise infrastructure provider serving Fortune 500" },
  { name: "Wavelength", letters: "WL", description: "Next-gen telecom and 5G solutions" },
  { name: "Arcadia", letters: "AC", description: "Digital commerce platform for D2C brands" },
  { name: "Prism Analytics", letters: "PR", description: "Real-time data processing at scale" },
  { name: "Helix Bio", letters: "HX", description: "Computational biology and drug discovery" },
  { name: "Stratum", letters: "ST", description: "Zero-trust cloud security" },
  { name: "Vantage AI", letters: "VT", description: "ML infrastructure for production" },
  { name: "Nucleus", letters: "NC", description: "Developer experience and tooling" },
  { name: "Cadence", letters: "CD", description: "Workflow automation for operations" },
  { name: "Parallax", letters: "PX", description: "Spatial computing and AR platforms" },
  { name: "Cortex Labs", letters: "CL", description: "Neural interface research" },
  { name: "Tidal", letters: "TD", description: "Maritime logistics and tracking" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Logos07() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <div className="w-full py-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3"
      >
        {companies.map((company, i) => (
          <motion.div
            key={company.name}
            variants={itemVariants}
            onHoverStart={() => setHoveredIdx(i)}
            onHoverEnd={() => setHoveredIdx(null)}
            className="relative flex items-center justify-center py-5 rounded-xl bg-card ring-1 ring-foreground/5 cursor-pointer group"
            style={{
              boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
            }}
          >
            <div className="flex items-center gap-1.5 opacity-40 group-hover:opacity-90 transition-opacity">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-foreground/8">
                <span className="text-[8px] font-bold tracking-wider text-foreground/60">
                  {company.letters}
                </span>
              </div>
              <span className="font-heading text-xs font-semibold tracking-tight text-foreground hidden sm:block">
                {company.name.split(" ")[0]}
              </span>
            </div>

            <AnimatePresence>
              {hoveredIdx === i && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.96 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                  className="absolute -bottom-2 translate-y-full left-1/2 -translate-x-1/2 z-50 w-48 rounded-xl bg-foreground p-3 text-center"
                  style={{
                    boxShadow: "0 4px 16px rgba(20,20,15,0.15), 0 8px 32px rgba(20,20,15,0.1)",
                  }}
                >
                  <p className="text-xs font-semibold text-background">{company.name}</p>
                  <p className="text-[10px] text-background/60 mt-0.5 leading-relaxed">
                    {company.description}
                  </p>
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 bg-foreground rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
