"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { PlusIcon, Trash2Icon, FileTextIcon } from "lucide-react"

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

type LineItem = {
  id: number
  description: string
  qty: number
  rate: number
}

export default function Invoice04() {
  const [items, setItems] = useState<LineItem[]>([
    { id: 1, description: "Web Development", qty: 1, rate: 4500 },
    { id: 2, description: "UX Audit", qty: 1, rate: 1800 },
  ])

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now(), description: "", qty: 1, rate: 0 },
    ])
  }

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateItem = (id: number, field: keyof LineItem, value: string | number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
  }

  const subtotal = items.reduce((sum, item) => sum + item.qty * item.rate, 0)
  const tax = Math.round(subtotal * 0.2)
  const total = subtotal + tax

  return (
    <Card className="w-full max-w-2xl" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight flex items-center gap-2">
              <FileTextIcon className="size-5 text-primary" />
              New Invoice
            </CardTitle>
            <CardDescription>
              Fill in the details below to generate a professional invoice.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium">Client Name</Label>
              <Input placeholder="Maison Colbert" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium">Client Email</Label>
              <Input type="email" placeholder="contact@maisoncolbert.fr" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium">Invoice Date</Label>
              <Input type="date" defaultValue="2026-04-08" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium">Due Date</Label>
              <Input type="date" defaultValue="2026-04-22" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
              Line Items
            </span>
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="grid grid-cols-12 gap-2 px-4 py-2.5 bg-muted/50 text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
                <span className="col-span-5">Description</span>
                <span className="col-span-2 text-right">Qty</span>
                <span className="col-span-3 text-right">Rate</span>
                <span className="col-span-2 text-right">Total</span>
              </div>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-2 px-4 py-2.5 border-t border-border/50 items-center group"
                >
                  <div className="col-span-5">
                    <Input
                      value={item.description}
                      onChange={(e) => updateItem(item.id, "description", e.target.value)}
                      placeholder="Service description"
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      value={item.qty}
                      onChange={(e) => updateItem(item.id, "qty", parseInt(e.target.value) || 0)}
                      className="h-8 text-sm tabular-nums text-right"
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      type="number"
                      value={item.rate}
                      onChange={(e) => updateItem(item.id, "rate", parseFloat(e.target.value) || 0)}
                      className="h-8 text-sm tabular-nums text-right"
                    />
                  </div>
                  <div className="col-span-2 flex items-center justify-end gap-1">
                    <span className="text-sm tabular-nums font-medium text-foreground">
                      ${(item.qty * item.rate).toLocaleString()}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-rose-500 text-muted-foreground"
                    >
                      <Trash2Icon className="size-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={addItem} className="w-fit">
              <PlusIcon className="size-3.5 mr-1" />
              Add Line Item
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-end">
            <div className="w-64 flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="tabular-nums text-foreground">${subtotal.toLocaleString()}.00</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">VAT (20%)</span>
                <span className="tabular-nums text-foreground">${tax.toLocaleString()}.00</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">Total</span>
                <span className="text-xl font-semibold tabular-nums tracking-tight text-foreground">
                  ${total.toLocaleString()}.00
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-2 justify-end pt-2">
            <Button variant="outline" size="sm">
              Save as Draft
            </Button>
            <Button size="sm">
              Send Invoice
            </Button>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
