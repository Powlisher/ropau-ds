"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"

interface CodeComment {
  id: number
  author: string
  initials: string
  time: string
  blocks: Array<{ type: "text"; content: string } | { type: "code"; language: string; content: string }>
}

const comments: CodeComment[] = [
  {
    id: 1,
    author: "Romain Vasseur",
    initials: "RV",
    time: "Yesterday at 4:37 PM",
    blocks: [
      { type: "text", content: "Found the issue with the rate limiter. The sliding window wasn't accounting for the reset offset:" },
      {
        type: "code",
        language: "typescript",
        content: `// Before (broken)
const remaining = limit - count;

// After (fixed)
const elapsed = Date.now() - windowStart;
const remaining = Math.max(
  0,
  limit - Math.ceil(count * (1 - elapsed / windowMs))
);`,
      },
      { type: "text", content: "This was causing 429s to fire ~200ms too early under high concurrency. Deploying the fix to staging now." },
    ],
  },
  {
    id: 2,
    author: "Lea Fontaine",
    initials: "LF",
    time: "Today at 9:15 AM",
    blocks: [
      { type: "text", content: "Nice catch Romain. While you're in that file, can you also look at the retry logic? I think there's a similar off-by-one:" },
      {
        type: "code",
        language: "typescript",
        content: `const backoff = Math.min(
  baseDelay * Math.pow(2, attempt),  // attempt starts at 1, should be 0
  maxDelay
);`,
      },
    ],
  },
  {
    id: 3,
    author: "Hugo Deschamps",
    initials: "HD",
    time: "Today at 10:02 AM",
    blocks: [
      { type: "text", content: "Related — here's the equivalent pattern in the Python worker if anyone needs to cross-reference:" },
      {
        type: "code",
        language: "python",
        content: `def sliding_window_remaining(limit, count, window_start, window_ms):
    elapsed = time.time() * 1000 - window_start
    decay = 1 - (elapsed / window_ms)
    return max(0, limit - math.ceil(count * decay))`,
      },
    ],
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

function CodeBlock({ language, content }: { language: string; content: string }) {
  return (
    <div className="my-2 rounded-lg bg-slate-950 ring-1 ring-white/[0.06] overflow-hidden">
      <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-white/[0.06]">
        <span className="text-[11px] font-mono tracking-wide uppercase text-slate-400">{language}</span>
      </div>
      <pre className="overflow-x-auto px-3.5 py-3 text-[13px] leading-relaxed">
        <code className="font-mono text-slate-200">{content}</code>
      </pre>
    </div>
  )
}

export default function Comments03() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-5">
        <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Code Review</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">rate-limiter.ts — 3 comments</p>
      </div>
      <motion.div
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            variants={itemVariants}
            whileHover={{ y: -1 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className="rounded-xl bg-card px-5 py-4 ring-1 ring-border/60"
            style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
          >
            <div className="flex items-start gap-3">
              <Avatar size="sm" className="mt-0.5">
                <AvatarFallback>{comment.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-heading text-sm font-semibold tracking-tight text-foreground">{comment.author}</span>
                  <span className="text-[11px] font-mono tabular-nums tracking-wide text-muted-foreground">{comment.time}</span>
                </div>
                <div className="mt-2">
                  {comment.blocks.map((block, i) =>
                    block.type === "text" ? (
                      <p key={i} className="text-sm leading-relaxed text-foreground/90">{block.content}</p>
                    ) : (
                      <CodeBlock key={i} language={block.language} content={block.content} />
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
