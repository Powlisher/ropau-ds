"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BellRingIcon } from "lucide-react"
import { motion } from "framer-motion"

export default function NotificationPermission() {
  return (
    <div className="flex min-h-[400px] items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        <Card
          className="mx-auto max-w-sm text-center"
          style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
        >
          <CardContent className="flex flex-col items-center gap-5 py-8">
            <motion.div
              animate={{ rotate: [0, -8, 8, -4, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
              className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"
            >
              <BellRingIcon className="size-7" />
            </motion.div>

            <div className="flex flex-col gap-1.5">
              <h3 className="font-heading text-lg font-semibold tracking-tight">Stay in the loop</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Get notified when teammates mention you, assignments change, or deploys finish. No spam — only signals that matter.
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
              <Button className="flex-1 sm:flex-initial">Allow notifications</Button>
              <Button variant="outline" className="flex-1 sm:flex-initial">Maybe later</Button>
            </div>

            <p className="text-xs text-muted-foreground/60">
              You can change this anytime in Settings.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
