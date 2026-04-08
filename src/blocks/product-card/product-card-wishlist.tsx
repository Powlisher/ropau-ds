"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HeartIcon, ShoppingCartIcon } from "lucide-react"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const product = {
  name: "Italian Leather Chelsea Boot",
  price: 295,
  sizes: ["EU 38", "EU 39", "EU 40", "EU 41", "EU 42", "EU 43", "EU 44"],
  image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=400&h=480&fit=crop",
}

export default function ProductCardWishlist() {
  const [wishlisted, setWishlisted] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  return (
    <section className="mx-auto w-full max-w-xs px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      >
        <Card
          className="overflow-hidden"
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <div className="relative aspect-[5/6] w-full overflow-hidden bg-secondary">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            <motion.button
              className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-card/80 ring-1 ring-foreground/10 backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={spring}
              onClick={() => setWishlisted(!wishlisted)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={wishlisted ? "filled" : "outline"}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={spring}
                >
                  <HeartIcon
                    className={`size-4 ${
                      wishlisted ? "fill-primary text-primary" : "text-muted-foreground"
                    }`}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
          <CardContent className="flex flex-col gap-3 pt-1">
            <div>
              <h3 className="font-heading text-sm font-semibold tracking-tight text-foreground">
                {product.name}
              </h3>
              <p className="mt-0.5 font-mono text-sm tabular-nums text-muted-foreground">
                ${product.price}.00
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((size) => (
                <motion.button
                  key={size}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={spring}
                  onClick={() => setSelectedSize(size)}
                >
                  <Badge
                    variant={selectedSize === size ? "default" : "outline"}
                    className="cursor-pointer text-[10px]"
                  >
                    {size}
                  </Badge>
                </motion.button>
              ))}
            </div>
            <motion.div whileHover={{ y: -1 }} transition={spring}>
              <Button className="w-full gap-2" size="lg" disabled={!selectedSize}>
                <ShoppingCartIcon className="size-4" />
                Add to Cart
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
