"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRightIcon, StarIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function Storefront01() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          className="flex flex-col gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Badge variant="outline" className="w-fit gap-1.5 px-3 py-1 text-xs font-medium uppercase tracking-widest">
              <StarIcon className="size-3" />
              New Collection
            </Badge>
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Handcrafted
            <br />
            <span className="text-primary">Ceramic Ware</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="max-w-md text-base leading-relaxed text-muted-foreground"
          >
            Each piece is wheel-thrown in our Portland studio using locally sourced stoneware clay,
            fired to 1280C for lasting durability.
          </motion.p>
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <motion.div whileHover={{ y: -2 }} transition={spring}>
              <Button size="lg" className="gap-2">
                Shop the Collection
                <ArrowRightIcon className="size-4" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={spring}>
              <Button variant="outline" size="lg">
                Our Process
              </Button>
            </motion.div>
          </motion.div>
          <motion.div variants={itemVariants} className="flex items-center gap-6 pt-2">
            <div>
              <div className="text-2xl font-bold tabular-nums tracking-tight">2,847</div>
              <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Pieces Sold</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <div className="text-2xl font-bold tabular-nums tracking-tight">4.9</div>
              <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Avg Rating</div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring" as const, stiffness: 200, damping: 24, delay: 0.2 }}
          className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary"
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
          <div className="absolute bottom-6 left-6 right-6 rounded-xl bg-card/90 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold tracking-tight text-foreground">Kyoto Serving Bowl</div>
                <div className="mt-0.5 font-mono text-sm tabular-nums text-muted-foreground">$89.00</div>
              </div>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/10">Bestseller</Badge>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
