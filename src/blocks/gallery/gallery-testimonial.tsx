"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const items = [
  {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    quote: "This image captures exactly the mood we wanted for our rebrand. The palette and composition brought our vision to life in a way we hadn't expected.",
    name: "Elise Moreau",
    role: "Creative Director, Riviera Studio",
    avatar: "EM",
  },
  {
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=400&fit=crop",
    quote: "We used this for our annual report cover. The organic textures and light quality resonated with our sustainability narrative perfectly.",
    name: "Marcus Lindqvist",
    role: "Head of Brand, Nordjord",
    avatar: "ML",
  },
  {
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=400&fit=crop",
    quote: "The level of detail in the craftsmanship shots gave our product pages an authenticity that stock photography never could. Conversion rate up 23% since launch.",
    name: "Camille Vasseur",
    role: "E-Commerce Manager, Kinto",
    avatar: "CV",
  },
]

export default function GalleryTestimonial() {
  const [active, setActive] = useState(0)
  const item = items[active]

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-8"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Client Stories
        </h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="aspect-[3/2] overflow-hidden rounded-xl bg-secondary"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04)",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-col justify-between gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <Card
                style={{
                  boxShadow:
                    "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
                }}
              >
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed text-foreground italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{item.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-2">
            {items.map((_, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1 }}
                transition={spring}
                onClick={() => setActive(i)}
                className={`size-12 overflow-hidden rounded-lg ring-2 transition-all ${
                  active === i ? "ring-primary" : "ring-transparent opacity-60"
                }`}
              >
                <img
                  src={items[i].image}
                  alt={items[i].name}
                  className="h-full w-full object-cover"
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
