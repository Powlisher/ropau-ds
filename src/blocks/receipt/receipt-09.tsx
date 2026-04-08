"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { HeartIcon } from "lucide-react"

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
  restaurant: "Le Petit Cler",
  address: "22 Rue Cler, 75007 Paris",
  date: "April 8, 2026 at 8:42 PM",
  server: "Thomas R.",
  table: "14",
  items: [
    { name: "Soupe a l'oignon", price: 12.00 },
    { name: "Bavette a l'echalote", price: 24.50 },
    { name: "Tarte Tatin", price: 11.00 },
    { name: "Verre de Bordeaux (x2)", price: 22.00 },
  ],
  subtotal: 69.50,
  tax: 6.95,
  totalBeforeTip: 76.45,
}

const tipOptions = [
  { percent: 10, label: "10%" },
  { percent: 15, label: "15%" },
  { percent: 20, label: "20%" },
]

export default function Receipt09() {
  const [selectedTip, setSelectedTip] = useState<number | null>(15)
  const [customTip, setCustomTip] = useState<string>("")

  const tipAmount = customTip
    ? parseFloat(customTip) || 0
    : selectedTip
      ? Math.round(receipt.totalBeforeTip * (selectedTip / 100) * 100) / 100
      : 0

  const grandTotal = Math.round((receipt.totalBeforeTip + tipAmount) * 100) / 100

  return (
    <Card className="w-full max-w-sm" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardContent className="p-6 flex flex-col gap-5">
          <motion.div variants={itemVariants} className="text-center">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {receipt.restaurant}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{receipt.address}</p>
            <div className="flex items-center justify-center gap-3 text-[10px] text-muted-foreground tabular-nums mt-1">
              <span>{receipt.date}</span>
              <span>Table {receipt.table}</span>
              <span>Server: {receipt.server}</span>
            </div>
          </motion.div>

          <Separator className="border-dashed" />

          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            {receipt.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{item.name}</span>
                <span className="text-sm tabular-nums font-medium text-foreground">
                  &euro;{item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </motion.div>

          <Separator className="border-dashed" />

          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="tabular-nums">&euro;{receipt.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">TVA (10%)</span>
              <span className="tabular-nums">&euro;{receipt.tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Total</span>
              <span className="text-base font-semibold tabular-nums tracking-tight text-foreground">
                &euro;{receipt.totalBeforeTip.toFixed(2)}
              </span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <HeartIcon className="size-4 text-primary" />
              <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
                Add a Tip
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {tipOptions.map((opt) => (
                <motion.button
                  key={opt.percent}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                  onClick={() => {
                    setSelectedTip(opt.percent)
                    setCustomTip("")
                  }}
                  className={`rounded-lg border py-2.5 text-center transition-colors ${
                    selectedTip === opt.percent && !customTip
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-foreground hover:border-primary/50"
                  }`}
                >
                  <span className="text-sm font-semibold">{opt.label}</span>
                  <p className="text-[10px] tabular-nums text-muted-foreground mt-0.5">
                    &euro;{(receipt.totalBeforeTip * opt.percent / 100).toFixed(2)}
                  </p>
                </motion.button>
              ))}
              <div
                className={`rounded-lg border py-1.5 px-2 flex flex-col items-center justify-center transition-colors ${
                  customTip ? "border-primary ring-1 ring-primary/20" : "border-border"
                }`}
              >
                <span className="text-[10px] text-muted-foreground">Custom</span>
                <input
                  type="number"
                  value={customTip}
                  onChange={(e) => {
                    setCustomTip(e.target.value)
                    setSelectedTip(null)
                  }}
                  placeholder="0"
                  className="w-full text-center text-sm font-semibold tabular-nums bg-transparent outline-none text-foreground placeholder:text-muted-foreground/40"
                />
              </div>
            </div>
          </motion.div>

          {tipAmount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
              className="flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tip</span>
                <span className="tabular-nums text-primary font-medium">
                  +&euro;{tipAmount.toFixed(2)}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">Grand Total</span>
                <span className="text-xl font-semibold tabular-nums tracking-tight text-foreground">
                  &euro;{grandTotal.toFixed(2)}
                </span>
              </div>
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <Button className="w-full" size="sm">
              Pay &euro;{grandTotal.toFixed(2)}
            </Button>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
