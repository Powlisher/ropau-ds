"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"

const sizes = [
  { label: "XS", sizeClass: "size-5", textClass: "text-[8px]" },
  { label: "SM", sizeClass: "size-6", textClass: "text-[9px]" },
  { label: "Default", sizeClass: "size-8", textClass: "text-xs" },
  { label: "LG", sizeClass: "size-10", textClass: "text-sm" },
  { label: "XL", sizeClass: "size-14", textClass: "text-base" },
  { label: "2XL", sizeClass: "size-20", textClass: "text-lg" },
] as const

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function AvatarGroup05() {
  return (
    <div
      className="rounded-2xl bg-card p-8"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <h3 className="mb-6 text-sm font-semibold tracking-tight text-foreground">
        Avatar sizes
      </h3>
      <motion.div
        className="flex items-end gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {sizes.map((s, i) => (
          <motion.div
            key={s.label}
            variants={itemVariants}
            className="flex flex-col items-center gap-2"
          >
            <div
              className={`${s.sizeClass} relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken`}
            >
              <img
                src={`https://i.pravatar.cc/160?img=${i + 10}`}
                alt={`Size ${s.label}`}
                className="aspect-square size-full rounded-full object-cover"
              />
            </div>
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              {s.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
