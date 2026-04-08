"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { SearchIcon, SparklesIcon, BookOpenIcon, CodeIcon, UsersIcon, BarChart3Icon } from "lucide-react"
import { motion } from "framer-motion"

const popularTopics = [
  { id: 1, title: "Getting Started", description: "Setup guides, quickstart tutorials, and first steps", icon: BookOpenIcon, articles: 34 },
  { id: 2, title: "API Reference", description: "Endpoints, authentication, rate limits, and SDKs", icon: CodeIcon, articles: 128 },
  { id: 3, title: "Team Management", description: "Roles, permissions, invitations, and SSO configuration", icon: UsersIcon, articles: 19 },
  { id: 4, title: "Analytics & Reports", description: "Dashboards, custom reports, data export formats", icon: BarChart3Icon, articles: 27 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Search10() {
  const [query, setQuery] = useState("")

  return (
    <div className="mx-auto w-full max-w-2xl space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="text-center"
      >
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10">
          <SparklesIcon className="size-5 text-primary" />
        </div>
        <h1 className="font-heading text-2xl font-bold tracking-tight">What are you looking for?</h1>
        <p className="mt-2 text-sm text-muted-foreground">Search our knowledge base or explore popular topics below.</p>
      </motion.div>

      <div
        className="flex items-center gap-3 rounded-xl bg-card px-4 py-3.5 ring-1 ring-foreground/10"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
      >
        <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles, guides, and more..."
          className="border-0 bg-transparent p-0 text-base shadow-none focus-visible:ring-0"
        />
      </div>

      {!query && (
        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Popular topics</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {popularTopics.map((topic) => (
              <motion.button
                key={topic.id}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                onClick={() => setQuery(topic.title)}
                className="flex items-start gap-3.5 rounded-xl bg-card p-4 text-left ring-1 ring-foreground/[0.06] transition-shadow hover:ring-foreground/10"
                style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <topic.icon className="size-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-heading text-sm font-semibold tracking-tight">{topic.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{topic.description}</p>
                  <p className="mt-2 font-mono text-[11px] tabular-nums tracking-wide text-muted-foreground/50">
                    {topic.articles} articles
                  </p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  )
}
