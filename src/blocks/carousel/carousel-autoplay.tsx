"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

const slides = [
  { title: "Handmade with Care", src: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=400&fit=crop" },
  { title: "Naturally Sourced", src: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&h=400&fit=crop" },
  { title: "Minimal Packaging", src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=400&fit=crop" },
  { title: "Fair Trade Certified", src: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=400&fit=crop" },
]

const INTERVAL = 4000

export default function CarouselAutoplay() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const startRef = useRef(Date.now())

  useEffect(() => {
    if (!api) return
    const handler = () => {
      setCurrent(api.selectedScrollSnap())
      startRef.current = Date.now()
      setProgress(0)
    }
    api.on("select", handler)
    return () => { api.off("select", handler) }
  }, [api])

  useEffect(() => {
    if (paused || !api) return
    const tick = () => {
      const elapsed = Date.now() - startRef.current
      const pct = Math.min(elapsed / INTERVAL, 1)
      setProgress(pct)
      if (pct >= 1) {
        api.scrollNext()
      }
    }
    const id = setInterval(tick, 50)
    return () => clearInterval(id)
  }, [paused, api, current])

  return (
    <section className="mx-auto w-full max-w-2xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-8"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Auto-Advancing Carousel
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">Pauses on hover.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.06 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); startRef.current = Date.now() - progress * INTERVAL }}
      >
        <Carousel setApi={setApi} opts={{ loop: true }}>
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.title}>
                <div
                  className="relative aspect-[2/1] overflow-hidden rounded-xl bg-secondary"
                  style={{
                    boxShadow:
                      "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
                  }}
                >
                  <img src={slide.src} alt={slide.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/50 to-transparent p-6">
                    <h3 className="text-lg font-semibold text-white">{slide.title}</h3>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-4 flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 overflow-hidden rounded-full bg-muted"
            >
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{
                  width: i === current ? `${progress * 100}%` : i < current ? "100%" : "0%",
                }}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
