"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const sections = [
  {
    id: "overview",
    label: "Overview",
    links: [
      { label: "Metrics", href: "#metrics" },
      { label: "Activity", href: "#activity" },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    links: [
      { label: "Traffic", href: "#traffic" },
      { label: "Conversions", href: "#conversions" },
      { label: "Revenue", href: "#revenue" },
    ],
  },
  {
    id: "content",
    label: "Content",
    links: [
      { label: "Pages", href: "#pages" },
      { label: "Media", href: "#media" },
    ],
  },
]

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function NavbarContextual() {
  const [activeSection, setActiveSection] = React.useState("overview")
  const currentSection = sections.find((s) => s.id === activeSection)

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-sm"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
              <span className="font-heading text-sm font-bold tracking-tight text-primary-foreground">
                R
              </span>
            </div>
            <span className="font-heading text-[15px] font-semibold tracking-tight text-foreground">
              Ropau
            </span>
          </a>

          <div className="flex items-center gap-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className="relative rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {section.label}
                {activeSection === section.id && (
                  <motion.div
                    layoutId="navbar-contextual-indicator"
                    className="absolute inset-x-3 -bottom-[17px] h-0.5 bg-foreground"
                    transition={spring}
                  />
                )}
              </button>
            ))}
          </div>

          <Button variant="outline" size="sm">
            Settings
          </Button>
        </div>

        {currentSection && (
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
            className="flex items-center gap-1 border-t border-border/40 py-2"
          >
            {currentSection.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-md px-2.5 py-1 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
