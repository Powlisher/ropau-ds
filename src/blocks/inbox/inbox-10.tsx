"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { PlusIcon, TrashIcon, MailIcon, ForwardIcon, FilterIcon } from "lucide-react"
import { motion } from "framer-motion"

const filters = [
  { name: "Newsletter auto-archive", condition: "From contains 'newsletter' or 'digest'", action: "Archive & label 'Newsletters'", active: true },
  { name: "Client invoices", condition: "Subject contains 'invoice' + has attachment", action: "Label 'Finance' & star", active: true },
  { name: "GitHub notifications", condition: "From: notifications@github.com", action: "Label 'Dev' & skip inbox", active: false },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Inbox10() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Inbox Settings</CardTitle>
        <CardDescription>Configure auto-reply, filters, and forwarding</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex size-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "oklch(0.95 0.03 250)" }}
                >
                  <MailIcon className="size-4" style={{ color: "oklch(0.55 0.18 250)" }} />
                </div>
                <div>
                  <div className="text-sm font-semibold">Auto-Reply</div>
                  <div className="text-xs text-muted-foreground">Send automatic responses when away</div>
                </div>
              </div>
              <Switch />
            </div>
            <div className="mt-3 ml-12 rounded-lg bg-muted/30 p-3">
              <div className="text-xs text-muted-foreground italic leading-relaxed">
                "Thanks for reaching out. I'm currently away and will respond by April 14. For urgent matters, please contact thomas@vigier.dev."
              </div>
            </div>
          </motion.div>

          <Separator />

          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex size-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "oklch(0.95 0.03 160)" }}
                >
                  <ForwardIcon className="size-4" style={{ color: "oklch(0.55 0.15 160)" }} />
                </div>
                <div>
                  <div className="text-sm font-semibold">Forwarding</div>
                  <div className="text-xs text-muted-foreground">Forward incoming mail to another address</div>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="mt-3 ml-12">
              <Input
                defaultValue="backup@ropau.io"
                className="h-8 text-xs max-w-[240px]"
              />
            </div>
          </motion.div>

          <Separator />

          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex size-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "oklch(0.96 0.03 82)" }}
                >
                  <FilterIcon className="size-4" style={{ color: "oklch(0.65 0.17 82)" }} />
                </div>
                <div>
                  <div className="text-sm font-semibold">Filters</div>
                  <div className="text-xs text-muted-foreground">Automatically organize incoming mail</div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-1 text-xs">
                <PlusIcon className="size-3" />
                Add filter
              </Button>
            </div>

            <div className="space-y-2.5 ml-12">
              {filters.map((filter) => (
                <div
                  key={filter.name}
                  className="flex items-center justify-between rounded-xl bg-muted/30 px-4 py-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{filter.name}</span>
                      <Badge
                        variant={filter.active ? "secondary" : "outline"}
                        className="text-[9px]"
                      >
                        {filter.active ? "Active" : "Paused"}
                      </Badge>
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground truncate">{filter.condition}</div>
                    <div className="text-[10px] text-muted-foreground/60 truncate">{filter.action}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <Switch defaultChecked={filter.active} className="scale-75" />
                    <Button variant="ghost" size="icon" className="size-7 text-muted-foreground/50 hover:text-destructive">
                      <TrashIcon className="size-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
