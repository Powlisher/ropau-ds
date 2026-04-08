"use client"

import { PlusIcon } from "lucide-react"
import { motion } from "framer-motion"

const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const stories = [
  { name: "Your story", isOwn: true, gradient: "from-slate-200 to-slate-300", seen: false },
  { name: "Elena", gradient: "from-rose-400 to-pink-500", seen: false },
  { name: "Marcus", gradient: "from-blue-400 to-indigo-500", seen: false },
  { name: "Priya", gradient: "from-amber-400 to-orange-500", seen: false },
  { name: "Liam", gradient: "from-emerald-400 to-teal-500", seen: true },
  { name: "Sofia", gradient: "from-violet-400 to-fuchsia-500", seen: true },
  { name: "Kai", gradient: "from-cyan-400 to-blue-500", seen: true },
  { name: "Nora", gradient: "from-rose-300 to-red-400", seen: true },
  { name: "Amir", gradient: "from-lime-400 to-green-500", seen: true },
  { name: "Yuki", gradient: "from-purple-400 to-indigo-500", seen: true },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function SocialStories() {
  return (
    <div className="mx-auto max-w-2xl">
      <motion.div
        className="flex items-center gap-4 overflow-x-auto pb-2 px-1 scrollbar-none"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stories.map((story, i) => (
          <motion.button
            key={story.name}
            variants={itemVariants}
            whileHover={{ y: -2 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className="flex flex-col items-center gap-1.5 shrink-0"
          >
            <div className={`relative ${story.seen ? "opacity-60" : ""}`}>
              <div
                className={`size-16 rounded-full p-[2.5px] ${
                  story.isOwn
                    ? "bg-muted"
                    : story.seen
                      ? "bg-muted"
                      : "bg-gradient-to-tr from-amber-400 via-rose-500 to-violet-500"
                }`}
              >
                <div className={`size-full rounded-full bg-gradient-to-br ${story.gradient} ring-2 ring-card`} />
              </div>
              {story.isOwn && (
                <div className="absolute -bottom-0.5 -right-0.5 flex size-6 items-center justify-center rounded-full bg-foreground text-background ring-2 ring-card">
                  <PlusIcon className="size-3.5" />
                </div>
              )}
            </div>
            <span className={`text-xs ${story.seen ? "text-muted-foreground" : "text-foreground font-medium"} max-w-16 truncate`}>
              {story.name}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}
