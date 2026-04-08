"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RefreshCwIcon, CalendarIcon, ShieldCheckIcon } from "lucide-react"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const plan = {
  name: "Roaster's Choice",
  description: "A curated selection of seasonal single-origin coffees, roasted within 48 hours of shipping.",
  monthlyPrice: 29.9,
  yearlyPrice: 299,
  features: [
    "340g bag per delivery",
    "Roast profile notes included",
    "Free shipping",
    "Pause or cancel anytime",
  ],
}

export default function CheckoutSubscription() {
  const [billing, setBilling] = useState("monthly")
  const [startDate, setStartDate] = useState("2026-04-15")
  const [terms, setTerms] = useState(false)

  const price = billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice
  const interval = billing === "monthly" ? "month" : "year"

  return (
    <section className="mx-auto w-full max-w-md px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-6"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Subscribe
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Set up your recurring delivery.
        </p>
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
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle className="flex items-center gap-2">
                <RefreshCwIcon className="size-4" />
                {plan.name}
              </CardTitle>
              <Badge variant="secondary" className="text-[10px]">Subscription</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {plan.description}
            </p>

            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Billing cycle
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["monthly", "yearly"] as const).map((option) => (
                  <motion.button
                    key={option}
                    whileHover={{ y: -1 }}
                    transition={spring}
                    onClick={() => setBilling(option)}
                    className={`rounded-xl p-3 text-center ring-1 transition-colors ${
                      billing === option
                        ? "bg-primary/5 ring-primary"
                        : "ring-foreground/10 hover:bg-muted/50"
                    }`}
                  >
                    <span className="block text-sm font-semibold text-foreground capitalize">
                      {option}
                    </span>
                    <span className="mt-0.5 block font-mono text-xs tabular-nums text-muted-foreground">
                      ${option === "monthly" ? plan.monthlyPrice.toFixed(2) : plan.yearlyPrice.toFixed(0)}/{option === "monthly" ? "mo" : "yr"}
                    </span>
                    {option === "yearly" && (
                      <Badge variant="secondary" className="mt-1.5 text-[9px]">
                        Save ${(plan.monthlyPrice * 12 - plan.yearlyPrice).toFixed(0)}
                      </Badge>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <CalendarIcon className="size-3" />
                Start date
              </label>
              <Select value={startDate} onValueChange={(v) => v && setStartDate(v)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2026-04-15">April 15, 2026</SelectItem>
                  <SelectItem value="2026-04-22">April 22, 2026</SelectItem>
                  <SelectItem value="2026-05-01">May 1, 2026</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <ul className="space-y-1.5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                  <span className="size-1 rounded-full bg-primary" />
                  {f}
                </li>
              ))}
            </ul>

            <Separator />

            <label className="flex cursor-pointer items-start gap-2.5">
              <Checkbox
                checked={terms}
                onCheckedChange={(v) => setTerms(!!v)}
                className="mt-0.5"
              />
              <span className="text-xs leading-relaxed text-muted-foreground">
                I agree to the subscription terms. I understand I will be billed
                ${price.toFixed(2)}/{interval} until I cancel. I can cancel at any time
                from my account settings.
              </span>
            </label>

            <motion.div whileHover={{ y: -1 }} transition={spring}>
              <Button className="w-full gap-2" size="lg" disabled={!terms}>
                <ShieldCheckIcon className="size-4" />
                Subscribe - ${price.toFixed(2)}/{interval}
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
