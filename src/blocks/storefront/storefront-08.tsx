"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PackageIcon, TruckIcon, CheckCircleIcon, BoxIcon, CopyIcon } from "lucide-react"

const order = {
  id: "ORD-8294",
  placed: "Mar 24, 2026",
  estimated: "Apr 1, 2026",
  tracking: "1Z999AA10123456784",
  items: [
    { name: "Kyoto Matcha Set", qty: 1, price: 145 },
    { name: "Nara Bamboo Tray", qty: 2, price: 76 },
  ],
}

const steps = [
  { label: "Order Placed", desc: "Mar 24, 10:23 AM", icon: BoxIcon, done: true },
  { label: "Processing", desc: "Mar 25, 2:15 PM", icon: PackageIcon, done: true },
  { label: "Shipped", desc: "Mar 27, 9:41 AM", icon: TruckIcon, done: true },
  { label: "Delivered", desc: "Estimated Apr 1", icon: CheckCircleIcon, done: false },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Storefront08() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
              Order Tracking
            </h2>
            <div className="mt-1 flex items-center gap-2">
              <span className="font-mono text-sm tabular-nums text-muted-foreground">{order.id}</span>
              <Badge variant="secondary" className="text-[10px]">In Transit</Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Est. Delivery
            </div>
            <div className="text-sm font-semibold text-foreground">{order.estimated}</div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <CardContent className="py-8">
              <div className="relative flex justify-between">
                <div className="absolute left-0 right-0 top-5 h-0.5 bg-muted" />
                <div
                  className="absolute left-0 top-5 h-0.5 bg-primary transition-all"
                  style={{ width: "66%" }}
                />
                {steps.map((step, i) => {
                  const Icon = step.icon
                  return (
                    <div key={step.label} className="relative z-10 flex flex-col items-center gap-2">
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" as const, stiffness: 300, damping: 20, delay: i * 0.1 }}
                        className={`flex size-10 items-center justify-center rounded-full ring-4 ring-card ${
                          step.done
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="size-4" />
                      </motion.div>
                      <div className="text-center">
                        <div className={`text-xs font-semibold ${step.done ? "text-foreground" : "text-muted-foreground"}`}>
                          {step.label}
                        </div>
                        <div className="mt-0.5 text-[10px] tabular-nums text-muted-foreground">{step.desc}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
            }}
          >
            <CardContent className="space-y-4 py-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Tracking Number
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs tabular-nums text-foreground">{order.tracking}</span>
                  <Button variant="ghost" size="sm" className="size-7 p-0 text-muted-foreground">
                    <CopyIcon className="size-3" />
                  </Button>
                </div>
              </div>
              <div className="h-px bg-border" />
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-foreground">{item.name}</span>
                      <span className="ml-2 text-xs text-muted-foreground">x{item.qty}</span>
                    </div>
                    <span className="font-mono text-sm tabular-nums text-foreground">
                      ${item.price * item.qty}.00
                    </span>
                  </div>
                ))}
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">Total</span>
                <span className="font-mono text-base font-bold tabular-nums tracking-tight">
                  ${order.items.reduce((s, i) => s + i.price * i.qty, 0)}.00
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}
