"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { motion } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from "lucide-react"

const waveformBars = [
  0.3, 0.5, 0.7, 0.4, 0.9, 0.6, 0.8, 0.3, 0.5, 0.7, 0.9, 0.4, 0.6, 0.8,
  0.5, 0.3, 0.7, 0.9, 0.6, 0.4, 0.8, 0.5, 0.7, 0.3, 0.6, 0.9, 0.4, 0.8,
  0.5, 0.7, 0.3, 0.6, 0.9, 0.5, 0.4, 0.8, 0.7, 0.3, 0.6, 0.5, 0.9, 0.4,
  0.7, 0.8, 0.3, 0.5, 0.6, 0.9, 0.4, 0.7, 0.8, 0.5, 0.3, 0.6, 0.4, 0.9,
  0.7, 0.5, 0.8, 0.3,
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function MediaPlayer02() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState([38])
  const progressPct = progress[0]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto w-full max-w-lg"
    >
      <motion.div
        variants={itemVariants}
        className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <div className="flex items-center gap-4 border-b px-5 py-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.15 250), oklch(0.45 0.18 280))",
            }}
          >
            <span className="font-heading text-lg font-bold text-white/90">
              A
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-heading text-sm font-semibold tracking-tight">
              Ambient Structures
            </p>
            <p className="truncate text-xs text-muted-foreground">
              Nils Frahm — All Melody
            </p>
          </div>
          <span className="shrink-0 font-mono text-[11px] tabular-nums tracking-wide text-muted-foreground">
            FLAC
          </span>
        </div>

        <div className="px-5 py-5">
          <div className="flex h-16 items-end gap-[3px]">
            {waveformBars.map((height, i) => {
              const filled = (i / waveformBars.length) * 100 < progressPct
              return (
                <motion.div
                  key={i}
                  className="flex-1 rounded-full"
                  style={{
                    height: `${height * 100}%`,
                    backgroundColor: filled
                      ? "oklch(0.55 0.15 250)"
                      : "oklch(0.85 0.02 250 / 0.3)",
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{
                    type: "spring" as const,
                    stiffness: 300,
                    damping: 24,
                    delay: i * 0.008,
                  }}
                />
              )
            })}
          </div>

          <div className="mt-3">
            <Slider
              value={progress}
              onValueChange={(val) => setProgress(val as number[])}
              max={100}
              step={1}
            />
            <div className="mt-1.5 flex justify-between">
              <span className="font-mono text-[11px] tabular-nums tracking-wide text-muted-foreground">
                2:18
              </span>
              <span className="font-mono text-[11px] tabular-nums tracking-wide text-muted-foreground">
                6:03
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 border-t bg-muted/30 px-5 py-3.5">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
            <Shuffle className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <SkipBack className="h-4 w-4" />
          </Button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="icon"
              className="h-11 w-11 rounded-full"
              onClick={() => setPlaying(!playing)}
            >
              {playing ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
          </motion.div>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <SkipForward className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
            <Repeat className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
