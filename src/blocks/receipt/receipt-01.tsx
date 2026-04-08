"use client"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { ReceiptIcon } from "lucide-react"

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
  store: "Boulangerie Saint-Honore",
  address: "14 Rue du Faubourg, 75008 Paris",
  date: "April 8, 2026 at 8:47 AM",
  receiptNo: "R-92847",
  items: [
    { name: "Pain de campagne", qty: 1, price: 4.20 },
    { name: "Croissant au beurre", qty: 2, price: 2.50 },
    { name: "Tarte aux pommes (part)", qty: 1, price: 5.80 },
    { name: "Cafe allonge", qty: 1, price: 2.90 },
  ],
  subtotal: 17.90,
  tax: 1.79,
  total: 19.69,
}

export default function Receipt01() {
  return (
    <Card className="w-full max-w-sm" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardContent className="p-6 flex flex-col gap-5">
          <motion.div variants={itemVariants} className="text-center">
            <div className="flex justify-center mb-2">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                <ReceiptIcon className="size-5 text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {receipt.store}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{receipt.address}</p>
            <p className="text-[10px] text-muted-foreground tabular-nums mt-1">{receipt.date}</p>
          </motion.div>

          <Separator className="border-dashed" />

          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            {receipt.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {item.qty > 1 && (
                    <span className="text-xs tabular-nums text-muted-foreground w-5">
                      {item.qty}x
                    </span>
                  )}
                  {item.qty === 1 && <span className="w-5" />}
                  <span className="text-sm text-foreground">{item.name}</span>
                </div>
                <span className="text-sm tabular-nums font-medium text-foreground">
                  {(item.qty * item.price).toFixed(2)}
                </span>
              </div>
            ))}
          </motion.div>

          <Separator className="border-dashed" />

          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="tabular-nums text-foreground">
                {receipt.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">TVA (10%)</span>
              <span className="tabular-nums text-foreground">
                {receipt.tax.toFixed(2)}
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

          <motion.div variants={itemVariants} className="text-center">
            <p className="text-[10px] text-muted-foreground font-mono tabular-nums">
              Receipt #{receipt.receiptNo}
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Thank you for your visit
            </p>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
