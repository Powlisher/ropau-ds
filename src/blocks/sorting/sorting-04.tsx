"use client"

import { useState, useCallback } from "react"
import { GripVerticalIcon } from "lucide-react"
import { motion, Reorder } from "framer-motion"

type Item = { id: string; title: string; subtitle: string }

const initialItems: Item[] = [
  { id: "a", title: "Executive Summary", subtitle: "Overview of key findings and recommendations" },
  { id: "b", title: "Market Analysis", subtitle: "Competitive landscape and market sizing data" },
  { id: "c", title: "Technical Architecture", subtitle: "System design, stack decisions, and trade-offs" },
  { id: "d", title: "Financial Projections", subtitle: "Revenue model, unit economics, runway" },
  { id: "e", title: "Team & Hiring Plan", subtitle: "Current team, open roles, growth timeline" },
]

export default function Sorting04() {
  const [items, setItems] = useState(initialItems)
  const [dragging, setDragging] = useState<string | null>(null)

  const handleReorder = useCallback((newOrder: Item[]) => {
    setItems(newOrder)
  }, [])

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-heading text-sm font-semibold tracking-tight">Section Order</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">Drag to reorder sections in your document</p>
        </div>
        <span className="font-mono text-xs tabular-nums tracking-wide text-muted-foreground">
          {items.length} sections
        </span>
      </div>

      <Reorder.Group
        axis="y"
        values={items}
        onReorder={handleReorder}
        className="space-y-2"
      >
        {items.map((item, i) => (
          <Reorder.Item
            key={item.id}
            value={item}
            onDragStart={() => setDragging(item.id)}
            onDragEnd={() => setDragging(null)}
            className={`flex cursor-grab items-center gap-3 rounded-xl bg-card px-4 py-3.5 ring-1 transition-shadow active:cursor-grabbing ${
              dragging === item.id ? "ring-primary/30 z-10" : "ring-foreground/[0.06] hover:ring-foreground/10"
            }`}
            style={{ boxShadow: dragging === item.id
              ? "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04)"
              : "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)"
            }}
            whileHover={{ y: -1 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
          >
            <GripVerticalIcon className="size-4 shrink-0 text-muted-foreground/40" />
            <motion.span
              layout
              className="flex size-6 shrink-0 items-center justify-center rounded-md bg-muted font-mono text-xs tabular-nums font-medium text-muted-foreground"
            >
              {i + 1}
            </motion.span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-heading text-sm font-medium tracking-tight">{item.title}</p>
              <p className="truncate text-xs text-muted-foreground">{item.subtitle}</p>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  )
}
