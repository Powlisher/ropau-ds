"use client"

import { motion } from "framer-motion"

const companies = [
  { name: "Meridian", letters: "MR" },
  { name: "Wavelength", letters: "WL" },
  { name: "Arcadia", letters: "AC" },
  { name: "Prism", letters: "PR" },
  { name: "Helix", letters: "HX" },
  { name: "Stratum", letters: "ST" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Logos03() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full py-12">
      <motion.div variants={itemVariants} className="text-center mb-8">
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground/50">
          Trusted by forward-thinking teams
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6"
      >
        {companies.map((company) => (
          <motion.div
            key={company.name}
            variants={itemVariants}
            className="flex items-center gap-2 opacity-35 hover:opacity-70 transition-opacity duration-300"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground/8">
              <span className="text-[9px] font-bold tracking-wider text-foreground/60">
                {company.letters}
              </span>
            </div>
            <span className="font-heading text-sm font-semibold tracking-tight text-foreground">
              {company.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
