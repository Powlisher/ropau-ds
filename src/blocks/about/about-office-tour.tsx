"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const spaces = [
  { label: "Lyon HQ", gradient: "linear-gradient(135deg, oklch(0.92 0.02 3.6) 0%, oklch(0.88 0.03 25) 100%)", span: "col-span-2 row-span-2" },
  { label: "Engineering Floor", gradient: "linear-gradient(135deg, oklch(0.90 0.015 220) 0%, oklch(0.86 0.025 240) 100%)", span: "col-span-1" },
  { label: "Rooftop Terrace", gradient: "linear-gradient(135deg, oklch(0.93 0.015 80) 0%, oklch(0.89 0.02 60) 100%)", span: "col-span-1" },
  { label: "Design Studio", gradient: "linear-gradient(135deg, oklch(0.91 0.02 320) 0%, oklch(0.87 0.025 340) 100%)", span: "col-span-1" },
  { label: "Berlin Satellite", gradient: "linear-gradient(135deg, oklch(0.90 0.01 160) 0%, oklch(0.86 0.02 180) 100%)", span: "col-span-1" },
  { label: "Library Corner", gradient: "linear-gradient(135deg, oklch(0.92 0.008 40) 0%, oklch(0.88 0.015 60) 100%)", span: "col-span-2" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function AboutOfficeTour() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Where we work
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Spaces designed for focus, collaboration, and the occasional long lunch.
        </p>
      </div>
      <div className="grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[180px] sm:grid-cols-4 sm:gap-4">
        {spaces.map((space) => (
          <motion.div
            key={space.label}
            variants={itemVariants}
            className={`group relative overflow-hidden rounded-xl ring-1 ring-foreground/5 ${space.span}`}
            style={{
              background: space.gradient,
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(255,255,255,0.3),transparent_70%)]" />
            <div className="absolute inset-x-0 bottom-0 p-3">
              <Badge variant="secondary" className="backdrop-blur-sm">
                {space.label}
              </Badge>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
