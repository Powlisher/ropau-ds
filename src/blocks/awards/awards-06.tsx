"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrophyIcon, CalendarIcon, SparklesIcon } from "lucide-react"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

function ConfettiDots() {
  const dots = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 4 + Math.random() * 8,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 4,
        color: [
          "bg-amber-400/30",
          "bg-primary/20",
          "bg-emerald-400/25",
          "bg-sky-400/20",
          "bg-rose-400/20",
          "bg-violet-400/20",
        ][i % 6],
      })),
    []
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className={`absolute rounded-full ${dot.color}`}
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            delay: dot.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export default function Awards06() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/8 via-primary/5 to-transparent ring-1 ring-amber-500/15"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)",
        }}
      >
        <ConfettiDots />
        <div className="relative px-8 py-14 text-center sm:px-16 sm:py-20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring" as const, stiffness: 200, damping: 20, delay: 0.1 }}
            className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-amber-500/15"
          >
            <TrophyIcon className="size-8 text-amber-600" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 24, delay: 0.2 }}
          >
            <Badge className="mb-4 bg-amber-500/10 text-amber-700 hover:bg-amber-500/10">
              <SparklesIcon className="mr-1 size-3" />
              Annual Awards 2026
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 24, delay: 0.3 }}
            className="mx-auto max-w-xl font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            The Luminary Awards Ceremony
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 24, delay: 0.4 }}
            className="mx-auto mt-4 max-w-lg text-base text-muted-foreground"
          >
            Join us in celebrating the people who defined our year. Seven categories,
            one unforgettable evening.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 24, delay: 0.5 }}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <motion.div whileHover={{ y: -2 }} transition={spring}>
              <Button size="lg" className="gap-2">
                Reserve Your Seat
              </Button>
            </motion.div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarIcon className="size-4" />
              <span>May 17, 2026 at 7:00 PM</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
