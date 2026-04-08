"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const subscriptions = [
  { id: "SUB-7482", plan: "Enterprise", customer: "Nexus Retail", mrr: "$2,400", status: "Active", renewal: "Jul 15, 2026" },
  { id: "SUB-7391", plan: "Pro", customer: "Stellar Corp", mrr: "$149", status: "Active", renewal: "Aug 3, 2026" },
  { id: "SUB-7284", plan: "Enterprise", customer: "Vortex Labs", mrr: "$2,400", status: "Pending", renewal: "May 22, 2026" },
  { id: "SUB-7193", plan: "Starter", customer: "Pinnacle Inc", mrr: "$29", status: "Cancelled", renewal: "-" },
  { id: "SUB-7082", plan: "Pro", customer: "Horizon Media", mrr: "$149", status: "Active", renewal: "Sep 8, 2026" },
  { id: "SUB-6934", plan: "Enterprise", customer: "Apex Finance", mrr: "$4,800", status: "Active", renewal: "Jun 1, 2026" },
  { id: "SUB-6847", plan: "Starter", customer: "Terra Systems", mrr: "$29", status: "Pending", renewal: "May 10, 2026" },
  { id: "SUB-6721", plan: "Pro", customer: "Pulse Digital", mrr: "$149", status: "Cancelled", renewal: "-" },
]

const statusConfig: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; dot: string }> = {
  Active: { variant: "secondary", dot: "bg-emerald-500" },
  Pending: { variant: "outline", dot: "bg-amber-500" },
  Cancelled: { variant: "destructive", dot: "bg-destructive" },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function TablesStatus() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Subscriptions</CardTitle>
        <CardDescription>Active, pending, and cancelled subscription statuses</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">MRR</TableHead>
              <TableHead>Renewal</TableHead>
            </TableRow>
          </TableHeader>
          <motion.tbody
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {subscriptions.map((sub) => {
              const config = statusConfig[sub.status]
              return (
                <motion.tr
                  key={sub.id}
                  variants={rowVariants}
                  className="border-b transition-colors hover:bg-muted/50"
                >
                  <TableCell className="font-mono text-xs text-muted-foreground">{sub.id}</TableCell>
                  <TableCell className="font-medium">{sub.customer}</TableCell>
                  <TableCell className="text-muted-foreground">{sub.plan}</TableCell>
                  <TableCell>
                    <Badge variant={config.variant}>
                      <span className={`size-1.5 rounded-full ${config.dot}`} />
                      {sub.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums font-medium">{sub.mrr}</TableCell>
                  <TableCell className="tabular-nums text-muted-foreground">{sub.renewal}</TableCell>
                </motion.tr>
              )
            })}
          </motion.tbody>
        </Table>
      </CardContent>
    </Card>
  )
}
