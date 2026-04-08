"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { GiftIcon } from "lucide-react"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function CheckoutGift() {
  const [wrapping, setWrapping] = useState(false)
  const [message, setMessage] = useState("")
  const [receipt, setReceipt] = useState(false)

  return (
    <section className="mx-auto w-full max-w-md px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-6"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Gift Options
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Add a personal touch to your order.
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
            <CardTitle className="flex items-center gap-2">
              <GiftIcon className="size-4" />
              Gift Wrapping
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <motion.label
              whileHover={{ y: -1 }}
              transition={spring}
              className={`flex cursor-pointer items-start gap-3 rounded-xl p-4 ring-1 transition-colors ${
                wrapping ? "bg-primary/5 ring-primary" : "ring-foreground/10 hover:bg-muted/50"
              }`}
            >
              <Checkbox
                checked={wrapping}
                onCheckedChange={(v) => setWrapping(!!v)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">Add gift wrapping</span>
                  <Badge variant="secondary" className="text-[10px]">+$5.99</Badge>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Premium kraft paper with a hand-tied ribbon and wax seal.
                </p>
              </div>
            </motion.label>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Gift message</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Happy birthday! Hope you love this as much as I do."
                className="min-h-24 resize-none"
              />
              <p className="text-right text-[11px] tabular-nums text-muted-foreground">
                {message.length}/200
              </p>
            </div>

            <label className="flex cursor-pointer items-center gap-3">
              <Checkbox
                checked={receipt}
                onCheckedChange={(v) => setReceipt(!!v)}
              />
              <div>
                <span className="text-sm font-medium text-foreground">Include gift receipt</span>
                <p className="text-xs text-muted-foreground">
                  A receipt without prices will be included in the package.
                </p>
              </div>
            </label>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
