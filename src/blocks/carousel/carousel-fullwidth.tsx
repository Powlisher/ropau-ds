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
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const slides = [
  {
    title: "Spring Collection 2026",
    subtitle: "Natural textures, effortless silhouettes",
    cta: "Shop Now",
    src: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=1400&h=600&fit=crop",
  },
  {
    title: "Handcrafted in Portugal",
    subtitle: "Every piece tells a story of tradition and craft",
    cta: "Discover",
    src: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1400&h=600&fit=crop",
  },
  {
    title: "Free Shipping Worldwide",
    subtitle: "On orders over $150, delivered in 3-7 days",
    cta: "Learn More",
    src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1400&h=600&fit=crop",
  },
]

export default function CarouselFullwidth() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const onSelect = () => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
  }

  return (
    <section className="w-full py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.title}>
                <div className="relative aspect-[7/3] w-full overflow-hidden bg-secondary md:aspect-[12/5]">
                  <img
                    src={slide.src}
                    alt={slide.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
                    <Badge variant="secondary" className="mb-3 w-fit text-[10px]">
                      Featured
                    </Badge>
                    <h2 className="font-heading text-2xl font-bold tracking-tight text-white md:text-4xl">
                      {slide.title}
                    </h2>
                    <p className="mt-2 max-w-md text-sm text-white/80 md:text-base">
                      {slide.subtitle}
                    </p>
                    <motion.div whileHover={{ y: -1 }} transition={spring} className="mt-5">
                      <Button
                        size="lg"
                        className="bg-white text-foreground hover:bg-white/90"
                      >
                        {slide.cta}
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute right-8 bottom-6 flex gap-2 md:right-16">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
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
