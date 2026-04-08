"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileIcon, LinkIcon, CheckCircle2Icon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function SuccessUpload() {
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
              <CheckCircle2Icon className="size-7 text-emerald-600" />
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">
                Upload complete
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Your file has been uploaded and is ready to share.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
              <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <FileIcon className="size-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">Q1-2026-revenue-report.pdf</p>
                  <p className="text-xs tabular-nums text-muted-foreground">2.4 MB</p>
                </div>
                <button className="text-xs font-medium text-primary underline-offset-2 hover:underline">
                  Preview
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex w-full gap-2">
              <Button variant="outline" className="flex-1 gap-1.5">
                <LinkIcon data-icon="inline-start" className="size-4" />
                Share
              </Button>
              <Button className="flex-1">
                Done
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}
