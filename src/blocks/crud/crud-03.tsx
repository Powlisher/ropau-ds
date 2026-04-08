"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import { PlusIcon, PencilIcon, Trash2Icon } from "lucide-react"

type Webhook = {
  id: string
  name: string
  url: string
  events: string
  status: "active" | "paused" | "failing"
  lastTriggered: string
}

const initialWebhooks: Webhook[] = [
  { id: "w1", name: "Stripe Payment Events", url: "https://api.myapp.dev/webhooks/stripe", events: "payment.success, payment.failed", status: "active", lastTriggered: "2 min ago" },
  { id: "w2", name: "GitHub Push Notifications", url: "https://api.myapp.dev/webhooks/github", events: "push, pull_request.merged", status: "active", lastTriggered: "18 min ago" },
  { id: "w3", name: "Slack Channel Alerts", url: "https://hooks.slack.com/services/T04/B08/xYz", events: "alert.critical, alert.warning", status: "paused", lastTriggered: "3 days ago" },
  { id: "w4", name: "Sendgrid Delivery Status", url: "https://api.myapp.dev/webhooks/email", events: "email.delivered, email.bounced", status: "failing", lastTriggered: "1h ago" },
  { id: "w5", name: "Intercom User Events", url: "https://api.myapp.dev/webhooks/intercom", events: "user.created, conversation.closed", status: "active", lastTriggered: "42 min ago" },
]

const statusStyles: Record<string, { bg: string; dot: string }> = {
  active: { bg: "bg-emerald-50 dark:bg-emerald-950/30", dot: "bg-emerald-500" },
  paused: { bg: "bg-amber-50 dark:bg-amber-950/30", dot: "bg-amber-500" },
  failing: { bg: "bg-red-50 dark:bg-red-950/30", dot: "bg-red-500" },
}

const premiumShadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Crud03() {
  const [webhooks, setWebhooks] = useState(initialWebhooks)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Webhook | null>(null)
  const [form, setForm] = useState({ name: "", url: "", events: "" })

  const openEdit = (w: Webhook) => {
    setEditing(w)
    setForm({ name: w.name, url: w.url, events: w.events })
    setDialogOpen(true)
  }

  const openCreate = () => {
    setEditing(null)
    setForm({ name: "", url: "", events: "" })
    setDialogOpen(true)
  }

  const save = () => {
    if (!form.name.trim() || !form.url.trim()) return
    if (editing) {
      setWebhooks((prev) => prev.map((w) => w.id === editing.id ? { ...w, ...form } : w))
    } else {
      setWebhooks((prev) => [...prev, { id: `new-${Date.now()}`, ...form, status: "active" as const, lastTriggered: "Never" }])
    }
    setDialogOpen(false)
  }

  const remove = (id: string) => setWebhooks((prev) => prev.filter((w) => w.id !== id))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Webhooks</h2>
          <p className="text-sm text-muted-foreground">{webhooks.filter((w) => w.status === "active").length} active of {webhooks.length} configured</p>
        </div>
        <Button size="sm" onClick={openCreate} className="gap-1.5">
          <PlusIcon className="size-3.5" />
          New webhook
        </Button>
      </div>

      <Card style={{ boxShadow: premiumShadow }} className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Webhook</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Events</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Last Triggered</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <motion.tbody variants={containerVariants} initial="hidden" animate="visible">
              <AnimatePresence mode="popLayout">
                {webhooks.map((wh) => {
                  const st = statusStyles[wh.status]
                  return (
                    <motion.tr key={wh.id} variants={rowVariants} layout exit={{ opacity: 0, x: -20 }} className="group border-b border-border/30 transition-colors hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-foreground">{wh.name}</p>
                        <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">{wh.url}</p>
                      </td>
                      <td className="max-w-48 px-4 py-3">
                        <p className="truncate text-xs text-muted-foreground">{wh.events}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[10px] font-semibold capitalize ${st.bg}`}>
                          <span className={`size-1.5 rounded-full ${st.dot}`} />
                          {wh.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-xs tabular-nums text-muted-foreground">{wh.lastTriggered}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                          <button onClick={() => openEdit(wh)} className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"><PencilIcon className="size-3.5" /></button>
                          <button onClick={() => remove(wh.id)} className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"><Trash2Icon className="size-3.5" /></button>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </AnimatePresence>
            </motion.tbody>
          </table>
        </div>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Webhook" : "Create Webhook"}</DialogTitle>
            <DialogDescription>{editing ? "Update the webhook configuration" : "Configure a new webhook endpoint"}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Name</Label>
              <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="My Webhook" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Endpoint URL</Label>
              <Input value={form.url} onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))} placeholder="https://api.example.com/webhooks" className="font-mono text-xs" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Events (comma separated)</Label>
              <Input value={form.events} onChange={(e) => setForm((f) => ({ ...f, events: e.target.value }))} placeholder="payment.success, user.created" className="text-xs" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" size="sm" />}>
              Cancel
            </DialogClose>
            <Button size="sm" onClick={save}>{editing ? "Save" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
