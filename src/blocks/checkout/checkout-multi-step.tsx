"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CheckIcon, ShoppingCartIcon, TruckIcon, CreditCardIcon, ClipboardListIcon } from "lucide-react"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const steps = [
  { id: 0, label: "Cart", icon: ShoppingCartIcon },
  { id: 1, label: "Shipping", icon: TruckIcon },
  { id: 2, label: "Payment", icon: CreditCardIcon },
  { id: 3, label: "Review", icon: ClipboardListIcon },
]

const cartItems = [
  { name: "Alpaca Throw Blanket", price: 189, qty: 1 },
  { name: "Cedar Candle Trio", price: 62, qty: 2 },
]

export default function CheckoutMultiStep() {
  const [step, setStep] = useState(0)

  const subtotal = cartItems.reduce((acc, i) => acc + i.price * i.qty, 0)
  const total = subtotal + 12.99 + Math.round(subtotal * 0.087 * 100) / 100

  return (
    <section className="mx-auto w-full max-w-lg px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-8"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Checkout
        </h2>
      </motion.div>

      <div className="mb-8 flex items-center justify-between">
        {steps.map((s, i) => {
          const Icon = s.icon
          const completed = i < step
          const active = i === step
          return (
            <div key={s.id} className="flex flex-1 items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: active ? 1.1 : 1,
                  backgroundColor: completed || active ? "var(--primary)" : "transparent",
                }}
                transition={spring}
                className={`flex size-9 shrink-0 items-center justify-center rounded-full ring-1 ${
                  completed || active
                    ? "text-primary-foreground ring-primary"
                    : "text-muted-foreground ring-foreground/10"
                }`}
              >
                {completed ? <CheckIcon className="size-4" /> : <Icon className="size-4" />}
              </motion.div>
              <span className={`ml-2 hidden text-xs font-medium sm:inline ${active ? "text-foreground" : "text-muted-foreground"}`}>
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div className={`mx-3 h-px flex-1 ${completed ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
          <Card
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            {step === 0 && (
              <>
                <CardHeader><CardTitle>Your Cart</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.name} className="flex justify-between text-sm">
                      <span className="text-foreground">{item.name} {item.qty > 1 ? `x${item.qty}` : ""}</span>
                      <span className="font-mono tabular-nums text-foreground">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between font-semibold text-foreground">
                    <span>Subtotal</span>
                    <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
                  </div>
                </CardContent>
              </>
            )}
            {step === 1 && (
              <>
                <CardHeader><CardTitle>Shipping Address</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1"><Label>First name</Label><Input placeholder="Clara" /></div>
                    <div className="space-y-1"><Label>Last name</Label><Input placeholder="Fontaine" /></div>
                  </div>
                  <div className="space-y-1"><Label>Address</Label><Input placeholder="42 Rue des Lilas" /></div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1"><Label>City</Label><Input placeholder="Lyon" /></div>
                    <div className="space-y-1"><Label>State</Label><Input placeholder="Rhone" /></div>
                    <div className="space-y-1"><Label>Zip</Label><Input placeholder="69003" /></div>
                  </div>
                </CardContent>
              </>
            )}
            {step === 2 && (
              <>
                <CardHeader><CardTitle>Payment</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1"><Label>Card number</Label><Input placeholder="4242 4242 4242 4242" /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1"><Label>Expiration</Label><Input placeholder="MM / YY" /></div>
                    <div className="space-y-1"><Label>CVC</Label><Input placeholder="123" /></div>
                  </div>
                </CardContent>
              </>
            )}
            {step === 3 && (
              <>
                <CardHeader><CardTitle>Review & Place Order</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.name} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.name}</span>
                      <span className="font-mono tabular-nums text-foreground">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between text-base font-semibold text-foreground">
                    <span>Total</span>
                    <span className="font-mono tabular-nums">${total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="mt-5 flex gap-3">
        {step > 0 && (
          <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
            Back
          </Button>
        )}
        <motion.div whileHover={{ y: -1 }} transition={spring} className="flex-1">
          <Button
            className="w-full"
            size="lg"
            onClick={() => step < 3 && setStep(step + 1)}
          >
            {step === 3 ? "Place Order" : "Continue"}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
