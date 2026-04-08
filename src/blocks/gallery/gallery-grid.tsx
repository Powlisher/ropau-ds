"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}
const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const images = [
  { title: "Morning Mist", category: "Nature", src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop" },
  { title: "Concrete Arches", category: "Architecture", src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&h=400&fit=crop" },
  { title: "Tide Pools", category: "Nature", src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop" },
  { title: "Glass Tower", category: "Architecture", src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=400&fit=crop" },
  { title: "Forest Path", category: "Nature", src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=400&fit=crop" },
  { title: "Spiral Staircase", category: "Architecture", src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=400&fit=crop" },
  { title: "Desert Dunes", category: "Nature", src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=400&fit=crop" },
  { title: "Brutalist Facade", category: "Architecture", src: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=400&h=400&fit=crop" },
  { title: "Autumn Canopy", category: "Nature", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
]

export default function GalleryGrid() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-8"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Gallery
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {images.length} photographs
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-4 md:grid-cols-3"
      >
        {images.map((img) => (
          <motion.div
            key={img.title}
            variants={itemVariants}
            whileHover={{ y: -3 }}
            transition={spring}
            className="group relative aspect-square overflow-hidden rounded-xl bg-secondary"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <img
              src={img.src}
              alt={img.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-foreground/60 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <h3 className="text-sm font-semibold text-white">{img.title}</h3>
              <Badge variant="secondary" className="mt-1 w-fit text-[10px]">
                {img.category}
              </Badge>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
