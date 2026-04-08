"use client"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { SearchIcon, ArrowUpRightIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const suggestions = [
  "API authentication setup",
  "API rate limiting configuration",
  "API versioning strategy",
  "Analytics dashboard permissions",
  "Annual budget template 2026",
  "Accessibility audit checklist",
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Search04() {
  const [query, setQuery] = useState("")
  const [focused, setFocused] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = query.length >= 1
    ? suggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase()))
    : []

  const showSuggestions = focused && filtered.length > 0

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, -1))
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      setQuery(filtered[selectedIndex])
      setSelectedIndex(-1)
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="relative">
        <div
          className="flex items-center gap-3 rounded-xl bg-card px-4 py-3 ring-1 ring-foreground/10"
          style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
        >
          <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(-1) }}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            onKeyDown={handleKeyDown}
            placeholder="Start typing to search..."
            className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
          />
        </div>

        <AnimatePresence>
          {showSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
              className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-xl bg-card py-1.5 ring-1 ring-foreground/10"
              style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04)" }}
            >
              <motion.div variants={containerVariants} initial="hidden" animate="visible">
                {filtered.map((suggestion, i) => (
                  <motion.button
                    key={suggestion}
                    variants={itemVariants}
                    onClick={() => { setQuery(suggestion); setFocused(false) }}
                    className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition-colors ${
                      i === selectedIndex ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    }`}
                  >
                    <span>
                      {suggestion.substring(0, suggestion.toLowerCase().indexOf(query.toLowerCase()))}
                      <span className="font-medium text-foreground">
                        {suggestion.substring(
                          suggestion.toLowerCase().indexOf(query.toLowerCase()),
                          suggestion.toLowerCase().indexOf(query.toLowerCase()) + query.length
                        )}
                      </span>
                      {suggestion.substring(suggestion.toLowerCase().indexOf(query.toLowerCase()) + query.length)}
                    </span>
                    <ArrowUpRightIcon className="size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
