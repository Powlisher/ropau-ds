"use client"

import { motion } from "framer-motion"
import { Search, Zap, Database, Mail, MessageSquare, BarChart3, GitBranch, Cloud, Lock, Server, Palette, CreditCard } from "lucide-react"
import { useState } from "react"

const categories = [
  { id: "all", label: "All", count: 24 },
  { id: "analytics", label: "Analytics", count: 6 },
  { id: "communication", label: "Communication", count: 5 },
  { id: "development", label: "Development", count: 7 },
  { id: "payments", label: "Payments", count: 4 },
  { id: "design", label: "Design", count: 2 },
]

const integrations = [
  { name: "Stripe", category: "payments", icon: Zap, description: "Accept payments and manage billing", popular: true },
  { name: "Mixpanel", category: "analytics", icon: BarChart3, description: "Product analytics and user tracking" },
  { name: "Slack", category: "communication", icon: MessageSquare, description: "Team messaging and notifications", popular: true },
  { name: "GitHub", category: "development", icon: GitBranch, description: "Version control and CI/CD" },
  { name: "Resend", category: "communication", icon: Mail, description: "Transactional email API" },
  { name: "Supabase", category: "development", icon: Database, description: "Backend as a service" },
  { name: "Cloudflare", category: "development", icon: Cloud, description: "CDN and edge computing" },
  { name: "Vault", category: "development", icon: Lock, description: "Secrets management" },
  { name: "Vercel", category: "development", icon: Server, description: "Frontend deployment platform" },
  { name: "Figma", category: "design", icon: Palette, description: "Collaborative design tool" },
  { name: "Paddle", category: "payments", icon: CreditCard, description: "Merchant of record for SaaS" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Integration09() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [search, setSearch] = useState("")

  const filtered = integrations.filter((i) => {
    const matchesCategory = activeCategory === "all" || i.category === activeCategory
    const matchesSearch = !search || i.name.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full">
      <motion.div variants={itemVariants} className="mb-5">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Browse Integrations
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Find and connect tools for your workflow</p>
      </motion.div>

      <motion.div variants={itemVariants} className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, category, or use case..."
          className="w-full rounded-xl bg-card border-0 py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/40 ring-1 ring-foreground/5 focus:outline-none focus:ring-2 focus:ring-foreground/10"
          style={{
            boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
          }}
        />
      </motion.div>

      <motion.div variants={itemVariants} className="flex items-center gap-1.5 mb-5 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`shrink-0 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === cat.id
                ? "bg-foreground text-background"
                : "bg-muted/50 text-muted-foreground hover:text-foreground ring-1 ring-foreground/5"
            }`}
          >
            {cat.label}
            <span className={`font-mono text-[10px] tabular-nums ${
              activeCategory === cat.id ? "text-background/60" : "text-muted-foreground/40"
            }`}>
              {cat.count}
            </span>
          </button>
        ))}
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5"
      >
        {filtered.map((integration) => (
          <motion.div
            key={integration.name}
            variants={itemVariants}
            whileHover={{ y: -2 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className="group flex items-center gap-3 rounded-xl bg-card p-3.5 ring-1 ring-foreground/5 cursor-pointer"
            style={{
              boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
            }}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted/50 group-hover:bg-foreground/5 transition-colors">
              <integration.icon className="h-5 w-5 text-foreground/60" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-medium text-foreground">{integration.name}</h3>
                {"popular" in integration && integration.popular && (
                  <span className="text-[9px] font-semibold tracking-wide uppercase text-amber-600 bg-amber-50 px-1.5 py-px rounded-md">
                    Popular
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground/50 truncate">{integration.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Search className="h-8 w-8 text-muted-foreground/20 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground/50">No integrations match your search</p>
          <button
            onClick={() => { setSearch(""); setActiveCategory("all") }}
            className="text-xs font-medium text-foreground mt-2 hover:underline"
          >
            Clear filters
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
