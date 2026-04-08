"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowUpIcon, ArrowDownIcon, ArrowUpDownIcon } from "lucide-react"
import { motion } from "framer-motion"

type SortKey = "name" | "department" | "salary" | "performance"
type SortDir = "asc" | "desc"

const employees = [
  { name: "Elena Marchetti", department: "Engineering", salary: 128000, performance: 94 },
  { name: "Thomas Reiner", department: "Engineering", salary: 115000, performance: 87 },
  { name: "Sophie Duval", department: "Design", salary: 105000, performance: 91 },
  { name: "Marcus Chen", department: "Product", salary: 118000, performance: 82 },
  { name: "Aisha Patel", department: "Marketing", salary: 97000, performance: 89 },
  { name: "Jonas Eriksson", department: "Engineering", salary: 122000, performance: 78 },
  { name: "Carolina Ruiz", department: "Sales", salary: 92000, performance: 96 },
  { name: "Luisa Fernandez", department: "Support", salary: 84000, performance: 73 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
}

const rowVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function TablesSortable() {
  const [sortKey, setSortKey] = useState<SortKey>("name")
  const [sortDir, setSortDir] = useState<SortDir>("asc")

  const sorted = useMemo(() => {
    return [...employees].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      const cmp = typeof av === "string" ? av.localeCompare(bv as string) : (av as number) - (bv as number)
      return sortDir === "asc" ? cmp : -cmp
    })
  }, [sortKey, sortDir])

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return <ArrowUpDownIcon className="size-3 text-muted-foreground/50" />
    return sortDir === "asc" ? <ArrowUpIcon className="size-3" /> : <ArrowDownIcon className="size-3" />
  }

  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Team Directory</CardTitle>
        <CardDescription>Click column headers to sort</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {(["name", "department", "salary", "performance"] as SortKey[]).map((key) => (
                <TableHead
                  key={key}
                  className={`cursor-pointer select-none transition-colors hover:text-foreground ${key === "salary" || key === "performance" ? "text-right" : ""}`}
                  onClick={() => handleSort(key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    <SortIcon column={key} />
                  </span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <motion.tbody
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={`${sortKey}-${sortDir}`}
          >
            {sorted.map((emp) => (
              <motion.tr
                key={emp.name}
                variants={rowVariants}
                className="border-b transition-colors hover:bg-muted/50"
              >
                <TableCell className="font-medium">{emp.name}</TableCell>
                <TableCell className="text-muted-foreground">{emp.department}</TableCell>
                <TableCell className="text-right tabular-nums">${emp.salary.toLocaleString()}</TableCell>
                <TableCell className="text-right tabular-nums font-medium">{emp.performance}%</TableCell>
              </motion.tr>
            ))}
          </motion.tbody>
        </Table>
      </CardContent>
    </Card>
  )
}
