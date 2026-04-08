"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ShoppingCartIcon, TruckIcon, ShieldCheckIcon } from "lucide-react"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const product = {
  name: "Artisan Coffee Grinder",
  category: "Kitchen",
  price: 274,
  description:
    "Precision burr grinder with 40 grind settings, from Turkish-fine to French press coarse. The 48mm stainless steel conical burrs minimize heat buildup, preserving flavor volatiles. The anti-static grounds bin and timed dosing ensure consistent results every morning.",
  features: [
    "48mm conical stainless burrs",
    "40 grind settings",
    "Programmable timer (0.2s increments)",
    "Anti-static grounds container",
    "17g hopper capacity",
  ],
  image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=700&fit=crop",
}

export default function ProductCardFeatured() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      >
        <Card
          className="flex flex-col overflow-hidden md:flex-row"
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)",
          }}
        >
          <div className="aspect-[4/5] w-full overflow-hidden bg-secondary md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between gap-6 p-6 md:p-8">
            <div className="space-y-4">
              <div>
                <Badge variant="secondary" className="mb-2 text-[10px]">
                  {product.category}
                </Badge>
                <h2 className="font-heading text-xl font-bold tracking-tight text-foreground md:text-2xl">
                  {product.name}
                </h2>
                <p className="mt-1 font-mono text-lg tabular-nums text-foreground">
                  ${product.price}.00
                </p>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
              <Separator />
              <div>
                <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Specifications
                </h4>
                <ul className="space-y-1.5">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                      <span className="size-1 rounded-full bg-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-3">
              <motion.div whileHover={{ y: -1 }} transition={spring}>
                <Button className="w-full gap-2" size="lg">
                  <ShoppingCartIcon className="size-4" />
                  Add to Cart
                </Button>
              </motion.div>
              <div className="flex justify-center gap-5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <TruckIcon className="size-3.5" />
                  Free shipping
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheckIcon className="size-3.5" />
                  2-year warranty
                </span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  )
}
