"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { XCircleIcon, CalendarIcon, RefreshCwIcon, AlertTriangleIcon } from "lucide-react"

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

const premiumShadow =
  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const booking = {
  id: "BK-8291A",
  service: "Signature Facial",
  provider: "Camille Renard",
  date: "Thursday, April 23, 2026",
  time: "2:30 PM",
  price: 89,
  depositPaid: 25,
  cancellationDeadline: "April 21, 2026 at 2:30 PM",
  lateCancelFee: 15,
}

const rescheduleSlots = [
  { date: "Fri, April 24", time: "10:00 AM" },
  { date: "Mon, April 27", time: "1:30 PM" },
  { date: "Wed, April 29", time: "3:00 PM" },
]

export default function Booking08() {
  const [action, setAction] = useState<"cancel" | "reschedule" | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)

  return (
    <Card className="w-full max-w-md" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">Manage Booking</CardTitle>
            <CardDescription>
              Cancel or reschedule your upcoming appointment.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <motion.div variants={itemVariants} className="rounded-xl bg-muted/50 p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">{booking.service}</span>
              <Badge variant="outline" className="font-mono text-[10px] tabular-nums">
                {booking.id}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{booking.provider}</span>
              <span className="tabular-nums">{booking.date}</span>
              <span className="tabular-nums">{booking.time}</span>
            </div>
          </motion.div>

          {!action && (
            <motion.div variants={itemVariants} className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => setAction("reschedule")}
              >
                <RefreshCwIcon className="size-4 mr-1.5" />
                Reschedule
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                onClick={() => setAction("cancel")}
              >
                <XCircleIcon className="size-4 mr-1.5" />
                Cancel
              </Button>
            </motion.div>
          )}

          {action === "reschedule" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
              className="flex flex-col gap-3"
            >
              <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground flex items-center gap-1.5">
                <CalendarIcon className="size-3" />
                Available Alternatives
              </span>
              {rescheduleSlots.map((slot, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedSlot(i)}
                  className={`flex items-center justify-between rounded-xl border p-3 transition-colors ${
                    selectedSlot === i
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <span className="text-sm text-foreground">{slot.date}</span>
                  <span className="text-sm tabular-nums font-medium text-foreground">{slot.time}</span>
                </button>
              ))}
              <div className="flex gap-2 pt-1">
                <Button variant="ghost" size="sm" onClick={() => { setAction(null); setSelectedSlot(null) }}>
                  Back
                </Button>
                <Button size="sm" disabled={selectedSlot === null} className="flex-1">
                  Confirm Reschedule
                </Button>
              </div>
            </motion.div>
          )}

          {action === "cancel" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
              className="flex flex-col gap-4"
            >
              <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 p-4 ring-1 ring-amber-200/50 dark:ring-amber-800/30">
                <div className="flex items-start gap-3">
                  <AlertTriangleIcon className="size-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                      Cancellation Policy
                    </p>
                    <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                      Free cancellation before {booking.cancellationDeadline}.
                      Late cancellations incur a ${booking.lateCancelFee} fee.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Deposit paid</span>
                  <span className="tabular-nums text-foreground">${booking.depositPaid}.00</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Refund amount</span>
                  <span className="tabular-nums font-medium text-emerald-600">${booking.depositPaid}.00</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="reason" className="text-xs font-medium">
                  Reason (optional)
                </Label>
                <Textarea
                  id="reason"
                  placeholder="Let us know why you're cancelling..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => setAction(null)}>
                  Back
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                >
                  Confirm Cancellation
                </Button>
              </div>
            </motion.div>
          )}
        </CardContent>
      </motion.div>
    </Card>
  )
}
