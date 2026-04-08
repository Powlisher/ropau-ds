"use client"

import { motion } from "framer-motion"

const companies = [
  { name: "Meridian", letters: "MR" },
  { name: "Wavelength", letters: "WL" },
  { name: "Arcadia", letters: "AC" },
  { name: "Prism", letters: "PR" },
  { name: "Helix", letters: "HX" },
  { name: "Stratum", letters: "ST" },
  { name: "Vantage", letters: "VT" },
  { name: "Nucleus", letters: "NC" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Logos01() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full py-8">
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-2 sm:grid-cols-4 gap-6"
      >
        {companies.map((company) => (
          <motion.div
            key={company.name}
            variants={itemVariants}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className="group flex items-center justify-center py-6 cursor-pointer"
          >
            <div className="flex items-center gap-2 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground/10 group-hover:bg-foreground transition-colors">
                <span className="text-[10px] font-bold tracking-wider text-foreground group-hover:text-background transition-colors">
                  {company.letters}
                </span>
              </div>
              <span className="font-heading text-sm font-semibold tracking-tight text-foreground">
                {company.name}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
