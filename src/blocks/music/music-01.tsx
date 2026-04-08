"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward, Heart, Volume2, Repeat, Shuffle } from "lucide-react"
import { useState } from "react"

const track = {
  title: "Midnight Architecture",
  artist: "Nora Veil",
  album: "Glass Meridian",
  duration: 247,
  elapsed: 89,
  albumGradient: "linear-gradient(135deg, oklch(0.45 0.12 280) 0%, oklch(0.35 0.18 310) 50%, oklch(0.25 0.08 340) 100%)",
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec.toString().padStart(2, "0")}`
}

export default function Music01() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [liked, setLiked] = useState(false)
  const progress = (track.elapsed / track.duration) * 100

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-sm mx-auto">
      <Card className="overflow-hidden border-0 ring-1 ring-foreground/5" style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)" }}>
        <CardContent className="p-0">
          <motion.div variants={itemVariants}>
            <div
              className="aspect-square w-full relative overflow-hidden"
              style={{ background: track.albumGradient }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(255,255,255,0.15),transparent_60%)]" />
              <div className="absolute bottom-4 left-5">
                <span className="text-[10px] font-medium tracking-[0.14em] uppercase text-white/60">
                  Now Playing
                </span>
              </div>
            </div>
          </motion.div>

          <div className="px-5 pt-5 pb-6 space-y-5">
            <motion.div variants={itemVariants} className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground truncate">
                  {track.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">{track.artist}</p>
                <p className="text-xs text-muted-foreground/60 mt-0.5">{track.album}</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.85 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                onClick={() => setLiked(!liked)}
                className="mt-1 shrink-0"
              >
                <Heart
                  className={`h-5 w-5 transition-colors ${liked ? "fill-rose-500 text-rose-500" : "text-muted-foreground/40"}`}
                />
              </motion.button>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <div className="relative h-1 w-full rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, oklch(0.55 0.14 280), oklch(0.50 0.16 310))",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring" as const, stiffness: 100, damping: 20 }}
                />
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-[10px] tabular-nums text-muted-foreground/60">
                  {formatTime(track.elapsed)}
                </span>
                <span className="font-mono text-[10px] tabular-nums text-muted-foreground/60">
                  {formatTime(track.duration)}
                </span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center justify-between px-2">
              <button className="text-muted-foreground/50 hover:text-foreground transition-colors p-1">
                <Shuffle className="h-4 w-4" />
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors p-2">
                <SkipBack className="h-5 w-5" />
              </button>
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
              </motion.button>
              <button className="text-muted-foreground hover:text-foreground transition-colors p-2">
                <SkipForward className="h-5 w-5" />
              </button>
              <button className="text-muted-foreground/50 hover:text-foreground transition-colors p-1">
                <Repeat className="h-4 w-4" />
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-2 pt-1">
              <Volume2 className="h-3.5 w-3.5 text-muted-foreground/40" />
              <div className="relative h-1 flex-1 rounded-full bg-muted">
                <div className="absolute inset-y-0 left-0 w-[72%] rounded-full bg-muted-foreground/30" />
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
