"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function CtaAnnualSavings() {
  const [annual, setAnnual] = useState(true)

  const monthlyPrice = 29
  const annualMonthly = 23
  const savings = (monthlyPrice - annualMonthly) * 12

  return (
    <section className="mx-auto w-full max-w-md px-6 py-16">
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
          <CardContent className="flex flex-col items-center gap-6 pt-2 text-center">
            <div className="flex flex-col gap-2">
              <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">
                Save with annual billing
              </h3>
              <p className="text-sm text-muted-foreground">
                Switch to yearly and keep more in your budget.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Label
                htmlFor="billing-toggle"
                className={annual ? "text-muted-foreground" : "text-foreground font-semibold"}
              >
                Monthly
              </Label>
              <Switch
                id="billing-toggle"
                checked={annual}
                onCheckedChange={setAnnual}
              />
              <Label
                htmlFor="billing-toggle"
                className={annual ? "text-foreground font-semibold" : "text-muted-foreground"}
              >
                Annual
              </Label>
            </div>

            <div className="flex flex-col items-center gap-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={annual ? "annual" : "monthly"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={spring}
                  className="flex items-baseline gap-1"
                >
                  <span className="font-heading text-4xl font-bold tabular-nums tracking-tight text-foreground">
                    ${annual ? annualMonthly : monthlyPrice}
                  </span>
                  <span className="text-sm text-muted-foreground">/mo</span>
                </motion.div>
              </AnimatePresence>

              {annual && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={spring}
                  className="flex items-center gap-2"
                >
                  <span className="text-sm text-muted-foreground line-through tabular-nums">
                    ${monthlyPrice}/mo
                  </span>
                  <Badge variant="secondary" className="text-xs tabular-nums">
                    Save ${savings}/yr
                  </Badge>
                </motion.div>
              )}

              {annual && (
                <p className="mt-1 text-xs tabular-nums text-muted-foreground/60">
                  Billed as ${annualMonthly * 12}/year
                </p>
              )}
            </div>

            <motion.div whileHover={{ y: -2 }} transition={spring} className="w-full">
              <Button size="lg" className="w-full">
                Start free trial
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
