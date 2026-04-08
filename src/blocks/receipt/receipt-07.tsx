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
import { RepeatIcon, CalendarIcon, CreditCardIcon } from "lucide-react"

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

const receipt = {
  service: "Studio Lumiere Pro",
  plan: "Business Plan",
  billingPeriod: "April 1 - April 30, 2026",
  invoiceDate: "April 1, 2026",
  receiptNo: "SUB-29841",
  items: [
    { description: "Business Plan (monthly)", amount: 49.00 },
    { description: "Additional seat (x3)", amount: 27.00 },
    { description: "Storage upgrade (100GB)", amount: 9.00 },
  ],
  subtotal: 85.00,
  discount: { label: "Annual commitment (-15%)", amount: 12.75 },
  tax: 14.45,
  total: 86.70,
  nextBilling: "May 1, 2026",
  paymentMethod: "Visa ending 4721",
}

export default function Receipt07() {
  return (
    <Card className="w-full max-w-md" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader className="pb-3">
          <motion.div variants={itemVariants} className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <RepeatIcon className="size-5 text-primary" />
              <div>
                <CardTitle className="tracking-tight">Subscription Receipt</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">{receipt.service}</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-[10px]">{receipt.plan}</Badge>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <motion.div variants={itemVariants} className="rounded-xl bg-primary/5 px-4 py-3 flex items-center gap-3">
            <CalendarIcon className="size-4 text-primary shrink-0" />
            <div>
              <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
                Billing Period
              </span>
              <p className="text-sm tabular-nums font-medium text-foreground">{receipt.billingPeriod}</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-3 text-xs text-muted-foreground">
            <div>
              <span className="text-[10px] font-medium tracking-wide uppercase">Receipt</span>
              <p className="font-mono tabular-nums text-foreground mt-0.5">{receipt.receiptNo}</p>
            </div>
            <div>
              <span className="text-[10px] font-medium tracking-wide uppercase">Invoiced</span>
              <p className="tabular-nums text-foreground mt-0.5">{receipt.invoiceDate}</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            {receipt.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{item.description}</span>
                <span className="text-sm tabular-nums font-medium text-foreground">
                  ${item.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </motion.div>

          <Separator />

          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="tabular-nums">${receipt.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-emerald-600">{receipt.discount.label}</span>
              <span className="tabular-nums text-emerald-600">
                -${receipt.discount.amount.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Tax (20%)</span>
              <span className="tabular-nums">${receipt.tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Total Charged</span>
              <span className="text-xl font-semibold tabular-nums tracking-tight text-foreground">
                ${receipt.total.toFixed(2)}
              </span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="rounded-xl bg-muted/50 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCardIcon className="size-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{receipt.paymentMethod}</span>
            </div>
            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-0 text-[10px]">
              Paid
            </Badge>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Next billing: <span className="tabular-nums font-medium text-foreground">{receipt.nextBilling}</span>
            </span>
            <Button variant="ghost" size="sm" className="text-xs h-7">
              Manage Subscription
            </Button>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
