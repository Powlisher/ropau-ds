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
import { CreditCardIcon, CheckCircleIcon } from "lucide-react"

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
  merchant: "Cafe de Flore",
  transactionId: "TXN-4829173",
  date: "April 8, 2026 at 12:34 PM",
  items: [
    { name: "Salade Nicoise", price: 18.50 },
    { name: "Croque Monsieur", price: 14.00 },
    { name: "Cafe creme (x2)", price: 9.60 },
    { name: "Eau minerale", price: 4.50 },
  ],
  subtotal: 46.60,
  tax: 4.66,
  total: 51.26,
  payment: {
    method: "Visa",
    last4: "4721",
    authCode: "A-82914",
    cardHolder: "M. Pelletier",
    network: "Visa",
  },
}

export default function Receipt03() {
  return (
    <Card className="w-full max-w-sm" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader className="pb-3">
          <motion.div variants={itemVariants} className="flex items-start justify-between">
            <div>
              <CardTitle className="tracking-tight">{receipt.merchant}</CardTitle>
              <p className="text-[10px] text-muted-foreground tabular-nums mt-0.5">
                {receipt.date}
              </p>
            </div>
            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-0 text-[10px]">
              Complete
            </Badge>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            {receipt.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{item.name}</span>
                <span className="text-sm tabular-nums text-foreground">
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
              <span className="text-xl font-semibold tabular-nums tracking-tight text-foreground">
                &euro;{receipt.total.toFixed(2)}
              </span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="rounded-xl bg-muted/50 p-4">
            <div className="flex items-center gap-2 mb-3">
              <CreditCardIcon className="size-4 text-muted-foreground" />
              <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
                Payment Method
              </span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-md bg-blue-600 text-white text-[10px] font-bold">
                  VISA
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {receipt.payment.network} ending {receipt.payment.last4}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{receipt.payment.cardHolder}</p>
                </div>
              </div>
              <CheckCircleIcon className="size-4 text-emerald-500" />
            </div>
            <div className="flex items-center gap-4 text-[10px] text-muted-foreground pt-2 border-t border-border/50">
              <div>
                <span className="font-medium tracking-wide uppercase">Transaction</span>
                <p className="font-mono tabular-nums text-foreground mt-0.5">
                  {receipt.transactionId}
                </p>
              </div>
              <div>
                <span className="font-medium tracking-wide uppercase">Auth Code</span>
                <p className="font-mono tabular-nums text-foreground mt-0.5">
                  {receipt.payment.authCode}
                </p>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
