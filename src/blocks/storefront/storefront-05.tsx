"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon, ClockIcon } from "lucide-react"

const recentProducts = [
  { name: "Kyoto Matcha Bowl", price: 62, viewed: "2 min ago" },
  { name: "Amalfi Linen Napkins", price: 38, viewed: "14 min ago" },
  { name: "Bergen Wool Throw", price: 195, viewed: "1 hr ago" },
  { name: "Okinawa Incense Holder", price: 28, viewed: "2 hr ago" },
  { name: "Lisbon Cork Coasters", price: 24, viewed: "3 hr ago" },
  { name: "Nara Bamboo Tray", price: 76, viewed: "5 hr ago" },
  { name: "Oslo Glass Vase", price: 134, viewed: "Yesterday" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function Storefront05() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    const amount = dir === "left" ? -280 : 280
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" })
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ClockIcon className="size-5 text-muted-foreground" />
          <div>
            <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">
              Recently Viewed
            </h2>
            <p className="text-xs text-muted-foreground">Pick up where you left off</p>
          </div>
        </div>
        <div className="flex gap-1.5">
          <Button variant="outline" size="sm" className="size-8 p-0" onClick={() => scroll("left")}>
            <ChevronLeftIcon className="size-4" />
          </Button>
          <Button variant="outline" size="sm" className="size-8 p-0" onClick={() => scroll("right")}>
            <ChevronRightIcon className="size-4" />
          </Button>
        </div>
      </div>

      <motion.div
        ref={scrollRef}
        className="-mx-2 flex gap-4 overflow-x-auto px-2 pb-4 scrollbar-none"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {recentProducts.map((product) => (
          <motion.div key={product.name} variants={itemVariants} className="flex-shrink-0">
            <motion.div whileHover={{ y: -3 }} transition={spring}>
              <Card
                className="w-52 overflow-hidden"
                style={{
                  boxShadow:
                    "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
                }}
              >
                <div className="aspect-square bg-secondary">
                  <div className="h-full w-full bg-gradient-to-br from-primary/3 to-transparent" />
                </div>
                <CardContent className="space-y-1.5 pt-1">
                  <h3 className="truncate text-sm font-semibold tracking-tight text-foreground">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-semibold tabular-nums tracking-tight">
                      ${product.price}.00
                    </span>
                    <span className="text-[10px] text-muted-foreground">{product.viewed}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
