"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

type Category = "all" | "feature" | "fix" | "improvement"

const tabs: { value: Category; label: string }[] = [
  { value: "all", label: "All" },
  { value: "feature", label: "Features" },
  { value: "fix", label: "Fixes" },
  { value: "improvement", label: "Improvements" },
]

const entries = [
  { title: "Template gallery with 40+ starter projects", version: "8.5.0", date: "Apr 6, 2026", category: "feature" as const, description: "Browse and fork templates organized by use case: marketing, engineering, HR, finance, and more." },
  { title: "Keyboard navigation overhaul", version: "8.4.2", date: "Apr 1, 2026", category: "improvement" as const, description: "Tab order, focus rings, and arrow key navigation now work consistently across all views." },
  { title: "Fixed SSO login loop on Firefox 128", version: "8.4.1", date: "Mar 28, 2026", category: "fix" as const, description: "The SAML response parser was not handling the new cookie partitioning behavior in Firefox 128." },
  { title: "Dependency graph visualization", version: "8.4.0", date: "Mar 22, 2026", category: "feature" as const, description: "See task dependencies as an interactive directed graph. Drag nodes to reorganize. Click edges to manage relationships." },
  { title: "Improved bulk import error messages", version: "8.3.3", date: "Mar 18, 2026", category: "improvement" as const, description: "CSV import errors now include row number, column name, and a suggested fix for each validation failure." },
  { title: "Resolved webhook signature verification failure on large payloads", version: "8.3.2", date: "Mar 14, 2026", category: "fix" as const, description: "Payloads above 256 KB were being truncated before signature computation, causing false negatives." },
  { title: "Custom emoji reactions", version: "8.3.0", date: "Mar 8, 2026", category: "feature" as const, description: "Upload custom emoji for your workspace. Supports animated GIF and APNG formats up to 128 KB." },
]

const categoryColors: Record<string, { bg: string; text: string }> = {
  feature: { bg: "oklch(0.94 0.04 145)", text: "oklch(0.40 0.10 145)" },
  fix: { bg: "oklch(0.94 0.04 25)", text: "oklch(0.45 0.12 25)" },
  improvement: { bg: "oklch(0.94 0.04 260)", text: "oklch(0.42 0.12 260)" },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Changelog10() {
  const [active, setActive] = useState<Category>("all")
  const filtered = active === "all" ? entries : entries.filter((e) => e.category === active)

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">Changelog</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">Filter by type to find what matters to you.</p>
      </div>

      <div className="mb-6 flex gap-1 rounded-lg bg-muted/60 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            className={`relative rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors ${
              active === tab.value ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"
            }`}
          >
            {active === tab.value && (
              <motion.div
                layoutId="changelog-tab"
                className="absolute inset-0 rounded-md bg-card ring-1 ring-foreground/[0.06]"
                style={{
                  boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 28 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          className="space-y-3"
        >
          {filtered.map((entry) => {
            const colors = categoryColors[entry.category]
            return (
              <motion.div
                key={entry.version}
                variants={itemVariants}
                className="rounded-xl bg-card p-5 ring-1 ring-foreground/[0.06]"
                style={{
                  boxShadow:
                    "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
                }}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    className="text-xs font-medium capitalize"
                    style={{ backgroundColor: colors.bg, color: colors.text }}
                  >
                    {entry.category}
                  </Badge>
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">
                    v{entry.version}
                  </span>
                  <span className="text-muted-foreground/40">·</span>
                  <span className="text-xs text-muted-foreground">{entry.date}</span>
                </div>
                <h3 className="mt-2.5 font-heading text-[15px] font-semibold tracking-tight">
                  {entry.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {entry.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
