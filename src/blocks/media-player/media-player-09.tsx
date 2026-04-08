"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { motion } from "framer-motion"
import { Play, Pause, Subtitles, Settings, Maximize } from "lucide-react"

const captionLines = [
  "And that is exactly why constraints",
  "produce better outcomes than freedom.",
]

export default function MediaPlayer09() {
  const [playing, setPlaying] = useState(true)
  const [progress, setProgress] = useState([71])
  const [captionsOn, setCaptionsOn] = useState(true)
  const [showSettings, setShowSettings] = useState(false)

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
            <p className="font-heading text-lg font-semibold tracking-tight text-white/80">
              Design Principles Talk
            </p>
          </div>

          {captionsOn && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              className="absolute inset-x-0 bottom-16 flex flex-col items-center gap-0.5 px-8"
            >
              {captionLines.map((line, i) => (
                <span
                  key={i}
                  className="rounded bg-black/70 px-3 py-1 text-sm leading-relaxed text-white/95"
                >
                  {line}
                </span>
              ))}
            </motion.div>
          )}

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-4 pt-8">
            <Slider
              value={progress}
              onValueChange={(val) => setProgress(val as number[])}
              max={100}
              step={1}
              className="h-1"
            />
            <div className="mt-1.5 flex justify-between">
              <span className="font-mono text-[11px] tabular-nums tracking-wide text-white/60">
                31:42
              </span>
              <span className="font-mono text-[11px] tabular-nums tracking-wide text-white/60">
                44:38
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <motion.div whileTap={{ scale: 0.92 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 text-white hover:bg-white/10"
                    onClick={() => setPlaying(!playing)}
                  >
                    {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                </motion.div>
              </div>

              <div className="flex items-center gap-1">
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-9 w-9 hover:bg-white/10 ${
                      captionsOn ? "text-white" : "text-white/40"
                    }`}
                    onClick={() => setCaptionsOn(!captionsOn)}
                  >
                    <Subtitles className="h-4 w-4" />
                    {captionsOn && (
                      <div className="absolute -bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-white" />
                    )}
                  </Button>
                </div>
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-white/80 hover:bg-white/10 hover:text-white"
                    onClick={() => setShowSettings(!showSettings)}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>

                  {showSettings && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                      className="absolute bottom-full right-0 mb-2 w-56 rounded-lg bg-slate-800 p-3 ring-1 ring-white/10"
                      style={{
                        boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                      }}
                    >
                      <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-white/50">
                        Subtitles
                      </p>
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/80">Show captions</span>
                          <Switch
                            checked={captionsOn}
                            onCheckedChange={setCaptionsOn}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/80">Language</span>
                          <span className="text-xs text-white/50">English</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/80">Font size</span>
                          <span className="text-xs text-white/50">Medium</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
