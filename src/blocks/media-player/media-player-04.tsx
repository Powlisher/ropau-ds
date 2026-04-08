"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { motion } from "framer-motion"
import { Play, Pause, SkipForward, Heart, ChevronUp } from "lucide-react"

export default function MediaPlayer04() {
  const [playing, setPlaying] = useState(true)
  const [liked, setLiked] = useState(false)
  const [progress, setProgress] = useState([63])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      className="mx-auto w-full max-w-sm"
    >
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
        className="overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04)",
        }}
      >
        <div className="relative">
          <Slider
            value={progress}
            onValueChange={(val) => setProgress(val as number[])}
            max={100}
            step={1}
            className="absolute inset-x-0 top-0 z-10 h-0.5"
          />
        </div>

        <div className="flex items-center gap-3 px-3 py-2.5">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
            style={{
              background: "linear-gradient(135deg, oklch(0.60 0.14 340), oklch(0.50 0.18 310))",
            }}
          >
            <span className="font-heading text-sm font-bold text-white/90">R</span>
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium tracking-tight">
              Retrograde
            </p>
            <p className="truncate text-[11px] text-muted-foreground">
              James Blake
            </p>
          </div>

          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setLiked(!liked)}
            >
              <Heart
                className={`h-3.5 w-3.5 ${liked ? "fill-red-500 text-red-500" : ""}`}
              />
            </Button>
            <motion.div whileTap={{ scale: 0.92 }}>
              <Button
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setPlaying(!playing)}
              >
                {playing ? (
                  <Pause className="h-3.5 w-3.5" />
                ) : (
                  <Play className="h-3.5 w-3.5" />
                )}
              </Button>
            </motion.div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <SkipForward className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <ChevronUp className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
