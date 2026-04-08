"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { GlobeIcon, ArrowRightLeftIcon, DownloadIcon } from "lucide-react"

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

const currencies = [
  { code: "EUR", symbol: "\u20AC", label: "Euro" },
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "GBP", symbol: "\u00A3", label: "British Pound" },
]

const invoice = {
  number: "INV-2026-0053",
  client: "Hawthorne & Partners Ltd",
  clientCountry: "United Kingdom",
  date: "April 8, 2026",
  baseCurrency: "EUR",
  targetCurrency: "GBP",
  exchangeRate: 0.8412,
  rateDate: "April 8, 2026 at 09:15 UTC",
  items: [
    { description: "Brand Strategy Workshop (2 days)", amountEUR: 5600 },
    { description: "Visual Identity Design", amountEUR: 8200 },
    { description: "Brand Guidelines Document", amountEUR: 2400 },
    { description: "Travel & Accommodation", amountEUR: 1340 },
  ],
  subtotalEUR: 17540,
  taxEUR: 0,
  totalEUR: 17540,
}

export default function Invoice10() {
  const [displayCurrency, setDisplayCurrency] = useState<"EUR" | "GBP">("GBP")

  const convert = (eur: number) =>
    displayCurrency === "GBP"
      ? Math.round(eur * invoice.exchangeRate * 100) / 100
      : eur

  const symbol = displayCurrency === "GBP" ? "\u00A3" : "\u20AC"

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
              <CardTitle className="tracking-tight flex items-center gap-2">
                <GlobeIcon className="size-5 text-primary" />
                Multi-Currency Invoice
              </CardTitle>
              <CardDescription className="mt-1">
                <span className="font-mono tabular-nums">{invoice.number}</span>
                {" "}&middot; {invoice.date}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <DownloadIcon className="size-3.5 mr-1" />
              PDF
            </Button>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
                Client
              </span>
              <p className="text-sm font-semibold text-foreground">{invoice.client}</p>
              <p className="text-xs text-muted-foreground">{invoice.clientCountry}</p>
            </div>
            <div className="flex items-center gap-1.5">
              {(["EUR", "GBP"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setDisplayCurrency(c)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                    displayCurrency === c
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="rounded-xl bg-muted/50 px-4 py-3 flex items-center gap-3">
            <ArrowRightLeftIcon className="size-4 text-muted-foreground shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium tabular-nums text-foreground">
                  1 EUR = {invoice.exchangeRate} GBP
                </span>
                <Badge variant="secondary" className="text-[10px]">
                  Live Rate
                </Badge>
              </div>
              <p className="text-[10px] text-muted-foreground tabular-nums mt-0.5">
                Source: ECB &middot; {invoice.rateDate}
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
              Line Items
            </span>
            {invoice.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-1.5">
                <span className="text-sm text-foreground">{item.description}</span>
                <div className="text-right">
                  <span className="text-sm tabular-nums font-medium text-foreground">
                    {symbol}{convert(item.amountEUR).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                  {displayCurrency === "GBP" && (
                    <p className="text-[10px] tabular-nums text-muted-foreground">
                      &euro;{item.amountEUR.toLocaleString()}.00
                    </p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          <Separator />

          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="tabular-nums text-foreground">
                {symbol}{convert(invoice.subtotalEUR).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                VAT (Reverse charge, Art. 196 EU Directive)
              </span>
              <span className="tabular-nums text-muted-foreground">
                {symbol}0.00
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Total Due</span>
              <div className="text-right">
                <p className="text-xl font-semibold tabular-nums tracking-tight text-foreground">
                  {symbol}{convert(invoice.totalEUR).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
                {displayCurrency === "GBP" && (
                  <p className="text-xs tabular-nums text-muted-foreground">
                    &euro;{invoice.totalEUR.toLocaleString()}.00 at source
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="rounded-xl bg-muted/40 px-4 py-3">
            <p className="text-xs text-muted-foreground">
              Payment accepted in EUR or GBP. If paying in GBP, the final amount may vary slightly
              based on the exchange rate at the time of transfer. Reference: {invoice.number}
            </p>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
