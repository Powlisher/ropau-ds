"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function BannerPromotion() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      className="relative w-full overflow-hidden py-3"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.478 0.227 3.6), oklch(0.519 0.292 25.1))",
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-3 px-6 sm:flex-row lg:px-8">
        <p className="text-sm font-semibold tracking-tight text-white">
          Spring Sale — 30% off all Pro plans
        </p>
        <div className="flex items-center gap-2">
          {[
            { value: "02", label: "D" },
            { value: "14", label: "H" },
            { value: "37", label: "M" },
          ].map((unit) => (
            <div
              key={unit.label}
              className="flex items-center gap-1"
            >
              <span className="inline-flex h-7 min-w-[28px] items-center justify-center rounded-md bg-white/20 px-1.5 font-mono text-sm font-bold tabular-nums text-white backdrop-blur-sm">
                {unit.value}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-white/70">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
        <Button
          size="sm"
          className="border border-white/20 bg-white/15 text-white backdrop-blur-sm hover:bg-white/25"
        >
          Claim Offer
        </Button>
      </div>
    </motion.div>
  )
}
