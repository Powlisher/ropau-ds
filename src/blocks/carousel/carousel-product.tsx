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
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCartIcon } from "lucide-react"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const products = [
  { name: "Merino Wool Crewneck", price: 128, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=360&fit=crop", badge: null },
  { name: "Canvas Weekender", price: 218, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=360&fit=crop", badge: "New" },
  { name: "Leather Card Holder", price: 89, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=360&fit=crop", badge: null },
  { name: "Silk Sleep Mask", price: 45, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=360&fit=crop", badge: "-20%" },
  { name: "Cedar Candle Trio", price: 62, image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=300&h=360&fit=crop", badge: null },
  { name: "Alpaca Throw", price: 189, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=360&fit=crop", badge: "Bestseller" },
]

export default function CarouselProduct() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-8"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          You Might Like
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.06 }}
      >
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem key={product.name} className="basis-1/2 pl-4 md:basis-1/3 lg:basis-1/4">
                <motion.div whileHover={{ y: -3 }} transition={spring}>
                  <Card
                    className="overflow-hidden"
                    style={{
                      boxShadow:
                        "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
                    }}
                  >
                    <div className="relative aspect-[5/6] w-full overflow-hidden bg-secondary">
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                      {product.badge && (
                        <Badge
                          variant={product.badge.startsWith("-") ? "destructive" : "secondary"}
                          className="absolute top-2.5 left-2.5 text-[10px]"
                        >
                          {product.badge}
                        </Badge>
                      )}
                    </div>
                    <CardContent className="flex flex-col gap-2 pt-1">
                      <div>
                        <h3 className="truncate font-heading text-sm font-semibold tracking-tight text-foreground">
                          {product.name}
                        </h3>
                        <p className="mt-0.5 font-mono text-sm tabular-nums text-muted-foreground">
                          ${product.price}.00
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="w-full gap-1.5">
                        <ShoppingCartIcon className="size-3" />
                        Add
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
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
