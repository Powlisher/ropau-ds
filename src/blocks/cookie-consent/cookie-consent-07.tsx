"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, ExternalLink } from "lucide-react"

export default function CookieConsent07() {
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
            className="mx-auto max-w-2xl overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04)",
            }}
          >
            <div className="flex items-start gap-4 px-6 py-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-heading text-sm font-semibold tracking-tight">
                  Your Privacy Matters
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  We use cookies and similar technologies to provide, protect, and improve our services.
                  We process personal data as described in our{" "}
                  <button className="inline-flex items-center gap-0.5 font-medium text-foreground underline underline-offset-2">
                    Privacy Policy
                    <ExternalLink className="h-2.5 w-2.5" />
                  </button>
                  . Under the GDPR, you have the right to consent to or reject non-essential cookies.
                </p>
                <p className="mt-2 text-[11px] text-muted-foreground/70">
                  Data controller: Ropau SAS, 14 rue de Bretagne, 75003 Paris.
                  Contact DPO: privacy@ropau.dev
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t bg-muted/20 px-6 py-3.5">
              <button className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground">
                Manage preferences
              </button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setVisible(false)}
                >
                  Reject Non-Essential
                </Button>
                <Button size="sm" onClick={() => setVisible(false)}>
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
