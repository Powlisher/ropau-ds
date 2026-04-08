"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRightIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}
const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const projects = [
  { title: "Maison Riviera", category: "Brand Identity", year: "2025", src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=350&fit=crop" },
  { title: "Kinto Ceramics", category: "Web Design", year: "2025", src: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500&h=350&fit=crop" },
  { title: "Solara Energy", category: "Brand Identity", year: "2024", src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=500&h=350&fit=crop" },
  { title: "Nordjord Outfitters", category: "E-Commerce", year: "2024", src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=350&fit=crop" },
  { title: "Atelier Vigne", category: "Web Design", year: "2024", src: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=500&h=350&fit=crop" },
  { title: "Pico Coffee", category: "Packaging", year: "2023", src: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=350&fit=crop" },
]

export default function GalleryPortfolio() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-8"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Selected Work
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A selection of recent design and branding projects.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 md:grid-cols-2"
      >
        {projects.map((project) => (
          <motion.div key={project.title} variants={itemVariants}>
            <motion.div whileHover={{ y: -3 }} transition={spring}>
              <Card
                className="group overflow-hidden"
                style={{
                  boxShadow:
                    "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
                }}
              >
                <div className="aspect-[10/7] w-full overflow-hidden bg-secondary">
                  <img
                    src={project.src}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="flex items-start justify-between gap-3 pt-1">
                  <div>
                    <h3 className="font-heading text-sm font-semibold tracking-tight text-foreground">
                      {project.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge variant="secondary" className="text-[10px]">
                        {project.category}
                      </Badge>
                      <span className="font-mono text-xs tabular-nums text-muted-foreground">
                        {project.year}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon-xs">
                    <ArrowUpRightIcon className="size-3.5" />
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
