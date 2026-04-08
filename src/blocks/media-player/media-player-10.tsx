"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { motion } from "framer-motion"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  RotateCw,
  Share2,
  Bookmark,
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

export default function MediaPlayer10() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState([18])
  const [bookmarked, setBookmarked] = useState(false)

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
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-start gap-4">
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl"
              style={{
                background: "linear-gradient(135deg, oklch(0.62 0.10 45), oklch(0.52 0.14 25))",
                boxShadow: "0 2px 8px rgba(20,20,15,0.08)",
              }}
            >
              <span className="font-heading text-2xl font-bold text-white/90">
                S
              </span>
            </div>
            <div className="min-w-0 flex-1 pt-1">
              <p className="font-heading text-base font-semibold tracking-tight">
                The Craft of Code
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Synthese Podcast
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground/80">
                Episode 143 — Sophie Alpert discusses the evolution of React, building developer tools
                at Meta, and why simplicity is the hardest thing to achieve.
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 pb-2">
          <Slider
            value={progress}
            onValueChange={(val) => setProgress(val as number[])}
            max={100}
            step={1}
          />
          <div className="mt-1.5 flex justify-between">
            <span className="font-mono text-[11px] tabular-nums tracking-wide text-muted-foreground">
              11:24
            </span>
            <span className="font-mono text-[11px] tabular-nums tracking-wide text-muted-foreground">
              1:03:17
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 px-6 py-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="absolute -bottom-0.5 text-[8px] font-bold">15</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <SkipBack className="h-4 w-4" />
          </Button>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
          >
            <Button
              size="icon"
              className="h-14 w-14 rounded-full"
              onClick={() => setPlaying(!playing)}
            >
              {playing ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
          </motion.div>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <SkipForward className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground"
          >
            <RotateCw className="h-4 w-4" />
            <span className="absolute -bottom-0.5 text-[8px] font-bold">30</span>
          </Button>
        </div>

        <div className="flex items-center justify-between border-t bg-muted/20 px-6 py-3">
          <div className="flex items-center gap-2">
            <span className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] tabular-nums font-medium">
              1x
            </span>
            <span className="text-[11px] text-muted-foreground">
              51 min left
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setBookmarked(!bookmarked)}
            >
              <Bookmark
                className={`h-3.5 w-3.5 ${
                  bookmarked ? "fill-current text-foreground" : "text-muted-foreground"
                }`}
              />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <Share2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
