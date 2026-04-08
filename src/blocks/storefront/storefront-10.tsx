"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { GiftIcon, SparklesIcon } from "lucide-react"

const amounts = [25, 50, 75, 100, 150, 250]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function Storefront10() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-20 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div variants={itemVariants} className="text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10">
            <GiftIcon className="size-6 text-primary" />
          </div>
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Send a Gift Card
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Give the gift of handcrafted ceramics. Delivered instantly by email,
            valid for 12 months.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <CardContent className="space-y-6 py-8">
              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Select Amount
                </Label>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {amounts.map((amount, i) => (
                    <motion.button
                      key={amount}
                      whileHover={{ y: -2 }}
                      transition={spring}
                      className={`flex h-12 items-center justify-center rounded-lg font-mono text-sm font-semibold tabular-nums transition-colors ${
                        i === 2
                          ? "bg-primary text-primary-foreground ring-2 ring-primary/20"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      ${amount}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="sender" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Your Name
                  </Label>
                  <Input id="sender" placeholder="Marie Laurent" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="recipient-email" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Recipient Email
                  </Label>
                  <Input id="recipient-email" type="email" placeholder="friend@example.com" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="recipient-name" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Recipient Name
                </Label>
                <Input id="recipient-name" placeholder="Akiko Tanaka" />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Personal Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Wishing you a beautiful collection for your new kitchen..."
                  rows={3}
                />
              </div>

              <div className="h-px bg-border" />

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Total</div>
                  <div className="font-mono text-2xl font-bold tabular-nums tracking-tight">$75.00</div>
                </div>
                <motion.div whileHover={{ y: -2 }} transition={spring}>
                  <Button size="lg" className="gap-2">
                    <SparklesIcon className="size-4" />
                    Purchase Gift Card
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}
