"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { PlusIcon, PencilIcon, Trash2Icon, CheckIcon, XIcon } from "lucide-react"

type Product = {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  status: "active" | "draft" | "archived"
}

const initialProducts: Product[] = [
  { id: "p1", name: "Ceramic Pour-Over Set", sku: "CER-001", price: 64.00, stock: 127, status: "active" },
  { id: "p2", name: "Walnut Desk Organizer", sku: "WDO-014", price: 89.50, stock: 43, status: "active" },
  { id: "p3", name: "Merino Wool Throw", sku: "MWT-008", price: 145.00, stock: 18, status: "active" },
  { id: "p4", name: "Hand-Blown Glass Vase", sku: "HBG-022", price: 112.00, stock: 0, status: "draft" },
  { id: "p5", name: "Copper Pendant Light", sku: "CPL-003", price: 234.00, stock: 7, status: "active" },
  { id: "p6", name: "Linen Cushion Cover (Set of 2)", sku: "LCC-019", price: 52.00, stock: 86, status: "archived" },
]

const statusStyles: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  draft: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  archived: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
}

const premiumShadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Crud01() {
  const [products, setProducts] = useState(initialProducts)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<Partial<Product>>({})
  const [adding, setAdding] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: "", sku: "", price: "", stock: "" })

  const startEdit = (p: Product) => {
    setEditingId(p.id)
    setEditValues({ name: p.name, price: p.price, stock: p.stock })
  }

  const saveEdit = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...editValues } : p))
    )
    setEditingId(null)
  }

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const addProduct = () => {
    if (!newProduct.name.trim()) return
    const p: Product = {
      id: `new-${Date.now()}`,
      name: newProduct.name,
      sku: newProduct.sku || `SKU-${Math.floor(Math.random() * 900 + 100)}`,
      price: parseFloat(newProduct.price) || 0,
      stock: parseInt(newProduct.stock) || 0,
      status: "draft",
    }
    setProducts((prev) => [p, ...prev])
    setNewProduct({ name: "", sku: "", price: "", stock: "" })
    setAdding(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Products</h2>
          <p className="text-sm text-muted-foreground">{products.length} items in catalog</p>
        </div>
        <Button
          size="sm"
          onClick={() => setAdding(true)}
          className="gap-1.5"
        >
          <PlusIcon className="size-3.5" />
          Add product
        </Button>
      </div>

      <Card style={{ boxShadow: premiumShadow }} className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Product</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">SKU</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Price</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Stock</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <motion.tbody variants={containerVariants} initial="hidden" animate="visible">
              <AnimatePresence mode="popLayout">
                {adding && (
                  <motion.tr
                    key="new-row"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-b border-border/30 bg-muted/30"
                  >
                    <td className="px-4 py-2"><Input autoFocus placeholder="Product name" value={newProduct.name} onChange={(e) => setNewProduct((p) => ({ ...p, name: e.target.value }))} className="text-xs" onKeyDown={(e) => e.key === "Enter" && addProduct()} /></td>
                    <td className="px-4 py-2"><Input placeholder="SKU" value={newProduct.sku} onChange={(e) => setNewProduct((p) => ({ ...p, sku: e.target.value }))} className="text-xs" /></td>
                    <td className="px-4 py-2"><Input placeholder="0.00" value={newProduct.price} onChange={(e) => setNewProduct((p) => ({ ...p, price: e.target.value }))} className="text-right text-xs font-mono" /></td>
                    <td className="px-4 py-2"><Input placeholder="0" value={newProduct.stock} onChange={(e) => setNewProduct((p) => ({ ...p, stock: e.target.value }))} className="text-right text-xs font-mono" /></td>
                    <td className="px-4 py-2"><Badge variant="secondary" className="text-[10px]">Draft</Badge></td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex justify-end gap-1">
                        <button onClick={addProduct} className="flex size-7 items-center justify-center rounded-md text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"><CheckIcon className="size-3.5" /></button>
                        <button onClick={() => setAdding(false)} className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"><XIcon className="size-3.5" /></button>
                      </div>
                    </td>
                  </motion.tr>
                )}

                {products.map((product) => (
                  <motion.tr
                    key={product.id}
                    variants={rowVariants}
                    layout
                    exit={{ opacity: 0, x: -20 }}
                    className="group border-b border-border/30 transition-colors hover:bg-muted/30"
                  >
                    <td className="px-4 py-3">
                      {editingId === product.id ? (
                        <Input value={editValues.name ?? ""} onChange={(e) => setEditValues((v) => ({ ...v, name: e.target.value }))} className="text-xs" autoFocus />
                      ) : (
                        <span className="text-sm font-medium text-foreground">{product.name}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs tabular-nums text-muted-foreground">{product.sku}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {editingId === product.id ? (
                        <Input value={editValues.price ?? ""} onChange={(e) => setEditValues((v) => ({ ...v, price: parseFloat(e.target.value) || 0 }))} className="text-right text-xs font-mono" />
                      ) : (
                        <span className="font-mono text-sm tabular-nums text-foreground">${product.price.toFixed(2)}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {editingId === product.id ? (
                        <Input value={editValues.stock ?? ""} onChange={(e) => setEditValues((v) => ({ ...v, stock: parseInt(e.target.value) || 0 }))} className="text-right text-xs font-mono" />
                      ) : (
                        <span className={`font-mono text-sm tabular-nums ${product.stock === 0 ? "text-red-500" : "text-foreground"}`}>{product.stock}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold capitalize ${statusStyles[product.status]}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        {editingId === product.id ? (
                          <>
                            <button onClick={() => saveEdit(product.id)} className="flex size-7 items-center justify-center rounded-md text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"><CheckIcon className="size-3.5" /></button>
                            <button onClick={() => setEditingId(null)} className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"><XIcon className="size-3.5" /></button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => startEdit(product)} className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"><PencilIcon className="size-3.5" /></button>
                            <button onClick={() => deleteProduct(product.id)} className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"><Trash2Icon className="size-3.5" /></button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </motion.tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
