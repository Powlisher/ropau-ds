"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"
import { Play, Pause, SkipForward, SkipBack, ListMusic, X } from "lucide-react"

const playlist = [
  { id: 1, title: "Comptine d'un autre ete", artist: "Yann Tiersen", duration: "3:24", active: false },
  { id: 2, title: "Nuvole Bianche", artist: "Ludovico Einaudi", duration: "5:57", active: true },
  { id: 3, title: "River Flows in You", artist: "Yiruma", duration: "3:12", active: false },
  { id: 4, title: "Experience", artist: "Ludovico Einaudi", duration: "5:15", active: false },
  { id: 5, title: "Metamorphosis Two", artist: "Philip Glass", duration: "6:38", active: false },
  { id: 6, title: "The Heart Asks Pleasure First", artist: "Michael Nyman", duration: "4:41", active: false },
  { id: 7, title: "Divenire", artist: "Ludovico Einaudi", duration: "6:42", active: false },
  { id: 8, title: "Opening", artist: "Philip Glass", duration: "7:03", active: false },
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

export default function MediaPlayer03() {
  const [playing, setPlaying] = useState(true)
  const [queueOpen, setQueueOpen] = useState(true)
  const [progress, setProgress] = useState([42])

  const current = playlist.find((t) => t.active)

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto flex w-full max-w-3xl overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <motion.div variants={itemVariants} className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-8 py-10">
          <div
            className="mb-6 flex h-32 w-32 items-center justify-center rounded-2xl"
            style={{
              background: "linear-gradient(135deg, oklch(0.50 0.12 200), oklch(0.40 0.15 230))",
              boxShadow: "0 4px 8px rgba(20,20,15,0.08), 0 8px 16px rgba(20,20,15,0.06)",
            }}
          >
            <span className="font-heading text-3xl font-bold text-white/90">NB</span>
          </div>
          <h3 className="font-heading text-lg font-semibold tracking-tight">
            {current?.title}
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{current?.artist}</p>

          <div className="mt-6 w-full max-w-xs">
            <Slider value={progress} onValueChange={(val) => setProgress(val as number[])} max={100} step={1} />
            <div className="mt-1.5 flex justify-between">
              <span className="font-mono text-[11px] tabular-nums tracking-wide text-muted-foreground">
                2:31
              </span>
              <span className="font-mono text-[11px] tabular-nums tracking-wide text-muted-foreground">
                {current?.duration}
              </span>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <SkipBack className="h-4 w-4" />
            </Button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
        </div>

        <div className="flex items-center justify-end border-t bg-muted/20 px-4 py-2">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-xs"
            onClick={() => setQueueOpen(!queueOpen)}
          >
            <ListMusic className="h-3.5 w-3.5" />
            Queue
          </Button>
        </div>
      </motion.div>

      {queueOpen && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 280, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 28 }}
          className="flex flex-col border-l"
        >
          <div className="flex items-center justify-between border-b px-4 py-3">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Up Next
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setQueueOpen(false)}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="p-2"
            >
              {playlist.map((track) => (
                <motion.div
                  key={track.id}
                  variants={itemVariants}
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 ${
                    track.active ? "bg-primary/5" : ""
                  }`}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
                    {track.active ? (
                      <div className="flex items-end gap-0.5">
                        {[0.4, 0.7, 0.5].map((h, i) => (
                          <motion.div
                            key={i}
                            className="w-[3px] rounded-full bg-primary"
                            animate={{ height: [h * 12, h * 6, h * 12] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                    ) : (
                      <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                        {track.id}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-[13px] font-medium ${
                        track.active ? "text-primary" : ""
                      }`}
                    >
                      {track.title}
                    </p>
                    <p className="truncate text-[11px] text-muted-foreground">
                      {track.artist}
                    </p>
                  </div>
                  <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                    {track.duration}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </ScrollArea>
        </motion.div>
      )}
    </motion.div>
  )
}
