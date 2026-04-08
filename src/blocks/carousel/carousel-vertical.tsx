"use client"

import { motion } from "framer-motion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const items = [
  { title: "Q1 2026 Revenue", value: "$2.4M", change: "+18%", status: "up" },
  { title: "Active Subscribers", value: "12,847", change: "+3.2%", status: "up" },
  { title: "Churn Rate", value: "4.1%", change: "-0.8%", status: "down" },
  { title: "NPS Score", value: "72", change: "+5", status: "up" },
  { title: "Support Tickets", value: "847", change: "+12%", status: "up" },
]

export default function CarouselVertical() {
  return (
    <section className="mx-auto w-full max-w-xs px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-8"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Key Metrics
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">Scroll vertically.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.06 }}
      >
        <Carousel orientation="vertical" opts={{ align: "start" }} className="h-[320px]">
          <CarouselContent className="-mt-3 h-[320px]">
            {items.map((item) => (
              <CarouselItem key={item.title} className="basis-1/3 pt-3">
                <Card
                  style={{
                    boxShadow:
                      "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
                  }}
                >
                  <CardContent className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">{item.title}</p>
                      <p className="mt-0.5 font-mono text-xl font-bold tabular-nums text-foreground">
                        {item.value}
                      </p>
                    </div>
                    <Badge
                      variant={item.status === "down" && item.title !== "Churn Rate" ? "destructive" : "secondary"}
                      className="font-mono text-[10px] tabular-nums"
                    >
                      {item.change}
                    </Badge>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </motion.div>
    </section>
  )
}
