"use client"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { SearchIcon, FileTextIcon, UserIcon, HashIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const mockResults = [
  { id: 1, type: "doc" as const, title: "Q3 Revenue Forecast Model", subtitle: "Updated 2 days ago by Sophie Marchand", icon: FileTextIcon },
  { id: 2, type: "person" as const, title: "Marc Lefebvre", subtitle: "Engineering Lead, Paris", icon: UserIcon },
  { id: 3, type: "doc" as const, title: "Brand Guidelines v4.2", subtitle: "Updated last week by Clara Dumont", icon: FileTextIcon },
  { id: 4, type: "tag" as const, title: "#product-launch", subtitle: "14 related documents", icon: HashIcon },
  { id: 5, type: "person" as const, title: "Elise Moreau", subtitle: "Product Designer, Lyon", icon: UserIcon },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Search01() {
  const [query, setQuery] = useState("")
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = query.length > 0
    ? mockResults.filter((r) => r.title.toLowerCase().includes(query.toLowerCase()))
    : []

  const showDropdown = focused && query.length > 0

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="relative">
        <div
          className="relative rounded-xl bg-card ring-1 ring-foreground/10"
          style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
        >
          <div className="flex items-center gap-3 px-4 py-3">
            <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              placeholder="Search documents, people, tags..."
              className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
            />
            {query && (
              <button
                onClick={() => { setQuery(""); inputRef.current?.focus() }}
                className="shrink-0 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
              className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
              style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)" }}
            >
              {filtered.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="py-2"
                >
                  {filtered.map((result) => (
                    <motion.button
                      key={result.id}
                      variants={itemVariants}
                      whileHover={{ backgroundColor: "var(--color-muted)" }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors"
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <result.icon className="size-4 text-muted-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-heading text-sm font-medium tracking-tight">{result.title}</p>
                        <p className="truncate text-xs text-muted-foreground">{result.subtitle}</p>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              ) : (
                <div className="px-4 py-8 text-center">
                  <p className="text-sm text-muted-foreground">No results for &ldquo;{query}&rdquo;</p>
                  <p className="mt-1 text-xs text-muted-foreground/60">Try a different search term</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
