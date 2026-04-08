"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie, Shield } from "lucide-react"

const categories = [
  {
    id: "necessary",
    label: "Strictly Necessary",
    description: "Required for the site to function. Cannot be disabled.",
    locked: true,
    defaultOn: true,
  },
  {
    id: "analytics",
    label: "Analytics",
    description: "Help us understand how visitors interact with the site.",
    locked: false,
    defaultOn: false,
  },
  {
    id: "marketing",
    label: "Marketing",
    description: "Used to deliver relevant ads and measure campaign performance.",
    locked: false,
    defaultOn: false,
  },
  {
    id: "preferences",
    label: "Preferences",
    description: "Remember your settings like language, region, and theme.",
    locked: false,
    defaultOn: true,
  },
]

export default function CookieConsent02() {
  const [visible, setVisible] = useState(true)
  const [prefs, setPrefs] = useState<Record<string, boolean>>(
    Object.fromEntries(categories.map((c) => [c.id, c.defaultOn]))
  )

  function togglePref(id: string) {
    setPrefs((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40"
            onClick={() => setVisible(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="w-full max-w-md overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
              style={{
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b px-6 py-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold tracking-tight">
                    Cookie Preferences
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Choose which cookies you allow us to use.
                  </p>
                </div>
              </div>

              <div className="divide-y px-6">
                {categories.map((cat) => (
                  <div key={cat.id} className="flex items-start gap-4 py-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{cat.label}</p>
                        {cat.locked && (
                          <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {cat.description}
                      </p>
                    </div>
                    <Switch
                      checked={prefs[cat.id]}
                      onCheckedChange={() => !cat.locked && togglePref(cat.id)}
                      disabled={cat.locked}
                      className="mt-0.5"
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t bg-muted/20 px-6 py-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground"
                  onClick={() => {
                    setPrefs(
                      Object.fromEntries(
                        categories.map((c) => [c.id, c.locked ? true : false])
                      )
                    )
                    setVisible(false)
                  }}
                >
                  Reject All
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setVisible(false)}
                  >
                    Save Preferences
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setPrefs(
                        Object.fromEntries(
                          categories.map((c) => [c.id, true])
                        )
                      )
                      setVisible(false)
                    }}
                  >
                    Accept All
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
