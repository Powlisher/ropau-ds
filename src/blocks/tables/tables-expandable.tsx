"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronRightIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const orders = [
  {
    id: "ORD-8247",
    customer: "Nexus Retail",
    total: "$1,284.00",
    status: "Delivered",
    date: "Apr 2, 2026",
    items: [
      { name: "Wireless Headphones Pro", qty: 4, price: "$179.00" },
      { name: "USB-C Docking Station", qty: 2, price: "$89.99" },
      { name: "Laptop Stand Aluminum", qty: 3, price: "$42.00" },
    ],
  },
  {
    id: "ORD-8193",
    customer: "Stellar Corp",
    total: "$649.00",
    status: "Shipped",
    date: "Mar 28, 2026",
    items: [
      { name: "Ultra-Wide Monitor 34\"", qty: 1, price: "$649.00" },
    ],
  },
  {
    id: "ORD-8104",
    customer: "Vortex Labs",
    total: "$827.50",
    status: "Processing",
    date: "Mar 25, 2026",
    items: [
      { name: "Ergonomic Keyboard V2", qty: 3, price: "$129.50" },
      { name: "Mechanical Mouse Lite", qty: 5, price: "$54.00" },
      { name: "Desk Mat XL", qty: 2, price: "$34.75" },
    ],
  },
  {
    id: "ORD-7983",
    customer: "Pinnacle Inc",
    total: "$378.00",
    status: "Delivered",
    date: "Mar 20, 2026",
    items: [
      { name: "Portable SSD 1TB", qty: 4, price: "$94.50" },
    ],
  },
  {
    id: "ORD-7841",
    customer: "Horizon Media",
    total: "$201.00",
    status: "Cancelled",
    date: "Mar 15, 2026",
    items: [
      { name: "Webcam HD 1080p", qty: 3, price: "$67.00" },
    ],
  },
]

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  Delivered: "secondary",
  Shipped: "default",
  Processing: "outline",
  Cancelled: "destructive",
}

export default function TablesExpandable() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Order History</CardTitle>
        <CardDescription>Click a row to expand order details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            <TableHeader>
              <TableRow>
                <TableHead className="w-8" />
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <tbody>
              {orders.map((order) => {
                const isOpen = expanded.has(order.id)
                return (
                  <Collapsible key={order.id} open={isOpen} onOpenChange={() => toggle(order.id)} render={<tbody />}>
                    <CollapsibleTrigger
                      render={
                        <tr
                          className="border-b cursor-pointer transition-colors hover:bg-muted/50"
                          aria-expanded={isOpen}
                        />
                      }
                    >
                      <TableCell className="w-8">
                        <motion.div
                          animate={{ rotate: isOpen ? 90 : 0 }}
                          transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
                        >
                          <ChevronRightIcon className="size-4 text-muted-foreground" />
                        </motion.div>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{order.id}</TableCell>
                      <TableCell className="font-medium">{order.customer}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[order.status]}>{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right tabular-nums font-medium">{order.total}</TableCell>
                      <TableCell className="tabular-nums text-muted-foreground">{order.date}</TableCell>
                    </CollapsibleTrigger>
                    <CollapsibleContent render={<tr className="border-b bg-muted/30" />}>
                      <td colSpan={6} className="p-0">
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ type: "spring" as const, stiffness: 300, damping: 28 }}
                              className="overflow-hidden"
                            >
                              <div className="px-10 py-3">
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="text-xs text-muted-foreground">
                                      <th className="pb-1.5 text-left font-medium">Item</th>
                                      <th className="pb-1.5 text-right font-medium">Qty</th>
                                      <th className="pb-1.5 text-right font-medium">Price</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {order.items.map((item) => (
                                      <tr key={item.name}>
                                        <td className="py-1">{item.name}</td>
                                        <td className="py-1 text-right tabular-nums text-muted-foreground">{item.qty}</td>
                                        <td className="py-1 text-right tabular-nums">{item.price}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </td>
                    </CollapsibleContent>
                  </Collapsible>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
