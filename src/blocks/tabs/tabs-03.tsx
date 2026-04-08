"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { UserIcon, ShieldIcon, BellIcon, PaletteIcon } from "lucide-react"

const tabs = [
  { id: "profile", label: "Profile", icon: UserIcon, content: "Manage your display name, bio, and avatar. Your public profile is visible to all workspace members and appears in comments, mentions, and activity feeds." },
  { id: "security", label: "Security", icon: ShieldIcon, content: "Two-factor authentication is enabled. Last login from Paris, France on March 27 at 9:14 AM. Three active sessions across desktop and mobile devices." },
  { id: "notifications", label: "Notifications", icon: BellIcon, content: "Email digests sent weekly on Mondays. Push notifications enabled for direct mentions and assignment changes. Slack integration forwards critical alerts." },
  { id: "appearance", label: "Appearance", icon: PaletteIcon, content: "System theme detected automatically. Font size set to comfortable (16px base). Reduced motion preferences respected. Sidebar collapsed by default on narrow viewports." },
]

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function Tabs03() {
  const [active, setActive] = useState(tabs[0].id)
  const activeTab = tabs.find((t) => t.id === active)!

  return (
    <div className="flex min-h-[320px] items-start justify-center bg-muted/40 p-6 md:p-12">
      <div
        className="flex w-full max-w-2xl gap-0 overflow-hidden rounded-xl border border-border bg-card"
        style={{
          boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <div className="flex w-48 shrink-0 flex-col border-r border-border bg-muted/30 p-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`relative flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  active === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"
                }`}
              >
                {active === tab.id && (
                  <motion.div
                    layoutId="tabs-03-bg"
                    className="absolute inset-0 rounded-lg bg-card"
                    style={{
                      boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                    }}
                    transition={spring}
                  />
                )}
                <Icon className="relative z-10 size-4" />
                <span className="relative z-10 font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>

        <div className="flex-1 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={spring}
            >
              <h3 className="text-base font-semibold tracking-tight text-foreground">{activeTab.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{activeTab.content}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
