"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { SearchIcon, FilterIcon, XIcon } from "lucide-react"

type Customer = {
  id: string
  name: string
  email: string
  plan: "starter" | "pro" | "enterprise"
  mrr: number
  status: "active" | "churned" | "trial"
  signupDate: string
}

const customers: Customer[] = [
  { id: "c1", name: "Meridian Health", email: "billing@meridianhealth.io", plan: "enterprise", mrr: 4200, status: "active", signupDate: "2023-03-12" },
  { id: "c2", name: "Volta Energy", email: "admin@volta.energy", plan: "pro", mrr: 890, status: "active", signupDate: "2023-07-04" },
  { id: "c3", name: "Canopy Studios", email: "ops@canopy.studio", plan: "pro", mrr: 890, status: "active", signupDate: "2023-11-18" },
  { id: "c4", name: "Prism Analytics", email: "hello@prism.dev", plan: "starter", mrr: 290, status: "trial", signupDate: "2025-03-28" },
  { id: "c5", name: "Helios Robotics", email: "procurement@helios.bot", plan: "enterprise", mrr: 7800, status: "active", signupDate: "2022-09-05" },
  { id: "c6", name: "Axon Logistics", email: "tech@axonlog.com", plan: "pro", mrr: 890, status: "churned", signupDate: "2023-01-22" },
  { id: "c7", name: "Tidal Commerce", email: "team@tidalcom.co", plan: "starter", mrr: 290, status: "active", signupDate: "2024-06-14" },
  { id: "c8", name: "Nimbus Cloud", email: "support@nimbus.cloud", plan: "enterprise", mrr: 12400, status: "active", signupDate: "2022-04-30" },
  { id: "c9", name: "Flux Design Co", email: "hello@fluxdesign.co", plan: "pro", mrr: 890, status: "churned", signupDate: "2024-01-09" },
  { id: "c10", name: "Evergreen Finance", email: "it@evergreen.fi", plan: "starter", mrr: 290, status: "trial", signupDate: "2025-04-01" },
]

const planStyles: Record<string, string> = {
  starter: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  pro: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  enterprise: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
}

const statusStyles: Record<string, { dot: string; text: string }> = {
  active: { dot: "bg-emerald-500", text: "text-emerald-700 dark:text-emerald-400" },
  churned: { dot: "bg-red-500", text: "text-red-600 dark:text-red-400" },
  trial: { dot: "bg-amber-500", text: "text-amber-700 dark:text-amber-400" },
}

const premiumShadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Crud08() {
  const [search, setSearch] = useState("")
  const [planFilter, setPlanFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.email.toLowerCase().includes(search.toLowerCase())) return false
      if (planFilter && c.plan !== planFilter) return false
      if (statusFilter && c.status !== statusFilter) return false
      return true
    })
  }, [search, planFilter, statusFilter])

  const hasFilters = !!planFilter || !!statusFilter || !!search
  const clearAll = () => { setSearch(""); setPlanFilter(null); setStatusFilter(null) }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Customers</h2>
        <p className="text-sm text-muted-foreground">{filtered.length} of {customers.length} customers</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 sm:max-w-xs">
          <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="pl-8 text-sm"
          />
        </div>

        <div className="flex gap-1.5">
          {(["starter", "pro", "enterprise"] as const).map((plan) => (
            <button
              key={plan}
              onClick={() => setPlanFilter(planFilter === plan ? null : plan)}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-medium capitalize transition-colors ${
                planFilter === plan
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {plan}
            </button>
          ))}
        </div>

        <div className="flex gap-1.5">
          {(["active", "trial", "churned"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(statusFilter === status ? null : status)}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium capitalize transition-colors ${
                statusFilter === status
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className={`size-1.5 rounded-full ${statusStyles[status].dot}`} />
              {status}
            </button>
          ))}
        </div>

        {hasFilters && (
          <button onClick={clearAll} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <XIcon className="size-3" />
            Clear
          </button>
        )}
      </div>

      <Card style={{ boxShadow: premiumShadow }} className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Plan</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">MRR</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Since</th>
              </tr>
            </thead>
            <motion.tbody variants={containerVariants} initial="hidden" animate="visible" key={`${search}-${planFilter}-${statusFilter}`}>
              <AnimatePresence>
                {filtered.map((c) => {
                  const st = statusStyles[c.status]
                  return (
                    <motion.tr key={c.id} variants={rowVariants} exit={{ opacity: 0 }} className="border-b border-border/30 transition-colors hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-foreground">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.email}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold capitalize ${planStyles[c.plan]}`}>{c.plan}</span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-sm tabular-nums text-foreground">${c.mrr.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`flex items-center gap-1.5 text-xs font-medium capitalize ${st.text}`}>
                          <span className={`size-1.5 rounded-full ${st.dot}`} />
                          {c.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-xs tabular-nums text-muted-foreground">{c.signupDate}</td>
                    </motion.tr>
                  )
                })}
              </AnimatePresence>
            </motion.tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm font-medium text-foreground">No customers match your filters</p>
              <p className="mt-1 text-xs text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
