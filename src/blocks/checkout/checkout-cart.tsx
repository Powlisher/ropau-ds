"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TrashIcon, ShoppingBagIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}
const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const initialItems = [
  { id: 1, name: "Merino Wool Crewneck", variant: "Charcoal / M", price: 128, qty: 1, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=120&h=120&fit=crop" },
  { id: 2, name: "Canvas Weekender Bag", variant: "Natural", price: 218, qty: 1, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=120&h=120&fit=crop" },
  { id: 3, name: "Stoneware Mug Set", variant: "Speckled Cream", price: 56, qty: 2, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=120&h=120&fit=crop" },
]

export default function CheckoutCart() {
  const [items, setItems] = useState(initialItems)

  const updateQty = (id: number, qty: string) =>
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, qty: Number(qty) } : item)))

  const remove = (id: number) => setItems((prev) => prev.filter((item) => item.id !== id))

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0)
  const tax = Math.round(subtotal * 0.087 * 100) / 100
  const total = subtotal + tax

  return (
    <section className="mx-auto w-full max-w-xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-6"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Your Cart
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {items.length} {items.length === 1 ? "item" : "items"}
        </p>
      </motion.div>

      <Card
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <CardContent>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {items.map((item, i) => (
              <motion.div key={item.id} variants={itemVariants}>
                {i > 0 && <Separator className="my-4" />}
                <div className="flex gap-4">
                  <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-secondary">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{item.name}</h3>
                        <p className="text-xs text-muted-foreground">{item.variant}</p>
                      </div>
                      <span className="shrink-0 font-mono text-sm font-semibold tabular-nums text-foreground">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Select value={String(item.qty)} onValueChange={(v) => v && updateQty(item.id, v)}>
                        <SelectTrigger className="h-7 w-16" size="sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((n) => (
                            <SelectItem key={n} value={String(n)}>
                              {n}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={spring}>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => remove(item.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <TrashIcon className="size-3.5" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>

        <Separator />

        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Subtotal</span>
            <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Tax (8.7%)</span>
            <span className="font-mono tabular-nums">${tax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-base font-semibold text-foreground">
            <span>Total</span>
            <span className="font-mono tabular-nums">${total.toFixed(2)}</span>
          </div>
          <motion.div whileHover={{ y: -1 }} transition={spring} className="pt-2">
            <Button className="w-full gap-2" size="lg">
              <ShoppingBagIcon className="size-4" />
              Proceed to Checkout
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </section>
  )
}
