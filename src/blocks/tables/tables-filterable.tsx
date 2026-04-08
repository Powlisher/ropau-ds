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
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { SearchIcon } from "lucide-react"
import { motion } from "framer-motion"

const tickets = [
  { id: "TKT-4821", title: "Login page 502 error after deploy", assignee: "Thomas Reiner", status: "Open", priority: "High", created: "Apr 7, 2026" },
  { id: "TKT-4819", title: "CSV export missing currency symbol", assignee: "Marcus Chen", status: "In Progress", priority: "Medium", created: "Apr 6, 2026" },
  { id: "TKT-4815", title: "Mobile nav overlaps content on iOS", assignee: "Sophie Duval", status: "Open", priority: "High", created: "Apr 5, 2026" },
  { id: "TKT-4812", title: "Slow query on dashboard analytics", assignee: "Jonas Eriksson", status: "Resolved", priority: "Medium", created: "Apr 4, 2026" },
  { id: "TKT-4808", title: "Password reset email not arriving", assignee: "Elena Marchetti", status: "Open", priority: "Critical", created: "Apr 3, 2026" },
  { id: "TKT-4803", title: "Dark mode color contrast on badges", assignee: "Sophie Duval", status: "In Progress", priority: "Low", created: "Apr 2, 2026" },
  { id: "TKT-4798", title: "Webhook retry logic failing silently", assignee: "Thomas Reiner", status: "Resolved", priority: "High", created: "Apr 1, 2026" },
  { id: "TKT-4794", title: "Image upload size limit error message", assignee: "Aisha Patel", status: "Closed", priority: "Low", created: "Mar 30, 2026" },
]

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  Open: "default",
  "In Progress": "secondary",
  Resolved: "outline",
  Closed: "outline",
}

const priorityStyles: Record<string, string> = {
  Critical: "ring-2 ring-destructive/30 bg-destructive/5",
  High: "ring-1 ring-primary/20 bg-primary/5",
  Medium: "",
  Low: "opacity-80",
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function TablesFilterable() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filtered = useMemo(() => {
    return tickets.filter((t) => {
      const matchesSearch = search === "" || t.title.toLowerCase().includes(search.toLowerCase()) || t.assignee.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === "all" || t.status === statusFilter
      const matchesPriority = priorityFilter === "all" || t.priority === priorityFilter
      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [search, statusFilter, priorityFilter])

  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Support Tickets</CardTitle>
        <CardDescription>Filter and search through open tickets</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tickets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={statusFilter} onValueChange={(v: string | null) => setStatusFilter(v ?? "all")}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={(v: string | null) => setPriorityFilter(v ?? "all")}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All priorities</SelectItem>
              <SelectItem value="Critical">Critical</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <motion.tbody
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={`${search}-${statusFilter}-${priorityFilter}`}
          >
            {filtered.map((ticket) => (
              <motion.tr
                key={ticket.id}
                variants={rowVariants}
                className={`border-b transition-colors hover:bg-muted/50 ${priorityStyles[ticket.priority]}`}
              >
                <TableCell className="font-mono text-xs text-muted-foreground">{ticket.id}</TableCell>
                <TableCell className="font-medium">{ticket.title}</TableCell>
                <TableCell className="text-muted-foreground">{ticket.assignee}</TableCell>
                <TableCell><Badge variant={statusVariant[ticket.status]}>{ticket.status}</Badge></TableCell>
                <TableCell>
                  <span className={`text-xs font-medium ${ticket.priority === "Critical" ? "text-destructive" : ticket.priority === "High" ? "text-primary" : "text-muted-foreground"}`}>
                    {ticket.priority}
                  </span>
                </TableCell>
                <TableCell className="tabular-nums text-muted-foreground">{ticket.created}</TableCell>
              </motion.tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-sm text-muted-foreground">
                  No tickets match your filters. Try adjusting the search or status criteria.
                </td>
              </tr>
            )}
          </motion.tbody>
        </Table>
      </CardContent>
    </Card>
  )
}
