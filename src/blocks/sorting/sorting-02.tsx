"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpIcon, ArrowDownIcon, ChevronsUpDownIcon } from "lucide-react"
import { motion } from "framer-motion"

type SortDir = "asc" | "desc" | null
type SortKey = "name" | "department" | "revenue" | "growth" | "updated"

const data = [
  { name: "Margaux Delacroix", department: "Sales", revenue: 84200, growth: 12.3, updated: "Apr 6" },
  { name: "Hugo Leclercq", department: "Engineering", revenue: 0, growth: 0, updated: "Apr 5" },
  { name: "Ines Barbier", department: "Marketing", revenue: 37800, growth: -4.1, updated: "Apr 3" },
  { name: "Thibault Moreau", department: "Sales", revenue: 62100, growth: 8.7, updated: "Apr 1" },
  { name: "Celine Faure", department: "Product", revenue: 0, growth: 0, updated: "Mar 29" },
  { name: "Remi Garnier", department: "Sales", revenue: 98400, growth: 23.1, updated: "Mar 27" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const rowVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Sorting02() {
  const [sortKey, setSortKey] = useState<SortKey | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>(null)

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      if (sortDir === "asc") setSortDir("desc")
      else if (sortDir === "desc") { setSortKey(null); setSortDir(null) }
      else setSortDir("asc")
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const sorted = [...data].sort((a, b) => {
    if (!sortKey || !sortDir) return 0
    const av = a[sortKey]
    const bv = b[sortKey]
    const cmp = typeof av === "string" ? av.localeCompare(bv as string) : (av as number) - (bv as number)
    return sortDir === "asc" ? cmp : -cmp
  })

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <ChevronsUpDownIcon className="size-3.5 text-muted-foreground/30" />
    return sortDir === "asc" ? <ArrowUpIcon className="size-3.5 text-primary" /> : <ArrowDownIcon className="size-3.5 text-primary" />
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div
        className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/[0.06]"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              {([
                { key: "name" as const, label: "Name", align: "left" },
                { key: "department" as const, label: "Department", align: "left" },
                { key: "revenue" as const, label: "Revenue", align: "right" },
                { key: "growth" as const, label: "Growth", align: "right" },
                { key: "updated" as const, label: "Updated", align: "right" },
              ]).map((col) => (
                <TableHead key={col.key} className={col.align === "right" ? "text-right" : ""}>
                  <button
                    onClick={() => handleSort(col.key)}
                    className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
                  >
                    {col.label}
                    <SortIcon col={col.key} />
                  </button>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <motion.tbody
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="contents"
            >
              {sorted.map((row) => (
                <motion.tr
                  key={row.name}
                  variants={rowVariants}
                  className="border-b transition-colors last:border-0 hover:bg-muted/50"
                >
                  <TableCell className="font-heading font-medium tracking-tight">{row.name}</TableCell>
                  <TableCell className="text-muted-foreground">{row.department}</TableCell>
                  <TableCell className="text-right font-mono tabular-nums">
                    {row.revenue > 0 ? `EUR ${row.revenue.toLocaleString()}` : "\u2014"}
                  </TableCell>
                  <TableCell className={`text-right font-mono tabular-nums ${
                    row.growth > 0 ? "text-emerald-600" : row.growth < 0 ? "text-red-500" : "text-muted-foreground"
                  }`}>
                    {row.growth !== 0 ? `${row.growth > 0 ? "+" : ""}${row.growth}%` : "\u2014"}
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs tabular-nums tracking-wide text-muted-foreground">{row.updated}</TableCell>
                </motion.tr>
              ))}
            </motion.tbody>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
