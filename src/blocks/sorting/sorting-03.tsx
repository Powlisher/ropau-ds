"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const items = [
  { id: 1, title: "WebSocket Connection Pooling", relevance: 97, date: "Apr 7, 2026", popularity: 4201, author: "Louis Perrin" },
  { id: 2, title: "Edge Function Cold Start Optimization", relevance: 89, date: "Apr 5, 2026", popularity: 2847, author: "Julie Morin" },
  { id: 3, title: "Database Index Strategy for JSONB", relevance: 82, date: "Apr 2, 2026", popularity: 5123, author: "Samuel Bonnet" },
  { id: 4, title: "React Server Components Deep Dive", relevance: 78, date: "Mar 30, 2026", popularity: 8394, author: "Emma Laurent" },
  { id: 5, title: "WASM Module Lazy Loading", relevance: 71, date: "Mar 26, 2026", popularity: 1567, author: "Nathan Dupont" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Sorting03() {
  const [sortMode, setSortMode] = useState("relevance")

  const sorted = [...items].sort((a, b) => {
    if (sortMode === "relevance") return b.relevance - a.relevance
    if (sortMode === "date") return new Date(b.date).getTime() - new Date(a.date).getTime()
    return b.popularity - a.popularity
  })

  return (
    <div className="mx-auto w-full max-w-lg space-y-5">
      <Tabs value={sortMode} onValueChange={(val) => setSortMode(val ?? "relevance")}>
        <TabsList>
          <TabsTrigger value="relevance">Relevance</TabsTrigger>
          <TabsTrigger value="date">Date</TabsTrigger>
          <TabsTrigger value="popularity">Popularity</TabsTrigger>
        </TabsList>

        <TabsContent value={sortMode} className="mt-4">
          <motion.div
            key={sortMode}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-2.5"
          >
            {sorted.map((item, i) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -1 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                className="cursor-pointer rounded-xl bg-card p-4 ring-1 ring-foreground/[0.06] transition-shadow hover:ring-foreground/10"
                style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
              >
                <div className="flex items-start gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted font-mono text-xs tabular-nums font-medium text-muted-foreground">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-heading text-sm font-semibold tracking-tight">{item.title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground">by {item.author}</p>
                    <div className="mt-2.5 flex items-center gap-3">
                      <Badge variant={sortMode === "relevance" ? "default" : "secondary"}>
                        <span className="font-mono tabular-nums">{item.relevance}%</span> match
                      </Badge>
                      <span className="font-mono text-[11px] tabular-nums tracking-wide text-muted-foreground/60">{item.date}</span>
                      <span className="font-mono text-[11px] tabular-nums tracking-wide text-muted-foreground/60">
                        {item.popularity.toLocaleString()} views
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
