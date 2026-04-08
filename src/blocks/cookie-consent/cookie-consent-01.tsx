"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie, X } from "lucide-react"

export default function CookieConsent01() {
  const [visible, setVisible] = useState(true)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
          className="fixed inset-x-0 bottom-0 z-50 p-4"
        >
          <div
            className="mx-auto flex max-w-3xl items-center gap-4 rounded-xl bg-card px-5 py-4 ring-1 ring-foreground/10"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04)",
            }}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Cookie className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm leading-relaxed text-foreground/80">
                We use cookies to measure site usage and improve your experience.
                By continuing, you agree to our{" "}
                <button className="font-medium text-foreground underline underline-offset-2">
                  privacy policy
                </button>
                .
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setVisible(false)}
              >
                Reject
              </Button>
              <Button size="sm" onClick={() => setVisible(false)}>
                Accept
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 text-muted-foreground"
              onClick={() => setVisible(false)}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
