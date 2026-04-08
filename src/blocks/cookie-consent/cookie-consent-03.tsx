"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie } from "lucide-react"

export default function CookieConsent03() {
  const [visible, setVisible] = useState(true)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 20, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 20, y: 20 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
          className="fixed bottom-4 right-4 z-50 w-80"
        >
          <div
            className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04)",
            }}
          >
            <div className="px-5 pt-5 pb-4">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                <Cookie className="h-4.5 w-4.5 text-muted-foreground" />
              </div>
              <h3 className="font-heading text-sm font-semibold tracking-tight">
                This site uses cookies
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                We use cookies to analyze traffic and personalize content.
                You can adjust your preferences at any time.
              </p>
            </div>

            <div className="flex gap-2 border-t bg-muted/20 px-5 py-3.5">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => setVisible(false)}
              >
                Decline
              </Button>
              <Button
                size="sm"
                className="flex-1 text-xs"
                onClick={() => setVisible(false)}
              >
                Accept All
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
