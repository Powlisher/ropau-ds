"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { ArrowRightIcon, FileTextIcon } from "lucide-react"

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

const comparison = {
  original: {
    id: "R-44821",
    date: "April 1, 2026",
    items: [
      { name: "Linen Table Runner", price: 68.00 },
      { name: "Ceramic Mug Set (4pc)", price: 42.00 },
      { name: "Beeswax Candle (x3)", price: 55.50 },
      { name: "Cotton Napkins (set of 6)", price: 36.00 },
    ],
    total: 201.50,
  },
  amended: {
    id: "R-44821-A",
    date: "April 7, 2026",
    items: [
      { name: "Linen Table Runner", price: 68.00, changed: false },
      { name: "Ceramic Mug Set (4pc)", price: 0, changed: true, note: "Refunded (damaged)" },
      { name: "Beeswax Candle (x3)", price: 55.50, changed: false },
      { name: "Cotton Napkins (set of 6)", price: 36.00, changed: false },
    ],
    total: 159.50,
  },
  difference: -42.00,
}

export default function Receipt08() {
  return (
    <Card className="w-full max-w-2xl" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader className="pb-3">
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight flex items-center gap-2">
              <FileTextIcon className="size-5 text-primary" />
              Receipt Comparison
            </CardTitle>
            <CardDescription>
              Side-by-side view of original and amended receipt.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="rounded-xl border border-border p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
                  Original
                </span>
                <Badge variant="secondary" className="font-mono text-[10px] tabular-nums">
                  {comparison.original.id}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground tabular-nums mb-3">
                {comparison.original.date}
              </p>
              <div className="flex flex-col gap-2 mb-4">
                {comparison.original.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{item.name}</span>
                    <span className="text-sm tabular-nums text-foreground">
                      &euro;{item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <Separator className="mb-3" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">Total</span>
                <span className="text-lg font-semibold tabular-nums tracking-tight text-foreground">
                  &euro;{comparison.original.total.toFixed(2)}
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="rounded-xl border border-primary/30 bg-primary/5 p-4 ring-1 ring-primary/10"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
                  Amended
                </span>
                <Badge variant="outline" className="font-mono text-[10px] tabular-nums border-primary/30 text-primary">
                  {comparison.amended.id}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground tabular-nums mb-3">
                {comparison.amended.date}
              </p>
              <div className="flex flex-col gap-2 mb-4">
                {comparison.amended.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <span className={`text-sm ${item.changed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                        {item.name}
                      </span>
                      {item.note && (
                        <p className="text-[10px] text-rose-600 dark:text-rose-400">{item.note}</p>
                      )}
                    </div>
                    <span className={`text-sm tabular-nums ${
                      item.changed ? "text-rose-600 line-through" : "text-foreground"
                    }`}>
                      &euro;{item.changed ? comparison.original.items[i].price.toFixed(2) : item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <Separator className="mb-3" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">New Total</span>
                <span className="text-lg font-semibold tabular-nums tracking-tight text-foreground">
                  &euro;{comparison.amended.total.toFixed(2)}
                </span>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-4 rounded-xl bg-muted/50 px-4 py-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <ArrowRightIcon className="size-4 text-muted-foreground" />
              <span className="text-sm text-foreground">Net adjustment</span>
            </div>
            <span className="text-sm font-semibold tabular-nums text-rose-600">
              &euro;{comparison.difference.toFixed(2)}
            </span>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
