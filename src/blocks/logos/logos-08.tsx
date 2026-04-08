"use client"

import { motion } from "framer-motion"

const companies = [
  { name: "Meridian", letters: "MR" },
  { name: "Wavelength", letters: "WL" },
  { name: "Arcadia", letters: "AC" },
  { name: "Prism", letters: "PR" },
  { name: "Helix", letters: "HX" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Logos08() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full flex items-center justify-center gap-8 py-6"
    >
      {companies.map((company, i) => (
        <motion.div
          key={company.name}
          variants={itemVariants}
          className="flex items-center gap-1.5 opacity-25"
        >
          <span className="font-heading text-sm font-semibold tracking-tight text-foreground">
            {company.name}
          </span>
          {i < companies.length - 1 && (
            <span className="ml-6 text-muted-foreground/15 select-none">/</span>
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}
