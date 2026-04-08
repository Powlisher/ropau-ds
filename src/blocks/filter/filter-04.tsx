"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export default function Filter04() {
  const [range, setRange] = useState([120, 680])
  const min = 0
  const max = 1000

  function formatPrice(val: number) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(val)
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <div
        className="rounded-xl bg-card p-5 ring-1 ring-foreground/[0.06]"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
      >
        <h3 className="mb-1 font-heading text-sm font-semibold tracking-tight">Price Range</h3>
        <p className="mb-5 text-xs text-muted-foreground">Set your budget for this search</p>

        <div className="mb-6 px-1">
          <div className="mb-6">
            <div className="relative h-10 flex items-center">
              <div className="absolute inset-x-0 h-2 rounded-full bg-muted">
                <motion.div
                  className="absolute h-full rounded-full bg-primary/20"
                  style={{
                    left: `${(range[0] / max) * 100}%`,
                    right: `${100 - (range[1] / max) * 100}%`,
                  }}
                  layout
                  transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
                />
              </div>
            </div>
            <Slider
              value={range}
              onValueChange={(val) => setRange(Array.isArray(val) ? val : [val])}
              min={min}
              max={max}
              step={10}
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Min</label>
              <Input
                type="number"
                value={range[0]}
                onChange={(e) => setRange([Math.min(Number(e.target.value), range[1]), range[1]])}
                className="font-mono text-sm tabular-nums"
              />
            </div>
            <div className="mt-5 h-px w-4 bg-border" />
            <div className="flex-1">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Max</label>
              <Input
                type="number"
                value={range[1]}
                onChange={(e) => setRange([range[0], Math.max(Number(e.target.value), range[0])])}
                className="font-mono text-sm tabular-nums"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 rounded-lg bg-muted px-3 py-2 text-center">
            <p className="text-xs text-muted-foreground">Selected range</p>
            <p className="font-heading text-sm font-semibold tracking-tight">
              {formatPrice(range[0])} &ndash; {formatPrice(range[1])}
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => setRange([min, max])}>
            Reset
          </Button>
          <Button size="sm" className="flex-1">
            Apply
          </Button>
        </div>
      </div>
    </div>
  )
}
