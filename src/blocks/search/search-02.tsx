"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SearchIcon, ExternalLinkIcon } from "lucide-react"
import { motion } from "framer-motion"

const mockResults = [
  { id: 1, title: "API Rate Limiting Strategy", excerpt: "Implementing token bucket algorithm with Redis for our public endpoints. Current throughput handles 12k req/s...", category: "Engineering", date: "Mar 14, 2026", url: "#" },
  { id: 2, title: "Customer Retention Dashboard", excerpt: "Monthly cohort analysis showing 87.3% retention for Pro tier vs 64.1% for Free. Churn peaks at day 18...", category: "Analytics", date: "Mar 11, 2026", url: "#" },
  { id: 3, title: "Onboarding Flow Redesign", excerpt: "New 3-step onboarding reduces time-to-value from 4.2 min to 1.8 min. A/B test with 2,340 users...", category: "Product", date: "Mar 8, 2026", url: "#" },
  { id: 4, title: "Infrastructure Cost Optimization", excerpt: "Migrating from m5.xlarge to Graviton3 instances saves 23% monthly. Estimated annual savings of EUR 41,200...", category: "DevOps", date: "Feb 28, 2026", url: "#" },
  { id: 5, title: "Brand Voice Guidelines v3", excerpt: "Updated tone matrix for support, marketing, and product copy. Key shift: conversational over formal...", category: "Design", date: "Feb 22, 2026", url: "#" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Search02() {
  const [query, setQuery] = useState("rate limiting")

  const filtered = mockResults.filter((r) =>
    r.title.toLowerCase().includes(query.toLowerCase()) ||
    r.excerpt.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div
        className="flex items-center gap-3 rounded-xl bg-card px-4 py-3 ring-1 ring-foreground/10"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
      >
        <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search everything..."
          className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-mono tabular-nums tracking-wide">{filtered.length}</span> results
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {filtered.map((result) => (
          <motion.a
            key={result.id}
            href={result.url}
            variants={itemVariants}
            whileHover={{ y: -2 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className="block rounded-xl bg-card p-5 ring-1 ring-foreground/[0.06] transition-shadow hover:ring-foreground/10"
            style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2.5">
                  <h3 className="font-heading text-base font-semibold tracking-tight">{result.title}</h3>
                  <Badge variant="secondary">{result.category}</Badge>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{result.excerpt}</p>
                <p className="mt-2.5 font-mono text-xs tabular-nums tracking-wide text-muted-foreground/60">{result.date}</p>
              </div>
              <ExternalLinkIcon className="mt-1 size-4 shrink-0 text-muted-foreground/40" />
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  )
}
