"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Volume2, VolumeX, Maximize, MessageCircle, Users, Radio } from "lucide-react"

export default function MediaPlayer08() {
  const [muted, setMuted] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      className="mx-auto w-full max-w-2xl"
    >
      <div
        className="overflow-hidden rounded-xl bg-slate-950 ring-1 ring-white/10"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="font-heading text-xl font-bold tracking-tight text-white/90">
                Config Europe 2026
              </p>
              <p className="mt-1 text-sm text-white/50">
                Main Stage — Keynote
              </p>
            </div>
          </div>

          <div className="absolute left-3 top-3 flex items-center gap-2">
            <Badge className="gap-1.5 bg-red-600/90 text-white hover:bg-red-600/90">
              <motion.div
                className="h-1.5 w-1.5 rounded-full bg-white"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              LIVE
            </Badge>
            <div className="flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1">
              <Users className="h-3 w-3 text-white/70" />
              <span className="font-mono text-[11px] tabular-nums text-white/70">
                14,283
              </span>
            </div>
          </div>

          <div className="absolute left-3 bottom-3 flex items-center gap-1.5">
            <div className="flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1">
              <Radio className="h-3 w-3 text-red-400" />
              <span className="font-mono text-[10px] tabular-nums uppercase tracking-wider text-white/60">
                1080p 60fps
              </span>
            </div>
          </div>

          <div className="absolute right-3 bottom-3 flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 bg-black/30 text-white/80 hover:bg-black/50 hover:text-white"
              onClick={() => setMuted(!muted)}
            >
              {muted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 bg-black/30 text-white/80 hover:bg-black/50 hover:text-white"
              onClick={() => setChatOpen(!chatOpen)}
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 bg-black/30 text-white/80 hover:bg-black/50 hover:text-white"
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/5 bg-slate-900/80 px-5 py-3">
          <div>
            <p className="font-heading text-sm font-medium tracking-tight text-white/90">
              Config Europe 2026 — Day 1 Keynote
            </p>
            <p className="mt-0.5 text-xs text-white/40">
              Started 47 minutes ago
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-1.5">
              {["EM", "AT", "KL", "SR"].map((initials, i) => (
                <motion.div
                  key={initials}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: "spring" as const,
                    stiffness: 300,
                    damping: 24,
                    delay: i * 0.05,
                  }}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-700 text-[9px] font-medium text-white/80 ring-2 ring-slate-900"
                >
                  {initials}
                </motion.div>
              ))}
            </div>
            <span className="text-[11px] text-white/40">+2.1k watching</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
