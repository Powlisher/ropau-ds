"use client"

import { motion } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward, Volume2, ListMusic, Maximize2 } from "lucide-react"
import { useState } from "react"

const track = {
  title: "Thermal Drift",
  artist: "Oake",
  elapsed: 142,
  duration: 362,
  gradient: "linear-gradient(135deg, oklch(0.42 0.08 160) 0%, oklch(0.32 0.12 180) 100%)",
}

function formatTime(s: number) {
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`
}

export default function Music07() {
  const [isPlaying, setIsPlaying] = useState(true)
  const progress = (track.elapsed / track.duration) * 100

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-card/95 backdrop-blur-xl"
      style={{
        boxShadow: "0 -1px 2px rgba(20,20,15,0.02), 0 -2px 8px rgba(20,20,15,0.03), 0 -4px 16px rgba(20,20,15,0.02)",
      }}
    >
      <div className="relative h-0.5 w-full bg-muted">
        <motion.div
          className="absolute inset-y-0 left-0"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, oklch(0.50 0.10 160), oklch(0.48 0.12 180))",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring" as const, stiffness: 100, damping: 20 }}
        />
      </div>

      <div className="flex items-center gap-4 px-4 py-2.5 max-w-screen-xl mx-auto">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className="h-10 w-10 shrink-0 rounded-lg ring-1 ring-foreground/5"
            style={{ background: track.gradient }}
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{track.title}</p>
            <p className="text-xs text-muted-foreground/60">{track.artist}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <span className="font-mono text-[10px] tabular-nums text-muted-foreground/40 hidden sm:block mr-2">
            {formatTime(track.elapsed)}
          </span>
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <SkipBack className="h-4 w-4" />
          </button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background mx-1"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
          </motion.button>
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <SkipForward className="h-4 w-4" />
          </button>
          <span className="font-mono text-[10px] tabular-nums text-muted-foreground/40 hidden sm:block ml-2">
            {formatTime(track.duration)}
          </span>
        </div>

        <div className="flex-1 flex items-center justify-end gap-2">
          <div className="hidden md:flex items-center gap-2">
            <Volume2 className="h-3.5 w-3.5 text-muted-foreground/40" />
            <div className="relative h-1 w-20 rounded-full bg-muted">
              <div className="absolute inset-y-0 left-0 w-[65%] rounded-full bg-muted-foreground/30" />
            </div>
          </div>
          <button className="p-2 text-muted-foreground/40 hover:text-foreground transition-colors">
            <ListMusic className="h-4 w-4" />
          </button>
          <button className="p-2 text-muted-foreground/40 hover:text-foreground transition-colors hidden sm:block">
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
