"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCartIcon } from "lucide-react"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const product = {
  name: "Brushed Cotton Overshirt",
  description: "A versatile layering piece in heavyweight brushed cotton. Relaxed fit with chest pockets and a clean, structured collar.",
  price: 165,
  image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop",
}

export default function ProductCardHorizontal() {
  return (
    <section className="mx-auto w-full max-w-lg px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      >
        <motion.div whileHover={{ y: -2 }} transition={spring}>
          <Card
            className="flex flex-row overflow-hidden"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <div className="aspect-square w-40 shrink-0 overflow-hidden bg-secondary sm:w-48">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-3 p-5">
              <div>
                <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">
                  {product.name}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-base font-semibold tabular-nums text-foreground">
                  ${product.price}.00
                </span>
                <Button size="default" className="gap-1.5">
                  <ShoppingCartIcon className="size-3.5" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}
