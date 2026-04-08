"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { ShoppingBagIcon } from "lucide-react"

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
  store: "Merci Concept Store",
  receiptNo: "R-44821",
  date: "April 8, 2026",
  items: [
    { name: "Linen Table Runner (natural)", qty: 1, unit: 68.00, total: 68.00 },
    { name: "Ceramic Mug Set (terracotta, 4pc)", qty: 1, unit: 42.00, total: 42.00 },
    { name: "Beeswax Candle (large)", qty: 3, unit: 18.50, total: 55.50 },
    { name: "Hand-poured Soap (lavender)", qty: 2, unit: 12.00, total: 24.00 },
    { name: "Organic Cotton Napkins (set of 6)", qty: 1, unit: 36.00, total: 36.00 },
    { name: "Brass Candle Holder", qty: 1, unit: 45.00, total: 45.00 },
  ],
  subtotal: 270.50,
  discount: { label: "Loyalty 10% off", amount: 27.05 },
  taxRate: 20,
  taxAmount: 48.69,
  total: 292.14,
  itemCount: 9,
}

export default function Receipt04() {
  return (
    <Card className="w-full max-w-md" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader className="pb-3">
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
              <ShoppingBagIcon className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle className="tracking-tight">{receipt.store}</CardTitle>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                <span className="font-mono tabular-nums">{receipt.receiptNo}</span>
                <span className="tabular-nums">{receipt.date}</span>
              </div>
            </div>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <motion.div variants={itemVariants}>
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="grid grid-cols-12 gap-1 px-4 py-2 bg-muted/50 text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
                <span className="col-span-5">Item</span>
                <span className="col-span-2 text-center">Qty</span>
                <span className="col-span-3 text-right">Unit</span>
                <span className="col-span-2 text-right">Total</span>
              </div>
              {receipt.items.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-12 gap-1 px-4 py-2.5 border-t border-border/50 items-center"
                >
                  <span className="col-span-5 text-sm text-foreground truncate">{item.name}</span>
                  <span className="col-span-2 text-sm tabular-nums text-center text-muted-foreground">
                    {item.qty}
                  </span>
                  <span className="col-span-3 text-sm tabular-nums text-right text-muted-foreground">
                    &euro;{item.unit.toFixed(2)}
                  </span>
                  <span className="col-span-2 text-sm tabular-nums text-right font-medium text-foreground">
                    &euro;{item.total.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Subtotal ({receipt.itemCount} items)
              </span>
              <span className="tabular-nums text-foreground">
                &euro;{receipt.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-emerald-600">{receipt.discount.label}</span>
              <span className="tabular-nums text-emerald-600">
                -&euro;{receipt.discount.amount.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">TVA ({receipt.taxRate}%)</span>
              <span className="tabular-nums text-foreground">
                &euro;{receipt.taxAmount.toFixed(2)}
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Total</span>
              <span className="text-xl font-semibold tabular-nums tracking-tight text-foreground">
                &euro;{receipt.total.toFixed(2)}
              </span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center pt-1">
            <p className="text-[10px] text-muted-foreground">
              Returns accepted within 14 days with receipt
            </p>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
