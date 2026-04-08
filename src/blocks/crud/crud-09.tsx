"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { DownloadIcon, UploadIcon, FileSpreadsheetIcon, FileJsonIcon, PlusIcon } from "lucide-react"

type Inventory = {
  id: string
  name: string
  category: string
  sku: string
  quantity: number
  unit: string
  warehouse: string
  lastRestock: string
}

const items: Inventory[] = [
  { id: "i1", name: "Organic Arabica Beans (1kg)", category: "Raw Materials", sku: "RM-0481", quantity: 2340, unit: "bags", warehouse: "Portland", lastRestock: "Apr 2" },
  { id: "i2", name: "Kraft Paper Bags (250g)", category: "Packaging", sku: "PK-1204", quantity: 18700, unit: "pcs", warehouse: "Portland", lastRestock: "Mar 28" },
  { id: "i3", name: "Glass Brew Bottles (330ml)", category: "Packaging", sku: "PK-0892", quantity: 4120, unit: "pcs", warehouse: "Austin", lastRestock: "Apr 5" },
  { id: "i4", name: "Robusta Blend (500g)", category: "Raw Materials", sku: "RM-0523", quantity: 890, unit: "bags", warehouse: "Austin", lastRestock: "Mar 15" },
  { id: "i5", name: "Compostable Valve Caps", category: "Packaging", sku: "PK-2067", quantity: 42000, unit: "pcs", warehouse: "Portland", lastRestock: "Apr 1" },
  { id: "i6", name: "Flavor Extract: Vanilla", category: "Ingredients", sku: "IN-0037", quantity: 145, unit: "liters", warehouse: "Austin", lastRestock: "Feb 20" },
  { id: "i7", name: "Shipping Labels (Roll/500)", category: "Logistics", sku: "LG-0411", quantity: 67, unit: "rolls", warehouse: "Portland", lastRestock: "Apr 3" },
  { id: "i8", name: "Ethiopian Yirgacheffe (1kg)", category: "Raw Materials", sku: "RM-0612", quantity: 560, unit: "bags", warehouse: "Portland", lastRestock: "Mar 22" },
]

const categoryColors: Record<string, string> = {
  "Raw Materials": "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Packaging: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Ingredients: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Logistics: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
}

const premiumShadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Crud09() {
  const [exporting, setExporting] = useState(false)

  const simulateExport = () => {
    setExporting(true)
    setTimeout(() => setExporting(false), 1500)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Inventory</h2>
          <p className="text-sm text-muted-foreground">{items.length} items across {new Set(items.map((i) => i.warehouse)).size} warehouses</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="gap-1.5 text-xs">
            <UploadIcon className="size-3.5" />
            Import CSV
          </Button>
          <div className="flex overflow-hidden rounded-lg ring-1 ring-border">
            <button
              onClick={simulateExport}
              disabled={exporting}
              className="flex items-center gap-1.5 border-r border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-50"
            >
              <FileSpreadsheetIcon className="size-3.5 text-emerald-600" />
              {exporting ? "Exporting..." : "Export CSV"}
            </button>
            <button
              className="flex items-center gap-1.5 bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            >
              <FileJsonIcon className="size-3.5 text-blue-600" />
              JSON
            </button>
          </div>
          <Button size="sm" className="gap-1.5">
            <PlusIcon className="size-3.5" />
            Add item
          </Button>
        </div>
      </div>

      <Card style={{ boxShadow: premiumShadow }} className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Item</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quantity</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Warehouse</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Last Restock</th>
              </tr>
            </thead>
            <motion.tbody variants={containerVariants} initial="hidden" animate="visible">
              {items.map((item) => (
                <motion.tr key={item.id} variants={rowVariants} className="border-b border-border/30 transition-colors hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                    <p className="font-mono text-[10px] text-muted-foreground">{item.sku}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${categoryColors[item.category] ?? ""}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-mono text-sm tabular-nums text-foreground">{item.quantity.toLocaleString()}</span>
                    <span className="ml-1 text-xs text-muted-foreground">{item.unit}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{item.warehouse}</td>
                  <td className="px-4 py-3 text-right font-mono text-xs tabular-nums text-muted-foreground">{item.lastRestock}</td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-border/50 px-4 py-3">
          <p className="text-xs text-muted-foreground">
            Total stock value: <span className="font-mono font-medium tabular-nums text-foreground">68,822 units</span>
          </p>
          <div className="flex items-center gap-1">
            <DownloadIcon className="size-3 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">Last synced 4 min ago</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
