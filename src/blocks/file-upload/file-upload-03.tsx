"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, X, ZoomIn } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ImageFile {
  id: string
  name: string
  color: string
  aspectLabel: string
  size: string
}

const mockImages: ImageFile[] = [
  { id: "1", name: "team-photo-office.jpg", color: "bg-amber-100 dark:bg-amber-900/30", aspectLabel: "3:2", size: "2.4 MB" },
  { id: "2", name: "product-hero-v2.png", color: "bg-sky-100 dark:bg-sky-900/30", aspectLabel: "16:9", size: "5.1 MB" },
  { id: "3", name: "icon-set-preview.png", color: "bg-rose-100 dark:bg-rose-900/30", aspectLabel: "1:1", size: "890 KB" },
  { id: "4", name: "dashboard-screenshot.png", color: "bg-emerald-100 dark:bg-emerald-900/30", aspectLabel: "16:10", size: "3.7 MB" },
  { id: "5", name: "logo-dark-mode.svg", color: "bg-violet-100 dark:bg-violet-900/30", aspectLabel: "4:1", size: "12 KB" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function FileUpload03() {
  const [images, setImages] = useState(mockImages)

  const removeImage = (id: string) => setImages((prev) => prev.filter((img) => img.id !== id))

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Images</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            <span className="font-mono tabular-nums">{images.length}</span> files uploaded
          </p>
        </div>
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
          <Plus className="size-3" />
          Upload
        </Button>
      </div>

      <motion.div
        className="grid grid-cols-3 gap-2.5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {images.map((img) => (
            <motion.div
              key={img.id}
              variants={itemVariants}
              exit={{ opacity: 0, scale: 0.9 }}
              layout
              whileHover={{ y: -2 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              className="group relative overflow-hidden rounded-xl ring-1 ring-border/60"
              style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
            >
              <div className={`aspect-square ${img.color} flex items-center justify-center`}>
                <span className="text-[10px] font-mono font-medium text-foreground/30 uppercase tracking-widest">{img.aspectLabel}</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center gap-1.5 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="flex size-8 items-center justify-center rounded-lg bg-white/90 text-foreground backdrop-blur-sm hover:bg-white transition-colors">
                  <ZoomIn className="size-3.5" />
                </button>
                <button
                  onClick={() => removeImage(img.id)}
                  className="flex size-8 items-center justify-center rounded-lg bg-white/90 text-foreground backdrop-blur-sm hover:bg-white transition-colors"
                >
                  <X className="size-3.5" />
                </button>
              </div>
              <div className="bg-card px-2.5 py-2">
                <p className="truncate text-[11px] font-medium text-foreground">{img.name}</p>
                <p className="text-[10px] font-mono tabular-nums text-muted-foreground">{img.size}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.label
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
          className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/60 bg-muted/20 text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
        >
          <Plus className="size-5" />
          <span className="mt-1 text-[10px] font-medium">Add image</span>
          <input type="file" accept="image/*" multiple className="sr-only" />
        </motion.label>
      </motion.div>
    </div>
  )
}
