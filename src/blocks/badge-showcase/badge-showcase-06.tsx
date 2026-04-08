"use client"

import { motion } from "framer-motion"

const categories = [
  {
    group: "Engineering",
    tags: [
      { label: "Frontend", color: "bg-sky-500/10 text-sky-700 dark:text-sky-400 ring-sky-500/20" },
      { label: "Backend", color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 ring-emerald-500/20" },
      { label: "Infra", color: "bg-orange-500/10 text-orange-700 dark:text-orange-400 ring-orange-500/20" },
    ],
  },
  {
    group: "Design",
    tags: [
      { label: "UI/UX", color: "bg-violet-500/10 text-violet-700 dark:text-violet-400 ring-violet-500/20" },
      { label: "Brand", color: "bg-pink-500/10 text-pink-700 dark:text-pink-400 ring-pink-500/20" },
      { label: "Motion", color: "bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-amber-500/20" },
    ],
  },
  {
    group: "Priority",
    tags: [
      { label: "Critical", color: "bg-rose-500/10 text-rose-700 dark:text-rose-400 ring-rose-500/20" },
      { label: "High", color: "bg-orange-500/10 text-orange-700 dark:text-orange-400 ring-orange-500/20" },
      { label: "Medium", color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 ring-yellow-500/20" },
      { label: "Low", color: "bg-slate-500/10 text-slate-600 dark:text-slate-400 ring-slate-500/20" },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function BadgeShowcase06() {
  return (
    <div
      className="rounded-2xl bg-card p-8"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <h3 className="mb-1 text-sm font-semibold tracking-tight text-foreground">
        Tag categories
      </h3>
      <p className="mb-6 text-xs text-muted-foreground">
        Grouped labels for classification and filtering
      </p>
      <motion.div
        className="space-y-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {categories.map((cat) => (
          <motion.div key={cat.group} variants={itemVariants}>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {cat.group}
            </p>
            <div className="flex flex-wrap gap-2">
              {cat.tags.map((tag) => (
                <span
                  key={tag.label}
                  className={`inline-flex h-6 items-center rounded-md px-2 text-xs font-medium ring-1 ring-inset ${tag.color}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
