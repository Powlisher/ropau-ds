"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Settings, Check, RotateCcw } from "lucide-react"

const cookieCategories = [
  {
    id: "essential",
    label: "Essential",
    locked: true,
    description: "Session management, security, accessibility.",
    count: 4,
  },
  {
    id: "functional",
    label: "Functional",
    locked: false,
    description: "Theme, language, layout preferences.",
    count: 3,
  },
  {
    id: "analytics",
    label: "Analytics",
    locked: false,
    description: "Page views, performance metrics, error tracking.",
    count: 7,
  },
  {
    id: "marketing",
    label: "Marketing",
    locked: false,
    description: "Ad targeting, conversion tracking, retargeting pixels.",
    count: 11,
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

export default function CookieConsent10() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    essential: true,
    functional: true,
    analytics: true,
    marketing: false,
  })
  const [saved, setSaved] = useState(false)

  const lastUpdated = "Mar 12, 2026 at 3:47 PM"
  const totalAllowed = Object.values(prefs).filter(Boolean).length
  const totalCookies = cookieCategories
    .filter((c) => prefs[c.id])
    .reduce((sum, c) => sum + c.count, 0)

  function togglePref(id: string) {
    setPrefs((prev) => ({ ...prev, [id]: !prev[id] }))
    setSaved(false)
  }

  function handleSave() {
    setSaved(true)
  }

  function handleReset() {
    setPrefs({
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    })
    setSaved(false)
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md"
    >
      <motion.div
        variants={itemVariants}
        className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <div className="flex items-center gap-3 border-b px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
            <Settings className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-heading text-sm font-semibold tracking-tight">
              Cookie Preference Center
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Manage your saved cookie choices
            </p>
          </div>
        </div>

        <div className="border-b bg-muted/20 px-5 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-muted-foreground">
                Last updated
              </p>
              <p className="font-mono text-xs tabular-nums">{lastUpdated}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-muted-foreground">Active</p>
              <p className="font-mono text-xs tabular-nums">
                {totalAllowed} categories / {totalCookies} cookies
              </p>
            </div>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="divide-y px-5"
        >
          {cookieCategories.map((cat) => (
            <motion.div
              key={cat.id}
              variants={itemVariants}
              className="flex items-center gap-3 py-3.5"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-medium">{cat.label}</p>
                  <Badge
                    variant="outline"
                    className="font-mono text-[9px] tabular-nums"
                  >
                    {cat.count}
                  </Badge>
                  {cat.locked && (
                    <span className="text-[10px] text-muted-foreground">
                      Required
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {cat.description}
                </p>
              </div>
              <Switch
                checked={prefs[cat.id]}
                onCheckedChange={() => !cat.locked && togglePref(cat.id)}
                disabled={cat.locked}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="flex items-center justify-between border-t bg-muted/20 px-5 py-3.5">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <RotateCcw className="h-3 w-3" />
            Reset to minimum
          </button>
          <Button
            size="sm"
            className="gap-1.5"
            onClick={handleSave}
            disabled={saved}
          >
            {saved ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Saved
              </>
            ) : (
              "Save Preferences"
            )}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
