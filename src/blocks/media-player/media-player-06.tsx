"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { motion } from "framer-motion"
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Gauge,
} from "lucide-react"

const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2]

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

export default function MediaPlayer06() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState([27])
  const [volume, setVolume] = useState([68])
  const [speed, setSpeed] = useState(1)
  const [muted, setMuted] = useState(false)
  const [showSpeed, setShowSpeed] = useState(false)

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto w-full max-w-md"
    >
      <motion.div
        variants={itemVariants}
        className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <div className="flex items-center gap-4 px-5 pt-5 pb-4">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl"
            style={{
              background: "linear-gradient(135deg, oklch(0.58 0.14 160), oklch(0.48 0.16 190))",
              boxShadow: "0 2px 8px rgba(20,20,15,0.08)",
            }}
          >
            <Gauge className="h-7 w-7 text-white/90" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-heading text-sm font-semibold tracking-tight">
              Systems Thinking in Practice
            </p>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              Donella Meadows Foundation
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] tabular-nums font-medium">
                {speed}x
              </span>
              <span className="font-mono text-[11px] tabular-nums tracking-wide text-muted-foreground">
                48:16 remaining
              </span>
            </div>
          </div>
        </div>

        <div className="px-5 pb-2">
          <Slider value={progress} onValueChange={(val) => setProgress(val as number[])} max={100} step={1} />
          <div className="mt-1.5 flex justify-between">
            <span className="font-mono text-[11px] tabular-nums tracking-wide text-muted-foreground">
              17:44
            </span>
            <span className="font-mono text-[11px] tabular-nums tracking-wide text-muted-foreground">
              1:06:00
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 px-5 py-3">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <SkipBack className="h-4 w-4" />
          </Button>
          <motion.div whileTap={{ scale: 0.92 }}>
            <Button
              size="icon"
              className="h-12 w-12 rounded-full"
              onClick={() => setPlaying(!playing)}
            >
              {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
          </motion.div>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        <div className="border-t bg-muted/20 px-5 py-3.5">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setMuted(!muted)}
              >
                {muted ? (
                  <VolumeX className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              <div className="w-24">
                <Slider
                  value={muted ? [0] : volume}
                  onValueChange={(v) => {
                    setVolume(v as number[])
                    if (muted) setMuted(false)
                  }}
                  max={100}
                  step={1}
                />
              </div>
            </div>

            <div className="flex-1" />

            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 font-mono text-xs tabular-nums"
                onClick={() => setShowSpeed(!showSpeed)}
              >
                <Gauge className="h-3.5 w-3.5" />
                {speed}x
              </Button>
              {showSpeed && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                  className="absolute bottom-full right-0 mb-2 flex gap-1 rounded-lg bg-popover p-1.5 ring-1 ring-foreground/10"
                  style={{
                    boxShadow:
                      "0 1px 2px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.06), 0 8px 16px rgba(20,20,15,0.06)",
                  }}
                >
                  {speeds.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setSpeed(s)
                        setShowSpeed(false)
                      }}
                      className={`rounded-md px-2.5 py-1.5 font-mono text-xs tabular-nums transition-colors ${
                        speed === s
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
