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
import { DoorOpenIcon, UsersIcon, MonitorIcon, WifiIcon } from "lucide-react"

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

const rooms = [
  {
    id: "atelier",
    name: "Atelier",
    floor: "3rd Floor",
    capacity: 6,
    rate: 35,
    amenities: ["Screen", "Whiteboard", "WiFi"],
    available: true,
    nextSlot: "Now",
  },
  {
    id: "jardin",
    name: "Jardin",
    floor: "2nd Floor",
    capacity: 12,
    rate: 65,
    amenities: ["Screen", "Video conf", "WiFi", "Standing desks"],
    available: true,
    nextSlot: "11:00 AM",
  },
  {
    id: "bibliotheque",
    name: "Bibliotheque",
    floor: "1st Floor",
    capacity: 4,
    rate: 22,
    amenities: ["WiFi", "Quiet zone"],
    available: false,
    nextSlot: "2:00 PM",
  },
  {
    id: "terrasse",
    name: "Terrasse",
    floor: "Rooftop",
    capacity: 20,
    rate: 95,
    amenities: ["Screen", "Sound system", "WiFi", "Catering option"],
    available: true,
    nextSlot: "1:30 PM",
  },
]

export default function Booking06() {
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
            <CardTitle className="tracking-tight flex items-center gap-2">
              <DoorOpenIcon className="size-5 text-primary" />
              Book a Room
            </CardTitle>
            <CardDescription>
              Reserve a meeting room or workspace. Rates are per hour.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {rooms.map((room) => {
            const isSelected = selected === room.id
            return (
              <motion.button
                key={room.id}
                variants={itemVariants}
                whileHover={room.available ? { y: -2 } : {}}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                onClick={() => room.available && setSelected(isSelected ? null : room.id)}
                disabled={!room.available}
                className={`
                  rounded-xl border p-4 text-left transition-colors
                  ${!room.available ? "opacity-60 cursor-not-allowed border-border bg-muted/30" : ""}
                  ${isSelected ? "border-primary bg-primary/5 ring-1 ring-primary/20" : ""}
                  ${!isSelected && room.available ? "border-border hover:border-primary/30 bg-card" : ""}
                `}
                style={{ boxShadow: isSelected ? premiumShadow : undefined }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-foreground">{room.name}</span>
                      {!room.available && (
                        <Badge variant="secondary" className="text-[10px]">
                          Occupied
                        </Badge>
                      )}
                      {room.available && room.nextSlot === "Now" && (
                        <Badge className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                          Available Now
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{room.floor}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <UsersIcon className="size-3" />
                        <span className="tabular-nums">{room.capacity}</span> people
                      </span>
                      <span className="text-xs text-muted-foreground tabular-nums">
                        Next: {room.nextSlot}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {room.amenities.slice(0, 3).map((a) => (
                        <span
                          key={a}
                          className="inline-flex items-center gap-1 rounded-md bg-muted/60 px-1.5 py-0.5 text-[10px] text-muted-foreground"
                        >
                          {a === "Screen" && <MonitorIcon className="size-2.5" />}
                          {a === "WiFi" && <WifiIcon className="size-2.5" />}
                          {a}
                        </span>
                      ))}
                      {room.amenities.length > 3 && (
                        <span className="text-[10px] text-muted-foreground px-1">
                          +{room.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-lg font-semibold tabular-nums tracking-tight text-foreground">
                      ${room.rate}
                    </span>
                    <span className="text-xs text-muted-foreground">/hr</span>
                  </div>
                </div>
              </motion.button>
            )
          })}

          <motion.div variants={itemVariants} className="flex items-center justify-end pt-2">
            <Button disabled={!selected} size="sm">
              Reserve Room
            </Button>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
