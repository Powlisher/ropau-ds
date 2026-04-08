"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const beforeSrc = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop&sat=-100"
const afterSrc = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop"

export default function GalleryBeforeAfter() {
  const [position, setPosition] = useState(50)

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-8 text-center"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Before & After
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Drag the slider to compare.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.06 }}
        className="relative aspect-[8/5] overflow-hidden rounded-xl"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04)",
        }}
      >
        <img
          src={afterSrc}
          alt="After"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <img
            src={beforeSrc}
            alt="Before"
            className="h-full object-cover"
            style={{ width: `${100 / (position / 100)}%`, maxWidth: "none" }}
          />
        </div>
        <div
          className="absolute inset-y-0"
          style={{ left: `${position}%` }}
        >
          <div className="relative flex h-full -translate-x-1/2 flex-col items-center">
            <div className="h-full w-0.5 bg-white/80" />
            <input
              type="range"
              min="5"
              max="95"
              value={position}
              onChange={(e) => setPosition(Number(e.target.value))}
              className="absolute inset-0 cursor-ew-resize opacity-0"
              style={{ width: "100vw", marginLeft: "-50vw" }}
            />
            <div className="absolute top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white ring-2 ring-white/50">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-foreground">
                <path d="M5 3L2 8L5 13M11 3L14 8L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        <div className="absolute top-4 left-4 rounded-md bg-foreground/60 px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm">
          Before
        </div>
        <div className="absolute top-4 right-4 rounded-md bg-foreground/60 px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm">
          After
        </div>
      </motion.div>
    </section>
  )
}
