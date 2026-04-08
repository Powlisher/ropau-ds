"use client"

import { motion, Reorder } from "framer-motion"
import { GripVertical, X, Play } from "lucide-react"
import { useState } from "react"

const initialQueue = [
  { id: "1", title: "Soft Circuits", artist: "Hana Kim", duration: "5:18" },
  { id: "2", title: "Thermal Drift", artist: "Oake", duration: "6:02" },
  { id: "3", title: "Under the Static", artist: "Gloom Theory", duration: "3:55" },
  { id: "4", title: "Paper Lanterns", artist: "Nora Veil", duration: "4:31" },
  { id: "5", title: "Everything at Once", artist: "Pael", duration: "3:19" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Music05() {
  const [queue, setQueue] = useState(initialQueue)

  const removeTrack = (id: string) => {
    setQueue((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-md mx-auto">
      <motion.div variants={itemVariants} className="flex items-baseline justify-between mb-4">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
            Up Next
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {queue.length} tracks in queue
          </p>
        </div>
        <button className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
          Clear all
        </button>
      </motion.div>

      <div
        className="rounded-2xl bg-card ring-1 ring-foreground/5 overflow-hidden"
        style={{
          boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <Reorder.Group axis="y" values={queue} onReorder={setQueue} className="divide-y divide-border/40">
          {queue.map((track, i) => (
            <Reorder.Item
              key={track.id}
              value={track}
              className="flex items-center gap-3 px-4 py-3 bg-card cursor-grab active:cursor-grabbing group"
              whileDrag={{
                scale: 1.02,
                boxShadow: "0 4px 16px rgba(20,20,15,0.1)",
                zIndex: 50,
              }}
            >
              <GripVertical className="h-4 w-4 text-muted-foreground/25 shrink-0" />
              <div
                className="h-9 w-9 shrink-0 rounded-lg flex items-center justify-center ring-1 ring-foreground/5"
                style={{
                  background: `linear-gradient(135deg, oklch(${0.42 + i * 0.03} 0.08 ${180 + i * 40}) 0%, oklch(${0.32 + i * 0.02} 0.12 ${200 + i * 40}) 100%)`,
                }}
              >
                <Play className="h-3 w-3 text-white/50 ml-0.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{track.title}</p>
                <p className="text-xs text-muted-foreground/60">{track.artist}</p>
              </div>
              <span className="font-mono text-xs tabular-nums text-muted-foreground/40 shrink-0">
                {track.duration}
              </span>
              <button
                onClick={() => removeTrack(track.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
              >
                <X className="h-3.5 w-3.5 text-muted-foreground/40 hover:text-foreground" />
              </button>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </motion.div>
  )
}
