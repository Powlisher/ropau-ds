"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon, ImageIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const images = [
  { id: 1, alt: "Dashboard wireframe — desktop viewport", color: "from-primary/20 to-primary/5" },
  { id: 2, alt: "Mobile navigation flow — 390px breakpoint", color: "from-accent/20 to-accent/5" },
  { id: 3, alt: "Component library — button variants matrix", color: "from-emerald-500/20 to-emerald-500/5" },
  { id: 4, alt: "User research synthesis — affinity map", color: "from-amber-500/20 to-amber-500/5" },
]

export default function DialogImagePreview() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  function navigate(dir: -1 | 1) {
    setDirection(dir)
    setCurrentIndex((prev) => (prev + dir + images.length) % images.length)
  }

  const current = images[currentIndex]

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          Preview images
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl" showCloseButton>
          <div className="relative overflow-hidden rounded-lg">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className={`flex aspect-[16/10] items-center justify-center rounded-lg bg-gradient-to-br ${current.color}`}
              >
                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                  <ImageIcon className="size-12 opacity-40" />
                  <p className="max-w-xs text-center text-sm">{current.alt}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate(-1)}
              className="absolute top-1/2 left-3 z-10 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            >
              <ChevronLeftIcon />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate(1)}
              className="absolute top-1/2 right-3 z-10 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            >
              <ChevronRightIcon />
            </Button>
          </div>

          <div className="flex items-center justify-between px-1">
            <p className="text-sm text-muted-foreground">{current.alt}</p>
            <p className="text-xs tabular-nums text-muted-foreground">
              {currentIndex + 1} / {images.length}
            </p>
          </div>

          <div className="flex justify-center gap-1.5">
            {images.map((img, i) => (
              <button
                key={img.id}
                onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i) }}
                className={`size-2 rounded-full transition-all ${
                  i === currentIndex ? "scale-125 bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
