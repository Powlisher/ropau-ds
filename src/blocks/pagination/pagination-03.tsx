"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { LoaderIcon } from "lucide-react"

const allItems = [
  "Semantic versioning strategy",
  "Color token migration guide",
  "Component accessibility audit",
  "Typography scale documentation",
  "Dark mode implementation notes",
  "Responsive breakpoint standards",
  "Animation timing guidelines",
  "Icon library contribution guide",
  "Form validation patterns",
  "Data visualization principles",
  "Layout grid specifications",
  "Spacing scale rationale",
]

const PAGE_SIZE = 4
const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Pagination03() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [loading, setLoading] = useState(false)
  const hasMore = visibleCount < allItems.length
  const visible = allItems.slice(0, visibleCount)

  function loadMore() {
    setLoading(true)
    setTimeout(() => {
      setVisibleCount((c) => Math.min(c + PAGE_SIZE, allItems.length))
      setLoading(false)
    }, 600)
  }

  return (
    <div className="flex min-h-[400px] items-start justify-center bg-muted/40 p-6 md:p-12">
      <div className="w-full max-w-md space-y-3">
        <AnimatePresence>
          {visible.map((item, i) => (
            <motion.div
              key={item}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground"
              style={{
                boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <span>{item}</span>
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground tracking-wide">
                  #{(i + 1).toString().padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {hasMore && (
          <motion.div
            className="flex flex-col items-center gap-2 pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={spring}
          >
            <Button
              variant="outline"
              onClick={loadMore}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <LoaderIcon className="size-4 animate-spin" />
              ) : (
                `Load more (${allItems.length - visibleCount} remaining)`
              )}
            </Button>
            <span className="text-xs tabular-nums text-muted-foreground">
              Showing {visibleCount} of {allItems.length}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  )
}
