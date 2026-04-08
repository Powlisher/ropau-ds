"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel"

const slides = [
  { title: "Coastal Sunset", src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop" },
  { title: "Mountain Trail", src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop" },
  { title: "Forest Stream", src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=500&fit=crop" },
  { title: "Desert Bloom", src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=500&fit=crop" },
  { title: "Lake Reflection", src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=500&fit=crop" },
]

export default function CarouselBasic() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const onSelect = () => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
  }

  return (
    <section className="mx-auto w-full max-w-2xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-8"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Image Carousel
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.06 }}
      >
        <Carousel setApi={setApi} opts={{ loop: true }}>
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.title}>
                <div
                  className="aspect-[8/5] overflow-hidden rounded-xl bg-secondary"
                  style={{
                    boxShadow:
                      "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
                  }}
                >
                  <img src={slide.src} alt={slide.title} className="h-full w-full object-cover" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="mt-4 flex justify-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`size-2 rounded-full transition-all ${
                i === current ? "w-5 bg-primary" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
