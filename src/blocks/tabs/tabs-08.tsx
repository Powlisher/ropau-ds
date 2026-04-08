"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

const tabs = [
  { id: "all", label: "All Items", content: "Complete inventory across 8 categories. 1,247 items in stock, 89 below reorder threshold, 14 flagged for review." },
  { id: "electronics", label: "Electronics", content: "312 SKUs tracked. Top sellers: wireless peripherals and USB-C adapters. Average margin at 34.2% after Q1 repricing." },
  { id: "furniture", label: "Furniture", content: "Standing desks lead with 23% of category revenue. Lead time averaging 14 business days for custom configurations." },
  { id: "stationery", label: "Stationery", content: "Bulk orders automated for items below 50 units. Notebooks and premium pens account for 67% of monthly volume." },
  { id: "software", label: "Software", content: "89 active licenses managed. Annual renewal cycle saves 18% vs monthly billing. 4 licenses expiring within 30 days." },
  { id: "services", label: "Services", content: "Consulting hours billed at variable rates. Q1 utilization at 78%, up from 71% in Q4. Two new retainer agreements signed." },
  { id: "hardware", label: "Hardware", content: "Server components and networking gear. Depreciation schedule tracked quarterly. Next hardware refresh planned for June." },
  { id: "supplies", label: "Supplies", content: "Office supplies on auto-replenish. Monthly spend normalized at $2,340 after switching to the preferred vendor program." },
]

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function Tabs08() {
  const [active, setActive] = useState(tabs[0].id)
  const scrollRef = useRef<HTMLDivElement>(null)
  const activeTab = tabs.find((t) => t.id === active)!

  function scroll(dir: "left" | "right") {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -160 : 160, behavior: "smooth" })
  }

  return (
    <div className="flex min-h-[240px] items-start justify-center bg-muted/40 p-6 md:p-12">
      <div className="w-full max-w-lg">
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 z-10 flex h-full w-8 items-center justify-center bg-gradient-to-r from-muted/40 to-transparent text-muted-foreground hover:text-foreground"
            aria-label="Scroll tabs left"
          >
            <ChevronLeftIcon className="size-4" />
          </button>

          <div
            ref={scrollRef}
            className="scrollbar-none flex gap-0 overflow-x-auto border-b border-border px-8"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`relative shrink-0 whitespace-nowrap px-3 py-2.5 text-sm font-medium transition-colors ${
                  active === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"
                }`}
              >
                {tab.label}
                {active === tab.id && (
                  <motion.div
                    layoutId="tabs-08-indicator"
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-foreground"
                    transition={spring}
                  />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 z-10 flex h-full w-8 items-center justify-center bg-gradient-to-l from-muted/40 to-transparent text-muted-foreground hover:text-foreground"
            aria-label="Scroll tabs right"
          >
            <ChevronRightIcon className="size-4" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={spring}
            className="pt-5"
          >
            <p className="text-sm leading-relaxed text-muted-foreground">{activeTab.content}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
