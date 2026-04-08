"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { SearchIcon, FilterIcon, ChevronRightIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

const premiumShadow =
  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

type InvoiceStatus = "paid" | "pending" | "overdue" | "draft"

const statusStyles: Record<InvoiceStatus, string> = {
  paid: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
  overdue: "bg-rose-100 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400",
  draft: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
}

const invoices = [
  {
    id: "INV-2026-0047",
    client: "Pelletier Consulting",
    date: "Apr 8, 2026",
    dueDate: "Apr 22, 2026",
    amount: 12588,
    status: "pending" as InvoiceStatus,
  },
  {
    id: "INV-2026-0041",
    client: "Maison Colbert",
    date: "Apr 1, 2026",
    dueDate: "Apr 15, 2026",
    amount: 4320,
    status: "paid" as InvoiceStatus,
  },
  {
    id: "INV-2026-0038",
    client: "Atelier Bonheur",
    date: "Mar 22, 2026",
    dueDate: "Apr 5, 2026",
    amount: 7850,
    status: "overdue" as InvoiceStatus,
  },
  {
    id: "INV-2026-0035",
    client: "Vignoble Saint-Emilion",
    date: "Mar 15, 2026",
    dueDate: "Mar 29, 2026",
    amount: 2175,
    status: "paid" as InvoiceStatus,
  },
  {
    id: "INV-2026-0050",
    client: "Rue Rivoli Capital",
    date: "Apr 8, 2026",
    dueDate: "",
    amount: 9440,
    status: "draft" as InvoiceStatus,
  },
  {
    id: "INV-2026-0032",
    client: "Pelletier Consulting",
    date: "Mar 1, 2026",
    dueDate: "Mar 15, 2026",
    amount: 3600,
    status: "paid" as InvoiceStatus,
  },
]

export default function Invoice02() {
  return (
    <Card className="w-full max-w-2xl" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants} className="flex items-start justify-between">
            <div>
              <CardTitle className="tracking-tight">Invoices</CardTitle>
              <CardDescription>Manage and track all your invoices.</CardDescription>
            </div>
            <Button size="sm">New Invoice</Button>
          </motion.div>
          <motion.div variants={itemVariants} className="flex items-center gap-2 pt-2">
            <div className="relative flex-1">
              <SearchIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search invoices..." className="pl-9 h-9" />
            </div>
            <Button variant="outline" size="sm">
              <FilterIcon className="size-3.5 mr-1" />
              Filter
            </Button>
          </motion.div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            {invoices.map((inv, i) => (
              <motion.div
                key={inv.id}
                variants={itemVariants}
                whileHover={{ x: 2 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                className={`flex items-center gap-4 py-3.5 px-1 cursor-pointer transition-colors hover:bg-muted/30 rounded-lg ${
                  i < invoices.length - 1 ? "border-b border-border/50" : ""
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-foreground">{inv.client}</span>
                    <Badge className={`text-[10px] border-0 ${statusStyles[inv.status]}`}>
                      {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="font-mono tabular-nums">{inv.id}</span>
                    <span className="tabular-nums">{inv.date}</span>
                    {inv.dueDate && (
                      <span className="tabular-nums">Due {inv.dueDate}</span>
                    )}
                  </div>
                </div>
                <span className="text-sm font-semibold tabular-nums tracking-tight text-foreground shrink-0">
                  ${inv.amount.toLocaleString()}.00
                </span>
                <ChevronRightIcon className="size-4 text-muted-foreground shrink-0" />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
