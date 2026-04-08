"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { PlusIcon, TrashIcon, GripVerticalIcon, ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import { motion, AnimatePresence, Reorder } from "framer-motion"

type SortRule = { id: number; field: string; direction: "asc" | "desc" }

const fieldOptions = [
  { value: "name", label: "Name" },
  { value: "date", label: "Date created" },
  { value: "updated", label: "Last updated" },
  { value: "priority", label: "Priority" },
  { value: "assignee", label: "Assignee" },
  { value: "status", label: "Status" },
  { value: "size", label: "Size" },
]

const itemVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.15 } },
}

export default function Sorting09() {
  const [rules, setRules] = useState<SortRule[]>([
    { id: 1, field: "priority", direction: "asc" },
    { id: 2, field: "date", direction: "desc" },
  ])

  const handleReorder = useCallback((newOrder: SortRule[]) => {
    setRules(newOrder)
  }, [])

  function addRule() {
    const used = rules.map((r) => r.field)
    const next = fieldOptions.find((f) => !used.includes(f.value))
    if (!next) return
    setRules((prev) => [...prev, { id: Date.now(), field: next.value, direction: "asc" }])
  }

  function removeRule(id: number) {
    setRules((prev) => prev.filter((r) => r.id !== id))
  }

  function updateRule(id: number, key: "field" | "direction", val: string) {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, [key]: val } : r)))
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div
        className="rounded-xl bg-card ring-1 ring-foreground/[0.06]"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
      >
        <div className="border-b px-5 py-4">
          <h3 className="font-heading text-sm font-semibold tracking-tight">Custom Sort Order</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">Drag to reorder sort priority</p>
        </div>

        <div className="p-5 space-y-2">
          <Reorder.Group axis="y" values={rules} onReorder={handleReorder} className="space-y-2">
            <AnimatePresence initial={false}>
              {rules.map((rule, i) => (
                <Reorder.Item
                  key={rule.id}
                  value={rule}
                  className="flex items-center gap-2"
                >
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-1 items-center gap-2"
                  >
                    <GripVerticalIcon className="size-4 shrink-0 cursor-grab text-muted-foreground/40 active:cursor-grabbing" />

                    <span className="w-10 shrink-0 text-right text-xs font-medium text-muted-foreground">
                      {i === 0 ? "Sort" : "then"}
                    </span>

                    <div className="flex-1">
                      <Select value={rule.field} onValueChange={(val) => updateRule(rule.id, "field", val ?? "")}>
                        <SelectTrigger size="sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fieldOptions.map((f) => (
                            <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateRule(rule.id, "direction", rule.direction === "asc" ? "desc" : "asc")}
                      className="flex size-8 shrink-0 items-center justify-center rounded-md border transition-colors hover:bg-muted"
                    >
                      {rule.direction === "asc" ? (
                        <ArrowUpIcon className="size-3.5 text-muted-foreground" />
                      ) : (
                        <ArrowDownIcon className="size-3.5 text-muted-foreground" />
                      )}
                    </motion.button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 shrink-0 text-muted-foreground hover:text-destructive"
                      onClick={() => removeRule(rule.id)}
                    >
                      <TrashIcon className="size-3.5" />
                    </Button>
                  </motion.div>
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>

          {rules.length < fieldOptions.length && (
            <Button variant="outline" size="sm" onClick={addRule} className="mt-2 gap-1.5">
              <PlusIcon className="size-3.5" />
              Add sort level
            </Button>
          )}
        </div>

        <div className="flex items-center justify-between border-t px-5 py-3">
          <Button variant="ghost" size="sm" onClick={() => setRules([])}>
            Reset
          </Button>
          <Button size="sm">Apply sort</Button>
        </div>
      </div>
    </div>
  )
}
