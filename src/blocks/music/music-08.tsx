"use client"

import { motion } from "framer-motion"
import { Play, Pause, Clock, Headphones } from "lucide-react"
import { useState } from "react"

const podcast = {
  title: "Sound Structures",
  host: "Elise Moreau",
  gradient: "linear-gradient(135deg, oklch(0.50 0.06 50) 0%, oklch(0.38 0.08 30) 100%)",
}

const episodes = [
  { id: 1, title: "The Architecture of Silence", date: "Mar 28, 2024", duration: "47 min", description: "How composers use absence as a tool. Featuring interview with Ryuichi Sakamoto collaborator Alva Noto.", played: true, progress: 100 },
  { id: 2, title: "Why Vinyl Survived", date: "Mar 14, 2024", duration: "38 min", description: "The psychoacoustics of analog warmth and why our brains prefer imperfection.", played: true, progress: 62 },
  { id: 3, title: "Generative Music in Practice", date: "Feb 29, 2024", duration: "54 min", description: "Brian Eno envisioned it in 1975. Now AI makes it trivial. Is that a good thing?", played: false, progress: 0 },
  { id: 4, title: "The 432 Hz Myth", date: "Feb 15, 2024", duration: "29 min", description: "Separating science from pseudoscience in the tuning frequency debate.", played: false, progress: 0 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Music08() {
  const [playingId, setPlayingId] = useState<number | null>(null)

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-lg mx-auto">
      <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
        <div
          className="h-16 w-16 shrink-0 rounded-xl flex items-center justify-center ring-1 ring-foreground/5"
          style={{
            background: podcast.gradient,
            boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
          }}
        >
          <Headphones className="h-7 w-7 text-white/50" />
        </div>
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
            {podcast.title}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">Hosted by {podcast.host}</p>
        </div>
      </motion.div>

      <div className="space-y-2">
        {episodes.map((ep) => (
          <motion.div
            key={ep.id}
            variants={itemVariants}
            whileHover={{ y: -1 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className="rounded-xl bg-card p-4 ring-1 ring-foreground/5 group"
            style={{
              boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
            }}
          >
            <div className="flex items-start gap-3.5">
              <motion.button
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                onClick={() => setPlayingId(playingId === ep.id ? null : ep.id)}
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground/5 hover:bg-foreground hover:text-background transition-colors"
              >
                {playingId === ep.id ? (
                  <Pause className="h-3.5 w-3.5" />
                ) : (
                  <Play className="h-3.5 w-3.5 ml-0.5" />
                )}
              </motion.button>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-foreground">{ep.title}</h3>
                <p className="text-xs text-muted-foreground/60 leading-relaxed mt-1 line-clamp-2">
                  {ep.description}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] text-muted-foreground/40">{ep.date}</span>
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground/40">
                    <Clock className="h-2.5 w-2.5" />
                    {ep.duration}
                  </span>
                  {ep.progress > 0 && ep.progress < 100 && (
                    <div className="flex items-center gap-1.5">
                      <div className="h-1 w-12 rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-foreground/20"
                          style={{ width: `${ep.progress}%` }}
                        />
                      </div>
                      <span className="font-mono text-[9px] tabular-nums text-muted-foreground/30">
                        {ep.progress}%
                      </span>
                    </div>
                  )}
                  {ep.progress === 100 && (
                    <span className="text-[10px] font-medium text-muted-foreground/40">Played</span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
