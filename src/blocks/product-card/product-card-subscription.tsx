"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RefreshCwIcon } from "lucide-react"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const product = {
  name: "Single Origin Coffee Blend",
  description: "Ethiopian Yirgacheffe, washed process. Tasting notes of jasmine, bergamot, and brown sugar.",
  image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=480&fit=crop",
  prices: {
    "Every week": { price: 14.5, save: null },
    "Every 2 weeks": { price: 14.5, save: null },
    "Every month": { price: 15.0, save: null },
    "One-time": { price: 18.0, save: null },
  } as Record<string, { price: number; save: string | null }>,
}

export default function ProductCardSubscription() {
  const [frequency, setFrequency] = useState("Every 2 weeks")
  const current = product.prices[frequency]
  const isSubscription = frequency !== "One-time"

  return (
    <section className="mx-auto w-full max-w-xs px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      >
        <Card
          className="overflow-hidden"
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <div className="relative aspect-[5/6] w-full overflow-hidden bg-secondary">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            {isSubscription && (
              <Badge className="absolute top-3 left-3 gap-1 text-[10px]">
                <RefreshCwIcon className="size-2.5" />
                Subscribe & Save
              </Badge>
            )}
          </div>
          <CardContent className="flex flex-col gap-4 pt-1">
            <div>
              <h3 className="font-heading text-sm font-semibold tracking-tight text-foreground">
                {product.name}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </div>

            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                Delivery frequency
              </p>
              <Select value={frequency} onValueChange={(v) => setFrequency(v ?? "")}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(product.prices).map((freq) => (
                    <SelectItem key={freq} value={freq}>
                      {freq}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-lg font-semibold tabular-nums text-foreground">
                ${current.price.toFixed(2)}
              </span>
              <span className="text-xs text-muted-foreground">
                {isSubscription ? `/ delivery` : ""}
              </span>
              {isSubscription && (
                <Badge variant="secondary" className="ml-auto text-[10px]">
                  Save ${(product.prices["One-time"].price - current.price).toFixed(2)}
                </Badge>
              )}
            </div>

            <motion.div whileHover={{ y: -1 }} transition={spring}>
              <Button className="w-full gap-2" size="lg">
                {isSubscription ? "Subscribe" : "Buy Once"}
              </Button>
            </motion.div>
            {isSubscription && (
              <p className="text-center text-[11px] text-muted-foreground">
                Cancel or pause anytime. Free shipping on all subscriptions.
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
