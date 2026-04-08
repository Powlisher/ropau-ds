"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"

const albums = [
  { title: "Glass Meridian", artist: "Nora Veil", year: "2024", gradient: "linear-gradient(135deg, oklch(0.45 0.12 280) 0%, oklch(0.30 0.08 310) 100%)" },
  { title: "Soft Machines", artist: "Pael", year: "2023", gradient: "linear-gradient(135deg, oklch(0.50 0.10 30) 0%, oklch(0.38 0.14 50) 100%)" },
  { title: "Thermal Bloom", artist: "Oake", year: "2024", gradient: "linear-gradient(135deg, oklch(0.42 0.08 160) 0%, oklch(0.30 0.12 180) 100%)" },
  { title: "Silhouette Hymns", artist: "Hana Kim", year: "2023", gradient: "linear-gradient(135deg, oklch(0.55 0.06 80) 0%, oklch(0.40 0.10 100) 100%)" },
  { title: "Neon Psalms", artist: "Gloom Theory", year: "2024", gradient: "linear-gradient(135deg, oklch(0.48 0.14 340) 0%, oklch(0.32 0.10 360) 100%)" },
  { title: "Paper Architecture", artist: "Nora Veil", year: "2022", gradient: "linear-gradient(135deg, oklch(0.40 0.04 220) 0%, oklch(0.28 0.08 250) 100%)" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Music03() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          New Releases
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Fresh albums from artists you follow</p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 gap-4"
      >
        {albums.map((album) => (
          <motion.div
            key={album.title}
            variants={itemVariants}
            whileHover={{ y: -3 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className="group cursor-pointer"
          >
            <div
              className="aspect-square rounded-xl relative overflow-hidden ring-1 ring-foreground/5"
              style={{
                background: album.gradient,
                boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(255,255,255,0.12),transparent_60%)]" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm"
                >
                  <Play className="h-5 w-5 text-neutral-900 ml-0.5" />
                </motion.div>
              </div>
            </div>
            <div className="mt-2.5 px-0.5">
              <p className="text-sm font-medium text-foreground truncate">{album.title}</p>
              <p className="text-xs text-muted-foreground/60 mt-0.5">
                {album.artist} · {album.year}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
