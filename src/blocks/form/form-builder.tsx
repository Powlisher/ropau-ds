"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PlusIcon, XIcon, GripVerticalIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FormField {
  id: string
  type: string
  label: string
}

const defaultFields: FormField[] = [
  { id: "f1", type: "text", label: "Full name" },
  { id: "f2", type: "email", label: "Work email" },
]

export default function FormBuilder() {
  const [fields, setFields] = useState<FormField[]>(defaultFields)
  let counter = fields.length

  function addField() {
    counter++
    setFields([
      ...fields,
      { id: `f${Date.now()}`, type: "text", label: "" },
    ])
  }

  function removeField(id: string) {
    setFields(fields.filter((f) => f.id !== id))
  }

  function updateField(id: string, updates: Partial<FormField>) {
    setFields(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)))
  }

  return (
    <div className="flex items-center justify-center bg-slate-50/80 px-4 py-16">
      <Card
        className="w-full max-w-lg"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <CardHeader>
          <CardTitle className="text-lg tracking-tight">
            Form builder
          </CardTitle>
          <CardDescription>
            Add and configure fields for your custom form
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <AnimatePresence initial={false}>
            {fields.map((field) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
                className="overflow-hidden"
              >
                <div className="flex items-end gap-3 rounded-lg bg-slate-50/80 p-3 ring-1 ring-slate-200/60">
                  <GripVerticalIcon className="mb-1.5 size-4 shrink-0 cursor-grab text-slate-300" />
                  <div className="flex flex-1 flex-col gap-1.5">
                    <Label className="text-xs text-muted-foreground">
                      Field label
                    </Label>
                    <Input
                      value={field.label}
                      onChange={(e) =>
                        updateField(field.id, { label: e.target.value })
                      }
                      placeholder="Enter label..."
                      className="h-7 text-sm"
                    />
                  </div>
                  <div className="flex w-32 shrink-0 flex-col gap-1.5">
                    <Label className="text-xs text-muted-foreground">
                      Type
                    </Label>
                    <Select
                      value={field.type}
                      onValueChange={(v: string | null) =>
                        updateField(field.id, { type: v ?? undefined })
                      }
                    >
                      <SelectTrigger className="h-7 w-full text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="tel">Phone</SelectItem>
                        <SelectItem value="textarea">Textarea</SelectItem>
                        <SelectItem value="select">Select</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => removeField(field.id)}
                    className="shrink-0 text-muted-foreground hover:text-destructive"
                  >
                    <XIcon className="size-3.5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <Button
            variant="outline"
            className="w-full border-dashed"
            onClick={addField}
          >
            <PlusIcon className="size-4" />
            Add field
          </Button>

          {fields.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-8">
              <p className="text-sm font-medium text-muted-foreground">
                No fields yet
              </p>
              <p className="text-xs text-muted-foreground/70">
                Add your first field to start building the form
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost">Preview</Button>
            <Button>Save form</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
