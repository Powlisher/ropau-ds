"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HeartIcon, ShoppingCartIcon, TrashIcon } from "lucide-react"

const wishlistItems = [
  { name: "Bergen Wool Throw", price: 195, added: "Mar 12", inStock: true },
  { name: "Kyoto Serving Bowl", price: 89, added: "Mar 8", inStock: true },
  { name: "Oslo Glass Carafe", price: 78, added: "Feb 27", inStock: false },
  { name: "Amalfi Linen Runner", price: 64, added: "Feb 19", inStock: true },
  { name: "Nara Bamboo Chopsticks Set", price: 32, added: "Feb 14", inStock: true },
  { name: "Tuscany Olive Oil Cruet", price: 54, added: "Jan 30", inStock: true },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function Storefront07() {
  const total = wishlistItems.filter((i) => i.inStock).reduce((s, i) => s + i.price, 0)

  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
            <HeartIcon className="size-5 text-primary" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
              My Wishlist
            </h2>
            <p className="text-sm text-muted-foreground">
              {wishlistItems.length} items saved
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Subtotal</div>
          <div className="font-mono text-xl font-bold tabular-nums tracking-tight">${total}.00</div>
        </div>
      </div>

      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {wishlistItems.map((item) => (
          <motion.div key={item.name} variants={itemVariants}>
            <motion.div whileHover={{ y: -3 }} transition={spring}>
              <Card
                className="overflow-hidden"
                style={{
                  boxShadow:
                    "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
                }}
              >
                <div className="relative aspect-[4/3] bg-secondary">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                  {!item.inStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-card/60 backdrop-blur-sm">
                      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>
                <CardContent className="space-y-3 pt-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold tracking-tight text-foreground">{item.name}</h3>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">Added {item.added}</p>
                    </div>
                    <span className="font-mono text-sm font-bold tabular-nums tracking-tight">
                      ${item.price}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 gap-1.5"
                      disabled={!item.inStock}
                    >
                      <ShoppingCartIcon className="size-3.5" />
                      {item.inStock ? "Add to Cart" : "Unavailable"}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                      <TrashIcon className="size-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
