"use client"

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { FileTextIcon, DownloadIcon } from "lucide-react"

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

const invoice = {
  number: "INV-2026-0047",
  date: "April 8, 2026",
  dueDate: "April 22, 2026",
  status: "Pending",
  from: {
    name: "Studio Lumiere SARL",
    address: "42 Rue de Rivoli, 75001 Paris",
    vat: "FR 82 123456789",
  },
  to: {
    name: "Margaux Pelletier",
    company: "Pelletier Consulting",
    address: "18 Avenue Montaigne, 75008 Paris",
  },
  items: [
    { description: "Brand Identity Package", qty: 1, rate: 3200, total: 3200 },
    { description: "Website Design (5 pages)", qty: 1, rate: 4800, total: 4800 },
    { description: "Motion Design Assets", qty: 3, rate: 450, total: 1350 },
    { description: "Project Management", qty: 12, rate: 95, total: 1140 },
  ],
  subtotal: 10490,
  taxRate: 20,
  taxAmount: 2098,
  total: 12588,
}

export default function Invoice01() {
  return (
    <Card className="w-full max-w-2xl" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader className="pb-4">
          <motion.div variants={itemVariants} className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FileTextIcon className="size-5 text-primary" />
                <span className="text-lg font-semibold tracking-tight text-foreground">Invoice</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="font-mono tabular-nums">{invoice.number}</span>
                <span className="tabular-nums">Issued {invoice.date}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-0 text-[10px]">
                {invoice.status}
              </Badge>
              <Button variant="outline" size="sm">
                <DownloadIcon className="size-3.5 mr-1" />
                PDF
              </Button>
            </div>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
            <div>
              <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
                From
              </span>
              <p className="text-sm font-semibold text-foreground mt-1">{invoice.from.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{invoice.from.address}</p>
              <p className="text-xs text-muted-foreground font-mono tabular-nums mt-0.5">
                VAT: {invoice.from.vat}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
                Bill To
              </span>
              <p className="text-sm font-semibold text-foreground mt-1">{invoice.to.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{invoice.to.company}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{invoice.to.address}</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-6">
            <div>
              <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
                Issue Date
              </span>
              <p className="text-sm tabular-nums text-foreground mt-0.5">{invoice.date}</p>
            </div>
            <div>
              <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
                Due Date
              </span>
              <p className="text-sm tabular-nums text-foreground mt-0.5">{invoice.dueDate}</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="grid grid-cols-12 gap-2 px-4 py-2.5 bg-muted/50 text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
                <span className="col-span-6">Description</span>
                <span className="col-span-2 text-right">Qty</span>
                <span className="col-span-2 text-right">Rate</span>
                <span className="col-span-2 text-right">Amount</span>
              </div>
              {invoice.items.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-12 gap-2 px-4 py-3 border-t border-border/50 items-center"
                >
                  <span className="col-span-6 text-sm text-foreground">{item.description}</span>
                  <span className="col-span-2 text-sm tabular-nums text-right text-muted-foreground">
                    {item.qty}
                  </span>
                  <span className="col-span-2 text-sm tabular-nums text-right text-muted-foreground">
                    ${item.rate.toLocaleString()}
                  </span>
                  <span className="col-span-2 text-sm tabular-nums text-right font-medium text-foreground">
                    ${item.total.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-end">
            <div className="w-64 flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="tabular-nums text-foreground">
                  ${invoice.subtotal.toLocaleString()}.00
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">VAT ({invoice.taxRate}%)</span>
                <span className="tabular-nums text-foreground">
                  ${invoice.taxAmount.toLocaleString()}.00
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">Total Due</span>
                <span className="text-xl font-semibold tabular-nums tracking-tight text-foreground">
                  ${invoice.total.toLocaleString()}.00
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="rounded-xl bg-muted/50 px-4 py-3">
            <p className="text-xs text-muted-foreground">
              Payment due within 14 days. Bank transfer to IBAN FR76 1234 5678 9012 3456 7890 123.
              Please reference invoice number {invoice.number} in your transfer.
            </p>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
