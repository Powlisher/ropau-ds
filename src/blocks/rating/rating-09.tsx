"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const items = [
  { id: 1, title: "Minimalist desk lamp", brand: "Muuto", likes: 247, liked: false },
  { id: 2, title: "Wool throw blanket", brand: "Tekla", likes: 183, liked: true },
  { id: 3, title: "Ceramic pour-over set", brand: "Kinto", likes: 92, liked: false },
]

export default function Rating09() {
  const [data, setData] = useState(items)

  function toggleLike(id: number) {
    setData((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, liked: !item.liked, likes: item.liked ? item.likes - 1 : item.likes + 1 }
          : item
      )
    )
  }

  return (
    <div className="mx-auto max-w-xs">
      <motion.div
        className="space-y-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {data.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ y: -1 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className="flex items-center gap-4 rounded-xl bg-card px-4 py-3.5 ring-1 ring-border/60"
            style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
          >
            <div className="min-w-0 flex-1">
              <p className="truncate font-heading text-sm font-semibold tracking-tight text-foreground">
                {item.title}
              </p>
              <p className="text-xs text-muted-foreground">{item.brand}</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.85 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 18 }}
              onClick={() => toggleLike(item.id)}
              className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <motion.div
                animate={item.liked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                transition={{ type: "spring" as const, stiffness: 500, damping: 15 }}
              >
                <Heart
                  className={`size-4.5 transition-colors ${
                    item.liked ? "fill-rose-500 text-rose-500" : "fill-transparent text-foreground/30"
                  }`}
                />
              </motion.div>
              <span className={`text-xs font-medium tabular-nums ${
                item.liked ? "text-rose-600 dark:text-rose-400" : "text-muted-foreground"
              }`}>
                {item.likes}
              </span>
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
