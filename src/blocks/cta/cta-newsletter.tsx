"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function CtaNewsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="mx-auto w-full max-w-xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="flex flex-col items-center gap-5 text-center"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Stay in the loop
        </h2>
        <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
          Practical insights on product design, engineering velocity, and building
          software that ships. No fluff, unsubscribe anytime.
        </p>

        {submitted ? (
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={spring}
            className="text-sm font-medium text-primary"
          >
            You are in. Check your inbox to confirm.
          </motion.p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (email) setSubmitted(true)
            }}
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
              <Button type="submit">Subscribe</Button>
            </motion.div>
          </form>
        )}

        <p className="text-xs text-muted-foreground/70">
          Join 4,327 builders already subscribed. We respect your inbox.
        </p>
      </motion.div>
    </section>
  )
}
