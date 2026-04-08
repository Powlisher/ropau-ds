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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { StarIcon, ClockIcon, CalendarIcon } from "lucide-react"

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

const providers = [
  {
    id: "camille",
    name: "Camille Renard",
    role: "Esthetician",
    initials: "CR",
    rating: 4.9,
    reviewCount: 127,
    specialties: ["Facials", "Skin Care", "Micro-needling"],
    nextAvailable: "Today, 3:30 PM",
    bgColor: "bg-violet-100 dark:bg-violet-950/30 text-violet-700 dark:text-violet-400",
  },
  {
    id: "antoine",
    name: "Antoine Moreau",
    role: "Senior Stylist",
    initials: "AM",
    rating: 4.7,
    reviewCount: 89,
    specialties: ["Haircuts", "Color", "Styling"],
    nextAvailable: "Tomorrow, 9:00 AM",
    bgColor: "bg-sky-100 dark:bg-sky-950/30 text-sky-700 dark:text-sky-400",
  },
  {
    id: "lea",
    name: "Lea Fontaine",
    role: "Massage Therapist",
    initials: "LF",
    rating: 4.8,
    reviewCount: 203,
    specialties: ["Deep Tissue", "Swedish", "Sports Recovery"],
    nextAvailable: "Wed, Apr 15 at 2:00 PM",
    bgColor: "bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400",
  },
  {
    id: "nadia",
    name: "Nadia Belkacem",
    role: "Nail Technician",
    initials: "NB",
    rating: 4.6,
    reviewCount: 54,
    specialties: ["Gel Manicure", "Nail Art", "Pedicure"],
    nextAvailable: "Today, 5:00 PM",
    bgColor: "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
  },
]

export default function Booking10() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <Card className="w-full max-w-lg" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">Choose a Provider</CardTitle>
            <CardDescription>
              Select a staff member based on availability and specialties.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {providers.map((p) => {
            const isSelected = selected === p.id
            return (
              <motion.button
                key={p.id}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                onClick={() => setSelected(isSelected ? null : p.id)}
                className={`
                  rounded-xl border p-4 text-left transition-colors
                  ${isSelected ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-border hover:border-primary/30 bg-card"}
                `}
                style={{ boxShadow: isSelected ? premiumShadow : undefined }}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="size-10 shrink-0">
                    <AvatarFallback className={`text-xs font-semibold ${p.bgColor}`}>
                      {p.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="text-sm font-semibold text-foreground">{p.name}</span>
                        <p className="text-xs text-muted-foreground">{p.role}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <StarIcon className="size-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-semibold tabular-nums text-foreground">
                          {p.rating}
                        </span>
                        <span className="text-[10px] text-muted-foreground tabular-nums">
                          ({p.reviewCount})
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {p.specialties.map((s) => (
                        <Badge key={s} variant="secondary" className="text-[10px]">
                          {s}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                      <CalendarIcon className="size-3" />
                      <span>Next: </span>
                      <span className="tabular-nums font-medium text-foreground">
                        {p.nextAvailable}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            )
          })}

          <motion.div variants={itemVariants} className="flex items-center justify-between pt-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              No preference
            </Button>
            <Button disabled={!selected} size="sm">
              Continue
            </Button>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
