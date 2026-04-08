"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { SearchX } from "lucide-react"

const suggestions = [
  "Try a shorter or more general keyword",
  "Check for typos in your search query",
  "Remove filters to broaden results",
]

const popularSearches = ["billing settings", "API keys", "team members", "export data"]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function EmptyState03() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex w-full max-w-md flex-col items-center py-14 text-center"
    >
      <motion.div
        variants={itemVariants}
        className="mb-6 flex size-14 items-center justify-center rounded-2xl"
        style={{
          background: "linear-gradient(135deg, oklch(0.94 0.01 0) 0%, oklch(0.92 0.015 20) 100%)",
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
        }}
      >
        <SearchX className="size-6 text-foreground/45" strokeWidth={1.5} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="font-heading text-lg font-semibold tracking-tight">
          No results for &quot;intergation logs&quot;
        </h3>
        <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
          We couldn&apos;t find anything matching your query. Here are a few things to try:
        </p>
      </motion.div>

      <motion.ul variants={itemVariants} className="mt-5 space-y-1.5 text-left">
        {suggestions.map((s) => (
          <li key={s} className="flex items-start gap-2 text-sm text-foreground/80">
            <span className="mt-2 block size-1 shrink-0 rounded-full bg-foreground/25" />
            {s}
          </li>
        ))}
      </motion.ul>

      <motion.div variants={itemVariants} className="mt-8 w-full">
        <p className="mb-3 text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">
          Popular searches
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {popularSearches.map((term) => (
            <motion.button
              key={term}
              whileHover={{ y: -1 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              className="rounded-lg bg-muted/70 px-3 py-1.5 text-sm text-foreground/70 ring-1 ring-foreground/[0.05] transition-colors hover:text-foreground"
            >
              {term}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-6">
        <Button size="sm" variant="outline">
          Clear search
        </Button>
      </motion.div>
    </motion.div>
  )
}
