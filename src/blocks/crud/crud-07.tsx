"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2Icon, ArchiveIcon, TagIcon, MailIcon, MailOpenIcon } from "lucide-react"

type Email = {
  id: string
  from: string
  subject: string
  preview: string
  time: string
  read: boolean
  label?: string
}

const initialEmails: Email[] = [
  { id: "e1", from: "Stripe", subject: "Your payout of $4,832.17 is on its way", preview: "We've initiated a transfer to your bank account ending in ...7842. It should arrive within 2 business days.", time: "9:14 AM", read: false, label: "Finance" },
  { id: "e2", from: "Nadia Kowalski", subject: "Re: Q2 roadmap proposal", preview: "I've reviewed the proposed timeline and have a few concerns about the migration phase. Can we schedule 30min this week?", time: "8:47 AM", read: false, label: "Internal" },
  { id: "e3", from: "GitHub", subject: "[canopy/editor] PR #312 merged: Fix cursor position after paste", preview: "soren-lindqvist merged pull request #312 into main from fix/cursor-paste-position. 4 files changed, 23 additions, 8 deletions.", time: "Yesterday", read: true },
  { id: "e4", from: "Vercel", subject: "Build failed: canopy-editor (preview)", preview: "The build for commit a3f82d1 failed. Error: Module not found: Can't resolve '@/lib/collaboration'. View deployment logs.", time: "Yesterday", read: true, label: "CI" },
  { id: "e5", from: "Amara Diallo", subject: "Blog post draft: 'Why we rebuilt our search engine'", preview: "Here's the draft as discussed. I've included the performance benchmarks from Kai's analysis. Let me know if the technical depth is right.", time: "Mon", read: true, label: "Marketing" },
  { id: "e6", from: "Linear", subject: "Weekly digest: 14 issues closed, 6 new", preview: "Your team completed 14 issues this week. Top contributor: Soren (5 issues). Sprint velocity is up 12% from last week.", time: "Mon", read: true },
  { id: "e7", from: "AWS", subject: "Your March invoice is ready ($2,847.33)", preview: "Your AWS invoice for March 2025 is now available. Total: $2,847.33. EC2: $1,420.80, RDS: $892.15, S3: $234.38, Other: $300.00.", time: "Sun", read: true, label: "Finance" },
]

const labelColors: Record<string, string> = {
  Finance: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Internal: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  CI: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Marketing: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
}

const premiumShadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Crud07() {
  const [emails, setEmails] = useState(initialEmails)
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleAll = () => {
    if (selected.size === emails.length) setSelected(new Set())
    else setSelected(new Set(emails.map((e) => e.id)))
  }

  const deleteSelected = () => {
    setEmails((prev) => prev.filter((e) => !selected.has(e.id)))
    setSelected(new Set())
  }

  const archiveSelected = () => {
    setEmails((prev) => prev.filter((e) => !selected.has(e.id)))
    setSelected(new Set())
  }

  const hasSelection = selected.size > 0
  const allSelected = selected.size === emails.length && emails.length > 0

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Inbox</h2>
          <p className="text-sm text-muted-foreground">{emails.filter((e) => !e.read).length} unread, {emails.length} total</p>
        </div>
      </div>

      <AnimatePresence>
        {hasSelection && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
          >
            <div className="flex items-center gap-2 rounded-xl bg-muted/60 p-2.5 ring-1 ring-border/50" style={{ boxShadow: premiumShadow }}>
              <span className="ml-1 font-mono text-xs tabular-nums font-medium text-foreground">{selected.size} selected</span>
              <div className="ml-auto flex gap-1.5">
                <Button size="sm" variant="outline" className="h-7 gap-1.5 text-xs" onClick={archiveSelected}>
                  <ArchiveIcon className="size-3" />
                  Archive
                </Button>
                <Button size="sm" variant="outline" className="h-7 gap-1.5 text-xs" onClick={() => {}}>
                  <TagIcon className="size-3" />
                  Label
                </Button>
                <Button size="sm" variant="outline" className="h-7 gap-1.5 border-red-200 text-xs text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950" onClick={deleteSelected}>
                  <Trash2Icon className="size-3" />
                  Delete
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Card style={{ boxShadow: premiumShadow }} className="overflow-hidden">
        <div className="flex items-center gap-3 border-b border-border/50 px-4 py-2.5">
          <Checkbox
            checked={allSelected}
            onCheckedChange={toggleAll}
          />
          <span className="text-xs text-muted-foreground">Select all</span>
        </div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <AnimatePresence mode="popLayout">
            {emails.map((email) => (
              <motion.div
                key={email.id}
                variants={rowVariants}
                layout
                exit={{ opacity: 0, x: -30 }}
                className={`group flex items-start gap-3 border-b border-border/30 px-4 py-3 transition-colors hover:bg-muted/30 ${!email.read ? "bg-blue-50/30 dark:bg-blue-950/10" : ""}`}
              >
                <Checkbox
                  checked={selected.has(email.id)}
                  onCheckedChange={() => toggleOne(email.id)}
                  className="mt-1"
                />
                <div className="mt-0.5">
                  {email.read ? (
                    <MailOpenIcon className="size-3.5 text-muted-foreground/50" />
                  ) : (
                    <MailIcon className="size-3.5 text-blue-500" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${email.read ? "text-foreground" : "font-semibold text-foreground"}`}>{email.from}</span>
                    {email.label && (
                      <span className={`rounded-md px-1.5 py-0.5 text-[9px] font-semibold ${labelColors[email.label] ?? "bg-slate-100 text-slate-600"}`}>
                        {email.label}
                      </span>
                    )}
                    <span className="ml-auto shrink-0 font-mono text-[10px] tabular-nums text-muted-foreground">{email.time}</span>
                  </div>
                  <p className={`mt-0.5 truncate text-sm ${email.read ? "text-muted-foreground" : "font-medium text-foreground"}`}>{email.subject}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{email.preview}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Card>
    </div>
  )
}
