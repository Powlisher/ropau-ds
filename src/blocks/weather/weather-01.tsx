"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPinIcon, DropletsIcon, WindIcon } from "lucide-react"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <circle cx="32" cy="32" r="14" fill="oklch(0.82 0.17 82)" />
      <circle cx="32" cy="32" r="11" fill="oklch(0.88 0.14 85)" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1="32"
          y1="8"
          x2="32"
          y2="13"
          stroke="oklch(0.82 0.17 82)"
          strokeWidth="2.5"
          strokeLinecap="round"
          transform={`rotate(${angle} 32 32)`}
        />
      ))}
    </svg>
  )
}

export default function Weather01() {
  return (
    <Card
      className="overflow-hidden"
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardContent className="p-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div
            className="px-6 pt-6 pb-5"
            style={{ background: "linear-gradient(135deg, oklch(0.94 0.02 85), oklch(0.97 0.01 80))" }}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-1.5 text-muted-foreground">
              <MapPinIcon className="size-3.5" />
              <span className="text-xs font-medium uppercase tracking-wide">Bordeaux, France</span>
            </motion.div>
            <motion.div variants={itemVariants} className="mt-4 flex items-center justify-between">
              <div>
                <div className="text-6xl font-semibold tracking-tight tabular-nums text-foreground">23<span className="text-3xl align-top text-muted-foreground/60">°</span></div>
                <div className="mt-1 text-sm text-muted-foreground">Partly Cloudy</div>
              </div>
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <SunIcon className="size-20" />
              </motion.div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="flex items-center justify-around px-6 py-4">
            <div className="flex items-center gap-2">
              <DropletsIcon className="size-4 text-muted-foreground/60" />
              <div>
                <div className="text-xs text-muted-foreground">Humidity</div>
                <div className="text-sm font-medium tabular-nums">58%</div>
              </div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="flex items-center gap-2">
              <WindIcon className="size-4 text-muted-foreground/60" />
              <div>
                <div className="text-xs text-muted-foreground">Wind</div>
                <div className="text-sm font-medium tabular-nums">14 km/h</div>
              </div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground/60">UV</span>
              <div>
                <div className="text-xs text-muted-foreground">Index</div>
                <div className="text-sm font-medium tabular-nums">6</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
