"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SearchIcon } from "lucide-react"
import { motion } from "framer-motion"

const mockResults = [
  { id: 1, title: "Design System Architecture Overview", body: "This document outlines the complete design system architecture, including token definitions, component hierarchy, and the build pipeline that generates platform-specific outputs." },
  { id: 2, title: "Frontend Performance Budget", body: "Our performance budget targets a Lighthouse score of 95+ for all design system documentation pages. The architecture supports tree-shaking to keep bundle sizes minimal." },
  { id: 3, title: "Component Design Principles", body: "Every component in the design system follows composition-first architecture. Primitive components expose flexible APIs while composed variants handle common patterns." },
  { id: 4, title: "Token Migration Roadmap", body: "Migrating from hardcoded values to semantic design tokens. Phase 1 covers color and typography, Phase 2 handles spacing and elevation across all design surfaces." },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

function highlightText(text: string, query: string) {
  if (!query.trim()) return text
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
  const parts = text.split(regex)
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="rounded-sm bg-primary/15 px-0.5 text-foreground">{part}</mark>
    ) : (
      part
    )
  )
}

export default function Search08() {
  const [query, setQuery] = useState("design")

  const filtered = mockResults.filter((r) =>
    r.title.toLowerCase().includes(query.toLowerCase()) ||
    r.body.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="mx-auto w-full max-w-2xl space-y-5">
      <div
        className="flex items-center gap-3 rounded-xl bg-card px-4 py-3 ring-1 ring-foreground/10"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
      >
        <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search with highlighting..."
          className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
        />
        {query && (
          <Badge variant="secondary" className="shrink-0">
            <span className="font-mono tabular-nums">{filtered.length}</span> matches
          </Badge>
        )}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={query}
        className="space-y-3"
      >
        {filtered.map((result) => (
          <motion.div
            key={result.id}
            variants={itemVariants}
            whileHover={{ y: -1 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className="cursor-pointer rounded-xl bg-card p-5 ring-1 ring-foreground/[0.06] transition-shadow hover:ring-foreground/10"
            style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
          >
            <h3 className="font-heading text-base font-semibold tracking-tight">
              {highlightText(result.title, query)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {highlightText(result.body, query)}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
