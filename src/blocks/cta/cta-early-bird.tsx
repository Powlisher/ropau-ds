"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function CtaEarlyBird() {
  const [email, setEmail] = useState("")

  return (
    <section className="mx-auto w-full max-w-xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="flex flex-col items-center gap-6 rounded-2xl bg-card px-8 py-10 text-center ring-1 ring-foreground/10"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <Badge variant="secondary" className="text-xs font-medium tracking-wide uppercase">
          Early Access
        </Badge>

        <div className="flex flex-col gap-2">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            Lock in the founding rate
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            First 200 members get lifetime access at 40% off launch pricing.
            Offer ends when spots fill -- no extensions.
          </p>
        </div>

        <div className="flex gap-6 text-center">
          {[
            { value: "04", label: "Days" },
            { value: "11", label: "Hours" },
            { value: "37", label: "Min" },
          ].map((unit) => (
            <div key={unit.label} className="flex flex-col items-center gap-0.5">
              <span className="font-mono text-2xl font-bold tabular-nums tracking-tight text-foreground">
                {unit.value}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex w-full max-w-sm gap-2"
        >
          <Input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <motion.div whileHover={{ y: -1 }} transition={spring}>
            <Button type="submit">Claim spot</Button>
          </motion.div>
        </form>

        <p className="text-xs tabular-nums text-muted-foreground/60">
          143 of 200 spots claimed
        </p>
      </motion.div>
    </section>
  )
}
