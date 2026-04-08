"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, ExternalLink } from "lucide-react"

export default function CookieConsent04() {
  const [visible, setVisible] = useState(true)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
            className="w-full max-w-md px-4"
          >
            <div
              className="overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10"
              style={{
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)",
              }}
            >
              <div className="px-8 pt-8 pb-6 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <h2 className="font-heading text-xl font-semibold tracking-tight">
                  We value your privacy
                </h2>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  Before you continue, we need your consent to use cookies for analytics,
                  personalization, and advertising. You can change your preferences anytime.
                </p>
              </div>

              <div className="mx-8 mb-6 rounded-lg bg-muted/40 p-4 ring-1 ring-foreground/5">
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { label: "Essential", count: 4 },
                    { label: "Analytics", count: 7 },
                    { label: "Marketing", count: 12 },
                  ].map((cat) => (
                    <div key={cat.label}>
                      <p className="font-mono text-lg font-semibold tabular-nums tracking-tight">
                        {cat.count}
                      </p>
                      <p className="text-[11px] text-muted-foreground">{cat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 px-8 pb-6">
                <Button onClick={() => setVisible(false)}>
                  Accept All Cookies
                </Button>
                <Button variant="outline" onClick={() => setVisible(false)}>
                  Essential Only
                </Button>
                <button className="flex items-center justify-center gap-1.5 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground">
                  Customize preferences
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
