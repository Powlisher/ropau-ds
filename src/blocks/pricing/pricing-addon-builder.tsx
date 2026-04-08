"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const basePlan = { name: "Pro", price: 39 }

const addons = [
  { id: "analytics", name: "Advanced Analytics", price: 12, description: "Custom dashboards and export" },
  { id: "sso", name: "SSO / SAML", price: 19, description: "Enterprise single sign-on" },
  { id: "audit", name: "Audit Logs", price: 9, description: "90-day retention, compliance exports" },
  { id: "priority", name: "Priority Support", price: 29, description: "4-hour response SLA" },
  { id: "storage", name: "Extra Storage (500 GB)", price: 15, description: "On top of included 100 GB" },
]

export default function PricingAddonBuilder() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["analytics"]))

  const toggleAddon = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const total = basePlan.price + addons.filter((a) => selected.has(a.id)).reduce((s, a) => s + a.price, 0)

  return (
    <section className="mx-auto w-full max-w-lg px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      >
        <Card
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <CardHeader>
            <CardTitle className="text-xl">Build your plan</CardTitle>
            <CardDescription>
              Start with {basePlan.name} at ${basePlan.price}/mo and add what you need.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
              <span className="text-sm font-medium text-foreground">{basePlan.name} base plan</span>
              <span className="font-mono text-sm tabular-nums text-foreground">${basePlan.price}/mo</span>
            </div>

            <Separator />

            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Add-ons
              </span>
              {addons.map((addon) => (
                <label
                  key={addon.id}
                  className="flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/30"
                >
                  <Checkbox
                    checked={selected.has(addon.id)}
                    onCheckedChange={() => toggleAddon(addon.id)}
                    className="mt-0.5"
                  />
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="text-sm font-medium text-foreground">{addon.name}</span>
                    <span className="text-xs text-muted-foreground">{addon.description}</span>
                  </div>
                  <span className="font-mono text-sm tabular-nums text-muted-foreground">
                    +${addon.price}
                  </span>
                </label>
              ))}
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Monthly total</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={total}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={spring}
                  className="font-heading text-2xl font-bold tabular-nums tracking-tight text-foreground"
                >
                  ${total}
                </motion.span>
              </AnimatePresence>
            </div>
          </CardContent>
          <CardFooter>
            <motion.div whileHover={{ y: -2 }} transition={spring} className="w-full">
              <Button size="lg" className="w-full">
                Subscribe for ${total}/mo
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </section>
  )
}
