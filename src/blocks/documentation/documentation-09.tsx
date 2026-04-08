"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Copy, Check, Terminal } from "lucide-react"

const managers = [
  { id: "npm", label: "npm", command: "npm install @ropau/sdk" },
  { id: "pnpm", label: "pnpm", command: "pnpm add @ropau/sdk" },
  { id: "yarn", label: "yarn", command: "yarn add @ropau/sdk" },
  { id: "bun", label: "bun", command: "bun add @ropau/sdk" },
]

export default function Documentation09() {
  const [active, setActive] = useState("pnpm")
  const [copied, setCopied] = useState(false)

  const current = managers.find((m) => m.id === active)!

  function handleCopy() {
    navigator.clipboard.writeText(current.command)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      className="w-full max-w-lg"
    >
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Installation
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Install the SDK with your preferred package manager. Requires Node.js 18+.
        </p>
      </div>

      <div
        className="overflow-hidden rounded-xl ring-1 ring-foreground/10"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <div className="flex items-center justify-between border-b bg-slate-950 px-1 py-1">
          <div className="flex">
            {managers.map((mgr) => (
              <button
                key={mgr.id}
                onClick={() => setActive(mgr.id)}
                className={`relative rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  active === mgr.id
                    ? "text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {active === mgr.id && (
                  <motion.div
                    layoutId="doc09-tab"
                    className="absolute inset-0 rounded-md bg-slate-800"
                    transition={{ type: "spring" as const, stiffness: 400, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{mgr.label}</span>
              </button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="mr-1 h-7 gap-1.5 text-[11px] text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                Copy
              </>
            )}
          </Button>
        </div>

        <div className="flex items-center gap-3 bg-slate-950 px-5 py-5">
          <Terminal className="h-4 w-4 shrink-0 text-slate-500" />
          <motion.code
            key={active}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            className="font-mono text-[13px] text-slate-300"
          >
            {current.command}
          </motion.code>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-muted/40 px-4 py-3 ring-1 ring-foreground/5">
        <p className="text-[13px] leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">Peer dependencies:</span>{" "}
          The SDK requires <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">typescript ^5.4</code>{" "}
          and <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">zod ^3.22</code> as
          peer dependencies. Install them if they are not already in your project.
        </p>
      </div>
    </motion.div>
  )
}
