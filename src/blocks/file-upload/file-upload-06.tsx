"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Camera, RotateCcw, ZoomIn, ZoomOut, Check } from "lucide-react"
import { motion } from "framer-motion"

export default function FileUpload06() {
  const [hasImage, setHasImage] = useState(true)
  const [zoom, setZoom] = useState(1.2)

  return (
    <div className="mx-auto max-w-xs">
      <div className="mb-4 text-center">
        <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Profile Picture</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Crop and adjust your avatar</p>
      </div>

      <div
        className="rounded-xl bg-card px-5 py-5 ring-1 ring-border/60"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
      >
        <div className="flex flex-col items-center">
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              className="relative size-40 overflow-hidden rounded-full ring-2 ring-border/40 ring-offset-2 ring-offset-card"
            >
              {hasImage ? (
                <div
                  className="size-full bg-gradient-to-br from-amber-200 via-rose-200 to-violet-200 dark:from-amber-900/40 dark:via-rose-900/40 dark:to-violet-900/40"
                  style={{ transform: `scale(${zoom})` }}
                />
              ) : (
                <div className="flex size-full items-center justify-center bg-muted">
                  <Camera className="size-8 text-muted-foreground/40" />
                </div>
              )}
            </motion.div>
            {!hasImage && (
              <label className="absolute -bottom-1 -right-1 flex size-10 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-card hover:bg-primary/90 transition-colors">
                <Camera className="size-4" />
                <input type="file" accept="image/*" className="sr-only" onChange={() => setHasImage(true)} />
              </label>
            )}
          </div>

          {hasImage && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 24, delay: 0.1 }}
              className="mt-5 w-full space-y-4"
            >
              <div className="flex items-center gap-3">
                <ZoomOut className="size-3.5 shrink-0 text-muted-foreground" />
                <div className="relative flex-1">
                  <input
                    type="range"
                    min={1}
                    max={2}
                    step={0.05}
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>
                <ZoomIn className="size-3.5 shrink-0 text-muted-foreground" />
                <span className="text-[11px] font-mono tabular-nums text-muted-foreground w-8 text-right">
                  {Math.round(zoom * 100)}%
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-8 gap-1.5 text-xs"
                  onClick={() => { setHasImage(false); setZoom(1.2) }}
                >
                  <RotateCcw className="size-3" />
                  Remove
                </Button>
                <Button size="sm" className="flex-1 h-8 gap-1.5 text-xs">
                  <Check className="size-3" />
                  Save
                </Button>
              </div>
            </motion.div>
          )}

          {!hasImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center"
            >
              <p className="text-xs text-muted-foreground">JPG, PNG or WebP. Max 4 MB.</p>
              <label className="mt-3 block">
                <Button className="w-full gap-2" render={<span />}>
                    <Camera className="size-3.5" />
                    Choose photo
                </Button>
                <input type="file" accept="image/*" className="sr-only" onChange={() => setHasImage(true)} />
              </label>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
