"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const comments = [
  {
    author: "Marcus Lindgren",
    initials: "ML",
    date: "2 hours ago",
    text: "The advisory lock approach is interesting. We tried something similar but hit issues with connection pool exhaustion under burst traffic. Did you have to tune the pool size or add any retry logic?",
    replies: [
      {
        author: "Hugo Lindqvist",
        initials: "HL",
        date: "1 hour ago",
        text: "Good question. We increased the pool from 20 to 50 connections and added exponential backoff with jitter on lock acquisition. The key insight was keeping lock hold time under 200ms so the pool cycles fast enough.",
      },
    ],
  },
  {
    author: "Diana Reeves",
    initials: "DR",
    date: "5 hours ago",
    text: "We moved away from Redis queues for similar reasons. The operational simplicity of keeping everything in Postgres is hard to overstate. One less system to monitor, one less failure mode in the critical path.",
    replies: [],
  },
  {
    author: "Sanjay Gupta",
    initials: "SG",
    date: "Yesterday",
    text: "How does this perform at scale? We process around 12K jobs per minute and I am curious whether Postgres advisory locks would hold up versus a dedicated queue like RabbitMQ.",
    replies: [
      {
        author: "Hugo Lindqvist",
        initials: "HL",
        date: "22 hours ago",
        text: "At 12K/min you are probably fine. We tested up to ~50K/min before seeing contention. Beyond that, partitioning by job type across multiple lock namespaces helps. But honestly, at that volume, a dedicated queue starts to make sense again.",
      },
      {
        author: "Sanjay Gupta",
        initials: "SG",
        date: "20 hours ago",
        text: "Helpful, thanks. We are well under that threshold so this could simplify our stack quite a bit. Will prototype it this sprint.",
      },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

function Comment({
  author,
  initials,
  date,
  text,
  replies,
  isReply = false,
}: {
  author: string
  initials: string
  date: string
  text: string
  replies?: typeof comments[0]["replies"]
  isReply?: boolean
}) {
  return (
    <div className={isReply ? "ml-10 mt-4" : ""}>
      <div className="flex gap-3">
        <Avatar size={isReply ? "sm" : "default"}>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">
              {author}
            </span>
            <span className="text-xs tabular-nums text-muted-foreground">
              {date}
            </span>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">
            {text}
          </p>
          <Button variant="ghost" size="xs" className="mt-2 text-muted-foreground">
            Reply
          </Button>
        </div>
      </div>
      {replies?.map((reply) => (
        <Comment key={reply.author + reply.date} {...reply} isReply />
      ))}
    </div>
  )
}

export default function BlogComments() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">
            Discussion
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            <span className="tabular-nums">{comments.length}</span> comments
          </p>
        </motion.div>

        <div className="mt-8 space-y-0">
          {comments.map((comment, idx) => (
            <motion.div key={comment.author + comment.date} variants={itemVariants}>
              {idx > 0 && <Separator className="my-6" />}
              <Comment {...comment} />
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants}>
          <Separator className="my-8" />
          <Card
            className="bg-muted/20"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
            }}
          >
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">
                Sign in to join the conversation.
              </p>
              <Button variant="outline" size="sm" className="mt-3">
                Sign in
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}
