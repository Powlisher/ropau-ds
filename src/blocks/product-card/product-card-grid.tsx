"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ShoppingCartIcon, StarIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}
const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const products = [
  { id: 1, name: "Alpaca Throw Blanket", price: 189, rating: 5, category: "Home", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=360&fit=crop", badge: null },
  { id: 2, name: "Linen Blend Trousers", price: 142, rating: 4, category: "Clothing", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=360&fit=crop", badge: "New" },
  { id: 3, name: "Stoneware Mug Set", price: 56, rating: 4, category: "Home", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=300&h=360&fit=crop", badge: null },
  { id: 4, name: "Canvas Weekender Bag", price: 218, rating: 5, category: "Accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=360&fit=crop", badge: null },
  { id: 5, name: "Silk Sleep Mask", price: 45, rating: 3, category: "Accessories", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=360&fit=crop", badge: "-20%" },
  { id: 6, name: "Merino Scarf", price: 78, rating: 4, category: "Clothing", image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=300&h=360&fit=crop", badge: null },
  { id: 7, name: "Cedar Candle Trio", price: 62, rating: 5, category: "Home", image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=300&h=360&fit=crop", badge: "Bestseller" },
  { id: 8, name: "Leather Card Holder", price: 89, rating: 4, category: "Accessories", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=360&fit=crop", badge: null },
]

const categories = ["All", "Clothing", "Home", "Accessories"]

export default function ProductCardGrid() {
  const [category, setCategory] = useState("All")
  const [sort, setSort] = useState("featured")

  const filtered = products
    .filter((p) => category === "All" || p.category === category)
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price
      if (sort === "price-desc") return b.price - a.price
      if (sort === "rating") return b.rating - a.rating
      return 0
    })

  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="mb-8"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Shop Collection
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {filtered.length} products
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-6 flex flex-wrap items-center gap-3"
      >
        <Select value={category} onValueChange={(v) => setCategory(v ?? "")}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={(v) => setSort(v ?? "")}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="rating">Top Rated</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={`${category}-${sort}`}
        className="grid grid-cols-2 gap-5 lg:grid-cols-4"
      >
        {filtered.map((product) => (
          <motion.div key={product.id} variants={itemVariants}>
            <motion.div whileHover={{ y: -3 }} transition={spring}>
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
                    <div className="mt-0.5 flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <StarIcon
                          key={i}
                          className={`size-2.5 ${
                            i < product.rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-1 font-mono text-sm font-semibold tabular-nums text-foreground">
                      ${product.price}.00
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full gap-1.5">
                    <ShoppingCartIcon className="size-3" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
