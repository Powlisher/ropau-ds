"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

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
  { title: "Golden Hour", src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop" },
  { title: "Arctic Fjord", src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop" },
  { title: "Terraced Fields", src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop" },
  { title: "Sandstone Canyon", src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop" },
  { title: "Coastal Walk", src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop" },
  { title: "Autumn Bridge", src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop" },
]

export default function GalleryLightbox() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(0)

  const openAt = (i: number) => { setCurrent(i); setOpen(true) }
  const prev = () => setCurrent((c) => (c > 0 ? c - 1 : images.length - 1))
  const next = () => setCurrent((c) => (c < images.length - 1 ? c + 1 : 0))

  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-8"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Lightbox Gallery
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">Click any image to enlarge.</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-4 md:grid-cols-3"
      >
        {images.map((img, i) => (
          <motion.button
            key={img.title}
            variants={itemVariants}
            whileHover={{ y: -3 }}
            transition={spring}
            onClick={() => openAt(i)}
            className="relative aspect-[4/3] overflow-hidden rounded-xl bg-secondary"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <img
              src={img.src}
              alt={img.title}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </motion.button>
        ))}
      </motion.div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogTitle className="sr-only">{images[current]?.title}</DialogTitle>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={images[current]?.src}
                alt={images[current]?.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full rounded-lg object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-y-0 left-0 flex items-center pl-2">
              <Button variant="secondary" size="icon-sm" className="rounded-full" onClick={prev}>
                <ChevronLeftIcon className="size-4" />
              </Button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <Button variant="secondary" size="icon-sm" className="rounded-full" onClick={next}>
                <ChevronRightIcon className="size-4" />
              </Button>
            </div>
          </div>
          <p className="text-center text-sm font-semibold text-foreground">
            {images[current]?.title}
            <span className="ml-2 font-mono text-xs tabular-nums text-muted-foreground">
              {current + 1} / {images.length}
            </span>
          </p>
        </DialogContent>
      </Dialog>
    </section>
  )
}
