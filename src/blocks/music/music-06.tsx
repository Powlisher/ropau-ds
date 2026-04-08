"use client"

import { motion } from "framer-motion"
import { Play, UserPlus, ExternalLink } from "lucide-react"

const artist = {
  name: "Nora Veil",
  listeners: "1.4M monthly listeners",
  bio: "Berlin-based electronic artist blending ambient textures with post-minimal composition. Known for immersive live performances and collaborations with visual artists.",
  gradient: "linear-gradient(135deg, oklch(0.38 0.14 280) 0%, oklch(0.28 0.10 320) 100%)",
  topTracks: [
    { title: "Midnight Architecture", plays: "12.8M", duration: "4:07" },
    { title: "Paper Lanterns", plays: "9.3M", duration: "4:31" },
    { title: "Fold", plays: "7.1M", duration: "3:48" },
    { title: "Glass Hour", plays: "5.6M", duration: "5:22" },
    { title: "Quiet Machines", plays: "4.2M", duration: "3:35" },
  ],
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Music06() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-md mx-auto">
      <motion.div variants={itemVariants} className="relative">
        <div
          className="h-40 w-full rounded-2xl overflow-hidden ring-1 ring-foreground/5"
          style={{
            background: artist.gradient,
            boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_30%,rgba(255,255,255,0.1),transparent_60%)]" />
        </div>

        <div className="px-5 -mt-6 relative z-10">
          <div
            className="h-16 w-16 rounded-full ring-4 ring-card flex items-center justify-center text-lg font-heading font-bold text-white/80"
            style={{ background: "linear-gradient(135deg, oklch(0.42 0.10 280), oklch(0.35 0.14 310))" }}
          >
            NV
          </div>
        </div>
      </motion.div>

      <div className="px-5 mt-3 space-y-4">
        <motion.div variants={itemVariants}>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">
                {artist.name}
              </h2>
              <p className="font-mono text-xs tabular-nums text-muted-foreground/60 mt-0.5">
                {artist.listeners}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              className="flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background"
            >
              <UserPlus className="h-3.5 w-3.5" />
              Follow
            </motion.button>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mt-2.5">{artist.bio}</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-muted-foreground/50 mb-2.5">
            Popular
          </h3>
          <div className="space-y-0.5">
            {artist.topTracks.map((track, i) => (
              <motion.div
                key={track.title}
                variants={itemVariants}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                className="group flex items-center gap-3 rounded-lg px-2 py-2 transition-colors"
              >
                <span className="w-5 text-center font-mono text-xs tabular-nums text-muted-foreground/30 group-hover:hidden">
                  {i + 1}
                </span>
                <span className="w-5 text-center hidden group-hover:flex items-center justify-center">
                  <Play className="h-3 w-3 text-foreground" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{track.title}</p>
                </div>
                <span className="font-mono text-xs tabular-nums text-muted-foreground/40">{track.plays}</span>
                <span className="font-mono text-xs tabular-nums text-muted-foreground/30">{track.duration}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="pt-1">
          <button className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
            View full discography
            <ExternalLink className="h-3 w-3" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}
