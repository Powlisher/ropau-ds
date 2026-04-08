"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

const companies = [
  { name: "Meridian", letters: "MR", tagline: "Enterprise infrastructure" },
  { name: "Wavelength", letters: "WL", tagline: "Telecom solutions" },
  { name: "Arcadia", letters: "AC", tagline: "Digital commerce" },
  { name: "Prism", letters: "PR", tagline: "Data analytics" },
  { name: "Helix", letters: "HX", tagline: "Biotech research" },
  { name: "Stratum", letters: "ST", tagline: "Cloud security" },
]

const PAGE_SIZE = 3

export default function Logos06() {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(companies.length / PAGE_SIZE)

  useEffect(() => {
    const interval = setInterval(() => {
      setPage((p) => (p + 1) % totalPages)
    }, 4000)
    return () => clearInterval(interval)
  }, [totalPages])

  const visible = companies.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  return (
    <div className="w-full py-10">
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground/50">
          Featured partners
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)}
            className="p-1.5 rounded-lg text-muted-foreground/30 hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-1 mx-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all ${
                  i === page ? "w-4 bg-foreground" : "w-1 bg-muted-foreground/20"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setPage((p) => (p + 1) % totalPages)}
            className="p-1.5 rounded-lg text-muted-foreground/30 hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 overflow-hidden">
        <AnimatePresence mode="wait">
          {visible.map((company) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
              className="flex flex-col items-center gap-2 py-6 rounded-xl ring-1 ring-foreground/5 bg-card"
              style={{
                boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/8">
                <span className="text-xs font-bold tracking-wider text-foreground/50">
                  {company.letters}
                </span>
              </div>
              <span className="font-heading text-sm font-semibold tracking-tight text-foreground">
                {company.name}
              </span>
              <span className="text-[10px] text-muted-foreground/40">{company.tagline}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
