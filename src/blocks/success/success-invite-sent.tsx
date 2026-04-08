"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle2Icon } from "lucide-react"

const invites = [
  { email: "camille.noir@ropau.io", initials: "CN" },
  { email: "julien.marchand@ropau.io", initials: "JM" },
  { email: "sarah.benali@ropau.io", initials: "SB" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function SuccessInviteSent() {
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
                {invites.length} invitations sent
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Your teammates will receive an email with a link to join the workspace.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full flex flex-col gap-1.5">
              {invites.map((inv) => (
                <div key={inv.email} className="flex items-center gap-3 rounded-lg bg-muted/40 px-3 py-2">
                  <Avatar size="sm">
                    <AvatarFallback className="text-[10px]">{inv.initials}</AvatarFallback>
                  </Avatar>
                  <span className="flex-1 truncate text-sm text-foreground">{inv.email}</span>
                  <span className="text-xs text-emerald-600 font-medium">Sent</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </CardContent>

        <CardFooter>
          <Button className="w-full">Done</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
