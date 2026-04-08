"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"
import { Play, Pause, SkipForward, SkipBack, BookOpen } from "lucide-react"

const chapters = [
  { id: 1, title: "Introduction", start: "0:00", startPct: 0 },
  { id: 2, title: "Setting Up the Workspace", start: "3:14", startPct: 9 },
  { id: 3, title: "Core Architecture Patterns", start: "8:47", startPct: 24 },
  { id: 4, title: "Building the Component Layer", start: "14:22", startPct: 39 },
  { id: 5, title: "State Management Deep Dive", start: "19:56", startPct: 55 },
  { id: 6, title: "Performance Optimization", start: "25:11", startPct: 69 },
  { id: 7, title: "Testing Strategies", start: "30:38", startPct: 84 },
  { id: 8, title: "Closing Thoughts", start: "33:45", startPct: 93 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function MediaPlayer05() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState([42])
  const activeChapter =
    [...chapters].reverse().find((c) => c.startPct <= progress[0]) ?? chapters[0]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto w-full max-w-xl"
    >
      <motion.div
        variants={itemVariants}
        className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="font-heading text-lg font-semibold tracking-tight text-white/90">
              Frontend Architecture Masterclass
            </p>
            <p className="mt-1 text-sm text-white/50">
              Chapter {activeChapter.id}: {activeChapter.title}
            </p>
          </div>

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-4 pt-8">
            <div className="relative">
              <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-0.5">
                {chapters.map((ch) => (
                  <div
                    key={ch.id}
                    className="h-2.5 w-px bg-white/30"
                    style={{ marginLeft: ch.id === 1 ? 0 : undefined }}
                  />
                ))}
              </div>
              <Slider
                value={progress}
                onValueChange={(val) => setProgress(val as number[])}
                max={100}
                step={1}
                className="relative z-10 h-1"
              />
            </div>
            <div className="mt-1.5 flex items-center justify-between">
              <span className="font-mono text-[11px] tabular-nums tracking-wide text-white/60">
                15:17
              </span>
              <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-white/70">
                Ch. {activeChapter.id}
              </span>
              <span className="font-mono text-[11px] tabular-nums tracking-wide text-white/60">
                36:28
              </span>
            </div>

            <div className="mt-3 flex items-center justify-center gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-white/80 hover:bg-white/10">
                <SkipBack className="h-4 w-4" />
              </Button>
              <motion.div whileTap={{ scale: 0.92 }}>
                <Button
                  size="icon"
                  className="h-11 w-11 rounded-full bg-white/20 text-white hover:bg-white/30"
                  onClick={() => setPlaying(!playing)}
                >
                  {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
              </motion.div>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-white/80 hover:bg-white/10">
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t">
          <div className="flex items-center gap-2 border-b px-4 py-2.5">
            <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Chapters
            </span>
          </div>
          <ScrollArea className="max-h-48">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="p-2"
            >
              {chapters.map((ch) => (
                <motion.button
                  key={ch.id}
                  variants={itemVariants}
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
                  onClick={() => setProgress([ch.startPct])}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left ${
                    activeChapter.id === ch.id ? "bg-primary/5" : ""
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-medium ${
                      activeChapter.id === ch.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {ch.id}
                  </span>
                  <span
                    className={`flex-1 text-[13px] ${
                      activeChapter.id === ch.id ? "font-medium" : ""
                    }`}
                  >
                    {ch.title}
                  </span>
                  <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                    {ch.start}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </ScrollArea>
        </div>
      </motion.div>
    </motion.div>
  )
}
