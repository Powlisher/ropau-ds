"use client"

import { motion } from "framer-motion"

const tiers = [
  {
    name: "Platinum Partners",
    companies: [
      { name: "Meridian Group", letters: "MG" },
      { name: "Wavelength Corp", letters: "WC" },
    ],
    style: "text-base",
    iconSize: "h-10 w-10",
    letterSize: "text-xs",
  },
  {
    name: "Gold Partners",
    companies: [
      { name: "Arcadia", letters: "AC" },
      { name: "Prism", letters: "PR" },
      { name: "Helix", letters: "HX" },
    ],
    style: "text-sm",
    iconSize: "h-8 w-8",
    letterSize: "text-[10px]",
  },
  {
    name: "Silver Partners",
    companies: [
      { name: "Stratum", letters: "ST" },
      { name: "Vantage", letters: "VT" },
      { name: "Nucleus", letters: "NC" },
      { name: "Cadence", letters: "CD" },
      { name: "Parallax", letters: "PX" },
    ],
    style: "text-xs",
    iconSize: "h-6 w-6",
    letterSize: "text-[8px]",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Logos05() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full py-10">
      <motion.div variants={itemVariants} className="text-center mb-10">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Our Partners
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Industry leaders who believe in what we build
        </p>
      </motion.div>

      <div className="space-y-10">
        {tiers.map((tier) => (
          <motion.div key={tier.name} variants={itemVariants} className="text-center">
            <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted-foreground/40 mb-4">
              {tier.name}
            </p>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {tier.companies.map((company) => (
                <motion.div
                  key={company.name}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                  className="flex items-center gap-2 opacity-50 hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <div className={`${tier.iconSize} flex items-center justify-center rounded-lg bg-foreground/8`}>
                    <span className={`${tier.letterSize} font-bold tracking-wider text-foreground/60`}>
                      {company.letters}
                    </span>
                  </div>
                  <span className={`font-heading ${tier.style} font-semibold tracking-tight text-foreground`}>
                    {company.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
