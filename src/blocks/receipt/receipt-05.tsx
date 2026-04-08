"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { RotateCcwIcon, PackageIcon } from "lucide-react"

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
  refundReceiptNo: "RR-5012",
  originalDate: "April 1, 2026",
  refundDate: "April 7, 2026",
  originalItems: [
    { name: "Linen Table Runner (natural)", qty: 1, price: 68.00, refunded: false },
    { name: "Ceramic Mug Set (terracotta, 4pc)", qty: 1, price: 42.00, refunded: true, reason: "Damaged on delivery" },
    { name: "Beeswax Candle (large)", qty: 3, price: 55.50, refunded: false },
  ],
  refundAmount: 42.00,
  refundMethod: "Original payment method (Visa ending 4721)",
  refundStatus: "Processed",
  expectedArrival: "3-5 business days",
}

export default function Receipt05() {
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
              <RotateCcwIcon className="size-5 text-primary" />
              <div>
                <CardTitle className="tracking-tight">Refund Receipt</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">{receipt.store}</p>
              </div>
            </div>
            <Badge className="bg-sky-100 text-sky-700 dark:bg-sky-950/30 dark:text-sky-400 border-0 text-[10px]">
              {receipt.refundStatus}
            </Badge>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <motion.div variants={itemVariants} className="flex items-center gap-4 text-xs text-muted-foreground">
            <div>
              <span className="text-[10px] font-medium tracking-wide uppercase">Original</span>
              <p className="font-mono tabular-nums text-foreground mt-0.5">{receipt.receiptNo}</p>
            </div>
            <div>
              <span className="text-[10px] font-medium tracking-wide uppercase">Refund</span>
              <p className="font-mono tabular-nums text-foreground mt-0.5">{receipt.refundReceiptNo}</p>
            </div>
            <div>
              <span className="text-[10px] font-medium tracking-wide uppercase">Date</span>
              <p className="tabular-nums text-foreground mt-0.5">{receipt.refundDate}</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
              Items
            </span>
            {receipt.originalItems.map((item, i) => (
              <div
                key={i}
                className={`flex items-start justify-between rounded-xl px-3 py-2.5 ${
                  item.refunded
                    ? "bg-rose-50 dark:bg-rose-950/15 ring-1 ring-rose-200/50 dark:ring-rose-800/30"
                    : "bg-muted/30"
                }`}
              >
                <div className="flex items-start gap-2">
                  <PackageIcon className={`size-4 mt-0.5 shrink-0 ${
                    item.refunded ? "text-rose-500" : "text-muted-foreground"
                  }`} />
                  <div>
                    <span className={`text-sm ${item.refunded ? "line-through text-muted-foreground" : "text-foreground"}`}>
                      {item.name}
                    </span>
                    {item.refunded && item.reason && (
                      <p className="text-[10px] text-rose-600 dark:text-rose-400 mt-0.5">
                        Reason: {item.reason}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <span className={`text-sm tabular-nums font-medium ${
                    item.refunded ? "text-rose-600 line-through" : "text-foreground"
                  }`}>
                    &euro;{item.price.toFixed(2)}
                  </span>
                  {item.refunded && (
                    <Badge variant="outline" className="text-[9px] ml-1 text-rose-600 border-rose-300">
                      Refunded
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          <Separator />

          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Refund Amount</span>
              <span className="text-lg font-semibold tabular-nums tracking-tight text-rose-600">
                -&euro;{receipt.refundAmount.toFixed(2)}
              </span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="rounded-xl bg-muted/50 px-4 py-3">
            <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
              Refund To
            </span>
            <p className="text-sm text-foreground mt-1">{receipt.refundMethod}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Expected within {receipt.expectedArrival}
            </p>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
