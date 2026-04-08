"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { TruckIcon, ZapIcon, PlaneIcon } from "lucide-react"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const shippingMethods = [
  { id: "standard", label: "Standard", description: "5-7 business days", price: 0, icon: TruckIcon },
  { id: "express", label: "Express", description: "2-3 business days", price: 12.99, icon: ZapIcon },
  { id: "overnight", label: "Overnight", description: "Next business day", price: 24.99, icon: PlaneIcon },
]

export default function CheckoutShipping() {
  const [method, setMethod] = useState("standard")

  return (
    <section className="mx-auto w-full max-w-lg px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-6"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Shipping
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">Where should we send your order?</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.08 }}
        className="space-y-6"
      >
        <Card
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="first">First name</Label>
                <Input id="first" placeholder="Clara" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="last">Last name</Label>
                <Input id="last" placeholder="Fontaine" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="42 Rue des Lilas" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="apt">Apartment, suite, etc.</Label>
              <Input id="apt" placeholder="Apt 3B" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Lyon" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="Rhone" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="zip">Zip</Label>
                <Input id="zip" placeholder="69003" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <CardHeader>
            <CardTitle>Shipping Method</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={method} onValueChange={(v: any) => setMethod(v ?? "")} className="gap-3">
              {shippingMethods.map((m) => {
                const Icon = m.icon
                return (
                  <motion.label
                    key={m.id}
                    whileHover={{ y: -1 }}
                    transition={spring}
                    className={`flex cursor-pointer items-center gap-4 rounded-xl p-4 ring-1 transition-colors ${
                      method === m.id
                        ? "bg-primary/5 ring-primary"
                        : "ring-foreground/10 hover:bg-muted/50"
                    }`}
                  >
                    <RadioGroupItem value={m.id} />
                    <Icon className="size-4 shrink-0 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{m.label}</p>
                      <p className="text-xs text-muted-foreground">{m.description}</p>
                    </div>
                    <span className="font-mono text-sm font-semibold tabular-nums text-foreground">
                      {m.price === 0 ? "Free" : `$${m.price.toFixed(2)}`}
                    </span>
                  </motion.label>
                )
              })}
            </RadioGroup>
          </CardContent>
        </Card>

        <motion.div whileHover={{ y: -1 }} transition={spring}>
          <Button className="w-full" size="lg">
            Continue to Payment
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
