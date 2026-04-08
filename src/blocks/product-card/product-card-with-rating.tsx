"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCartIcon, StarIcon } from "lucide-react"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const product = {
  name: "Cashmere Blend Cardigan",
  originalPrice: 245,
  salePrice: 189,
  rating: 4,
  reviews: 37,
  image: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a00?w=400&h=480&fit=crop",
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon
          key={i}
          className={`size-3.5 ${
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  )
}

export default function ProductCardWithRating() {
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
          <motion.div
            className="relative aspect-[5/6] w-full overflow-hidden bg-secondary"
            whileHover={{ scale: 1.02 }}
            transition={spring}
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            <Badge className="absolute top-3 left-3" variant="destructive">
              -{Math.round((1 - product.salePrice / product.originalPrice) * 100)}%
            </Badge>
          </motion.div>
          <CardContent className="flex flex-col gap-3 pt-1">
            <div>
              <h3 className="font-heading text-sm font-semibold tracking-tight text-foreground">
                {product.name}
              </h3>
              <div className="mt-1 flex items-center gap-2">
                <Stars rating={product.rating} />
                <span className="text-xs text-muted-foreground">
                  ({product.reviews})
                </span>
              </div>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span className="font-mono text-sm font-semibold tabular-nums text-foreground">
                  ${product.salePrice}.00
                </span>
                <span className="font-mono text-xs tabular-nums text-muted-foreground line-through">
                  ${product.originalPrice}.00
                </span>
              </div>
            </div>
            <motion.div whileHover={{ y: -1 }} transition={spring}>
              <Button className="w-full gap-2" size="lg">
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
