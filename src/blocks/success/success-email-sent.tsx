"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MailIcon, ExternalLinkIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function SuccessEmailSent() {
  const [resent, setResent] = useState(false)

  return (
    <div className="flex min-h-[540px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Card className="w-full max-w-md">
        <CardContent className="py-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-6 text-center"
          >
            <motion.div
              variants={itemVariants}
              className="flex size-14 items-center justify-center rounded-full bg-blue-500/10 ring-4 ring-blue-500/5"
            >
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [0, -4, 0] }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeInOut" }}
              >
                <MailIcon className="size-6 text-blue-600" />
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">
                Check your inbox
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                We sent a verification link to <span className="font-medium text-foreground">marie@example.com</span>.
                It expires in 24 hours.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col items-center gap-3">
              <Button className="gap-1.5">
                <ExternalLinkIcon data-icon="inline-start" className="size-4" />
                Open Email App
              </Button>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span>Didn&apos;t receive it?</span>
                {resent ? (
                  <span className="font-medium text-primary">Sent again</span>
                ) : (
                  <button
                    onClick={() => setResent(true)}
                    className="font-medium text-primary underline-offset-2 hover:underline"
                  >
                    Resend email
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}
