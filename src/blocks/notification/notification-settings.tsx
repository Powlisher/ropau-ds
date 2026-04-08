"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const channels = ["Email", "Push", "SMS"]

const events = [
  { id: "mentions", label: "Mentions & replies", description: "When someone mentions you or replies to your thread", defaults: [true, true, false] },
  { id: "assignments", label: "Task assignments", description: "When you're assigned to a new task or issue", defaults: [true, true, true] },
  { id: "reviews", label: "Review requests", description: "When a teammate requests your review on a PR or document", defaults: [true, true, false] },
  { id: "deploys", label: "Deployments", description: "When a deploy succeeds or fails in your project", defaults: [true, false, false] },
  { id: "billing", label: "Billing & usage", description: "Payment confirmations, quota warnings, plan changes", defaults: [true, false, true] },
  { id: "marketing", label: "Product updates", description: "New features, release notes, and platform announcements", defaults: [false, false, false] },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function NotificationSettings() {
  return (
    <Card
      className="mx-auto max-w-xl"
      style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
    >
      <CardHeader>
        <CardTitle>Notification preferences</CardTitle>
        <CardDescription>Choose which events trigger notifications and through which channels.</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <div className="mb-3 grid grid-cols-[1fr_repeat(3,56px)] items-center gap-2">
            <div />
            {channels.map((ch) => (
              <p key={ch} className="text-center text-xs font-medium tracking-wide text-muted-foreground uppercase">{ch}</p>
            ))}
          </div>

          <div className="flex flex-col">
            {events.map((event) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                className="grid grid-cols-[1fr_repeat(3,56px)] items-center gap-2 rounded-lg py-3 transition-colors hover:bg-muted/50"
              >
                <div className="pr-4">
                  <p className="text-sm font-medium">{event.label}</p>
                  <p className="text-xs text-muted-foreground">{event.description}</p>
                </div>
                {event.defaults.map((checked, i) => (
                  <div key={channels[i]} className="flex justify-center">
                    <Checkbox defaultChecked={checked} />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>

          <div className="mt-5 flex justify-end gap-2">
            <Button variant="outline">Reset to defaults</Button>
            <Button>Save preferences</Button>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
