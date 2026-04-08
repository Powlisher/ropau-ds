"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import { DownloadIcon, FileTextIcon, SearchIcon } from "lucide-react"
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

const receipts = [
  {
    id: "R-92847",
    merchant: "Boulangerie Saint-Honore",
    date: "Apr 8, 2026",
    amount: 19.69,
    category: "Food",
  },
  {
    id: "D-70294",
    merchant: "Pharmacie Centrale",
    date: "Apr 8, 2026",
    amount: 68.40,
    category: "Health",
  },
  {
    id: "R-44821",
    merchant: "Merci Concept Store",
    date: "Apr 1, 2026",
    amount: 292.14,
    category: "Shopping",
  },
  {
    id: "TXN-4829173",
    merchant: "Cafe de Flore",
    date: "Mar 29, 2026",
    amount: 51.26,
    category: "Dining",
  },
  {
    id: "R-38102",
    merchant: "SNCF Voyages",
    date: "Mar 25, 2026",
    amount: 134.00,
    category: "Travel",
  },
  {
    id: "R-37290",
    merchant: "Monoprix Haussmann",
    date: "Mar 22, 2026",
    amount: 87.35,
    category: "Groceries",
  },
  {
    id: "R-36841",
    merchant: "Le Petit Cler",
    date: "Mar 20, 2026",
    amount: 89.20,
    category: "Dining",
  },
]

const categoryColors: Record<string, string> = {
  Food: "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
  Health: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
  Shopping: "bg-violet-100 text-violet-700 dark:bg-violet-950/30 dark:text-violet-400",
  Dining: "bg-rose-100 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400",
  Travel: "bg-sky-100 text-sky-700 dark:bg-sky-950/30 dark:text-sky-400",
  Groceries: "bg-lime-100 text-lime-700 dark:bg-lime-950/30 dark:text-lime-400",
}

export default function Receipt10() {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const toggleReceipt = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleAll = () => {
    if (selected.size === receipts.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(receipts.map((r) => r.id)))
    }
  }

  const totalSelected = receipts
    .filter((r) => selected.has(r.id))
    .reduce((sum, r) => sum + r.amount, 0)

  return (
    <Card className="w-full max-w-lg" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants} className="flex items-start justify-between">
            <div>
              <CardTitle className="tracking-tight">Receipts</CardTitle>
              <CardDescription>
                {receipts.length} receipts from the last 30 days.
              </CardDescription>
            </div>
            <Button
              size="sm"
              disabled={selected.size === 0}
            >
              <DownloadIcon className="size-3.5 mr-1" />
              Download {selected.size > 0 ? `(${selected.size})` : "All"}
            </Button>
          </motion.div>
          <motion.div variants={itemVariants} className="flex items-center gap-2 pt-2">
            <div className="relative flex-1">
              <SearchIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search receipts..." className="pl-9 h-9" />
            </div>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 px-2 py-2 border-b border-border/50"
          >
            <Checkbox
              checked={selected.size === receipts.length}
              onCheckedChange={toggleAll}
            />
            <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground flex-1">
              Select All
            </span>
            {selected.size > 0 && (
              <span className="text-xs tabular-nums text-muted-foreground">
                Total: &euro;{totalSelected.toFixed(2)}
              </span>
            )}
          </motion.div>

          {receipts.map((r) => (
            <motion.div
              key={r.id}
              variants={itemVariants}
              whileHover={{ x: 2 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              className={`flex items-center gap-3 rounded-xl px-2 py-3 cursor-pointer transition-colors ${
                selected.has(r.id) ? "bg-primary/5" : "hover:bg-muted/30"
              }`}
              onClick={() => toggleReceipt(r.id)}
            >
              <Checkbox
                checked={selected.has(r.id)}
                onCheckedChange={() => toggleReceipt(r.id)}
              />
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                <FileTextIcon className="size-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground truncate">
                    {r.merchant}
                  </span>
                  <Badge className={`text-[9px] border-0 shrink-0 ${categoryColors[r.category] ?? ""}`}>
                    {r.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                  <span className="font-mono tabular-nums">{r.id}</span>
                  <span className="tabular-nums">{r.date}</span>
                </div>
              </div>
              <span className="text-sm font-semibold tabular-nums text-foreground shrink-0">
                &euro;{r.amount.toFixed(2)}
              </span>
            </motion.div>
          ))}

          {selected.size > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
              className="flex items-center justify-between rounded-xl bg-primary/5 px-4 py-3 mt-2"
            >
              <div>
                <span className="text-sm font-medium text-foreground">
                  {selected.size} receipt{selected.size > 1 ? "s" : ""} selected
                </span>
                <p className="text-xs text-muted-foreground tabular-nums">
                  Total: &euro;{totalSelected.toFixed(2)}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => setSelected(new Set())}>
                  Clear
                </Button>
                <Button size="sm">
                  <DownloadIcon className="size-3.5 mr-1" />
                  Export
                </Button>
              </div>
            </motion.div>
          )}
        </CardContent>
      </motion.div>
    </Card>
  )
}
