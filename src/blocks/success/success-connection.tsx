"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { CheckCircle2Icon, SettingsIcon, ShieldCheckIcon } from "lucide-react"

const permissions = [
  "Read and send messages",
  "Access channel list",
  "Post notifications to selected channels",
  "Read user presence status",
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function SuccessConnection() {
  return (
    <div className="flex min-h-[540px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Card className="w-full max-w-md">
        <CardContent className="py-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-[#4A154B]/10 text-lg font-bold text-[#4A154B]">
                S
              </div>
              <div className="flex items-center gap-2">
                <div className="h-px w-6 bg-border" />
                <CheckCircle2Icon className="size-5 text-emerald-500" />
                <div className="h-px w-6 bg-border" />
              </div>
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
                R
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                Connected to Slack
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Your Slack workspace &ldquo;Ropau Team&rdquo; is now linked. Notifications and updates will sync automatically.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheckIcon className="size-4 text-muted-foreground" />
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Permissions granted
                </p>
              </div>
              <ul className="flex flex-col gap-1">
                {permissions.map((perm) => (
                  <li key={perm} className="flex items-center gap-2 text-sm text-foreground">
                    <div className="size-1 rounded-full bg-emerald-500" />
                    {perm}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button variant="outline" className="flex-1 gap-1.5">
            <SettingsIcon data-icon="inline-start" className="size-4" />
            Settings
          </Button>
          <Button className="flex-1">
            Done
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
