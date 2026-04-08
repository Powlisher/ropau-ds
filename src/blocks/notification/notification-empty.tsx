"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BellOffIcon, SettingsIcon } from "lucide-react"
import { motion } from "framer-motion"

export default function NotificationEmpty() {
  return (
    <div className="flex min-h-[400px] items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        <Card
          className="mx-auto max-w-sm"
          style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
        >
          <CardContent className="flex flex-col items-center gap-5 py-10">
            <div className="relative">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-muted">
                <BellOffIcon className="size-7 text-muted-foreground/50" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 size-4 rounded-full bg-emerald-500"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            <div className="flex flex-col items-center gap-1.5 text-center">
              <h3 className="font-heading text-lg font-semibold tracking-tight">All caught up</h3>
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                No new notifications. When teammates mention you, request reviews, or deploy changes, you'll see them here.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <div className="flex w-full flex-col gap-1.5 rounded-xl bg-muted/50 px-4 py-3 ring-1 ring-foreground/5">
                <div className="flex items-center gap-3">
                  <div className="h-2.5 w-16 rounded-full bg-muted-foreground/10" />
                  <div className="h-2.5 w-32 rounded-full bg-muted-foreground/10" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2.5 w-12 rounded-full bg-muted-foreground/8" />
                  <div className="h-2.5 w-40 rounded-full bg-muted-foreground/8" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2.5 w-20 rounded-full bg-muted-foreground/6" />
                  <div className="h-2.5 w-24 rounded-full bg-muted-foreground/6" />
                </div>
              </div>
            </div>

            <Button variant="outline" size="sm">
              <SettingsIcon data-icon="inline-start" />
              Notification settings
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
