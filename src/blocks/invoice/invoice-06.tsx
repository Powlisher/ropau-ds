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
import { LinkIcon, CopyIcon, QrCodeIcon, ExternalLinkIcon } from "lucide-react"

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
  client: "Pelletier Consulting",
  total: 12588,
  dueDate: "April 22, 2026",
  paymentLink: "https://pay.studio-lumiere.fr/inv/8k2j9a",
  items: [
    { description: "Brand Identity Package", amount: 3200 },
    { description: "Website Design (5 pages)", amount: 4800 },
    { description: "Motion Design Assets (x3)", amount: 1350 },
    { description: "Project Management (12h)", amount: 1140 },
  ],
  tax: 2098,
}

export default function Invoice06() {
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
              <CardTitle className="tracking-tight">Payment Invoice</CardTitle>
              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                <span className="font-mono tabular-nums">{invoice.number}</span>
                <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-0 text-[10px]">
                  Awaiting Payment
                </Badge>
              </div>
            </div>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
              Bill To
            </span>
            <span className="text-sm font-semibold text-foreground">{invoice.client}</span>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            {invoice.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{item.description}</span>
                <span className="text-sm tabular-nums text-muted-foreground">
                  ${item.amount.toLocaleString()}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
              <span>VAT (20%)</span>
              <span className="tabular-nums">${invoice.tax.toLocaleString()}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Total Due</span>
              <span className="text-xl font-semibold tabular-nums tracking-tight text-foreground">
                ${invoice.total.toLocaleString()}.00
              </span>
            </div>
            <p className="text-xs text-muted-foreground tabular-nums">
              Due by {invoice.dueDate}
            </p>
          </motion.div>

          <Separator />

          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground flex items-center gap-1.5">
              <LinkIcon className="size-3" />
              Payment Link
            </span>
            <div className="flex items-center gap-2 rounded-xl bg-muted/50 px-4 py-3">
              <span className="text-xs font-mono text-muted-foreground truncate flex-1">
                {invoice.paymentLink}
              </span>
              <Button variant="ghost" size="sm" className="shrink-0 h-7 px-2">
                <CopyIcon className="size-3.5" />
              </Button>
              <Button variant="ghost" size="sm" className="shrink-0 h-7 px-2">
                <ExternalLinkIcon className="size-3.5" />
              </Button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col items-center gap-3">
            <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground flex items-center gap-1.5">
              <QrCodeIcon className="size-3" />
              Scan to Pay
            </span>
            <div className="size-36 rounded-xl bg-muted/80 border border-border flex items-center justify-center">
              <div className="grid grid-cols-5 grid-rows-5 gap-0.5">
                {Array.from({ length: 25 }, (_, i) => (
                  <div
                    key={i}
                    className={`size-5 rounded-sm ${
                      [0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 19, 20, 21, 22, 23, 24, 6, 12, 18, 8, 16].includes(i)
                        ? "bg-foreground/80"
                        : "bg-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground text-center">
              Point your camera at the QR code to open the payment page
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              Share Link
            </Button>
            <Button size="sm" className="flex-1">
              Pay Now
            </Button>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
