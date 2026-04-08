"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DownloadIcon } from "lucide-react"
import { motion } from "framer-motion"

const invoices = [
  { id: "INV-2026-0487", client: "Nexus Retail", amount: "$4,820.00", date: "Apr 1, 2026", due: "May 1, 2026", status: "Paid" },
  { id: "INV-2026-0473", client: "Stellar Corp", amount: "$12,350.00", date: "Mar 15, 2026", due: "Apr 15, 2026", status: "Paid" },
  { id: "INV-2026-0461", client: "Vortex Labs", amount: "$7,180.00", date: "Mar 1, 2026", due: "Apr 1, 2026", status: "Overdue" },
  { id: "INV-2026-0448", client: "Pinnacle Inc", amount: "$2,940.00", date: "Feb 15, 2026", due: "Mar 15, 2026", status: "Paid" },
  { id: "INV-2026-0434", client: "Horizon Media", amount: "$18,720.00", date: "Feb 1, 2026", due: "Mar 1, 2026", status: "Paid" },
  { id: "INV-2026-0421", client: "Apex Finance", amount: "$9,460.00", date: "Jan 15, 2026", due: "Feb 15, 2026", status: "Pending" },
  { id: "INV-2026-0408", client: "Terra Systems", amount: "$3,270.00", date: "Jan 1, 2026", due: "Feb 1, 2026", status: "Paid" },
  { id: "INV-2025-0394", client: "Pulse Digital", amount: "$5,890.00", date: "Dec 15, 2025", due: "Jan 15, 2026", status: "Paid" },
]

const statusConfig: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; dot: string }> = {
  Paid: { variant: "secondary", dot: "bg-emerald-500" },
  Pending: { variant: "outline", dot: "bg-amber-500" },
  Overdue: { variant: "destructive", dot: "bg-destructive" },
}

const total = invoices.reduce((sum, inv) => sum + parseFloat(inv.amount.replace(/[$,]/g, "")), 0)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function TablesInvoice() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Invoices</CardTitle>
        <CardDescription>Billing history and payment status</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Due</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <motion.tbody
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {invoices.map((invoice) => {
              const config = statusConfig[invoice.status]
              return (
                <motion.tr
                  key={invoice.id}
                  variants={rowVariants}
                  className={`border-b transition-colors hover:bg-muted/50 ${
                    invoice.status === "Overdue" ? "ring-1 ring-inset ring-destructive/20 bg-destructive/5" : ""
                  }`}
                >
                  <TableCell className="font-mono text-xs">{invoice.id}</TableCell>
                  <TableCell className="font-medium">{invoice.client}</TableCell>
                  <TableCell className="tabular-nums text-muted-foreground">{invoice.date}</TableCell>
                  <TableCell className="tabular-nums text-muted-foreground">{invoice.due}</TableCell>
                  <TableCell>
                    <Badge variant={config.variant}>
                      <span className={`size-1.5 rounded-full ${config.dot}`} />
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums font-semibold">{invoice.amount}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon-xs">
                      <DownloadIcon />
                    </Button>
                  </TableCell>
                </motion.tr>
              )
            })}
          </motion.tbody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} className="font-semibold">Total</TableCell>
              <TableCell className="text-right tabular-nums font-bold text-lg tracking-tight">
                ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  )
}
