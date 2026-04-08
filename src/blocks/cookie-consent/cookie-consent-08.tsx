"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie, ChevronDown } from "lucide-react"

const categories = [
  {
    id: "essential",
    label: "Essential",
    icon: "lock",
    locked: true,
    defaultOn: true,
    summary: "Core functionality, security, and fraud prevention.",
    details:
      "These cookies are required for the website to function properly. They include session identifiers, CSRF tokens, and load balancer affinity. Without them, the site cannot operate securely.",
    examples: ["__session", "__csrf", "__cf_bm"],
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: "chart",
    locked: false,
    defaultOn: false,
    summary: "Understand usage patterns and improve the product.",
    details:
      "Analytics cookies collect anonymized data about page views, scroll depth, and feature usage. We use this to identify performance bottlenecks and prioritize improvements. No personal data is shared.",
    examples: ["_ga", "_ropau_session", "_plausible"],
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: "megaphone",
    locked: false,
    defaultOn: false,
    summary: "Deliver relevant content and measure campaign reach.",
    details:
      "Marketing cookies track visits across websites to build interest profiles. This data may be shared with advertising partners to show ads relevant to you. You can opt out at any time.",
    examples: ["_fbp", "_gcl_au", "_uetmsclkid"],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function CookieConsent08() {
  const [visible, setVisible] = useState(true)
  const [prefs, setPrefs] = useState<Record<string, boolean>>(
    Object.fromEntries(categories.map((c) => [c.id, c.defaultOn]))
  )
  const [expandedId, setExpandedId] = useState<string | null>(null)

  if (!visible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      className="fixed inset-x-0 bottom-0 z-50 p-4"
    >
      <div
        className="mx-auto max-w-lg overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04)",
        }}
      >
        <div className="flex items-center gap-3 border-b px-5 py-4">
          <Cookie className="h-5 w-5 text-muted-foreground" />
          <div>
            <h3 className="font-heading text-sm font-semibold tracking-tight">
              Cookie Categories
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Tap each category to learn what data is collected.
            </p>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="divide-y"
        >
          {categories.map((cat) => {
            const isExpanded = expandedId === cat.id
            return (
              <motion.div key={cat.id} variants={itemVariants}>
                <div className="flex items-center gap-3 px-5 py-3.5">
                  <button
                    className="flex min-w-0 flex-1 items-center gap-2 text-left"
                    onClick={() => setExpandedId(isExpanded ? null : cat.id)}
                  >
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
                    >
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                    </motion.div>
                    <span className="text-[13px] font-medium">{cat.label}</span>
                    {cat.locked && (
                      <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                        Always on
                      </span>
                    )}
                  </button>
                  <Switch
                    checked={prefs[cat.id]}
                    onCheckedChange={() => {
                      if (!cat.locked) setPrefs((p) => ({ ...p, [cat.id]: !p[cat.id] }))
                    }}
                    disabled={cat.locked}
                  />
                </div>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring" as const, stiffness: 300, damping: 28 }}
                    >
                      <div className="border-t bg-muted/20 px-5 py-3 pl-11">
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          {cat.details}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {cat.examples.map((ex) => (
                            <span
                              key={ex}
                              className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-muted-foreground"
                            >
                              {ex}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="flex gap-2 border-t bg-muted/20 px-5 py-3.5">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={() => setVisible(false)}
          >
            Save Selection
          </Button>
          <Button
            size="sm"
            className="flex-1 text-xs"
            onClick={() => {
              setPrefs(Object.fromEntries(categories.map((c) => [c.id, true])))
              setVisible(false)
            }}
          >
            Accept All
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
