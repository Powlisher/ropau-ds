"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from "framer-motion"
import {
  SparklesIcon,
  CalendarIcon,
  UserIcon,
  CheckIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ClockIcon,
} from "lucide-react"

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

const steps = [
  { label: "Service", icon: SparklesIcon },
  { label: "Date", icon: CalendarIcon },
  { label: "Details", icon: UserIcon },
  { label: "Confirm", icon: CheckIcon },
]

const services = [
  { id: "cut", name: "Classic Haircut", duration: "45 min", price: 38 },
  { id: "color", name: "Full Color", duration: "1h 30min", price: 125 },
  { id: "facial", name: "Signature Facial", duration: "1h 15min", price: 89 },
]

const timeSlots = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"]

export default function Booking05() {
  const [step, setStep] = useState(0)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const service = services.find((s) => s.id === selectedService)

  return (
    <Card className="w-full max-w-lg" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader className="pb-4">
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">Book an Appointment</CardTitle>
          </motion.div>
          <motion.div variants={itemVariants} className="flex items-center gap-2 pt-3">
            {steps.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={s.label} className="flex items-center gap-2">
                  {i > 0 && (
                    <div
                      className={`h-px w-6 ${
                        i <= step ? "bg-primary" : "bg-border"
                      } transition-colors`}
                    />
                  )}
                  <div
                    className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                      i === step
                        ? "bg-primary text-primary-foreground"
                        : i < step
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="size-3" />
                    <span className="hidden sm:inline">{s.label}</span>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="service"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
                className="flex flex-col gap-2"
              >
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedService(s.id)}
                    className={`flex items-center justify-between rounded-xl border p-4 text-left transition-colors ${
                      selectedService === s.id
                        ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div>
                      <span className="text-sm font-semibold text-foreground">{s.name}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-[10px] tabular-nums">
                          {s.duration}
                        </Badge>
                      </div>
                    </div>
                    <span className="text-sm font-semibold tabular-nums text-foreground">
                      ${s.price}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="date"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
                className="flex flex-col gap-4"
              >
                <div className="rounded-xl border border-border p-4">
                  <p className="text-sm font-semibold text-foreground mb-1">Thursday, April 23</p>
                  <p className="text-xs text-muted-foreground">Next available date</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground flex items-center gap-1.5">
                    <ClockIcon className="size-3" />
                    Pick a Time
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`rounded-lg border px-3 py-2.5 text-sm tabular-nums font-medium transition-colors ${
                          selectedTime === t
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50 text-foreground"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="name" className="text-xs font-medium">Full Name</Label>
                    <Input id="name" placeholder="Margaux Pelletier" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email" className="text-xs font-medium">Email</Label>
                    <Input id="email" type="email" placeholder="margaux@example.com" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="phone" className="text-xs font-medium">Phone</Label>
                    <Input id="phone" type="tel" placeholder="+33 6 12 34 56 78" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
                className="flex flex-col gap-4"
              >
                <div className="rounded-xl bg-muted/50 p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Service</span>
                    <span className="text-sm font-medium text-foreground">{service?.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Date</span>
                    <span className="text-sm font-medium text-foreground">April 23, 2026</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Time</span>
                    <span className="text-sm font-medium tabular-nums text-foreground">
                      {selectedTime ?? "2:30 PM"}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">Total</span>
                    <span className="text-lg font-semibold tabular-nums tracking-tight text-foreground">
                      ${service?.price ?? 89}.00
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  You will receive a confirmation email with appointment details.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              <ArrowLeftIcon className="size-4 mr-1" />
              Back
            </Button>
            <Button
              size="sm"
              onClick={() => setStep((s) => Math.min(3, s + 1))}
              disabled={
                (step === 0 && !selectedService) ||
                (step === 1 && !selectedTime)
              }
            >
              {step === 3 ? "Confirm Booking" : "Next"}
              {step < 3 && <ArrowRightIcon className="size-4 ml-1" />}
            </Button>
          </div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
