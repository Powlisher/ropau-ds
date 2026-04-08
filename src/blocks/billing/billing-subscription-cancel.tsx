"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangleIcon, GiftIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function BillingSubscriptionCancel() {
  const [reason, setReason] = useState("")
  const [showRetention, setShowRetention] = useState(false)

  return (
    <Card
      className="w-full max-w-lg ring-destructive/20"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)",
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2">
              <AlertTriangleIcon className="size-4 text-destructive" />
              <CardTitle className="tracking-tight">
                Cancel Subscription
              </CardTitle>
            </div>
            <CardDescription>
              We are sorry to see you go. Your Pro plan benefits will remain
              active until May 12, 2026.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <Label>Why are you cancelling?</Label>
            <Select
              value={reason}
              onValueChange={(val) => {
                setReason(val ?? "")
                setShowRetention(true)
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="too-expensive">Too expensive</SelectItem>
                <SelectItem value="missing-features">Missing features I need</SelectItem>
                <SelectItem value="switching">Switching to a competitor</SelectItem>
                <SelectItem value="not-using">Not using it enough</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <Label htmlFor="cancel-feedback">
              Anything else you'd like us to know?
            </Label>
            <Textarea
              id="cancel-feedback"
              placeholder="Optional — your feedback helps us improve"
              className="min-h-20"
            />
          </motion.div>

          <AnimatePresence>
            {showRetention && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div
                  className="rounded-xl bg-primary/5 p-4 ring-1 ring-primary/15"
                  style={{
                    boxShadow:
                      "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <GiftIcon className="size-4 text-primary" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">
                          Stay and save 40%
                        </span>
                        <Badge className="text-[10px]">Limited offer</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        We would love to keep you on board. Switch to the annual
                        plan at $17.40/mo (was $29/mo) — that is a saving of
                        $139.20 per year.
                      </p>
                      <Button size="sm" className="mt-1 w-fit">
                        Accept offer
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between pt-1"
          >
            <Button variant="ghost" size="sm">
              Keep my subscription
            </Button>
            <Button variant="destructive" size="sm">
              Confirm cancellation
            </Button>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
