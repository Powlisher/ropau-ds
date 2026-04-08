"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckIcon, XIcon, ShoppingCartIcon } from "lucide-react"

const products = [
  {
    name: "Kyoto Matcha Set",
    price: 145,
    material: "Stoneware",
    capacity: "350ml",
    dishwasher: true,
    microwave: false,
    handmade: true,
    weight: "480g",
    tag: "Popular",
  },
  {
    name: "Amalfi Dinner Set",
    price: 228,
    material: "Porcelain",
    capacity: "N/A",
    dishwasher: true,
    microwave: true,
    handmade: false,
    weight: "2.1kg",
    tag: "Best Value",
  },
  {
    name: "Nara Tea Set",
    price: 167,
    material: "Bone China",
    capacity: "220ml",
    dishwasher: false,
    microwave: false,
    handmade: true,
    weight: "320g",
    tag: null,
  },
]

const specs = [
  { key: "material", label: "Material" },
  { key: "capacity", label: "Capacity" },
  { key: "weight", label: "Weight" },
  { key: "dishwasher", label: "Dishwasher Safe" },
  { key: "microwave", label: "Microwave Safe" },
  { key: "handmade", label: "Handmade" },
] as const

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function Storefront06() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <div className="mb-10">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Compare Products
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Side-by-side comparison to help you find the perfect piece.
        </p>
      </div>

      <motion.div
        className="overflow-x-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div
          className="min-w-[640px] overflow-hidden rounded-xl ring-1 ring-border"
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <motion.div variants={itemVariants} className="grid grid-cols-[180px_repeat(3,1fr)] bg-card">
            <div className="p-5" />
            {products.map((p) => (
              <div key={p.name} className="flex flex-col items-center gap-3 border-l border-border p-5">
                <div className="aspect-square w-full max-w-[120px] rounded-lg bg-secondary" />
                <div className="text-center">
                  <h3 className="text-sm font-semibold tracking-tight text-foreground">{p.name}</h3>
                  {p.tag && (
                    <Badge variant="secondary" className="mt-1.5 text-[10px]">{p.tag}</Badge>
                  )}
                </div>
                <div className="font-mono text-lg font-bold tabular-nums tracking-tight">${p.price}</div>
              </div>
            ))}
          </motion.div>

          {specs.map((spec, i) => (
            <motion.div
              key={spec.key}
              variants={itemVariants}
              className={`grid grid-cols-[180px_repeat(3,1fr)] ${i % 2 === 0 ? "bg-muted/30" : "bg-card"}`}
            >
              <div className="flex items-center p-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {spec.label}
              </div>
              {products.map((p) => {
                const val = p[spec.key]
                return (
                  <div key={p.name} className="flex items-center justify-center border-l border-border p-4">
                    {typeof val === "boolean" ? (
                      val ? (
                        <div className="flex size-6 items-center justify-center rounded-full bg-emerald-500/10">
                          <CheckIcon className="size-3.5 text-emerald-600" />
                        </div>
                      ) : (
                        <div className="flex size-6 items-center justify-center rounded-full bg-muted">
                          <XIcon className="size-3.5 text-muted-foreground" />
                        </div>
                      )
                    ) : (
                      <span className="font-mono text-sm tabular-nums text-foreground">{val}</span>
                    )}
                  </div>
                )
              })}
            </motion.div>
          ))}

          <motion.div variants={itemVariants} className="grid grid-cols-[180px_repeat(3,1fr)] bg-card">
            <div className="p-5" />
            {products.map((p) => (
              <div key={p.name} className="flex items-center justify-center border-l border-border p-5">
                <motion.div whileHover={{ y: -1 }} transition={spring}>
                  <Button size="sm" className="gap-1.5">
                    <ShoppingCartIcon className="size-3.5" />
                    Add to Cart
                  </Button>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
