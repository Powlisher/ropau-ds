"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const categories = [
  {
    id: "tech",
    label: "Technology",
    companies: [
      { name: "Nucleus", letters: "NC" },
      { name: "Parallax", letters: "PX" },
      { name: "Cortex", letters: "CX" },
      { name: "Cadence", letters: "CD" },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    companies: [
      { name: "Meridian", letters: "MR" },
      { name: "Stratum", letters: "ST" },
      { name: "Vantage", letters: "VT" },
    ],
  },
  {
    id: "health",
    label: "Healthcare",
    companies: [
      { name: "Helix Bio", letters: "HX" },
      { name: "Prism Health", letters: "PH" },
      { name: "Wavelength", letters: "WL" },
      { name: "Arcadia Med", letters: "AM" },
      { name: "Nova Care", letters: "NV" },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Logos09() {
  const [activeTab, setActiveTab] = useState("tech")
  const activeCategory = categories.find((c) => c.id === activeTab)!

  return (
    <div className="w-full py-10">
      <div className="text-center mb-6">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Across every industry
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Leaders in their field, powered by our platform</p>
      </div>

      <div className="flex items-center justify-center gap-1 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
              activeTab === cat.id ? "text-foreground" : "text-muted-foreground/40 hover:text-muted-foreground"
            }`}
          >
            {cat.label}
            {activeTab === cat.id && (
              <motion.div
                layoutId="logos-tab-indicator"
                className="absolute inset-0 rounded-lg bg-muted/50 ring-1 ring-foreground/5 -z-10"
                transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap items-center justify-center gap-6"
      >
        {activeCategory.companies.map((company) => (
          <motion.div
            key={company.name}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-card ring-1 ring-foreground/5 cursor-pointer"
            style={{
              boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
            }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground/8">
              <span className="text-[10px] font-bold tracking-wider text-foreground/50">
                {company.letters}
              </span>
            </div>
            <span className="font-heading text-sm font-semibold tracking-tight text-foreground">
              {company.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
