"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HeartIcon, MessageCircleIcon, RepeatIcon, ShareIcon, BookmarkIcon, MoreHorizontalIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const posts = [
  {
    id: 1,
    author: "Elena Marchetti",
    handle: "@elenamarchetti",
    avatar: "from-rose-400 to-pink-500",
    time: "28m",
    content: "Just shipped the new design system components. The spacing scale alone took 3 iterations to get right, but the result feels so much more intentional now. Constraints breed creativity.",
    image: "from-slate-100 via-stone-100 to-zinc-100",
    hasImage: true,
    likes: 247,
    comments: 34,
    reposts: 18,
    bookmarked: false,
  },
  {
    id: 2,
    author: "Marcus Chen",
    handle: "@marcuschen",
    avatar: "from-blue-400 to-indigo-500",
    time: "2h",
    content: "Hot take: most 'AI-generated' UIs fail not because of the technology, but because they optimize for completeness instead of hierarchy. A great interface says 'look here first' — AI just says 'here is everything.'",
    hasImage: false,
    likes: 1842,
    comments: 213,
    reposts: 487,
    bookmarked: true,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

function formatCount(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
  return String(n)
}

export default function SocialFeedPost() {
  const [liked, setLiked] = useState<Record<number, boolean>>({})

  return (
    <motion.div
      className="mx-auto max-w-xl space-y-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {posts.map((post) => (
        <motion.div key={post.id} variants={itemVariants}>
          <Card style={{ boxShadow: shadow }}>
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className={`size-10 rounded-full bg-gradient-to-br ${post.avatar} shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-sm text-foreground">{post.author}</span>
                      <span className="text-sm text-muted-foreground">{post.handle}</span>
                      <span className="text-muted-foreground/40">.</span>
                      <span className="text-sm text-muted-foreground">{post.time}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="size-8 p-0 text-muted-foreground">
                      <MoreHorizontalIcon className="size-4" />
                    </Button>
                  </div>

                  <p className="text-sm text-foreground leading-relaxed mt-1.5">{post.content}</p>

                  {post.hasImage && (
                    <div className={`mt-3 rounded-xl bg-gradient-to-br ${post.image} aspect-video border border-border overflow-hidden`}>
                      <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02),transparent_70%)]" />
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-3 -ml-2">
                    <button className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-muted-foreground hover:text-blue-500 hover:bg-blue-50 transition-colors">
                      <MessageCircleIcon className="size-4" />
                      <span className="text-xs tabular-nums">{formatCount(post.comments)}</span>
                    </button>
                    <button className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-muted-foreground hover:text-emerald-500 hover:bg-emerald-50 transition-colors">
                      <RepeatIcon className="size-4" />
                      <span className="text-xs tabular-nums">{formatCount(post.reposts)}</span>
                    </button>
                    <button
                      onClick={() => setLiked((prev) => ({ ...prev, [post.id]: !prev[post.id] }))}
                      className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 transition-colors ${
                        liked[post.id] ? "text-rose-500" : "text-muted-foreground hover:text-rose-500 hover:bg-rose-50"
                      }`}
                    >
                      <HeartIcon className={`size-4 ${liked[post.id] ? "fill-current" : ""}`} />
                      <span className="text-xs tabular-nums">{formatCount(post.likes + (liked[post.id] ? 1 : 0))}</span>
                    </button>
                    <div className="flex items-center gap-1">
                      <button className="rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                        <BookmarkIcon className={`size-4 ${post.bookmarked ? "fill-current text-foreground" : ""}`} />
                      </button>
                      <button className="rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                        <ShareIcon className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
