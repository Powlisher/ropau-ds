"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { TagIcon, XIcon, ShoppingBagIcon } from "lucide-react"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const items = [
  { name: "Linen Blend Trousers", qty: 1, price: 142 },
  { name: "Silk Sleep Mask", qty: 1, price: 45 },
  { name: "Merino Scarf", qty: 1, price: 78 },
]

const validCodes: Record<string, { type: "percent" | "fixed"; value: number; label: string }> = {
  WELCOME15: { type: "percent", value: 15, label: "15% off" },
  SAVE20: { type: "fixed", value: 20, label: "$20 off" },
}

export default function CheckoutDiscount() {
  const [code, setCode] = useState("")
  const [appliedCode, setAppliedCode] = useState<string | null>(null)
  const [error, setError] = useState("")

  const subtotal = items.reduce((acc, i) => acc + i.price * i.qty, 0)
  const discount = appliedCode
    ? validCodes[appliedCode].type === "percent"
      ? Math.round(subtotal * (validCodes[appliedCode].value / 100) * 100) / 100
      : validCodes[appliedCode].value
    : 0
  const tax = Math.round((subtotal - discount) * 0.087 * 100) / 100
  const total = subtotal - discount + tax

  const apply = () => {
    const upper = code.trim().toUpperCase()
    if (validCodes[upper]) {
      setAppliedCode(upper)
      setError("")
      setCode("")
    } else {
      setError("Invalid promo code")
    }
  }

  return (
    <section className="mx-auto w-full max-w-md px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-6"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Cart
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.06 }}
      >
        <Card
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <CardContent className="space-y-3">
            {items.map((item) => (
              <div key={item.name} className="flex justify-between text-sm">
                <span className="text-foreground">{item.name}</span>
                <span className="font-mono tabular-nums text-foreground">${item.price.toFixed(2)}</span>
              </div>
            ))}
          </CardContent>

          <Separator />

          <CardContent className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <TagIcon className="size-3" />
              Promo Code
            </div>
            {!appliedCode ? (
              <div className="flex gap-2">
                <Input
                  value={code}
                  onChange={(e) => { setCode(e.target.value); setError("") }}
                  placeholder="Enter code"
                  className="flex-1 font-mono uppercase"
                />
                <Button variant="outline" onClick={apply}>
                  Apply
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Badge className="gap-1.5">
                  {appliedCode}
                  <button onClick={() => setAppliedCode(null)}>
                    <XIcon className="size-2.5" />
                  </button>
                </Badge>
                <span className="text-xs text-emerald-600">
                  {validCodes[appliedCode].label} applied
                </span>
              </div>
            )}
            {error && <p className="text-xs text-destructive">{error}</p>}
          </CardContent>

          <Separator />

          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
            </div>
            <AnimatePresence>
              {discount > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex justify-between text-sm text-emerald-600"
                >
                  <span>Discount</span>
                  <span className="font-mono tabular-nums">-${discount.toFixed(2)}</span>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Tax</span>
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
                Checkout
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
