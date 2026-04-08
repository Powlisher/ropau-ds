"use client"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { DownloadIcon, PrinterIcon } from "lucide-react"

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
  date: "April 8, 2026",
  dueDate: "April 22, 2026",
  from: {
    name: "Studio Lumiere SARL",
    address: "42 Rue de Rivoli",
    city: "75001 Paris, France",
    vat: "FR 82 123456789",
    email: "billing@studio-lumiere.fr",
  },
  to: {
    name: "Margaux Pelletier",
    company: "Pelletier Consulting",
    address: "18 Avenue Montaigne",
    city: "75008 Paris, France",
  },
  items: [
    { description: "Brand Identity Package", qty: 1, rate: 3200, total: 3200 },
    { description: "Website Design (5 pages)", qty: 1, rate: 4800, total: 4800 },
    { description: "Motion Design Assets", qty: 3, rate: 450, total: 1350 },
    { description: "Project Management", qty: 12, rate: 95, total: 1140 },
  ],
  subtotal: 10490,
  tax: 2098,
  total: 12588,
  bankDetails: {
    bank: "BNP Paribas",
    iban: "FR76 1234 5678 9012 3456 7890 123",
    bic: "BNPAFRPP",
  },
}

export default function Invoice09() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="flex items-center justify-between"
      >
        <span className="text-sm text-muted-foreground">PDF Preview</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <PrinterIcon className="size-3.5 mr-1" />
            Print
          </Button>
          <Button size="sm">
            <DownloadIcon className="size-3.5 mr-1" />
            Download PDF
          </Button>
        </div>
      </motion.div>

      <Card
        className="w-full aspect-[210/297] overflow-hidden"
        style={{ boxShadow: premiumShadow }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <CardContent className="p-10 flex flex-col h-full">
            <motion.div variants={itemVariants} className="flex items-start justify-between mb-10">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                  INVOICE
                </h1>
                <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                  <span className="font-mono tabular-nums">{invoice.number}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold tracking-tight text-foreground">
                  {invoice.from.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{invoice.from.address}</p>
                <p className="text-xs text-muted-foreground">{invoice.from.city}</p>
                <p className="text-xs text-muted-foreground font-mono tabular-nums mt-1">
                  {invoice.from.vat}
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 mb-8">
              <div>
                <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
                  Bill To
                </span>
                <p className="text-sm font-semibold text-foreground mt-1">{invoice.to.name}</p>
                <p className="text-xs text-muted-foreground">{invoice.to.company}</p>
                <p className="text-xs text-muted-foreground">{invoice.to.address}</p>
                <p className="text-xs text-muted-foreground">{invoice.to.city}</p>
              </div>
              <div>
                <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
                  Issue Date
                </span>
                <p className="text-sm tabular-nums text-foreground mt-1">{invoice.date}</p>
              </div>
              <div>
                <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
                  Due Date
                </span>
                <p className="text-sm tabular-nums text-foreground mt-1">{invoice.dueDate}</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <div className="rounded-xl border border-border overflow-hidden">
                <div className="grid grid-cols-12 gap-2 px-5 py-3 bg-muted/50 text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
                  <span className="col-span-5">Description</span>
                  <span className="col-span-2 text-center">Qty</span>
                  <span className="col-span-3 text-right">Unit Price</span>
                  <span className="col-span-2 text-right">Amount</span>
                </div>
                {invoice.items.map((item, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-12 gap-2 px-5 py-3.5 border-t border-border/50 items-center"
                  >
                    <span className="col-span-5 text-sm text-foreground">{item.description}</span>
                    <span className="col-span-2 text-sm tabular-nums text-center text-muted-foreground">
                      {item.qty}
                    </span>
                    <span className="col-span-3 text-sm tabular-nums text-right text-muted-foreground">
                      ${item.rate.toLocaleString()}.00
                    </span>
                    <span className="col-span-2 text-sm tabular-nums text-right font-medium text-foreground">
                      ${item.total.toLocaleString()}.00
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-end mb-8">
              <div className="w-56 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="tabular-nums">${invoice.subtotal.toLocaleString()}.00</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">VAT (20%)</span>
                  <span className="tabular-nums">${invoice.tax.toLocaleString()}.00</span>
                </div>
                <Separator className="my-1" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Total Due</span>
                  <span className="text-lg font-semibold tabular-nums tracking-tight">
                    ${invoice.total.toLocaleString()}.00
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-auto rounded-xl bg-muted/40 p-5">
              <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
                Payment Details
              </span>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div>
                  <p className="text-xs text-muted-foreground">Bank</p>
                  <p className="text-sm text-foreground">{invoice.bankDetails.bank}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">IBAN</p>
                  <p className="text-sm font-mono tabular-nums text-foreground">
                    {invoice.bankDetails.iban}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">BIC/SWIFT</p>
                  <p className="text-sm font-mono text-foreground">{invoice.bankDetails.bic}</p>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground mt-3">
                Please include {invoice.number} as payment reference.
              </p>
            </motion.div>
          </CardContent>
        </motion.div>
      </Card>
    </div>
  )
}
