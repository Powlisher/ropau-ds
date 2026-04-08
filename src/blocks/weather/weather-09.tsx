"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CloudRainIcon, PlayIcon, PauseIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const timeline = [
  { time: "2:00 PM", intensity: 0 },
  { time: "2:15 PM", intensity: 0 },
  { time: "2:30 PM", intensity: 0.2 },
  { time: "2:45 PM", intensity: 0.4 },
  { time: "3:00 PM", intensity: 0.7 },
  { time: "3:15 PM", intensity: 0.9 },
  { time: "3:30 PM", intensity: 1.0 },
  { time: "3:45 PM", intensity: 0.8 },
  { time: "4:00 PM", intensity: 0.5 },
  { time: "4:15 PM", intensity: 0.3 },
  { time: "4:30 PM", intensity: 0.1 },
  { time: "4:45 PM", intensity: 0 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, scaleY: 0 },
  visible: { opacity: 1, scaleY: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Weather09() {
  const [activeIndex, setActiveIndex] = useState(6)
  const [playing, setPlaying] = useState(false)

  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold tracking-tight">Precipitation</CardTitle>
            <CardDescription>Rain expected 2:30 PM - 4:30 PM</CardDescription>
          </div>
          <Badge variant="secondary" className="gap-1">
            <CloudRainIcon className="size-3" />
            3.2 mm
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div
            className="relative mx-auto aspect-[2/1] w-full overflow-hidden rounded-xl bg-muted/30"
            style={{ maxWidth: 480 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {[80, 120, 160].map((r, i) => (
                  <motion.div
                    key={r}
                    className="absolute rounded-full border border-dashed"
                    style={{
                      width: r * 2,
                      height: r * 2,
                      top: -(r),
                      left: -(r),
                      borderColor: `oklch(0.60 0.15 250 / ${0.15 - i * 0.03})`,
                    }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                  />
                ))}
                <motion.div
                  className="size-4 rounded-full"
                  style={{ backgroundColor: "oklch(0.55 0.20 250)" }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
            <div className="absolute bottom-2 left-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Radar Preview
            </div>
          </div>

          <div className="flex items-end gap-1">
            <motion.div
              className="flex flex-1 items-end gap-1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ height: 56 }}
            >
              {timeline.map((t, i) => (
                <motion.button
                  key={i}
                  variants={itemVariants}
                  className="group relative flex-1 cursor-pointer rounded-t"
                  style={{
                    height: `${Math.max(t.intensity * 100, 4)}%`,
                    backgroundColor:
                      i === activeIndex
                        ? "oklch(0.55 0.20 250)"
                        : t.intensity > 0
                          ? `oklch(0.65 0.12 250 / ${0.3 + t.intensity * 0.5})`
                          : "oklch(0.90 0 0)",
                    originY: 1,
                  }}
                  whileHover={{ scaleY: 1.1 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </motion.div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[10px] tabular-nums text-muted-foreground">{timeline[0].time}</span>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={() => setPlaying(!playing)}
              >
                <AnimatePresence mode="wait">
                  {playing ? (
                    <motion.div key="pause" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <PauseIcon className="size-3.5" />
                    </motion.div>
                  ) : (
                    <motion.div key="play" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <PlayIcon className="size-3.5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
              <span className="text-xs font-medium tabular-nums text-muted-foreground">
                {timeline[activeIndex].time}
              </span>
            </div>
            <span className="text-[10px] tabular-nums text-muted-foreground">{timeline[timeline.length - 1].time}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
