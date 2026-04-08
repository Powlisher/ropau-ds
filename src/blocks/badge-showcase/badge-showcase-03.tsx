"use client"

import * as React from "react"
import { XIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const initialTags = [
  { id: "1", label: "React 19", color: "bg-sky-500/10 text-sky-700 dark:text-sky-400" },
  { id: "2", label: "TypeScript", color: "bg-blue-500/10 text-blue-700 dark:text-blue-400" },
  { id: "3", label: "Tailwind v4", color: "bg-teal-500/10 text-teal-700 dark:text-teal-400" },
  { id: "4", label: "Framer Motion", color: "bg-violet-500/10 text-violet-700 dark:text-violet-400" },
  { id: "5", label: "Next.js", color: "bg-foreground/[0.06] text-foreground" },
]

export default function BadgeShowcase03() {
  const [tags, setTags] = React.useState(initialTags)

  const remove = (id: string) => {
    setTags((prev) => prev.filter((t) => t.id !== id))
  }

  const reset = () => setTags(initialTags)

  return (
    <div
      className="rounded-2xl bg-card p-8"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <div className="mb-6 flex items-baseline justify-between">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-foreground">
            Dismissible badges
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Click the X to remove
          </p>
        </div>
        {tags.length < initialTags.length && (
          <button
            onClick={reset}
            className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
          >
            Reset all
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence mode="popLayout">
          {tags.map((tag) => (
            <motion.span
              key={tag.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              className={`inline-flex h-7 items-center gap-1 rounded-full pl-3 pr-1.5 text-xs font-medium ${tag.color}`}
            >
              {tag.label}
              <button
                onClick={() => remove(tag.id)}
                className="flex size-4 items-center justify-center rounded-full transition-colors hover:bg-foreground/10"
                aria-label={`Remove ${tag.label}`}
              >
                <XIcon className="size-2.5" />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
