"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}
const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const categories = ["All", "Nature", "Architecture", "Portraits", "Abstract"]

const images = [
  { title: "Misty Peaks", category: "Nature", src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop" },
  { title: "Concrete Lines", category: "Architecture", src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&h=400&fit=crop" },
  { title: "Window Light", category: "Portraits", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
  { title: "Color Wash", category: "Abstract", src: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=400&fit=crop" },
  { title: "Forest Canopy", category: "Nature", src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=400&fit=crop" },
  { title: "Glass Ceiling", category: "Architecture", src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=400&fit=crop" },
  { title: "Studio Gaze", category: "Portraits", src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop" },
  { title: "Fluid Motion", category: "Abstract", src: "https://images.unsplash.com/photo-1567095751004-aa51a2690368?w=400&h=400&fit=crop" },
  { title: "Coastal Path", category: "Nature", src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop" },
]

export default function GalleryFilterable() {
  const [filter, setFilter] = useState("All")
  const filtered = filter === "All" ? images : images.filter((img) => img.category === filter)

  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-8"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Filterable Gallery
        </h2>
      </motion.div>

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <motion.div key={cat} whileHover={{ y: -1 }} transition={spring}>
            <Button
              variant={filter === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(cat)}
            >
              {cat}
            </Button>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={filter}
        className="grid grid-cols-2 gap-4 md:grid-cols-3"
      >
        <AnimatePresence>
          {filtered.map((img) => (
            <motion.div
              key={img.title}
              variants={itemVariants}
              layout
              whileHover={{ y: -3 }}
              transition={spring}
              className="relative aspect-square overflow-hidden rounded-xl bg-secondary"
              style={{
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
              }}
            >
              <img
                src={img.src}
                alt={img.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/50 to-transparent p-3">
                <p className="text-xs font-semibold text-white">{img.title}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
