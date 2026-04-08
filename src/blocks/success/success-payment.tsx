"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2Icon, DownloadIcon, LayoutDashboardIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const receiptLines = [
  { label: "Pro Plan (annual)", amount: "$192.00" },
  { label: "Tax (20% VAT)", amount: "$38.40" },
  { label: "Total", amount: "$230.40", bold: true },
]

export default function SuccessPayment() {
  return (
    <div className="flex min-h-[540px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Card className="w-full max-w-md">
        <CardContent className="py-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-6"
          >
            <motion.div
              variants={itemVariants}
              className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10 ring-4 ring-emerald-500/5"
            >
              <CheckCircle2Icon className="size-7 text-emerald-600" />
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">
                Payment successful
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Your invoice has been processed and a confirmation email is on its way.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full rounded-lg bg-muted/50 divide-y divide-border">
              {receiptLines.map((line) => (
                <div key={line.label} className="flex items-center justify-between px-4 py-2.5">
                  <span className={`text-sm ${line.bold ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                    {line.label}
                  </span>
                  <span className={`font-mono text-sm tabular-nums ${line.bold ? "font-semibold text-foreground" : "text-foreground"}`}>
                    {line.amount}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex w-full gap-2">
              <Button variant="outline" className="flex-1 gap-1.5">
                <DownloadIcon data-icon="inline-start" className="size-4" />
                Receipt
              </Button>
              <Button className="flex-1 gap-1.5">
                <LayoutDashboardIcon data-icon="inline-start" className="size-4" />
                Dashboard
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}
