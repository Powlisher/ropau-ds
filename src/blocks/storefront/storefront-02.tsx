"use client"

import { motion } from "framer-motion"
import { ArrowUpRightIcon } from "lucide-react"

const categories = [
  { name: "Living Room", count: 143, from: "from-amber-500/20", to: "to-orange-500/10" },
  { name: "Kitchen", count: 87, from: "from-emerald-500/20", to: "to-teal-500/10" },
  { name: "Bedroom", count: 64, from: "from-sky-500/20", to: "to-blue-500/10" },
  { name: "Office", count: 112, from: "from-violet-500/20", to: "to-purple-500/10" },
  { name: "Outdoor", count: 39, from: "from-rose-500/20", to: "to-pink-500/10" },
  { name: "Lighting", count: 78, from: "from-yellow-500/20", to: "to-amber-500/10" },
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

export default function Storefront02() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <div className="mb-12">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Shop by Category
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Browse our curated collections across every room in your home.
        </p>
      </div>

      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {categories.map((cat) => (
          <motion.div key={cat.name} variants={itemVariants}>
            <motion.div
              whileHover={{ y: -3 }}
              transition={spring}
              className={`group relative flex aspect-[16/10] cursor-pointer flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br ${cat.from} ${cat.to} p-6`}
              style={{
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                    {cat.name}
                  </h3>
                  <p className="mt-0.5 font-mono text-xs tabular-nums tracking-wide text-muted-foreground">
                    {cat.count} items
                  </p>
                </div>
                <div className="flex size-9 items-center justify-center rounded-full bg-card/80 opacity-0 transition-opacity group-hover:opacity-100">
                  <ArrowUpRightIcon className="size-4 text-foreground" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
