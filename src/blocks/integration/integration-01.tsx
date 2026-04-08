"use client"

import { motion } from "framer-motion"
import { Search, Zap, Database, Mail, MessageSquare, BarChart3, GitBranch, Cloud, Lock, ArrowRight } from "lucide-react"

const integrations = [
  { name: "Stripe", description: "Payment processing and billing", icon: Zap, color: "oklch(0.55 0.18 280)", installed: true, category: "Payments" },
  { name: "PostgreSQL", description: "Relational database connector", icon: Database, color: "oklch(0.50 0.12 230)", installed: true, category: "Database" },
  { name: "Resend", description: "Transactional email delivery", icon: Mail, color: "oklch(0.50 0.10 160)", installed: false, category: "Email" },
  { name: "Slack", description: "Team messaging and alerts", icon: MessageSquare, color: "oklch(0.55 0.14 340)", installed: false, category: "Communication" },
  { name: "Mixpanel", description: "Product analytics and tracking", icon: BarChart3, color: "oklch(0.52 0.12 30)", installed: false, category: "Analytics" },
  { name: "GitHub", description: "Code repos and CI/CD triggers", icon: GitBranch, color: "oklch(0.40 0.02 260)", installed: true, category: "Development" },
  { name: "Cloudflare", description: "CDN and edge functions", icon: Cloud, color: "oklch(0.55 0.10 60)", installed: false, category: "Infrastructure" },
  { name: "Vault", description: "Secrets management", icon: Lock, color: "oklch(0.48 0.08 200)", installed: false, category: "Security" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Integration01() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full">
      <motion.div variants={itemVariants} className="flex items-end justify-between mb-6">
        <div>
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            Integration Marketplace
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Connect your favorite tools in minutes</p>
        </div>
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
          <input
            type="text"
            placeholder="Search integrations..."
            className="rounded-xl bg-muted/50 border-0 py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground/40 ring-1 ring-foreground/5 focus:outline-none focus:ring-2 focus:ring-foreground/10 w-56"
          />
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {integrations.map((integration) => (
          <motion.div
            key={integration.name}
            variants={itemVariants}
            whileHover={{ y: -2 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className="group rounded-xl bg-card p-4 ring-1 ring-foreground/5 cursor-pointer"
            style={{
              boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${integration.color} / 0.1)`.replace("oklch(", "oklch(").replace(")", " / 0.1)") }}
              >
                <integration.icon className="h-5 w-5" style={{ color: integration.color }} />
              </div>
              {integration.installed && (
                <span className="text-[10px] font-medium tracking-wide uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </div>
            <h3 className="text-sm font-semibold text-foreground">{integration.name}</h3>
            <p className="text-xs text-muted-foreground/60 mt-1 leading-relaxed">{integration.description}</p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/40">
              <span className="text-[10px] font-medium tracking-[0.1em] uppercase text-muted-foreground/40">
                {integration.category}
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
