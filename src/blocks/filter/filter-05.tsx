"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon, XIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const allTags = [
  "react", "typescript", "nextjs", "tailwind", "figma", "accessibility",
  "performance", "testing", "ci-cd", "docker", "kubernetes", "graphql",
  "rest-api", "authentication", "monitoring", "design-tokens",
]

const chipVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 400, damping: 25 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.1 } },
}

export default function Filter05() {
  const [selected, setSelected] = useState<string[]>(["react", "typescript", "tailwind"])
  const [search, setSearch] = useState("")

  const available = allTags.filter((t) => !selected.includes(t) && t.includes(search.toLowerCase()))

  function addTag(tag: string) {
    setSelected((prev) => [...prev, tag])
    setSearch("")
  }

  function removeTag(tag: string) {
    setSelected((prev) => prev.filter((t) => t !== tag))
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div
        className="rounded-xl bg-card p-5 ring-1 ring-foreground/[0.06]"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
      >
        <h3 className="mb-1 font-heading text-sm font-semibold tracking-tight">Tags</h3>
        <p className="mb-4 text-xs text-muted-foreground">Select tags to filter results</p>

        {selected.length > 0 && (
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                Selected (<span className="font-mono tabular-nums">{selected.length}</span>)
              </span>
              <Button variant="ghost" size="sm" onClick={() => setSelected([])}>Clear</Button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <AnimatePresence>
                {selected.map((tag) => (
                  <motion.div key={tag} variants={chipVariants} initial="hidden" animate="visible" exit="exit" layout>
                    <Badge variant="default" className="gap-1 pr-1.5">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="ml-0.5 rounded-sm p-0.5 hover:bg-primary-foreground/20">
                        <XIcon className="size-2.5" />
                      </button>
                    </Badge>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2">
          <SearchIcon className="size-3.5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tags..."
            className="h-auto border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {available.slice(0, 10).map((tag) => (
            <motion.button
              key={tag}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              onClick={() => addTag(tag)}
              className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
            >
              + {tag}
            </motion.button>
          ))}
          {available.length === 0 && (
            <p className="py-2 text-xs text-muted-foreground/60">No matching tags</p>
          )}
        </div>
      </div>
    </div>
  )
}
