"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { PlayIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}
const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const videos = [
  { title: "Brand Film: Maison Riviera", duration: "2:34", src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=300&fit=crop" },
  { title: "Product Launch: Kinto Series", duration: "1:48", src: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500&h=300&fit=crop" },
  { title: "Behind the Scenes: Solara", duration: "4:12", src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=500&h=300&fit=crop" },
  { title: "Interview: Clara Fontaine", duration: "6:03", src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&h=300&fit=crop" },
  { title: "Timelapse: Workshop Build", duration: "0:58", src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=300&fit=crop" },
  { title: "Documentary: Harvest Season", duration: "12:47", src: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=500&h=300&fit=crop" },
]

export default function GalleryVideo() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-8"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Video Gallery
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{videos.length} videos</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {videos.map((video) => (
          <motion.div key={video.title} variants={itemVariants}>
            <motion.button
              whileHover={{ y: -3 }}
              transition={spring}
              className="group w-full text-left"
            >
              <div
                className="relative aspect-video overflow-hidden rounded-xl bg-secondary"
                style={{
                  boxShadow:
                    "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
                }}
              >
                <img
                  src={video.src}
                  alt={video.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors group-hover:bg-foreground/10">
                  <div className="flex size-12 items-center justify-center rounded-full bg-white/90 ring-1 ring-foreground/10 backdrop-blur-sm transition-transform group-hover:scale-110">
                    <PlayIcon className="ml-0.5 size-5 fill-foreground text-foreground" />
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="absolute right-2.5 bottom-2.5 font-mono text-[10px] tabular-nums"
                >
                  {video.duration}
                </Badge>
              </div>
              <h3 className="mt-2.5 text-sm font-semibold text-foreground">
                {video.title}
              </h3>
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
