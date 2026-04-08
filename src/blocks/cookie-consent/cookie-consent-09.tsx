"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie } from "lucide-react"

export default function CookieConsent09() {
  const [visible, setVisible] = useState(true)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring" as const, stiffness: 280, damping: 26 }}
          className="fixed inset-x-0 bottom-0 z-50"
        >
          <div
            className="border-t bg-card"
            style={{
              boxShadow:
                "0 -1px 2px rgba(20,20,15,0.04), 0 -2px 4px rgba(20,20,15,0.04), 0 -4px 8px rgba(20,20,15,0.04), 0 -8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <div className="mx-auto flex max-w-4xl items-start gap-5 px-6 py-5 sm:items-center">
              <motion.div
                initial={{ rotate: -20, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  type: "spring" as const,
                  stiffness: 400,
                  damping: 20,
                  delay: 0.15,
                }}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted"
              >
                <Cookie className="h-5 w-5 text-muted-foreground" />
              </motion.div>

              <div className="min-w-0 flex-1">
                <motion.h3
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: "spring" as const,
                    stiffness: 300,
                    damping: 24,
                    delay: 0.1,
                  }}
                  className="font-heading text-sm font-semibold tracking-tight"
                >
                  Cookie Notice
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: "spring" as const,
                    stiffness: 300,
                    damping: 24,
                    delay: 0.15,
                  }}
                  className="mt-1 text-xs leading-relaxed text-muted-foreground"
                >
                  We use essential cookies for core functionality and optional cookies to enhance
                  your experience. Read our{" "}
                  <button className="font-medium text-foreground underline underline-offset-2">
                    cookie policy
                  </button>{" "}
                  for details.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring" as const,
                  stiffness: 300,
                  damping: 24,
                  delay: 0.2,
                }}
                className="flex shrink-0 flex-col gap-2 sm:flex-row"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground"
                  onClick={() => setVisible(false)}
                >
                  Customize
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setVisible(false)}
                >
                  Reject
                </Button>
                <Button
                  size="sm"
                  className="text-xs"
                  onClick={() => setVisible(false)}
                >
                  Accept
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
