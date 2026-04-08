"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PackageIcon, TruckIcon } from "lucide-react"

const items = [
  { name: "Ergonomic Standing Desk (Walnut)", qty: 1, price: "$649" },
  { name: "Mechanical Keyboard (65%)", qty: 1, price: "$178" },
  { name: "USB-C Hub 7-in-1", qty: 2, price: "$45" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function SuccessOrder() {
  return (
    <div className="flex min-h-[540px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Card className="w-full max-w-md">
        <CardContent className="py-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5"
          >
            <motion.div variants={itemVariants} className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <PackageIcon className="size-5 text-primary" />
                  <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                    Order confirmed
                  </h2>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Order <span className="font-mono tabular-nums">#ORD-28741</span>
                </p>
              </div>
              <Badge variant="secondary">Processing</Badge>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
              {items.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground tabular-nums">Qty: {item.qty}</p>
                  </div>
                  <span className="font-mono text-sm tabular-nums text-foreground">{item.price}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-3 rounded-lg border border-border p-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                <TruckIcon className="size-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Estimated delivery</p>
                <p className="text-xs tabular-nums text-muted-foreground">April 14 -- April 16, 2026</p>
              </div>
            </motion.div>
          </motion.div>
        </CardContent>

        <CardFooter>
          <Button className="w-full">Track Order</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
