"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { DialogTrigger } from "@/components/ui/dialog"
import { EyeIcon, ShoppingCartIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const product = {
  name: "Handcrafted Ceramic Vase",
  price: 84,
  category: "Home Decor",
  description:
    "Each piece is individually thrown on a wheel and finished with a reactive glaze that produces unique tonal variations. Approximately 22cm tall, suitable for both dried and fresh arrangements.",
  details: ["Stoneware clay", "Reactive matte glaze", "Dishwasher safe", "Handmade in Portugal"],
  image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&h=480&fit=crop",
}

export default function ProductCardQuickView() {
  return (
    <section className="mx-auto w-full max-w-xs px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      >
        <Dialog>
          <Card
            className="group overflow-hidden"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <div className="relative aspect-[5/6] w-full overflow-hidden bg-secondary">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/10">
                <DialogTrigger
                  render={
                    <Button
                      variant="secondary"
                      className="translate-y-2 gap-1.5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                    />
                  }
                >
                  <EyeIcon className="size-3.5" />
                  Quick View
                </DialogTrigger>
              </div>
            </div>
            <CardContent className="pt-1">
              <h3 className="font-heading text-sm font-semibold tracking-tight text-foreground">
                {product.name}
              </h3>
              <p className="mt-0.5 font-mono text-sm tabular-nums text-muted-foreground">
                ${product.price}.00
              </p>
            </CardContent>
          </Card>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <DialogTitle>{product.name}</DialogTitle>
                <Badge variant="secondary" className="text-[10px]">
                  {product.category}
                </Badge>
              </div>
              <DialogDescription>{product.description}</DialogDescription>
            </DialogHeader>
            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-secondary">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Details
              </h4>
              <ul className="space-y-1">
                {product.details.map((detail) => (
                  <li key={detail} className="text-sm text-foreground">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="font-mono text-lg font-semibold tabular-nums text-foreground">
                ${product.price}.00
              </span>
              <Button className="gap-1.5">
                <ShoppingCartIcon className="size-3.5" />
                Add to Cart
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </section>
  )
}
