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
  { name: "Cadence", letters: "CD" },
  { name: "Parallax", letters: "PX" },
]

const doubled = [...companies, ...companies]

export default function Logos02() {
  return (
    <div className="w-full overflow-hidden py-8">
      <motion.div
        className="flex gap-12"
        animate={{ x: [0, -1 * companies.length * 160] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {doubled.map((company, i) => (
          <div
            key={`${company.name}-${i}`}
            className="flex shrink-0 items-center gap-2.5 opacity-30 hover:opacity-80 transition-opacity duration-300"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground/8">
              <span className="text-[9px] font-bold tracking-wider text-foreground/60">
                {company.letters}
              </span>
            </div>
            <span className="font-heading text-sm font-semibold tracking-tight text-foreground whitespace-nowrap">
              {company.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
