"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { CreditCardIcon, LockIcon } from "lucide-react"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const orderItems = [
  { name: "Merino Wool Crewneck", qty: 1, price: 128 },
  { name: "Canvas Weekender Bag", qty: 1, price: 218 },
]

export default function CheckoutPayment() {
  const [billingSame, setBillingSame] = useState(true)
  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  const shipping = 12.99
  const tax = Math.round(subtotal * 0.087 * 100) / 100
  const total = subtotal + shipping + tax

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-6"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Payment
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Complete your purchase securely.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-[1fr_320px]">
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
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCardIcon className="size-4" />
                Card Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="card-name">Name on card</Label>
                <Input id="card-name" placeholder="Clara Fontaine" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="card-number">Card number</Label>
                <Input id="card-number" placeholder="4242 4242 4242 4242" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="expiry">Expiration</Label>
                  <Input id="expiry" placeholder="MM / YY" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
              <Separator />
              <label className="flex cursor-pointer items-center gap-2.5">
                <Checkbox
                  checked={billingSame}
                  onCheckedChange={(v) => setBillingSame(!!v)}
                />
                <span className="text-sm text-foreground">
                  Billing address same as shipping
                </span>
              </label>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.12 }}
        >
          <Card
            className="sticky top-6"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
            }}
          >
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {orderItems.map((item) => (
                <div key={item.name} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.name} {item.qty > 1 ? `x${item.qty}` : ""}
                  </span>
                  <span className="font-mono tabular-nums text-foreground">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span className="font-mono tabular-nums">${shipping.toFixed(2)}</span>
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
              <motion.div whileHover={{ y: -1 }} transition={spring} className="pt-1">
                <Button className="w-full gap-2" size="lg">
                  <LockIcon className="size-3.5" />
                  Pay ${total.toFixed(2)}
                </Button>
              </motion.div>
              <p className="text-center text-[11px] text-muted-foreground">
                Your payment information is encrypted end-to-end.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
