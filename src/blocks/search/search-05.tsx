"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { SearchIcon, ClockIcon, TrendingUpIcon, XIcon } from "lucide-react"
import { motion } from "framer-motion"

const recentSearches = [
  { id: 1, query: "deployment pipeline configuration", time: "2h ago" },
  { id: 2, query: "team OKRs Q2 2026", time: "Yesterday" },
  { id: 3, query: "customer interview notes Renault", time: "3 days ago" },
]

const trending = [
  { id: 1, label: "Design system migration", searches: "127 searches this week" },
  { id: 2, label: "Performance budget guidelines", searches: "89 searches this week" },
  { id: 3, label: "New hire onboarding", searches: "76 searches this week" },
  { id: 4, label: "SOC 2 compliance checklist", searches: "61 searches this week" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Search05() {
  const [query, setQuery] = useState("")
  const [recents, setRecents] = useState(recentSearches)

  function removeRecent(id: number) {
    setRecents((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div
        className="flex items-center gap-3 rounded-xl bg-card px-4 py-3 ring-1 ring-foreground/10"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
      >
        <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
        />
      </div>

      {!query && (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          {recents.length > 0 && (
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <ClockIcon className="size-3.5" />
                  Recent searches
                </h3>
                <button
                  onClick={() => setRecents([])}
                  className="text-xs text-muted-foreground/60 transition-colors hover:text-foreground"
                >
                  Clear all
                </button>
              </div>
              <div className="space-y-1">
                {recents.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className="group flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-muted"
                  >
                    <ClockIcon className="size-3.5 shrink-0 text-muted-foreground/40" />
                    <button
                      onClick={() => setQuery(item.query)}
                      className="min-w-0 flex-1 text-left text-sm"
                    >
                      {item.query}
                    </button>
                    <span className="shrink-0 font-mono text-[11px] tabular-nums tracking-wide text-muted-foreground/40">{item.time}</span>
                    <button
                      onClick={() => removeRecent(item.id)}
                      className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <XIcon className="size-3.5 text-muted-foreground hover:text-foreground" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <TrendingUpIcon className="size-3.5" />
              Trending
            </h3>
            <div className="space-y-1">
              {trending.map((item, i) => (
                <motion.button
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                  onClick={() => setQuery(item.label)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-muted"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-muted font-mono text-xs tabular-nums font-medium text-muted-foreground">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground/60">{item.searches}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
