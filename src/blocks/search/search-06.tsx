"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { SearchIcon, FileTextIcon, CodeIcon, UserIcon, GlobeIcon } from "lucide-react"
import { motion } from "framer-motion"

const tabs = [
  { value: "all", label: "All", count: 47 },
  { value: "docs", label: "Docs", count: 23 },
  { value: "code", label: "Code", count: 14 },
  { value: "people", label: "People", count: 10 },
]

const allResults = [
  { id: 1, type: "doc", title: "GraphQL Schema Migration Guide", meta: "Engineering Wiki", date: "Mar 28", icon: FileTextIcon },
  { id: 2, type: "code", title: "useWebSocket.ts", meta: "libs/realtime/src/hooks", date: "Apr 1", icon: CodeIcon },
  { id: 3, type: "people", title: "Antoine Dubois", meta: "Staff Engineer, Backend", date: "", icon: UserIcon },
  { id: 4, type: "doc", title: "Incident Response Playbook", meta: "Operations", date: "Mar 15", icon: FileTextIcon },
  { id: 5, type: "code", title: "rate-limiter.go", meta: "services/gateway/middleware", date: "Mar 30", icon: CodeIcon },
  { id: 6, type: "people", title: "Camille Petit", meta: "Design Lead, Product", date: "", icon: UserIcon },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Search06() {
  const [query, setQuery] = useState("graphql")
  const [activeTab, setActiveTab] = useState("all")

  const filtered = allResults.filter((r) => {
    const matchesQuery = r.title.toLowerCase().includes(query.toLowerCase())
    const matchesTab = activeTab === "all" || r.type === activeTab.replace("docs", "doc").replace("people", "people")
    return matchesQuery && matchesTab
  })

  return (
    <div className="mx-auto w-full max-w-2xl space-y-5">
      <div
        className="flex items-center gap-3 rounded-xl bg-card px-4 py-3 ring-1 ring-foreground/10"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
      >
        <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search docs, code, people..."
          className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
        />
      </div>

      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val ?? "all")}>
        <TabsList variant="line">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="gap-1.5">
              {tab.label}
              <span className="font-mono text-[11px] tabular-nums text-muted-foreground">{tab.count}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-2"
          >
            {filtered.length > 0 ? filtered.map((result) => (
              <motion.div
                key={result.id}
                variants={itemVariants}
                whileHover={{ y: -1 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                className="flex cursor-pointer items-center gap-3.5 rounded-xl bg-card p-4 ring-1 ring-foreground/[0.06] transition-shadow hover:ring-foreground/10"
                style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <result.icon className="size-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-heading text-sm font-semibold tracking-tight">{result.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{result.meta}</p>
                </div>
                {result.date && (
                  <span className="shrink-0 font-mono text-xs tabular-nums tracking-wide text-muted-foreground/60">{result.date}</span>
                )}
                {result.type === "code" && <Badge variant="secondary">Code</Badge>}
              </motion.div>
            )) : (
              <div className="py-12 text-center">
                <GlobeIcon className="mx-auto mb-3 size-8 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">No {activeTab === "all" ? "" : activeTab} results for &ldquo;{query}&rdquo;</p>
              </div>
            )}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
