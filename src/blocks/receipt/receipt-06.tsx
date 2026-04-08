"use client"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { QrCodeIcon, SmartphoneIcon } from "lucide-react"

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
  merchant: "Pharmacie Centrale",
  address: "88 Boulevard Haussmann, 75008 Paris",
  date: "April 8, 2026 at 3:21 PM",
  receiptNo: "D-70294",
  items: [
    { name: "Creme solaire SPF50 (200ml)", price: 22.90 },
    { name: "Vitamine D3 (90 caps)", price: 14.50 },
    { name: "Serum hyaluronique", price: 31.00 },
  ],
  total: 68.40,
  verificationUrl: "receipt.pharm-centrale.fr/d70294",
}

export default function Receipt06() {
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
              {receipt.merchant}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{receipt.address}</p>
            <p className="text-[10px] text-muted-foreground tabular-nums mt-1">{receipt.date}</p>
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

          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Total</span>
            <span className="text-xl font-semibold tabular-nums tracking-tight text-foreground">
              &euro;{receipt.total.toFixed(2)}
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col items-center gap-3 pt-2">
            <div className="flex items-center gap-1.5">
              <QrCodeIcon className="size-3.5 text-muted-foreground" />
              <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
                Digital Receipt
              </span>
            </div>
            <div className="size-32 rounded-xl bg-muted/80 border border-border flex items-center justify-center">
              <div className="grid grid-cols-7 grid-rows-7 gap-px">
                {Array.from({ length: 49 }, (_, i) => {
                  const row = Math.floor(i / 7)
                  const col = i % 7
                  const isCornerModule =
                    (row < 3 && col < 3) ||
                    (row < 3 && col > 3) ||
                    (row > 3 && col < 3)
                  const isData = [10, 11, 17, 18, 24, 25, 31, 32, 38, 39, 33, 40].includes(i)
                  return (
                    <div
                      key={i}
                      className={`size-3 rounded-[1px] ${
                        isCornerModule || isData ? "bg-foreground/80" : "bg-transparent"
                      }`}
                    />
                  )
                })}
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground text-center max-w-[200px]">
              Scan to save this receipt to your phone or verify authenticity
            </p>
            <p className="text-[10px] font-mono text-muted-foreground tabular-nums">
              {receipt.verificationUrl}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <SmartphoneIcon className="size-3.5 mr-1" />
              Save to Wallet
            </Button>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
