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
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { motion } from "framer-motion"

const allOrders = Array.from({ length: 42 }, (_, i) => ({
  id: `ORD-${(7200 + i).toString()}`,
  product: [
    "Wireless Headphones", "Ergonomic Keyboard", "USB-C Hub", "Portable SSD",
    "Webcam HD", "Monitor Arm", "Desk Mat XL", "Charging Station",
  ][i % 8],
  customer: [
    "Nexus Retail", "Stellar Corp", "Vortex Labs", "Pinnacle Inc",
    "Horizon Media", "Apex Finance", "Terra Systems", "Pulse Digital",
  ][i % 8],
  amount: `$${(Math.floor(Math.random() * 400) + 30).toFixed(2)}`,
  date: `${["Jan", "Feb", "Mar", "Apr"][Math.floor(i / 11)]} ${(i % 28) + 1}, 2026`,
}))

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.02 } },
}

const rowVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function TablesPagination() {
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(8)

  const totalPages = Math.ceil(allOrders.length / perPage)
  const pageData = useMemo(
    () => allOrders.slice(page * perPage, (page + 1) * perPage),
    [page, perPage]
  )

  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Orders</CardTitle>
        <CardDescription>{allOrders.length} total orders</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <motion.tbody
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={`${page}-${perPage}`}
          >
            {pageData.map((order) => (
              <motion.tr
                key={order.id}
                variants={rowVariants}
                className="border-b transition-colors hover:bg-muted/50"
              >
                <TableCell className="font-mono text-xs text-muted-foreground">{order.id}</TableCell>
                <TableCell className="font-medium">{order.product}</TableCell>
                <TableCell className="text-muted-foreground">{order.customer}</TableCell>
                <TableCell className="text-right tabular-nums">{order.amount}</TableCell>
                <TableCell className="tabular-nums text-muted-foreground">{order.date}</TableCell>
              </motion.tr>
            ))}
          </motion.tbody>
        </Table>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Rows per page</span>
            <Select value={perPage.toString()} onValueChange={(v) => { setPerPage(Number(v)); setPage(0) }}>
              <SelectTrigger size="sm" className="w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm tabular-nums text-muted-foreground">
              Page {page + 1} of {totalPages}
            </span>
            <div className="flex gap-1">
              <Button variant="outline" size="icon-xs" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
                <ChevronLeftIcon />
              </Button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const p = page < 3 ? i : page > totalPages - 3 ? totalPages - 5 + i : page - 2 + i
                if (p < 0 || p >= totalPages) return null
                return (
                  <Button
                    key={p}
                    variant={p === page ? "default" : "outline"}
                    size="icon-xs"
                    onClick={() => setPage(p)}
                    className="tabular-nums"
                  >
                    {p + 1}
                  </Button>
                )
              })}
              <Button variant="outline" size="icon-xs" disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)}>
                <ChevronRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
