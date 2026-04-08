"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LoaderIcon } from "lucide-react"

const allItems = [
  { id: 1, title: "Q4 Revenue Analysis", category: "Finance", date: "Mar 14" },
  { id: 2, title: "Brand Guidelines V3", category: "Design", date: "Mar 12" },
  { id: 3, title: "API Rate Limiting RFC", category: "Engineering", date: "Mar 11" },
  { id: 4, title: "Customer Onboarding Flow", category: "Product", date: "Mar 9" },
  { id: 5, title: "Infrastructure Cost Report", category: "Ops", date: "Mar 7" },
  { id: 6, title: "Competitor Pricing Matrix", category: "Strategy", date: "Mar 5" },
  { id: 7, title: "Accessibility Compliance Audit", category: "Engineering", date: "Mar 3" },
  { id: 8, title: "Content Calendar Q2", category: "Marketing", date: "Feb 28" },
  { id: 9, title: "Mobile Performance Benchmarks", category: "Engineering", date: "Feb 25" },
  { id: 10, title: "Sales Pipeline Forecast", category: "Sales", date: "Feb 22" },
  { id: 11, title: "Data Privacy Policy Update", category: "Legal", date: "Feb 19" },
  { id: 12, title: "Team Retrospective Notes", category: "People", date: "Feb 17" },
]

const BATCH = 4
const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Pagination04() {
  const [loaded, setLoaded] = useState(BATCH)
  const [loading, setLoading] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const hasMore = loaded < allItems.length

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return
    setLoading(true)
    setTimeout(() => {
      setLoaded((c) => Math.min(c + BATCH, allItems.length))
      setLoading(false)
    }, 800)
  }, [loading, hasMore])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore() },
      { rootMargin: "100px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [loadMore])

  const visible = allItems.slice(0, loaded)

  return (
    <div className="flex min-h-[500px] items-start justify-center bg-muted/40 p-6 md:p-12">
      <div className="w-full max-w-lg space-y-2">
        <AnimatePresence>
          {visible.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3"
              style={{
                boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
              }}
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-foreground">{item.title}</span>
                <span className="text-xs text-muted-foreground">{item.category}</span>
              </div>
              <span className="text-xs tabular-nums text-muted-foreground tracking-wide">{item.date}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        <div ref={sentinelRef} className="flex items-center justify-center py-4">
          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={spring}
            >
              <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
            </motion.div>
          )}
          {!hasMore && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-muted-foreground"
            >
              All {allItems.length} items loaded
            </motion.span>
          )}
        </div>
      </div>
    </div>
  )
}
