"use client"

import { motion } from "framer-motion"

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
  { title: "Coastal Cliffs", src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop", tall: true },
  { title: "Urban Geometry", src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&h=300&fit=crop", tall: false },
  { title: "Wildflower Meadow", src: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400&h=350&fit=crop", tall: false },
  { title: "Bridge at Dusk", src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop", tall: false },
  { title: "Mountain Lake", src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=550&fit=crop", tall: true },
  { title: "Old Town Alley", src: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=400&h=320&fit=crop", tall: false },
  { title: "Vineyard Rows", src: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=280&fit=crop", tall: false },
  { title: "Bamboo Grove", src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=500&fit=crop", tall: true },
]

const columns = [
  images.filter((_, i) => i % 3 === 0),
  images.filter((_, i) => i % 3 === 1),
  images.filter((_, i) => i % 3 === 2),
]

export default function GalleryMasonry() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-8"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Masonry Gallery
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex gap-4"
      >
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-1 flex-col gap-4">
            {col.map((img) => (
              <motion.div
                key={img.title}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                transition={spring}
                className="group relative overflow-hidden rounded-xl bg-secondary"
                style={{
                  boxShadow:
                    "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
                }}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/50 to-transparent p-4">
                  <h3 className="text-sm font-semibold text-white">{img.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  )
}
