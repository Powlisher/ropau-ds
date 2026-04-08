"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const images = [
  { title: "Product Front", src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop" },
  { title: "Product Side", src: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=800&fit=crop" },
  { title: "Product Detail", src: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=800&fit=crop" },
  { title: "Product Lifestyle", src: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a00?w=800&h=800&fit=crop" },
  { title: "Product Flat", src: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&h=800&fit=crop" },
]

export default function CarouselThumbnail() {
  const [mainApi, setMainApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!mainApi) return
    const handler = () => setCurrent(mainApi.selectedScrollSnap())
    mainApi.on("select", handler)
    return () => { mainApi.off("select", handler) }
  }, [mainApi])

  return (
    <section className="mx-auto w-full max-w-md px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-8"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Product Gallery
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.06 }}
        className="space-y-3"
      >
        <Carousel setApi={setMainApi}>
          <CarouselContent>
            {images.map((img) => (
              <CarouselItem key={img.title}>
                <div
                  className="aspect-square overflow-hidden rounded-xl bg-secondary"
                  style={{
                    boxShadow:
                      "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
                  }}
                >
                  <img src={img.src} alt={img.title} className="h-full w-full object-cover" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="flex gap-2">
          {images.map((img, i) => (
            <motion.button
              key={img.title}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={spring}
              onClick={() => mainApi?.scrollTo(i)}
              className={`aspect-square flex-1 overflow-hidden rounded-lg ring-2 transition-all ${
                current === i ? "ring-primary" : "ring-transparent opacity-60 hover:opacity-80"
              }`}
            >
              <img src={img.src} alt={img.title} className="h-full w-full object-cover" />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
