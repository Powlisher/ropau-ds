"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { XIcon, PlusIcon } from "lucide-react"

const initialTabs = [
  { id: "welcome", label: "Welcome", closeable: false, content: "Your workspace home. Pin important documents, track recent activity, and jump back into ongoing conversations." },
  { id: "api-docs", label: "API Docs", closeable: true, content: "RESTful API documentation covering 47 endpoints across authentication, resources, webhooks, and batch operations." },
  { id: "changelog", label: "Changelog", closeable: true, content: "Version 3.8.2 shipped March 25 with 12 bug fixes and 3 performance improvements. Breaking changes flagged in the migration guide." },
  { id: "billing", label: "Billing", closeable: true, content: "Current plan: Team Pro at $29/seat/month. 14 seats active. Next invoice on April 1 for $406. No overages detected." },
]

let nextId = 5

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function Tabs07() {
  const [tabs, setTabs] = useState(initialTabs)
  const [active, setActive] = useState(initialTabs[0].id)

  function closeTab(id: string) {
    const newTabs = tabs.filter((t) => t.id !== id)
    if (active === id && newTabs.length > 0) {
      setActive(newTabs[0].id)
    }
    setTabs(newTabs)
  }

  function addTab() {
    const id = `tab-${nextId++}`
    const newTab = { id, label: `New Tab`, closeable: true, content: "A blank workspace tab. Start typing or drop a file to get started." }
    setTabs([...tabs, newTab])
    setActive(id)
  }

  const activeTab = tabs.find((t) => t.id === active)

  return (
    <div className="flex min-h-[260px] items-start justify-center bg-muted/40 p-6 md:p-12">
      <div className="w-full max-w-lg">
        <div className="flex items-end border-b border-border">
          <div className="flex flex-1 gap-0 overflow-x-auto">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                layout
                onClick={() => setActive(tab.id)}
                className={`group relative flex shrink-0 items-center gap-1.5 px-3 py-2.5 text-sm font-medium transition-colors ${
                  active === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"
                }`}
                transition={spring}
              >
                <span>{tab.label}</span>
                {tab.closeable && (
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => { e.stopPropagation(); closeTab(tab.id) }}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); closeTab(tab.id) } }}
                    className="flex size-4 items-center justify-center rounded opacity-0 transition-opacity hover:bg-muted group-hover:opacity-100"
                    aria-label={`Close ${tab.label}`}
                  >
                    <XIcon className="size-3" />
                  </span>
                )}
                {active === tab.id && (
                  <motion.div
                    layoutId="tabs-07-indicator"
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-foreground"
                    transition={spring}
                  />
                )}
              </motion.button>
            ))}
          </div>
          <button
            onClick={addTab}
            className="flex size-9 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Add tab"
          >
            <PlusIcon className="size-4" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab && (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={spring}
              className="pt-5"
            >
              <p className="text-sm leading-relaxed text-muted-foreground">{activeTab.content}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
