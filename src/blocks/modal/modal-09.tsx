"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2Icon, XCircleIcon, SendIcon } from "lucide-react"

export default function Modal09() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  return (
    <div className="flex min-h-[400px] items-center justify-center gap-3">
      <Dialog
        onOpenChange={(open) => {
          if (!open) setStatus("idle")
        }}
      >
        <DialogTrigger render={<Button />}>
          <SendIcon data-icon="inline-start" />
          Submit report
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <AnimatePresence mode="wait">
            {status === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
              >
                <DialogHeader>
                  <DialogTitle>Submit quarterly report?</DialogTitle>
                  <DialogDescription>
                    This will send the Q1 2026 performance report to 14
                    stakeholders in the Meridian workspace. The report covers
                    Jan 3 &ndash; Mar 28, 2026.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                  <DialogClose render={<Button variant="outline" />}>
                    Cancel
                  </DialogClose>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setStatus("error")}
                    >
                      Simulate error
                    </Button>
                    <Button onClick={() => setStatus("success")}>
                      Send report
                    </Button>
                  </div>
                </DialogFooter>
              </motion.div>
            )}

            {status === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
                className="flex flex-col items-center gap-3 py-4 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring" as const,
                    stiffness: 400,
                    damping: 15,
                    delay: 0.1,
                  }}
                  className="flex size-12 items-center justify-center rounded-full bg-emerald-500/10"
                >
                  <CheckCircle2Icon className="size-6 text-emerald-600" />
                </motion.div>
                <div>
                  <h3 className="font-heading text-base font-medium">
                    Report sent
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    14 recipients will receive the Q1 2026 report within the
                    next 5 minutes.
                  </p>
                </div>
                <DialogClose render={<Button variant="outline" className="mt-2" />}>
                  Close
                </DialogClose>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
                className="flex flex-col items-center gap-3 py-4 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring" as const,
                    stiffness: 400,
                    damping: 15,
                    delay: 0.1,
                  }}
                  className="flex size-12 items-center justify-center rounded-full bg-destructive/10"
                >
                  <XCircleIcon className="size-6 text-destructive" />
                </motion.div>
                <div>
                  <h3 className="font-heading text-base font-medium">
                    Delivery failed
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    3 of 14 recipients could not be reached. The email gateway
                    returned a timeout for the APAC distribution list.
                  </p>
                </div>
                <div className="mt-2 flex gap-2">
                  <DialogClose render={<Button variant="outline" />}>
                    Dismiss
                  </DialogClose>
                  <Button onClick={() => setStatus("success")}>
                    Retry delivery
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  )
}
