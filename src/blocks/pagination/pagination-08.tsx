"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

const pages = [
  { cursor: "a", label: "Newest", items: ["API v4 changelog", "Design token export", "Mobile SDK release"] },
  { cursor: "b", label: "Page 2", items: ["Webhook retry logic", "Batch processing docs", "Rate limit headers"] },
  { cursor: "c", label: "Page 3", items: ["OAuth2 PKCE guide", "GraphQL subscriptions", "Error code reference"] },
  { cursor: "d", label: "Oldest", items: ["REST API overview", "Authentication basics", "Getting started"] },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Pagination08() {
  const [pageIndex, setPageIndex] = useState(0)
  const currentPage = pages[pageIndex]
  const hasNewer = pageIndex > 0
  const hasOlder = pageIndex < pages.length - 1

  return (
    <div className="flex min-h-[320px] items-start justify-center bg-muted/40 p-6 md:p-12">
      <div className="w-full max-w-md space-y-4">
        <motion.div
          key={currentPage.cursor}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          {currentPage.items.map((item) => (
            <motion.div
              key={item}
              variants={itemVariants}
              className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground"
              style={{
                boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
              }}
            >
              {item}
            </motion.div>
          ))}
        </motion.div>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            disabled={!hasNewer}
            onClick={() => setPageIndex((p) => p - 1)}
            className="gap-1.5"
          >
            <ArrowLeftIcon className="size-3.5" />
            Newer
          </Button>

          <span className="text-xs tabular-nums text-muted-foreground tracking-wide">
            {pageIndex + 1} / {pages.length}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={!hasOlder}
            onClick={() => setPageIndex((p) => p + 1)}
            className="gap-1.5"
          >
            Older
            <ArrowRightIcon className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
