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
import { motion } from "framer-motion"
import { CalendarIcon, ClockIcon, MapPinIcon, ChevronRightIcon } from "lucide-react"

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

type BookingStatus = "confirmed" | "pending" | "completed" | "cancelled"

const statusStyles: Record<BookingStatus, string> = {
  confirmed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
  completed: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  cancelled: "bg-rose-100 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400",
}

const bookings = [
  {
    id: "BK-8291A",
    service: "Signature Facial",
    provider: "Camille Renard",
    date: "Apr 23, 2026",
    time: "2:30 PM",
    location: "Studio Lumiere",
    status: "confirmed" as BookingStatus,
    upcoming: true,
  },
  {
    id: "BK-8187C",
    service: "Classic Haircut",
    provider: "Antoine Moreau",
    date: "Apr 28, 2026",
    time: "10:00 AM",
    location: "Studio Lumiere",
    status: "pending" as BookingStatus,
    upcoming: true,
  },
  {
    id: "BK-7954B",
    service: "Full Color Treatment",
    provider: "Camille Renard",
    date: "Apr 9, 2026",
    time: "11:30 AM",
    location: "Studio Lumiere",
    status: "completed" as BookingStatus,
    upcoming: false,
  },
  {
    id: "BK-7821D",
    service: "Therapeutic Massage",
    provider: "Lea Fontaine",
    date: "Mar 26, 2026",
    time: "3:00 PM",
    location: "Wellness Lab",
    status: "completed" as BookingStatus,
    upcoming: false,
  },
  {
    id: "BK-7689E",
    service: "Classic Haircut",
    provider: "Antoine Moreau",
    date: "Mar 12, 2026",
    time: "9:00 AM",
    location: "Studio Lumiere",
    status: "cancelled" as BookingStatus,
    upcoming: false,
  },
]

export default function Booking09() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming")

  const filtered = bookings.filter((b) =>
    tab === "upcoming" ? b.upcoming : !b.upcoming
  )

  return (
    <Card className="w-full max-w-lg" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">My Bookings</CardTitle>
            <CardDescription>
              View your upcoming and past appointments.
            </CardDescription>
          </motion.div>
          <motion.div variants={itemVariants} className="flex gap-1 pt-2">
            {(["upcoming", "past"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  tab === t
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {t === "upcoming" ? "Upcoming" : "Past"}
                <span className="ml-1.5 text-[10px] tabular-nums opacity-70">
                  {bookings.filter((b) => (t === "upcoming" ? b.upcoming : !b.upcoming)).length}
                </span>
              </button>
            ))}
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {filtered.map((b) => (
            <motion.div
              key={b.id}
              variants={itemVariants}
              whileHover={{ y: -1 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              className="rounded-xl border border-border p-4 cursor-pointer hover:border-primary/30 transition-colors"
              style={{ boxShadow: b.upcoming ? premiumShadow : undefined }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-foreground">{b.service}</span>
                    <Badge className={`text-[10px] border-0 ${statusStyles[b.status]}`}>
                      {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{b.provider}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="size-3" />
                      <span className="tabular-nums">{b.date}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <ClockIcon className="size-3" />
                      <span className="tabular-nums">{b.time}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPinIcon className="size-3" />
                      {b.location}
                    </span>
                  </div>
                </div>
                <ChevronRightIcon className="size-4 text-muted-foreground shrink-0 mt-1" />
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <motion.div variants={itemVariants} className="rounded-xl bg-muted/50 p-8 text-center">
              <CalendarIcon className="size-8 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-sm font-medium text-foreground">No bookings yet</p>
              <p className="text-xs text-muted-foreground mt-1 mb-4">
                Book your first appointment to see it here.
              </p>
              <Button size="sm">Browse Services</Button>
            </motion.div>
          )}

          {tab === "upcoming" && filtered.length > 0 && (
            <motion.div variants={itemVariants} className="pt-2">
              <Button variant="outline" size="sm" className="w-full">
                Book New Appointment
              </Button>
            </motion.div>
          )}
        </CardContent>
      </motion.div>
    </Card>
  )
}
