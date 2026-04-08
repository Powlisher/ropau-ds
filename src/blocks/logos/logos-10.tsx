"use client"

import { motion } from "framer-motion"

const companiesRow1 = [
  { name: "Meridian", letters: "MR" },
  { name: "Wavelength", letters: "WL" },
  { name: "Arcadia", letters: "AC" },
  { name: "Prism", letters: "PR" },
  { name: "Helix", letters: "HX" },
  { name: "Stratum", letters: "ST" },
  { name: "Vantage", letters: "VT" },
  { name: "Nucleus", letters: "NC" },
]

const companiesRow2 = [
  { name: "Cadence", letters: "CD" },
  { name: "Parallax", letters: "PX" },
  { name: "Cortex", letters: "CX" },
  { name: "Tidal", letters: "TD" },
  { name: "Nova", letters: "NV" },
  { name: "Ember", letters: "EM" },
  { name: "Drift", letters: "DR" },
  { name: "Aether", letters: "AE" },
]

const doubled1 = [...companiesRow1, ...companiesRow1]
const doubled2 = [...companiesRow2, ...companiesRow2]

function LogoItem({ company }: { company: { name: string; letters: string } }) {
  return (
    <div className="flex shrink-0 items-center gap-2 mx-6 opacity-30">
      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground/8">
        <span className="text-[9px] font-bold tracking-wider text-foreground/60">
          {company.letters}
        </span>
      </div>
      <span className="font-heading text-sm font-semibold tracking-tight text-foreground whitespace-nowrap">
        {company.name}
      </span>
    </div>
  )
}

export default function Logos10() {
  return (
    <div className="w-full py-10 relative overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="space-y-5">
        <motion.div
          className="flex"
          animate={{ x: [0, -1 * companiesRow1.length * 160] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            },
          }}
        >
          {doubled1.map((company, i) => (
            <LogoItem key={`${company.name}-${i}`} company={company} />
          ))}
        </motion.div>

        <motion.div
          className="flex"
          animate={{ x: [-1 * companiesRow2.length * 160, 0] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {doubled2.map((company, i) => (
            <LogoItem key={`${company.name}-${i}`} company={company} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
