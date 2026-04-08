"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { RotateCcw } from "lucide-react"

const variants = ["default", "outline", "ghost", "destructive"] as const
const sizes = ["sm", "default", "lg"] as const

export default function Documentation05() {
  const [variant, setVariant] = useState<(typeof variants)[number]>("default")
  const [size, setSize] = useState<(typeof sizes)[number]>("default")
  const [disabled, setDisabled] = useState(false)
  const [label, setLabel] = useState("Save Changes")

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      className="w-full max-w-2xl"
    >
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Playground
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Tweak props and see the result live. Changes apply instantly.
        </p>
      </div>

      <div
        className="overflow-hidden rounded-xl ring-1 ring-foreground/10"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <div className="flex min-h-[180px] items-center justify-center border-b bg-muted/20 p-8">
          <motion.div
            key={`${variant}-${size}-${disabled}-${label}`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
          >
            <Button
              variant={variant as "default"}
              size={size}
              disabled={disabled}
            >
              {label}
            </Button>
          </motion.div>
        </div>

        <div className="grid gap-5 p-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Variant
            </label>
            <div className="flex flex-wrap gap-1.5">
              {variants.map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={`rounded-md px-2.5 py-1.5 font-mono text-xs tabular-nums transition-colors ${
                    variant === v
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Size
            </label>
            <div className="flex flex-wrap gap-1.5">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`rounded-md px-2.5 py-1.5 font-mono text-xs tabular-nums transition-colors ${
                    size === s
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Label
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none ring-1 ring-foreground/5 focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div className="flex items-end">
            <div className="flex items-center gap-3">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={disabled}
                  onChange={(e) => setDisabled(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Disabled</span>
              </label>
              <button
                onClick={() => {
                  setVariant("default")
                  setSize("default")
                  setDisabled(false)
                  setLabel("Save Changes")
                }}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="border-t bg-slate-950 p-4">
          <pre className="font-mono text-xs leading-relaxed text-slate-300">
            {`<Button${variant !== "default" ? ` variant="${variant}"` : ""}${size !== "default" ? ` size="${size}"` : ""}${disabled ? " disabled" : ""}>\n  ${label}\n</Button>`}
          </pre>
        </div>
      </div>
    </motion.div>
  )
}
