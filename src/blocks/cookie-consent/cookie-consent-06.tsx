"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { motion } from "framer-motion"
import { Settings, X } from "lucide-react"

const cookieGroups = [
  {
    id: "essential",
    label: "Essential Cookies",
    description: "Authentication, security tokens, and session management. Always active.",
    count: 4,
    locked: true,
    defaultOn: true,
  },
  {
    id: "functional",
    label: "Functional Cookies",
    description: "Remember your preferences like theme, language, and layout choices.",
    count: 3,
    locked: false,
    defaultOn: true,
  },
  {
    id: "analytics",
    label: "Analytics Cookies",
    description: "Anonymized usage data to help us improve performance and content.",
    count: 6,
    locked: false,
    defaultOn: false,
  },
  {
    id: "marketing",
    label: "Marketing Cookies",
    description: "Track visits across sites to display relevant advertisements.",
    count: 9,
    locked: false,
    defaultOn: false,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function CookieConsent06() {
  const [open, setOpen] = useState(true)
  const [prefs, setPrefs] = useState<Record<string, boolean>>(
    Object.fromEntries(cookieGroups.map((g) => [g.id, g.defaultOn]))
  )

  function togglePref(id: string) {
    setPrefs((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  if (!open) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      className="fixed bottom-4 right-4 z-50 w-96"
    >
      <div
        className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04)",
        }}
      >
        <div className="flex items-center justify-between border-b px-5 py-3.5">
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-heading text-sm font-semibold tracking-tight">
              Cookie Settings
            </h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setOpen(false)}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="divide-y px-5"
        >
          {cookieGroups.map((group) => (
            <motion.div
              key={group.id}
              variants={itemVariants}
              className="flex items-start gap-3 py-3.5"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-medium">{group.label}</p>
                  <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-muted-foreground">
                    {group.count}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
                  {group.description}
                </p>
              </div>
              <Switch
                checked={prefs[group.id]}
                onCheckedChange={() => !group.locked && togglePref(group.id)}
                disabled={group.locked}
                className="mt-0.5 shrink-0"
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="flex gap-2 border-t bg-muted/20 px-5 py-3.5">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={() => setOpen(false)}
          >
            Save Preferences
          </Button>
          <Button
            size="sm"
            className="flex-1 text-xs"
            onClick={() => {
              setPrefs(Object.fromEntries(cookieGroups.map((g) => [g.id, true])))
              setOpen(false)
            }}
          >
            Accept All
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
