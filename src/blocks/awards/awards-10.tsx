"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DownloadIcon, ShareIcon, AwardIcon } from "lucide-react"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function Awards10() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="space-y-6"
      >
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-card ring-1 ring-border"
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/3 via-transparent to-primary/3" />
          <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-amber-500/40 via-primary/30 to-amber-500/40" />

          <div className="relative px-10 py-14 text-center sm:px-16 sm:py-20">
            <div className="absolute left-8 top-8 h-24 w-24 rounded-full border border-amber-500/10" />
            <div className="absolute bottom-8 right-8 h-16 w-16 rounded-full border border-primary/10" />

            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-amber-500/10">
              <AwardIcon className="size-8 text-amber-600" />
            </div>

            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Certificate of Achievement
            </div>

            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Elena Marchetti
            </h2>

            <div className="mx-auto mt-4 max-w-md">
              <p className="text-sm leading-relaxed text-muted-foreground">
                In recognition of outstanding contributions to engineering excellence
                and sustained innovation throughout the fiscal year 2025-2026.
              </p>
            </div>

            <div className="mx-auto mt-8 flex max-w-sm items-center gap-4">
              <div className="h-px flex-1 bg-border" />
              <Badge className="bg-amber-500/10 text-amber-700 hover:bg-amber-500/10">
                Technical Excellence
              </Badge>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="mt-10 flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-sm font-semibold text-foreground">David Park</div>
                <div className="mt-0.5 h-px w-32 bg-border" />
                <div className="mt-1 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  VP Engineering
                </div>
              </div>
              <div className="text-center">
                <div className="font-mono text-sm tabular-nums text-foreground">April 8, 2026</div>
                <div className="mt-0.5 h-px w-32 bg-border" />
                <div className="mt-1 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  Date Issued
                </div>
              </div>
            </div>

            <div className="mt-2 text-right">
              <span className="font-mono text-[10px] tabular-nums tracking-wide text-muted-foreground/40">
                CERT-2026-0847
              </span>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-center gap-3">
          <motion.div whileHover={{ y: -2 }} transition={spring}>
            <Button variant="outline" className="gap-2">
              <ShareIcon className="size-4" />
              Share
            </Button>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} transition={spring}>
            <Button className="gap-2">
              <DownloadIcon className="size-4" />
              Download PDF
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
