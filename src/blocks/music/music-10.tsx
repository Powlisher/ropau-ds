"use client"

import { motion } from "framer-motion"
import { Search, SlidersHorizontal, Grid3X3, List, Play } from "lucide-react"
import { useState } from "react"

const filters = ["All", "Albums", "Singles", "Playlists", "Podcasts"]

const library = [
  { title: "Glass Meridian", artist: "Nora Veil", type: "Album", tracks: 12, gradient: "linear-gradient(135deg, oklch(0.45 0.12 280), oklch(0.30 0.08 310))" },
  { title: "Late Night Frequencies", artist: "Various", type: "Playlist", tracks: 47, gradient: "linear-gradient(135deg, oklch(0.45 0.08 200), oklch(0.35 0.12 240))" },
  { title: "Soft Machines", artist: "Pael", type: "Album", tracks: 9, gradient: "linear-gradient(135deg, oklch(0.50 0.10 30), oklch(0.38 0.14 50))" },
  { title: "Sound Structures", artist: "Elise Moreau", type: "Podcast", tracks: 38, gradient: "linear-gradient(135deg, oklch(0.50 0.06 50), oklch(0.38 0.08 30))" },
  { title: "Dissolve - Single", artist: "Pael", type: "Single", tracks: 1, gradient: "linear-gradient(135deg, oklch(0.48 0.14 340), oklch(0.32 0.10 360))" },
  { title: "Thermal Bloom", artist: "Oake", type: "Album", tracks: 8, gradient: "linear-gradient(135deg, oklch(0.42 0.08 160), oklch(0.30 0.12 180))" },
  { title: "Focus Flow", artist: "Various", type: "Playlist", tracks: 92, gradient: "linear-gradient(135deg, oklch(0.55 0.06 80), oklch(0.40 0.10 100))" },
  { title: "Neon Psalms", artist: "Gloom Theory", type: "Album", tracks: 11, gradient: "linear-gradient(135deg, oklch(0.40 0.04 220), oklch(0.28 0.08 250))" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Music10() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filtered = activeFilter === "All"
    ? library
    : library.filter((item) => item.type === activeFilter.replace(/s$/, ""))

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full">
      <motion.div variants={itemVariants} className="flex items-center justify-between mb-5">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Your Library
        </h2>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-muted text-foreground" : "text-muted-foreground/40 hover:text-foreground"}`}
          >
            <Grid3X3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-muted text-foreground" : "text-muted-foreground/40 hover:text-foreground"}`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="flex items-center gap-2 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
          <input
            type="text"
            placeholder="Search your library..."
            className="w-full rounded-xl bg-muted/50 border-0 py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground/40 ring-1 ring-foreground/5 focus:outline-none focus:ring-2 focus:ring-foreground/10"
          />
        </div>
        <button className="p-2.5 rounded-xl bg-muted/50 ring-1 ring-foreground/5 text-muted-foreground/50 hover:text-foreground transition-colors">
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      </motion.div>

      <motion.div variants={itemVariants} className="flex items-center gap-1.5 mb-5 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeFilter === f
                ? "bg-foreground text-background"
                : "bg-muted/50 text-muted-foreground hover:text-foreground ring-1 ring-foreground/5"
            }`}
          >
            {f}
          </button>
        ))}
      </motion.div>

      {viewMode === "grid" ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {filtered.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              className="group cursor-pointer"
            >
              <div
                className="aspect-square rounded-xl relative overflow-hidden ring-1 ring-foreground/5"
                style={{
                  background: item.gradient,
                  boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                  <Play className="h-8 w-8 text-white/90 ml-0.5" />
                </div>
              </div>
              <p className="text-sm font-medium text-foreground mt-2 truncate">{item.title}</p>
              <p className="text-xs text-muted-foreground/50">{item.type} · {item.artist}</p>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="space-y-0.5">
          {filtered.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
              className="group flex items-center gap-3 rounded-lg px-2 py-2.5 cursor-pointer transition-colors"
            >
              <div
                className="h-10 w-10 shrink-0 rounded-lg ring-1 ring-foreground/5 flex items-center justify-center"
                style={{ background: item.gradient }}
              >
                <Play className="h-3.5 w-3.5 text-white/40 ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                <p className="text-xs text-muted-foreground/60">{item.artist}</p>
              </div>
              <span className="text-[10px] font-medium text-muted-foreground/30 uppercase tracking-wide">{item.type}</span>
              <span className="font-mono text-xs tabular-nums text-muted-foreground/30">{item.tracks} tracks</span>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
