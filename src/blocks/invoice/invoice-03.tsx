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
import { FileTextIcon, DownloadIcon, SendIcon, CheckCircleIcon, ClockIcon } from "lucide-react"

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
  number: "INV-2026-0041",
  client: "Maison Colbert",
  date: "April 1, 2026",
  dueDate: "April 15, 2026",
  total: 4320,
  paid: 4320,
  remaining: 0,
  status: "Paid",
  items: [
    { description: "Interior Photography (24 shots)", amount: 2400 },
    { description: "Photo Retouching & Color Grading", amount: 1200 },
    { description: "Express Delivery Surcharge", amount: 720 },
  ],
}

const payments = [
  {
    date: "Apr 12, 2026",
    method: "Bank Transfer",
    reference: "VIR-2026-7723",
    amount: 2160,
    status: "completed",
  },
  {
    date: "Apr 14, 2026",
    method: "Bank Transfer",
    reference: "VIR-2026-7891",
    amount: 2160,
    status: "completed",
  },
]

const timeline = [
  { date: "Apr 1", event: "Invoice created", icon: FileTextIcon },
  { date: "Apr 1", event: "Sent to client", icon: SendIcon },
  { date: "Apr 12", event: "Partial payment received", icon: ClockIcon },
  { date: "Apr 14", event: "Full payment received", icon: CheckCircleIcon },
]

export default function Invoice03() {
  return (
    <Card className="w-full max-w-xl" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader className="pb-4">
          <motion.div variants={itemVariants} className="flex items-start justify-between">
            <div>
              <CardTitle className="tracking-tight">{invoice.client}</CardTitle>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span className="font-mono tabular-nums">{invoice.number}</span>
                <span className="tabular-nums">{invoice.date}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-0 text-[10px]">
                {invoice.status}
              </Badge>
              <Button variant="outline" size="sm">
                <DownloadIcon className="size-3.5" />
              </Button>
            </div>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <motion.div variants={itemVariants}>
            <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
              Line Items
            </span>
            <div className="flex flex-col gap-2 mt-2">
              {invoice.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{item.description}</span>
                  <span className="text-sm tabular-nums font-medium text-foreground">
                    ${item.amount.toLocaleString()}.00
                  </span>
                </div>
              ))}
              <Separator className="my-1" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">Total</span>
                <span className="text-lg font-semibold tabular-nums tracking-tight text-foreground">
                  ${invoice.total.toLocaleString()}.00
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
              Payments
            </span>
            <div className="flex flex-col gap-2 mt-2">
              {payments.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{p.method}</p>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                      <span className="tabular-nums">{p.date}</span>
                      <span className="font-mono tabular-nums">{p.reference}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold tabular-nums text-emerald-600">
                      +${p.amount.toLocaleString()}.00
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-3 px-1">
              <span className="text-xs text-muted-foreground">Balance remaining</span>
              <span className="text-sm font-semibold tabular-nums text-foreground">
                ${invoice.remaining.toLocaleString()}.00
              </span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
              Timeline
            </span>
            <div className="flex flex-col mt-3">
              {timeline.map((entry, i) => {
                const Icon = entry.icon
                return (
                  <div key={i} className="flex items-start gap-3 relative pb-4 last:pb-0">
                    {i < timeline.length - 1 && (
                      <div className="absolute left-[11px] top-6 bottom-0 w-px bg-border" />
                    )}
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted">
                      <Icon className="size-3 text-muted-foreground" />
                    </div>
                    <div className="flex items-center gap-2 pt-0.5">
                      <span className="text-xs tabular-nums text-muted-foreground w-12">
                        {entry.date}
                      </span>
                      <span className="text-sm text-foreground">{entry.event}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
