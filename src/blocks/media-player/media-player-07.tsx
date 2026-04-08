"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { motion } from "framer-motion"
import { Play, Pause, X, Minimize2, Maximize2 } from "lucide-react"

export default function MediaPlayer07() {
  const [playing, setPlaying] = useState(true)
  const [progress, setProgress] = useState([56])
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      className="mx-auto w-full max-w-xs"
    >
      <motion.div
        layout
        className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04)",
        }}
      >
        <div className="relative">
          <motion.div
            layout
            className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
            style={{ aspectRatio: expanded ? "16/9" : "16/10" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-sm font-medium text-white/70">
                Live Preview
              </p>
            </div>

            <div className="absolute right-2 top-2 flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 bg-black/30 text-white/80 hover:bg-black/50 hover:text-white"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? (
                  <Minimize2 className="h-3.5 w-3.5" />
                ) : (
                  <Maximize2 className="h-3.5 w-3.5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 bg-black/30 text-white/80 hover:bg-black/50 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          </motion.div>

          <div className="absolute inset-x-0 bottom-0">
            <Slider
              value={progress}
              onValueChange={(val) => setProgress(val as number[])}
              max={100}
              step={1}
              className="h-0.5"
            />
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-3 py-2">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-medium tracking-tight">
              Refactoring UI Workshop
            </p>
            <p className="truncate text-[11px] text-muted-foreground">
              Adam Wathan and Steve Schoger
            </p>
          </div>

          <div className="flex items-center gap-1">
            <span className="mr-1 font-mono text-[10px] tabular-nums text-muted-foreground">
              24:38
            </span>
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                size="icon"
                className="h-7 w-7 rounded-full"
                onClick={() => setPlaying(!playing)}
              >
                {playing ? (
                  <Pause className="h-3 w-3" />
                ) : (
                  <Play className="h-3 w-3" />
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
