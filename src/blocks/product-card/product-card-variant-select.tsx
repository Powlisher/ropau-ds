"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCartIcon, CheckIcon } from "lucide-react"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const product = {
  name: "Classic Fit Oxford Shirt",
  price: 98,
  image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=480&fit=crop",
  colors: [
    { name: "White", value: "#F5F0EB" },
    { name: "Sky", value: "#B8D4E8" },
    { name: "Navy", value: "#2C3A4E" },
    { name: "Sage", value: "#9CAF88" },
  ],
  sizes: [
    { label: "XS", inStock: true },
    { label: "S", inStock: true },
    { label: "M", inStock: true },
    { label: "L", inStock: true },
    { label: "XL", inStock: false },
    { label: "XXL", inStock: true },
  ],
}

export default function ProductCardVariantSelect() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  const sizeObj = product.sizes.find((s) => s.label === selectedSize)
  const outOfStock = sizeObj && !sizeObj.inStock

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
          <div className="aspect-[5/6] w-full overflow-hidden bg-secondary">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <CardContent className="flex flex-col gap-4 pt-1">
            <div>
              <h3 className="font-heading text-sm font-semibold tracking-tight text-foreground">
                {product.name}
              </h3>
              <p className="mt-0.5 font-mono text-sm tabular-nums text-muted-foreground">
                ${product.price}.00
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Color: {selectedColor}
              </p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <motion.button
                    key={color.name}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    transition={spring}
                    onClick={() => setSelectedColor(color.name)}
                    className={`relative flex size-7 items-center justify-center rounded-full ring-1 ring-foreground/10 ${
                      selectedColor === color.name ? "ring-2 ring-primary" : ""
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {selectedColor === color.name && (
                      <CheckIcon
                        className={`size-3.5 ${
                          color.value === "#2C3A4E" ? "text-white" : "text-foreground"
                        }`}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">Size</p>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((size) => (
                  <motion.button
                    key={size.label}
                    whileHover={size.inStock ? { y: -1 } : undefined}
                    whileTap={size.inStock ? { scale: 0.95 } : undefined}
                    transition={spring}
                    onClick={() => size.inStock && setSelectedSize(size.label)}
                    className={`flex h-8 w-11 items-center justify-center rounded-lg border text-xs font-medium transition-colors ${
                      !size.inStock
                        ? "cursor-not-allowed border-border/50 text-muted-foreground/40 line-through"
                        : selectedSize === size.label
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    {size.label}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              {selectedSize && (
                <p className={`text-xs font-medium ${outOfStock ? "text-destructive" : "text-emerald-600"}`}>
                  {outOfStock ? "Out of stock" : "In stock, ships within 2 days"}
                </p>
              )}
              <motion.div whileHover={{ y: -1 }} transition={spring}>
                <Button
                  className="w-full gap-2"
                  size="lg"
                  disabled={!selectedSize || !!outOfStock}
                >
                  <ShoppingCartIcon className="size-4" />
                  Add to Cart
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
