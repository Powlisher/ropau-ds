"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function BannerSticky() {
  const [visible, setVisible] = React.useState(true)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 28 }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-background/95 backdrop-blur-sm"
          style={{
            boxShadow:
              "0 -1px 2px rgba(20,20,15,0.04), 0 -2px 4px rgba(20,20,15,0.04), 0 -4px 8px rgba(20,20,15,0.04)",
          }}
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: "67%" }}
                />
              </div>
              <span className="text-sm text-foreground/80">
                <span className="font-medium tabular-nums">67%</span> of your
                profile is complete
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm">Complete Setup</Button>
              <button
                onClick={() => setVisible(false)}
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <XIcon className="size-3.5" />
                <span className="sr-only">Dismiss</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
