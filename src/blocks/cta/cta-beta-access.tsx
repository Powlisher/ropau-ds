"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function CtaBetaAccess() {
  const [email, setEmail] = useState("")
  const [requested, setRequested] = useState(false)

  return (
    <section className="mx-auto w-full max-w-md px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="flex flex-col gap-5 rounded-2xl bg-card px-7 py-8 ring-1 ring-foreground/10"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <Badge>Beta</Badge>
          <span className="text-xs font-medium tabular-nums tracking-wide text-muted-foreground">
            v0.9.2
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">
            Request early access
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            We are onboarding teams in batches of 25. Drop your email and
            we will reach out when your cohort opens.
          </p>
        </div>

        {requested ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={spring}
            className="rounded-lg bg-primary/5 px-4 py-3 text-sm font-medium text-primary ring-1 ring-primary/10"
          >
            You are on the list. We will email you within 48 hours.
          </motion.div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (email) setRequested(true)
            }}
            className="flex flex-col gap-3"
          >
            <Input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <motion.div whileHover={{ y: -1 }} transition={spring}>
              <Button type="submit" className="w-full">
                Request Access
              </Button>
            </motion.div>
          </form>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground/60">
          <span className="tabular-nums">73 spots remaining</span>
          <span className="tabular-nums">427 on waitlist</span>
        </div>
      </motion.div>
    </section>
  )
}
