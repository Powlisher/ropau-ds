"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { LockIcon, MapPinIcon, CreditCardIcon, PackageIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}
const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const order = {
  items: [
    { name: "Merino Wool Crewneck", variant: "Charcoal / M", qty: 1, price: 128, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&fit=crop" },
    { name: "Canvas Weekender Bag", variant: "Natural", qty: 1, price: 218, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=80&h=80&fit=crop" },
  ],
  shipping: {
    name: "Clara Fontaine",
    address: "42 Rue des Lilas, Apt 3B",
    city: "Lyon 69003, Rhone",
    method: "Express (2-3 business days)",
    cost: 12.99,
  },
  payment: { last4: "4242", brand: "Visa" },
}

export default function CheckoutReview() {
  const subtotal = order.items.reduce((acc, i) => acc + i.price * i.qty, 0)
  const tax = Math.round(subtotal * 0.087 * 100) / 100
  const total = subtotal + order.shipping.cost + tax

  return (
    <section className="mx-auto w-full max-w-lg px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-6"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Review Order
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Check everything looks good before placing your order.
        </p>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <Card style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PackageIcon className="size-4" />
                Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item) => (
                <div key={item.name} className="flex gap-3">
                  <div className="size-14 shrink-0 overflow-hidden rounded-lg bg-secondary">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.variant}</p>
                      {item.qty > 1 && <Badge variant="secondary" className="mt-1 text-[10px]">Qty: {item.qty}</Badge>}
                    </div>
                    <span className="font-mono text-sm font-semibold tabular-nums text-foreground">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}>
            <CardContent className="grid gap-5 sm:grid-cols-2">
              <div>
                <div className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <MapPinIcon className="size-3" />
                  Shipping
                </div>
                <p className="text-sm font-semibold text-foreground">{order.shipping.name}</p>
                <p className="text-sm text-muted-foreground">{order.shipping.address}</p>
                <p className="text-sm text-muted-foreground">{order.shipping.city}</p>
                <p className="mt-1 text-xs text-muted-foreground">{order.shipping.method}</p>
              </div>
              <div>
                <div className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <CreditCardIcon className="size-3" />
                  Payment
                </div>
                <p className="text-sm font-semibold text-foreground">{order.payment.brand}</p>
                <p className="font-mono text-sm tabular-nums text-muted-foreground">
                  ending in {order.payment.last4}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span className="font-mono tabular-nums">${order.shipping.cost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Tax</span>
                <span className="font-mono tabular-nums">${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-semibold text-foreground">
                <span>Total</span>
                <span className="font-mono tabular-nums">${total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ y: -1 }} transition={spring}>
          <Button className="w-full gap-2" size="lg">
            <LockIcon className="size-3.5" />
            Place Order
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
