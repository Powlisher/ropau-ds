"use client"

import { motion } from "framer-motion"
import { Play, Pause } from "lucide-react"
import { useState, useMemo } from "react"

const trackInfo = {
  title: "Dissolve",
  artist: "Pael",
  duration: "3:42",
  bpm: 118,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Music04() {
  const [isPlaying, setIsPlaying] = useState(false)

  const bars = useMemo(() => {
    const count = 64
    return Array.from({ length: count }, (_, i) => {
      const x = i / count
      const base = Math.sin(x * Math.PI) * 0.7
      const detail = Math.sin(x * 12) * 0.15 + Math.sin(x * 23) * 0.1 + Math.cos(x * 7) * 0.08
      const noise = (Math.sin(i * 137.5 + 42) * 0.5 + 0.5) * 0.12
      return Math.max(0.06, Math.min(1, base + detail + noise))
    })
  }, [])

  const playedPercent = 36

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-lg mx-auto">
      <motion.div
        variants={itemVariants}
        className="rounded-2xl bg-card p-5 ring-1 ring-foreground/5"
        style={{
          boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">
              {trackInfo.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{trackInfo.artist}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tabular-nums tracking-wide text-muted-foreground/50 uppercase">
              {trackInfo.bpm} BPM
            </span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background"
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 ml-0.5" />}
            </motion.button>
          </div>
        </div>

        <motion.div variants={itemVariants} className="flex items-end gap-[2px] h-24 w-full px-1">
          {bars.map((height, i) => {
            const played = (i / bars.length) * 100 < playedPercent
            return (
              <motion.div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${height * 100}%`,
                  background: played
                    ? "oklch(0.55 0.14 280)"
                    : "oklch(0.85 0.01 260 / 0.3)",
                  minWidth: 2,
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{
                  type: "spring" as const,
                  stiffness: 200,
                  damping: 18,
                  delay: i * 0.008,
                }}
              />
            )
          })}
        </motion.div>

        <div className="flex justify-between mt-2.5">
          <span className="font-mono text-[10px] tabular-nums text-muted-foreground/50">1:20</span>
          <span className="font-mono text-[10px] tabular-nums text-muted-foreground/50">{trackInfo.duration}</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
