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

const images = [
  { title: "Volcanic Coastline", src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=500&fit=crop" },
  { title: "Lavender Fields", src: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=1200&h=500&fit=crop" },
  { title: "Nordic Forest", src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&h=500&fit=crop" },
  { title: "Desert Road", src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&h=500&fit=crop" },
  { title: "Alpine Lake", src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&h=500&fit=crop" },
]

export default function GalleryCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const onSelect = () => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-8"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Carousel Gallery
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.06 }}
      >
        <Carousel
          setApi={setApi}
          opts={{ loop: true }}
          className="w-full"
        >
          <CarouselContent>
            {images.map((img) => (
              <CarouselItem key={img.title}>
                <div
                  className="relative aspect-[12/5] overflow-hidden rounded-xl bg-secondary"
                  style={{
                    boxShadow:
                      "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04)",
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/50 to-transparent p-6">
                    <h3 className="text-lg font-semibold text-white">{img.title}</h3>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="mt-4 flex justify-center gap-1.5">
          {images.map((_, i) => (
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
