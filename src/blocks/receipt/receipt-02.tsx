"use client"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { CheckCircleIcon, DownloadIcon } from "lucide-react"

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
  brand: "Studio Lumiere",
  orderNumber: "ORD-38291",
  date: "April 8, 2026",
  email: "margaux@pelletier.fr",
  items: [
    { name: "Creative Direction Workshop", amount: 480 },
    { name: "Brand Audit Report", amount: 320 },
  ],
  subtotal: 800,
  tax: 160,
  total: 960,
}

export default function Receipt02() {
  return (
    <Card className="w-full max-w-md overflow-hidden" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-primary px-6 py-5">
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <span className="text-lg font-semibold tracking-tight text-primary-foreground">
              {receipt.brand}
            </span>
            <Badge className="bg-primary-foreground/20 text-primary-foreground border-0 text-[10px]">
              Paid
            </Badge>
          </motion.div>
        </div>

        <CardContent className="p-6 flex flex-col gap-5">
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/30">
              <CheckCircleIcon className="size-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Payment Confirmed</p>
              <p className="text-xs text-muted-foreground">
                Receipt sent to {receipt.email}
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-6 text-xs text-muted-foreground">
            <div>
              <span className="text-[10px] font-medium tracking-wide uppercase">Order</span>
              <p className="font-mono tabular-nums text-foreground mt-0.5">{receipt.orderNumber}</p>
            </div>
            <div>
              <span className="text-[10px] font-medium tracking-wide uppercase">Date</span>
              <p className="tabular-nums text-foreground mt-0.5">{receipt.date}</p>
            </div>
          </motion.div>

          <Separator />

          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            {receipt.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{item.name}</span>
                <span className="text-sm tabular-nums font-medium text-foreground">
                  ${item.amount.toLocaleString()}.00
                </span>
              </div>
            ))}
          </motion.div>

          <Separator />

          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="tabular-nums">${receipt.subtotal.toLocaleString()}.00</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Tax (20%)</span>
              <span className="tabular-nums">${receipt.tax.toLocaleString()}.00</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-sm font-semibold text-foreground">Total Paid</span>
              <span className="text-xl font-semibold tabular-nums tracking-tight text-foreground">
                ${receipt.total.toLocaleString()}.00
              </span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-2 pt-1">
            <Button variant="outline" size="sm" className="flex-1">
              <DownloadIcon className="size-3.5 mr-1" />
              Download
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              View Order
            </Button>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
