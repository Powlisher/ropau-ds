"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DownloadIcon, MailCheckIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function SuccessExport() {
  return (
    <div className="flex min-h-[480px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Card className="w-full max-w-md">
        <CardContent className="py-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-6"
          >
            <motion.div
              variants={itemVariants}
              className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10 ring-4 ring-emerald-500/5"
            >
              <DownloadIcon className="size-6 text-emerald-600" />
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">
                Export ready
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Your data has been packaged and is ready to download.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full rounded-lg bg-muted/50 divide-y divide-border">
              {[
                { label: "Format", value: "CSV" },
                { label: "Records", value: "12,847" },
                { label: "File size", value: "3.7 MB" },
                { label: "Generated", value: "April 8, 2026 at 09:14" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between px-4 py-2.5">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {row.label}
                  </span>
                  <span className="text-sm tabular-nums text-foreground">{row.value}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
              <Button className="w-full gap-1.5">
                <DownloadIcon data-icon="inline-start" className="size-4" />
                Download File
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MailCheckIcon className="size-3.5" />
              A copy has been sent to your email
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}
