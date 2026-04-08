"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

const sections = [
  {
    title: "Getting Started",
    items: [
      { label: "Installation", id: "installation", active: false },
      { label: "Quick Start", id: "quick-start", active: false },
      { label: "Configuration", id: "configuration", active: true },
      { label: "TypeScript Setup", id: "typescript", active: false },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { label: "Client Initialization", id: "client-init", active: false },
      { label: "Authentication", id: "auth", active: false },
      { label: "Error Handling", id: "errors", active: false },
      { label: "Rate Limiting", id: "rate-limits", active: false },
      { label: "Pagination", id: "pagination", active: false },
    ],
  },
  {
    title: "API Reference",
    items: [
      { label: "Analytics", id: "analytics", active: false },
      { label: "Events", id: "events", active: false },
      { label: "Projects", id: "projects", active: false },
      { label: "Users", id: "users", active: false },
      { label: "Webhooks", id: "webhooks", active: false },
    ],
  },
  {
    title: "Advanced",
    items: [
      { label: "Batch Operations", id: "batch", active: false },
      { label: "Streaming", id: "streaming", active: false },
      { label: "Custom Transport", id: "transport", active: false },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function Documentation06() {
  const [activeId, setActiveId] = useState("configuration")

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-xs"
    >
      <div
        className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <div className="border-b px-4 py-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            On This Page
          </p>
        </div>
        <ScrollArea className="max-h-[480px]">
          <nav className="p-3">
            {sections.map((section) => (
              <motion.div key={section.title} variants={itemVariants} className="mb-4 last:mb-0">
                <p className="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {section.title}
                </p>
                <ul className="space-y-0.5">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveId(item.id)}
                        className={`flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-[13px] transition-colors ${
                          activeId === item.id
                            ? "bg-primary/8 font-medium text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {activeId === item.id && (
                          <ChevronRight className="h-3 w-3 shrink-0" />
                        )}
                        <span className={activeId !== item.id ? "pl-[18px]" : ""}>
                          {item.label}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </motion.div>
  )
}
