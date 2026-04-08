"use client"

import * as React from "react"
import { XIcon, StarIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function BannerSurvey() {
  const [visible, setVisible] = React.useState(true)
  const [selected, setSelected] = React.useState<number | null>(null)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 28 }}
          className="relative overflow-hidden border-b border-border/60 bg-muted/40"
        >
          <div className="mx-auto flex h-11 max-w-6xl items-center justify-center gap-3 px-10 text-sm">
            <span className="text-foreground/70">
              Rate your experience
            </span>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => {
                    setSelected(star)
                    setTimeout(() => setVisible(false), 600)
                  }}
                  className="rounded-md p-1 transition-colors hover:bg-muted"
                >
                  <StarIcon
                    className="size-4 transition-colors"
                    style={{
                      color:
                        selected !== null && star <= selected
                          ? "oklch(0.75 0.15 65)"
                          : undefined,
                      fill:
                        selected !== null && star <= selected
                          ? "oklch(0.75 0.15 65)"
                          : "transparent",
                    }}
                    strokeWidth={selected !== null && star <= selected ? 0 : 1.5}
                  />
                </button>
              ))}
            </div>
            {selected && (
              <motion.span
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs text-muted-foreground"
              >
                Thanks for your feedback!
              </motion.span>
            )}
          </div>
          <button
            onClick={() => setVisible(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground/60 transition-colors hover:text-foreground"
          >
            <XIcon className="size-3.5" />
            <span className="sr-only">Dismiss</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
