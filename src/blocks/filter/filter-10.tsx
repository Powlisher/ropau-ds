"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { PlusIcon, TrashIcon, PlayIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type FilterRow = {
  id: number
  field: string
  operator: string
  value: string
}

const fields = [
  { value: "name", label: "Name" },
  { value: "email", label: "Email" },
  { value: "status", label: "Status" },
  { value: "created", label: "Created date" },
  { value: "revenue", label: "Revenue" },
  { value: "plan", label: "Plan" },
  { value: "country", label: "Country" },
]

const operatorsByField: Record<string, { value: string; label: string }[]> = {
  name: [{ value: "contains", label: "contains" }, { value: "starts_with", label: "starts with" }, { value: "equals", label: "equals" }],
  email: [{ value: "contains", label: "contains" }, { value: "ends_with", label: "ends with" }, { value: "equals", label: "equals" }],
  status: [{ value: "is", label: "is" }, { value: "is_not", label: "is not" }],
  created: [{ value: "after", label: "after" }, { value: "before", label: "before" }, { value: "between", label: "between" }],
  revenue: [{ value: "gt", label: "greater than" }, { value: "lt", label: "less than" }, { value: "eq", label: "equals" }],
  plan: [{ value: "is", label: "is" }, { value: "is_not", label: "is not" }],
  country: [{ value: "is", label: "is" }, { value: "is_not", label: "is not" }],
}

const itemVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.15 } },
}

export default function Filter10() {
  const [rows, setRows] = useState<FilterRow[]>([
    { id: 1, field: "status", operator: "is", value: "Active" },
    { id: 2, field: "revenue", operator: "gt", value: "5000" },
    { id: 3, field: "country", operator: "is", value: "France" },
  ])

  function addRow() {
    setRows((prev) => [...prev, { id: Date.now(), field: "name", operator: "contains", value: "" }])
  }

  function removeRow(id: number) {
    setRows((prev) => prev.filter((r) => r.id !== id))
  }

  function updateRow(id: number, key: keyof FilterRow, val: string) {
    setRows((prev) => prev.map((r) => {
      if (r.id !== id) return r
      if (key === "field") {
        const ops = operatorsByField[val] ?? operatorsByField.name
        return { ...r, field: val, operator: ops[0].value, value: "" }
      }
      return { ...r, [key]: val }
    }))
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div
        className="rounded-xl bg-card ring-1 ring-foreground/[0.06]"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
      >
        <div className="border-b px-5 py-4">
          <h3 className="font-heading text-sm font-semibold tracking-tight">Filter Builder</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">Combine conditions to find exactly what you need</p>
        </div>

        <div className="p-5 space-y-3">
          <AnimatePresence initial={false}>
            {rows.map((row, i) => (
              <motion.div
                key={row.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex items-center gap-2"
              >
                <span className="w-12 shrink-0 text-right text-xs font-medium text-muted-foreground">
                  {i === 0 ? "Where" : "and"}
                </span>

                <div className="w-32 shrink-0">
                  <Select value={row.field} onValueChange={(val) => updateRow(row.id, "field", val ?? "")}>
                    <SelectTrigger size="sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fields.map((f) => (
                        <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-32 shrink-0">
                  <Select value={row.operator} onValueChange={(val) => updateRow(row.id, "operator", val ?? "")}>
                    <SelectTrigger size="sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(operatorsByField[row.field] ?? operatorsByField.name).map((op) => (
                        <SelectItem key={op.value} value={op.value}>{op.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Input
                  value={row.value}
                  onChange={(e) => updateRow(row.id, "value", e.target.value)}
                  placeholder="Value..."
                  className="flex-1"
                />

                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 shrink-0 text-muted-foreground hover:text-destructive"
                  onClick={() => removeRow(row.id)}
                >
                  <TrashIcon className="size-3.5" />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="flex items-center gap-2 pl-14">
            <Button variant="outline" size="sm" onClick={addRow} className="gap-1.5">
              <PlusIcon className="size-3.5" />
              Add condition
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between border-t px-5 py-3">
          <p className="text-xs text-muted-foreground">
            <span className="font-mono tabular-nums font-medium text-foreground">{rows.length}</span> condition{rows.length !== 1 ? "s" : ""} active
          </p>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => setRows([])}>
              Reset
            </Button>
            <Button size="sm" className="gap-1.5">
              <PlayIcon className="size-3" />
              Run filter
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
