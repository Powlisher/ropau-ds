"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ImageIcon, LinkIcon, CopyIcon } from "lucide-react"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Inbox09() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Email Signature</CardTitle>
        <CardDescription>Customize your email signature for outgoing messages</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-5"
        >
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Full Name</label>
              <Input defaultValue="Paul Demarecaux" className="mt-1.5 h-9 text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Title</label>
              <Input defaultValue="Design Engineer" className="mt-1.5 h-9 text-sm" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Company</label>
              <Input defaultValue="Ropau" className="mt-1.5 h-9 text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Phone</label>
              <Input defaultValue="+33 6 12 34 56 78" className="mt-1.5 h-9 text-sm" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Website</label>
            <div className="mt-1.5 flex items-center gap-2">
              <LinkIcon className="size-3.5 text-muted-foreground/50" />
              <Input defaultValue="https://ropau.io" className="h-9 text-sm" />
            </div>
          </motion.div>

          <Separator />

          <motion.div variants={itemVariants}>
            <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Preview</div>
            <div
              className="rounded-xl bg-muted/30 p-5"
              style={{
                boxShadow: "inset 0 1px 2px rgba(20,20,15,0.04)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex size-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
                  style={{ backgroundColor: "oklch(0.55 0.18 250)" }}
                >
                  PD
                </div>
                <div>
                  <div className="text-sm font-semibold tracking-tight">Paul Demarecaux</div>
                  <div className="text-xs text-muted-foreground">Design Engineer at Ropau</div>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="tabular-nums">+33 6 12 34 56 78</span>
                    <span className="text-muted-foreground/30">|</span>
                    <span>ropau.io</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground">
              <ImageIcon className="size-3.5" />
              Add Logo
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
                <CopyIcon className="size-3.5" />
                Copy HTML
              </Button>
              <Button size="sm" className="text-xs">
                Save Signature
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
