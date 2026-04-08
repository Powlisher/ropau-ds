"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export default function BannerCookie() {
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
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-4 sm:flex-row sm:items-center lg:px-8">
            <div className="max-w-xl">
              <p className="text-sm font-medium text-foreground">
                Cookie preferences
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                We use essential cookies for site functionality and optional cookies to personalize content and ads, provide social features, and analyze traffic.
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setVisible(false)}
              >
                Customize
              </Button>
              <Button size="sm" onClick={() => setVisible(false)}>
                Accept All
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
