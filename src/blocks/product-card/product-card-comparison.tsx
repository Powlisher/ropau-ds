"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

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
  {
    id: "a",
    name: "Studio Monitor Pro",
    price: 349,
    image: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=300&h=300&fit=crop",
    specs: { driver: '5"', frequency: "45Hz-35kHz", power: "70W", weight: "6.2 kg", connectivity: "XLR, TRS" },
  },
  {
    id: "b",
    name: "Reference 8",
    price: 499,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=300&fit=crop",
    specs: { driver: '8"', frequency: "33Hz-40kHz", power: "110W", weight: "9.8 kg", connectivity: "XLR, TRS, RCA" },
  },
]

const specLabels: Record<string, string> = {
  driver: "Driver Size",
  frequency: "Freq. Response",
  power: "Power",
  weight: "Weight",
  connectivity: "Inputs",
}

export default function ProductCardComparison() {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )

  const showTable = selected.length === 2

  return (
    <section className="mx-auto w-full max-w-2xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="mb-8 text-center"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Compare Products
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Select two products to see a detailed comparison.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-5"
      >
        {products.map((product) => (
          <motion.div key={product.id} variants={itemVariants}>
            <motion.div whileHover={{ y: -2 }} transition={spring}>
              <Card
                className={`overflow-hidden transition-all ${
                  selected.includes(product.id)
                    ? "ring-2 ring-primary"
                    : ""
                }`}
                style={{
                  boxShadow:
                    "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
                }}
              >
                <div className="aspect-square w-full overflow-hidden bg-secondary">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="flex flex-col gap-3 pt-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-heading text-sm font-semibold tracking-tight text-foreground">
                        {product.name}
                      </h3>
                      <p className="mt-0.5 font-mono text-sm tabular-nums text-muted-foreground">
                        ${product.price}.00
                      </p>
                    </div>
                    <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                      <Checkbox
                        checked={selected.includes(product.id)}
                        onCheckedChange={() => toggle(product.id)}
                      />
                      Compare
                    </label>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {showTable && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
          className="mt-8"
        >
          <Card
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <CardContent>
              <div className="grid grid-cols-3 gap-x-4 py-2">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Specification
                </div>
                {products.map((p) => (
                  <div key={p.id} className="text-xs font-semibold text-foreground">
                    {p.name}
                  </div>
                ))}
              </div>
              <Separator />
              {Object.keys(products[0].specs).map((key) => (
                <div key={key}>
                  <div className="grid grid-cols-3 gap-x-4 py-2.5">
                    <div className="text-xs font-medium text-muted-foreground">
                      {specLabels[key]}
                    </div>
                    {products.map((p) => (
                      <div key={p.id} className="font-mono text-xs tabular-nums text-foreground">
                        {p.specs[key as keyof typeof p.specs]}
                      </div>
                    ))}
                  </div>
                  <Separator />
                </div>
              ))}
              <div className="grid grid-cols-3 gap-x-4 py-2.5">
                <div className="text-xs font-medium text-muted-foreground">Price</div>
                {products.map((p) => (
                  <div key={p.id} className="font-mono text-sm font-semibold tabular-nums text-foreground">
                    ${p.price}.00
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            <Badge variant="secondary" className="text-[10px]">
              {Math.abs(products[0].price - products[1].price) > 0
                ? `$${Math.abs(products[0].price - products[1].price)} difference`
                : "Same price"}
            </Badge>
          </p>
        </motion.div>
      )}
    </section>
  )
}
