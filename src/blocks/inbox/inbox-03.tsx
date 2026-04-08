"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { SendIcon, PaperclipIcon, BoldIcon, ItalicIcon, LinkIcon, ListIcon, XIcon } from "lucide-react"
import { motion } from "framer-motion"

const recipients = [
  { name: "Elise Morand", email: "elise@studio-morand.fr" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Inbox03() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold tracking-tight">New Message</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2">
              <span className="w-8 text-xs font-medium text-muted-foreground">To</span>
              <div className="flex flex-1 flex-wrap items-center gap-1.5 rounded-lg border border-border bg-muted/20 px-3 py-2 min-h-[40px]">
                {recipients.map((r) => (
                  <Badge key={r.email} variant="secondary" className="gap-1 pr-1">
                    <span className="text-xs">{r.name}</span>
                    <button className="ml-0.5 rounded-full p-0.5 hover:bg-muted">
                      <XIcon className="size-2.5" />
                    </button>
                  </Badge>
                ))}
                <input
                  className="flex-1 min-w-[120px] bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
                  placeholder="Add recipients..."
                />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2">
              <span className="w-8 text-xs font-medium text-muted-foreground">Cc</span>
              <Input
                placeholder="Carbon copy..."
                className="h-10 bg-muted/20 text-sm"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Separator />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Input
              placeholder="Subject"
              defaultValue="Re: Q2 Campaign Brief - Review Needed"
              className="h-10 border-0 px-0 text-sm font-medium shadow-none focus-visible:ring-0"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Separator />
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex gap-1 pb-2">
              {[BoldIcon, ItalicIcon, LinkIcon, ListIcon].map((Icon, i) => (
                <Button key={i} variant="ghost" size="icon" className="size-8">
                  <Icon className="size-3.5" />
                </Button>
              ))}
            </div>
            <div
              className="min-h-[200px] rounded-lg bg-muted/20 p-4 text-sm leading-relaxed text-foreground/80"
              contentEditable
              suppressContentEditableWarning
            >
              <p>Sounds good, let&apos;s sync tomorrow at 11 AM.</p>
              <br />
              <p>I&apos;ll prepare a quick overview of the asset specs so we can compare notes with the illustration team. Should save us a follow-up meeting.</p>
              <br />
              <p>Talk soon,</p>
              <p>Paul</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Separator />
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground">
              <PaperclipIcon className="size-3.5" />
              Attach
            </Button>
            <Button size="sm" className="gap-1.5 text-xs">
              <SendIcon className="size-3.5" />
              Send
            </Button>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
