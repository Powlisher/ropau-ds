"use client"

import { motion } from "framer-motion"
import { Play, Clock, MoreHorizontal, Music } from "lucide-react"

const playlist = {
  name: "Late Night Frequencies",
  trackCount: 14,
  totalDuration: "52 min",
  tracks: [
    { title: "Midnight Architecture", artist: "Nora Veil", duration: "4:07", plays: "2.3M" },
    { title: "Dissolve", artist: "Pael", duration: "3:42", plays: "891K" },
    { title: "Soft Circuits", artist: "Hana Kim", duration: "5:18", plays: "1.7M" },
    { title: "Under the Static", artist: "Gloom Theory", duration: "3:55", plays: "456K" },
    { title: "Paper Lanterns", artist: "Nora Veil", duration: "4:31", plays: "3.1M" },
    { title: "Thermal Drift", artist: "Oake", duration: "6:02", plays: "728K" },
    { title: "Everything at Once", artist: "Pael", duration: "3:19", plays: "1.2M" },
  ],
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Music02() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-lg mx-auto">
      <motion.div variants={itemVariants} className="mb-6">
        <div className="flex items-end gap-4">
          <div
            className="h-20 w-20 shrink-0 rounded-xl flex items-center justify-center ring-1 ring-foreground/5"
            style={{
              background: "linear-gradient(135deg, oklch(0.45 0.08 200) 0%, oklch(0.35 0.12 240) 100%)",
              boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <Music className="h-8 w-8 text-white/40" />
          </div>
          <div className="min-w-0">
            <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">
              {playlist.name}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              {playlist.trackCount} tracks · {playlist.totalDuration}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-3 flex items-center px-3 text-[10px] font-medium tracking-[0.1em] uppercase text-muted-foreground/50">
        <span className="w-8 text-center">#</span>
        <span className="flex-1 pl-3">Title</span>
        <span className="w-16 text-right hidden sm:block">Plays</span>
        <span className="w-12 text-right"><Clock className="h-3 w-3 inline" /></span>
        <span className="w-8" />
      </motion.div>

      <div className="divide-y divide-border/50">
        {playlist.tracks.map((track, i) => (
          <motion.div
            key={track.title}
            variants={itemVariants}
            whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
            className="group flex items-center rounded-lg px-3 py-2.5 transition-colors"
          >
            <span className="w-8 text-center font-mono text-xs tabular-nums text-muted-foreground/40 group-hover:hidden">
              {i + 1}
            </span>
            <span className="w-8 text-center hidden group-hover:flex items-center justify-center">
              <Play className="h-3.5 w-3.5 text-foreground" />
            </span>
            <div className="flex-1 min-w-0 pl-3">
              <p className="text-sm font-medium text-foreground truncate">{track.title}</p>
              <p className="text-xs text-muted-foreground/60 truncate">{track.artist}</p>
            </div>
            <span className="w-16 text-right font-mono text-xs tabular-nums text-muted-foreground/40 hidden sm:block">
              {track.plays}
            </span>
            <span className="w-12 text-right font-mono text-xs tabular-nums text-muted-foreground/50">
              {track.duration}
            </span>
            <button className="w-8 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground/50" />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
