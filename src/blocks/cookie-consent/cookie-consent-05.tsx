"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export default function CookieConsent05() {
  const [visible, setVisible] = useState(true)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
          className="fixed inset-x-0 top-0 z-50"
        >
          <div className="border-b bg-card/95 backdrop-blur-sm">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-2.5">
              <p className="text-xs text-muted-foreground">
                This site uses cookies for analytics.{" "}
                <button className="font-medium text-foreground underline underline-offset-2">
                  Learn more
                </button>
              </p>
              <div className="flex shrink-0 items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-muted-foreground"
                  onClick={() => setVisible(false)}
                >
                  Decline
                </Button>
                <Button
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setVisible(false)}
                >
                  Got it
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
