"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { SlidersHorizontalIcon, GridIcon, ShoppingCartIcon } from "lucide-react"

const filters = [
  { label: "Stoneware", count: 34 },
  { label: "Porcelain", count: 21 },
  { label: "Earthenware", count: 18 },
  { label: "Bone China", count: 9 },
]

const priceRanges = ["Under $50", "$50 - $100", "$100 - $200", "Over $200"]

const products = [
  { name: "Miso Ramen Bowl", price: 42, material: "Stoneware", inStock: true },
  { name: "Amalfi Dinner Plate Set", price: 128, material: "Porcelain", inStock: true },
  { name: "Bergen Mug Duo", price: 36, material: "Stoneware", inStock: false },
  { name: "Okinawa Tea Set", price: 167, material: "Porcelain", inStock: true },
  { name: "Tuscany Serving Platter", price: 89, material: "Earthenware", inStock: true },
  { name: "Nara Sake Cup Set", price: 54, material: "Bone China", inStock: true },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function Storefront03() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            All Products
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Showing 6 of 82 results</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <SlidersHorizontalIcon className="size-3.5" />
            Filters
          </Button>
          <Button variant="ghost" size="sm">
            <GridIcon className="size-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <motion.aside
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
          className="hidden lg:block"
        >
          <div className="sticky top-6 space-y-6">
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Material
              </h3>
              <div className="space-y-2.5">
                {filters.map((f) => (
                  <label key={f.label} className="flex cursor-pointer items-center gap-2.5 text-sm">
                    <Checkbox />
                    <span className="text-foreground">{f.label}</span>
                    <span className="ml-auto font-mono text-xs tabular-nums text-muted-foreground">{f.count}</span>
                  </label>
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Price Range
              </h3>
              <div className="space-y-2.5">
                {priceRanges.map((range) => (
                  <label key={range} className="flex cursor-pointer items-center gap-2.5 text-sm">
                    <Checkbox />
                    <span className="text-foreground">{range}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>

        <motion.div
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {products.map((product) => (
            <motion.div key={product.name} variants={itemVariants}>
              <motion.div whileHover={{ y: -3 }} transition={spring}>
                <Card
                  className="overflow-hidden"
                  style={{
                    boxShadow:
                      "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
                  }}
                >
                  <div className="relative aspect-square bg-secondary">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent" />
                    {!product.inStock && (
                      <Badge variant="secondary" className="absolute right-3 top-3 text-xs">
                        Sold Out
                      </Badge>
                    )}
                  </div>
                  <CardContent className="space-y-3 pt-1">
                    <div>
                      <h3 className="text-sm font-semibold tracking-tight text-foreground">{product.name}</h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">{product.material}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-semibold tabular-nums tracking-tight">
                        ${product.price}.00
                      </span>
                      <Button
                        size="sm"
                        variant={product.inStock ? "default" : "outline"}
                        disabled={!product.inStock}
                        className="gap-1.5"
                      >
                        <ShoppingCartIcon className="size-3.5" />
                        {product.inStock ? "Add" : "Notify"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
