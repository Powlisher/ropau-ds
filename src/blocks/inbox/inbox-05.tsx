"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DownloadIcon, FileTextIcon, ImageIcon, FileSpreadsheetIcon } from "lucide-react"
import { motion } from "framer-motion"

const attachments = [
  { name: "Q2-Campaign-Brief-v3.pdf", size: "2.4 MB", icon: FileTextIcon, color: "oklch(0.58 0.20 25)" },
  { name: "timeline-gantt.xlsx", size: "847 KB", icon: FileSpreadsheetIcon, color: "oklch(0.55 0.18 145)" },
  { name: "hero-mockup-final.png", size: "4.1 MB", icon: ImageIcon, color: "oklch(0.55 0.18 250)" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Inbox05() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar className="size-9 shrink-0">
            <AvatarFallback className="text-[11px] font-semibold text-white" style={{ backgroundColor: "oklch(0.55 0.18 250)" }}>
              EM
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Elise Morand</span>
              <span className="text-[11px] tabular-nums text-muted-foreground">10:24 AM</span>
            </div>
            <div className="text-sm font-medium">Q2 Campaign Brief - Review Needed</div>
            <div className="mt-0.5 text-xs text-muted-foreground">to me, thomas@vigier.dev</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-5"
        >
          <motion.div variants={itemVariants} className="text-sm leading-relaxed text-foreground/90">
            <p>Hey, I've attached the updated brief for the Q2 campaign along with the revised timeline and hero mockup. Could you take a look at the timeline on page 3?</p>
            <p className="mt-3">The client moved the launch date up by two weeks, which affects the creative handoff. I've already flagged it with the dev team.</p>
          </motion.div>

          <Separator />

          <motion.div variants={itemVariants}>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Attachments
              </span>
              <Badge variant="outline" className="text-[10px] tabular-nums">
                {attachments.length} files - {(2.4 + 0.847 + 4.1).toFixed(1)} MB
              </Badge>
            </div>
            <div className="space-y-2">
              {attachments.map((file) => (
                <motion.div
                  key={file.name}
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                  className="flex items-center justify-between rounded-xl bg-muted/40 p-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="flex size-9 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${file.color}15` }}
                    >
                      <file.icon className="size-4" style={{ color: file.color }} />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">{file.name}</div>
                      <div className="text-[11px] tabular-nums text-muted-foreground">{file.size}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="size-8 shrink-0">
                    <DownloadIcon className="size-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-end">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <DownloadIcon className="size-3" />
              Download All
            </Button>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
