"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2Icon, PackageIcon, MapPinIcon } from "lucide-react"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const order = {
  number: "ORD-2947-KL",
  items: [
    { name: "Merino Wool Crewneck", qty: 1, price: 128 },
    { name: "Canvas Weekender Bag", qty: 1, price: 218 },
  ],
  total: 377.13,
  deliveryEstimate: "April 14-16, 2026",
  address: "42 Rue des Lilas, Apt 3B, Lyon 69003",
}

export default function CheckoutSuccess() {
  return (
    <section className="mx-auto w-full max-w-md px-6 py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            className="mb-4 flex size-16 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200"
          >
            <CheckCircle2Icon className="size-8 text-emerald-600" />
          </motion.div>
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            Order Confirmed
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Thank you for your purchase. You will receive a confirmation email shortly.
          </p>
          <Badge variant="outline" className="mt-3 font-mono text-xs tabular-nums tracking-wide">
            {order.number}
          </Badge>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <CardContent className="space-y-4">
              <div>
                <div className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <PackageIcon className="size-3" />
                  Items
                </div>
                {order.items.map((item) => (
                  <div key={item.name} className="flex justify-between py-1 text-sm">
                    <span className="text-foreground">
                      {item.name} {item.qty > 1 ? `x${item.qty}` : ""}
                    </span>
                    <span className="font-mono tabular-nums text-muted-foreground">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
                <Separator className="my-2" />
                <div className="flex justify-between text-sm font-semibold text-foreground">
                  <span>Total paid</span>
                  <span className="font-mono tabular-nums">${order.total.toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              <div>
                <div className="mb-1 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <MapPinIcon className="size-3" />
                  Delivery
                </div>
                <p className="text-sm text-foreground">{order.address}</p>
                <p className="mt-0.5 text-sm font-semibold text-foreground">
                  Estimated: {order.deliveryEstimate}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-2">
          <motion.div whileHover={{ y: -1 }} transition={spring}>
            <Button className="w-full" size="lg">
              Track Order
            </Button>
          </motion.div>
          <Button variant="outline" className="w-full">
            Continue Shopping
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
