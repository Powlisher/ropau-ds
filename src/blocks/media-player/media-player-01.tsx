"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { motion } from "framer-motion"
import {
  Play,
  Pause,
  Volume2,
  Maximize,
  SkipBack,
  SkipForward,
  Settings,
} from "lucide-react"

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

export default function MediaPlayer01() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState([34])
  const [showControls, setShowControls] = useState(true)

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto w-full max-w-2xl"
    >
      <motion.div
        variants={itemVariants}
        className="group relative overflow-hidden rounded-xl bg-slate-950 ring-1 ring-white/10"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="font-heading text-lg font-semibold tracking-tight text-white/90">
                Designing with Constraints
              </p>
              <p className="mt-1 text-sm text-white/50">
                Studio Ropau — Episode 7
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showControls ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showControls ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-8"
          >
            <div className="mb-3">
              <Slider
                value={progress}
                onValueChange={(val) => setProgress(val as number[])}
                max={100}
                step={1}
                className="h-1"
              />
              <div className="mt-1.5 flex justify-between">
                <span className="font-mono text-[11px] tabular-nums tracking-wide text-white/60">
                  12:47
                </span>
                <span className="font-mono text-[11px] tabular-nums tracking-wide text-white/60">
                  36:21
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 text-white hover:bg-white/10"
                  onClick={() => setPlaying(!playing)}
                >
                  {playing ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-1">
                <Volume2 className="h-4 w-4 text-white/60" />
                <div className="w-20">
                  <Slider
                    defaultValue={[72]}
                    max={100}
                    step={1}
                    className="h-1"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <Settings className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-white/5 bg-slate-900/80 px-5 py-3.5">
          <p className="font-heading text-sm font-medium tracking-tight text-white/90">
            Designing with Constraints
          </p>
          <p className="mt-0.5 text-xs text-white/50">
            How limitations fuel creativity in product design
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
