"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { CheckCircleIcon, CalendarIcon, ClockIcon, MapPinIcon, UserIcon } from "lucide-react"

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
  confirmationId: "BK-8291A",
  service: "Signature Facial",
  provider: "Camille Renard",
  date: "Thursday, April 23, 2026",
  time: "2:30 PM",
  duration: "1h 15min",
  location: "Studio Lumiere, 42 Rue de Rivoli, Paris",
  price: 89,
  depositPaid: 25,
}

export default function Booking03() {
  return (
    <Card className="w-full max-w-md" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader className="text-center pb-2">
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/30">
              <CheckCircleIcon className="size-6 text-emerald-600" />
            </div>
            <div>
              <CardTitle className="tracking-tight">Booking Confirmed</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Confirmation sent to your email
              </p>
            </div>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
              Booking ID
            </span>
            <Badge variant="outline" className="font-mono text-xs tabular-nums">
              {booking.confirmationId}
            </Badge>
          </motion.div>

          <Separator />

          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <div>
              <span className="text-lg font-semibold tracking-tight text-foreground">
                {booking.service}
              </span>
              <Badge variant="secondary" className="ml-2 text-[10px] tabular-nums">
                {booking.duration}
              </Badge>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <UserIcon className="size-4 text-muted-foreground shrink-0" />
                <span className="text-sm text-foreground">{booking.provider}</span>
              </div>
              <div className="flex items-center gap-3">
                <CalendarIcon className="size-4 text-muted-foreground shrink-0" />
                <span className="text-sm text-foreground">{booking.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <ClockIcon className="size-4 text-muted-foreground shrink-0" />
                <span className="text-sm tabular-nums text-foreground">{booking.time}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPinIcon className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{booking.location}</span>
              </div>
            </div>
          </motion.div>

          <Separator />

          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Service price</span>
              <span className="text-sm tabular-nums text-foreground">${booking.price}.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Deposit paid</span>
              <span className="text-sm tabular-nums text-emerald-600">-${booking.depositPaid}.00</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-sm font-semibold text-foreground">Due at appointment</span>
              <span className="text-base font-semibold tabular-nums tracking-tight text-foreground">
                ${booking.price - booking.depositPaid}.00
              </span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-2 pt-1">
            <Button variant="outline" size="sm" className="flex-1">
              Add to Calendar
            </Button>
            <Button size="sm" className="flex-1">
              View Details
            </Button>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
