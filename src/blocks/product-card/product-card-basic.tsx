"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCartIcon } from "lucide-react"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const product = {
  name: "Merino Wool Crewneck",
  price: 128,
  image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=480&fit=crop",
}

export default function ProductCardBasic() {
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
          </motion.div>
          <CardContent className="flex flex-col gap-3 pt-1">
            <div>
              <h3 className="font-heading text-sm font-semibold tracking-tight text-foreground">
                {product.name}
              </h3>
              <p className="mt-0.5 font-mono text-sm tabular-nums tracking-wide text-muted-foreground">
                ${product.price}.00
              </p>
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
