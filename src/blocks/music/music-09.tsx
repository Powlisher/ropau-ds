"use client"

import { motion } from "framer-motion"
import { Music } from "lucide-react"

const lyrics = [
  { time: 0, text: "Walking through the glass meridian" },
  { time: 8, text: "Where the shadows learn to breathe" },
  { time: 16, text: "Every frequency a question" },
  { time: 24, text: "Every silence an answer" },
  { time: 32, text: "" },
  { time: 36, text: "I built this architecture" },
  { time: 44, text: "From the echoes of your name" },
  { time: 52, text: "And the walls keep rearranging" },
  { time: 60, text: "Into patterns I can't explain" },
  { time: 68, text: "" },
  { time: 72, text: "Midnight, midnight" },
  { time: 80, text: "The structures dissolve" },
  { time: 88, text: "And we are left" },
  { time: 92, text: "With nothing but the sound" },
]

const currentLineIndex = 6

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
}

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Music09() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-md mx-auto">
      <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
        <Music className="h-4 w-4 text-muted-foreground/40" />
        <div>
          <h3 className="text-sm font-medium text-foreground">Midnight Architecture</h3>
          <p className="text-xs text-muted-foreground/60">Nora Veil</p>
        </div>
      </motion.div>

      <div
        className="rounded-2xl p-6 ring-1 ring-foreground/5 overflow-hidden relative"
        style={{
          background: "linear-gradient(180deg, oklch(0.98 0.005 280) 0%, oklch(0.96 0.008 300) 100%)",
          boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <div className="space-y-1.5">
          {lyrics.map((line, i) => {
            if (line.text === "") {
              return <div key={i} className="h-5" />
            }

            const isCurrent = i === currentLineIndex
            const isPast = i < currentLineIndex
            const distanceFromCurrent = Math.abs(i - currentLineIndex)

            return (
              <motion.p
                key={i}
                variants={itemVariants}
                className={`text-lg font-heading leading-relaxed transition-all duration-500 ${
                  isCurrent
                    ? "text-foreground font-semibold tracking-tight scale-[1.02] origin-left"
                    : isPast
                      ? "text-muted-foreground/30"
                      : distanceFromCurrent <= 2
                        ? "text-muted-foreground/50"
                        : "text-muted-foreground/20"
                }`}
                style={isCurrent ? {
                  textShadow: "0 0 30px oklch(0.55 0.14 280 / 0.15)",
                } : undefined}
              >
                {line.text}
              </motion.p>
            )
          })}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[oklch(0.96_0.008_300)] to-transparent pointer-events-none" />
      </div>
    </motion.div>
  )
}
