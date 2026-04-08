"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { PlusIcon, Trash2Icon, GlobeIcon, LockIcon, CalendarIcon } from "lucide-react"

type ApiKey = {
  id: string
  name: string
  prefix: string
  scope: "read" | "write" | "admin"
  createdAt: string
  lastUsed: string
  requests: number
}

const initialKeys: ApiKey[] = [
  { id: "k1", name: "Production Backend", prefix: "rpk_live_4f8a...x2Kp", scope: "admin", createdAt: "2024-01-15", lastUsed: "3 min ago", requests: 284930 },
  { id: "k2", name: "Mobile App Client", prefix: "pk_live_9d3b...mR7w", scope: "read", createdAt: "2024-03-08", lastUsed: "12 min ago", requests: 1247800 },
  { id: "k3", name: "Analytics Pipeline", prefix: "rpk_live_2e7c...hN4f", scope: "write", createdAt: "2024-06-22", lastUsed: "2h ago", requests: 89420 },
  { id: "k4", name: "Staging Environment", prefix: "rpk_test_7b1d...pQ9s", scope: "admin", createdAt: "2024-08-14", lastUsed: "5d ago", requests: 12380 },
  { id: "k5", name: "CI/CD Webhook", prefix: "rpk_live_0a5e...vL3m", scope: "write", createdAt: "2024-11-03", lastUsed: "1h ago", requests: 34670 },
]

const scopeStyles: Record<string, string> = {
  admin: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  write: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  read: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
}

const premiumShadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const listVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

function formatRequests(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return n.toString()
}

export default function Crud06() {
  const [keys, setKeys] = useState(initialKeys)
  const [selected, setSelected] = useState<string | null>(keys[0]?.id ?? null)

  const selectedKey = keys.find((k) => k.id === selected)

  const remove = (id: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id))
    if (selected === id) setSelected(keys.find((k) => k.id !== id)?.id ?? null)
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[340px_1fr]">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-sm font-semibold tracking-tight text-foreground">API Keys</h2>
          <Button size="sm" variant="outline" className="h-7 gap-1 text-xs">
            <PlusIcon className="size-3" />
            Create
          </Button>
        </div>

        <motion.div className="space-y-1.5" variants={listVariants} initial="hidden" animate="visible">
          <AnimatePresence mode="popLayout">
            {keys.map((key) => (
              <motion.button
                key={key.id}
                variants={itemVariants}
                layout
                exit={{ opacity: 0, x: -20 }}
                onClick={() => setSelected(key.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left transition-colors ${
                  selected === key.id ? "bg-muted ring-1 ring-border" : "hover:bg-muted/50"
                }`}
                style={selected === key.id ? { boxShadow: premiumShadow } : undefined}
                whileHover={{ x: 2 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              >
                <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                  {key.scope === "admin" ? <LockIcon className="size-3.5 text-red-500" /> : <GlobeIcon className="size-3.5 text-muted-foreground" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{key.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">{key.prefix}</p>
                </div>
                <span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold capitalize ${scopeStyles[key.scope]}`}>
                  {key.scope}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <div>
        <AnimatePresence mode="wait">
          {selectedKey ? (
            <motion.div
              key={selectedKey.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
            >
              <Card style={{ boxShadow: premiumShadow }}>
                <CardHeader className="flex-row items-start justify-between">
                  <div>
                    <CardTitle className="font-heading text-base font-semibold tracking-tight">{selectedKey.name}</CardTitle>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">{selectedKey.prefix}</p>
                  </div>
                  <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${scopeStyles[selectedKey.scope]}`}>
                    {selectedKey.scope}
                  </span>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Created</p>
                      <p className="mt-0.5 flex items-center gap-1 font-mono text-sm tabular-nums text-foreground">
                        <CalendarIcon className="size-3 text-muted-foreground" />
                        {selectedKey.createdAt}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Last Used</p>
                      <p className="mt-0.5 font-mono text-sm tabular-nums text-foreground">{selectedKey.lastUsed}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Total Requests</p>
                      <p className="mt-0.5 font-mono text-sm tabular-nums text-foreground">{formatRequests(selectedKey.requests)}</p>
                    </div>
                  </div>

                  <div className="space-y-3 rounded-xl bg-muted/50 p-4">
                    <Label className="text-xs font-medium">Rename Key</Label>
                    <div className="flex gap-2">
                      <Input defaultValue={selectedKey.name} className="text-sm" />
                      <Button size="sm" variant="outline">Save</Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-border/50 pt-4">
                    <div>
                      <p className="text-sm font-medium text-red-600">Revoke this key</p>
                      <p className="text-xs text-muted-foreground">This action cannot be undone. All integrations using this key will break.</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
                      onClick={() => remove(selectedKey.id)}
                    >
                      <Trash2Icon className="size-3.5" />
                      Revoke
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex h-64 items-center justify-center rounded-xl border border-dashed border-border/60"
            >
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">No key selected</p>
                <p className="mt-1 text-xs text-muted-foreground">Choose a key from the list to view details</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
