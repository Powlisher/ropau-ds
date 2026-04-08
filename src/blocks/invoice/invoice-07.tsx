"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { RotateCcwIcon, DownloadIcon, ArrowRightIcon } from "lucide-react"

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

const creditNote = {
  number: "CN-2026-0008",
  originalInvoice: "INV-2026-0038",
  date: "April 8, 2026",
  client: "Atelier Bonheur",
  reason: "Scope reduction agreed during mid-project review",
  items: [
    { description: "Brand Guidelines (removed from scope)", amount: -2400 },
    { description: "Social Media Templates (reduced x8 to x4)", amount: -1600 },
  ],
  originalTotal: 7850,
  creditAmount: 4000,
  adjustedTotal: 3850,
  refundMethod: "Applied to next invoice",
}

export default function Invoice07() {
  return (
    <Card className="w-full max-w-md" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader className="pb-4">
          <motion.div variants={itemVariants} className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <RotateCcwIcon className="size-5 text-primary" />
                <CardTitle className="tracking-tight">Credit Note</CardTitle>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-mono tabular-nums">{creditNote.number}</span>
                <Badge className="bg-sky-100 text-sky-700 dark:bg-sky-950/30 dark:text-sky-400 border-0 text-[10px]">
                  Refund
                </Badge>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <DownloadIcon className="size-3.5 mr-1" />
              PDF
            </Button>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
                Client
              </span>
              <p className="text-sm font-semibold text-foreground mt-0.5">{creditNote.client}</p>
            </div>
            <div>
              <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
                Date
              </span>
              <p className="text-sm tabular-nums text-foreground mt-0.5">{creditNote.date}</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">References invoice</span>
            <Badge variant="outline" className="font-mono text-[10px] tabular-nums">
              {creditNote.originalInvoice}
            </Badge>
          </motion.div>

          <motion.div variants={itemVariants} className="rounded-xl bg-muted/50 px-4 py-3">
            <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
              Reason
            </span>
            <p className="text-sm text-foreground mt-1">{creditNote.reason}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
              Credited Items
            </span>
            {creditNote.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{item.description}</span>
                <span className="text-sm tabular-nums font-medium text-rose-600">
                  ${Math.abs(item.amount).toLocaleString()}.00
                </span>
              </div>
            ))}
          </motion.div>

          <Separator />

          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Original invoice total</span>
              <span className="tabular-nums text-foreground">
                ${creditNote.originalTotal.toLocaleString()}.00
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Credit amount</span>
              <span className="tabular-nums font-medium text-rose-600">
                -${creditNote.creditAmount.toLocaleString()}.00
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Adjusted Total</span>
              <span className="text-lg font-semibold tabular-nums tracking-tight text-foreground">
                ${creditNote.adjustedTotal.toLocaleString()}.00
              </span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="rounded-xl bg-emerald-50 dark:bg-emerald-950/20 px-4 py-3 ring-1 ring-emerald-200/50 dark:ring-emerald-800/30">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-medium tracking-wide uppercase text-emerald-700 dark:text-emerald-400">
                  Refund Method
                </span>
                <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300 mt-0.5">
                  {creditNote.refundMethod}
                </p>
              </div>
              <ArrowRightIcon className="size-4 text-emerald-600" />
            </div>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
