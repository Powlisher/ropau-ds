"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { DownloadIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}
const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const images = [
  { id: 0, title: "Harbor at Dawn", description: "Early morning light reflecting off the calm waters of a fishing harbor in Brittany. Shot at f/2.8, 1/500s.", tags: ["landscape", "water", "golden hour"], dimensions: "5472 x 3648", size: "8.3 MB", src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop" },
  { id: 1, title: "Market Stall", description: "Fresh produce at a weekend market in Aix-en-Provence. Vivid colors under the canvas awnings.", tags: ["street", "color", "food"], dimensions: "4928 x 3264", size: "6.1 MB", src: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400&h=400&fit=crop" },
  { id: 2, title: "Stone Arch", description: "Medieval stone arch in the old quarter of Girona, Spain. Natural framing with deep shadows.", tags: ["architecture", "texture", "monochrome"], dimensions: "3840 x 5760", size: "11.2 MB", src: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=400&h=400&fit=crop" },
  { id: 3, title: "Olive Grove", description: "Centuries-old olive trees on a hillside in Puglia, photographed in the low afternoon light.", tags: ["landscape", "nature", "golden hour"], dimensions: "6000 x 4000", size: "9.7 MB", src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=400&fit=crop" },
  { id: 4, title: "Ceramic Workshop", description: "Artisan at work in a traditional pottery workshop in Vallauris. Hands shaping clay on the wheel.", tags: ["portrait", "craft", "detail"], dimensions: "4032 x 3024", size: "5.4 MB", src: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop" },
  { id: 5, title: "Tidal Flats", description: "Low tide revealing textured sand patterns along the Normandy coast. Aerial perspective.", tags: ["landscape", "abstract", "water"], dimensions: "5184 x 3888", size: "7.8 MB", src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop" },
]

export default function GalleryWithSidebar() {
  const [selected, setSelected] = useState(0)
  const img = images[selected]

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-8"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Gallery with Details
        </h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-[1fr_280px]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-3 md:grid-cols-3"
        >
          {images.map((img, i) => (
            <motion.button
              key={img.id}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              transition={spring}
              onClick={() => setSelected(i)}
              className={`relative aspect-square overflow-hidden rounded-xl bg-secondary ring-2 transition-all ${
                selected === i ? "ring-primary" : "ring-transparent"
              }`}
              style={{
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
              }}
            >
              <img
                src={img.src}
                alt={img.title}
                className="h-full w-full object-cover"
              />
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          key={selected}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
          <Card
            className="sticky top-6"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <CardContent className="space-y-4">
              <div className="aspect-[4/3] overflow-hidden rounded-lg bg-secondary">
                <img src={img.src} alt={img.title} className="h-full w-full object-cover" />
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">
                  {img.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {img.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {img.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[10px]">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Separator />
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Dimensions</span>
                  <span className="font-mono tabular-nums">{img.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span>File size</span>
                  <span className="font-mono tabular-nums">{img.size}</span>
                </div>
              </div>
              <motion.div whileHover={{ y: -1 }} transition={spring}>
                <Button variant="outline" className="w-full gap-1.5">
                  <DownloadIcon className="size-3.5" />
                  Download
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
