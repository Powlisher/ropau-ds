"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CodeIcon, PlayIcon, BookOpenIcon, AlertTriangleIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"
const shadowLg = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)"

const functions = [
  { name: "approve", type: "write" as const, params: [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }] },
  { name: "transfer", type: "write" as const, params: [{ name: "to", type: "address" }, { name: "amount", type: "uint256" }] },
  { name: "balanceOf", type: "read" as const, params: [{ name: "account", type: "address" }] },
  { name: "totalSupply", type: "read" as const, params: [] },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Web3ContractInteraction() {
  const [selectedFn, setSelectedFn] = useState(0)
  const fn = functions[selectedFn]

  return (
    <motion.div
      className="mx-auto max-w-lg space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadowLg }}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-violet-50">
                  <CodeIcon className="size-5 text-violet-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold tracking-tight">Contract Interaction</CardTitle>
                  <CardDescription className="flex items-center gap-1.5">
                    <code className="text-[11px] font-mono text-muted-foreground">0x6B17...1d0F</code>
                    <Badge variant="secondary" className="text-[10px]">Verified</Badge>
                  </CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <BookOpenIcon className="size-3.5 mr-1.5" />
                ABI
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {functions.map((f, i) => (
                <motion.button
                  key={f.name}
                  onClick={() => setSelectedFn(i)}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-mono transition-all ${
                    i === selectedFn
                      ? f.type === "write"
                        ? "border-orange-200 bg-orange-50 text-orange-700"
                        : "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-border bg-card text-muted-foreground hover:bg-muted/50"
                  }`}
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                >
                  <span className={`size-1.5 rounded-full ${f.type === "write" ? "bg-orange-500" : "bg-emerald-500"}`} />
                  {f.name}
                </motion.button>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground font-mono">{fn.name}()</span>
                <Badge variant={fn.type === "write" ? "destructive" : "secondary"} className="text-[10px] uppercase tracking-wide">
                  {fn.type}
                </Badge>
              </div>

              {fn.params.length > 0 ? (
                <div className="space-y-2.5">
                  {fn.params.map((param) => (
                    <div key={param.name}>
                      <label className="text-xs text-muted-foreground mb-1 block">
                        <span className="font-medium">{param.name}</span>
                        <span className="text-muted-foreground/60 ml-1.5">({param.type})</span>
                      </label>
                      <Input
                        placeholder={param.type === "address" ? "0x..." : "0"}
                        className="font-mono text-sm"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">No parameters required</p>
              )}

              <Button className="w-full" variant={fn.type === "write" ? "default" : "outline"}>
                <PlayIcon className="size-3.5 mr-1.5" />
                {fn.type === "write" ? "Execute Transaction" : "Query"}
              </Button>
            </div>

            {fn.type === "write" && (
              <div className="flex items-start gap-2 rounded-lg bg-amber-50/80 border border-amber-200/60 p-3">
                <AlertTriangleIcon className="size-4 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-700 leading-relaxed">
                  Write functions require a connected wallet and gas fees. Review the transaction carefully before signing.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
