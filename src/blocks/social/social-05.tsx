"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LinkIcon, CheckIcon, CopyIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

const shadowLg = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)"
const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const platforms = [
  { name: "X (Twitter)", color: "#0F1419", textColor: "text-white", icon: "X" },
  { name: "LinkedIn", color: "#0A66C2", textColor: "text-white", icon: "in" },
  { name: "Facebook", color: "#1877F2", textColor: "text-white", icon: "f" },
  { name: "WhatsApp", color: "#25D366", textColor: "text-white", icon: "W" },
  { name: "Telegram", color: "#26A5E4", textColor: "text-white", icon: "T" },
  { name: "Email", color: "#EA4335", textColor: "text-white", icon: "@" },
]

const article = {
  title: "Why your component library needs fewer components",
  description: "A counterintuitive approach to building more flexible design systems by reducing surface area.",
  author: "Elena Marchetti",
  site: "elenamarchetti.design",
  url: "https://elenamarchetti.design/fewer-components",
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function SocialShareCard() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      className="mx-auto max-w-sm"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadowLg }}>
          <CardHeader className="pb-3 text-center">
            <CardTitle className="text-lg font-semibold tracking-tight">Share</CardTitle>
            <CardDescription>Share this article with your network</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl border border-border p-3" style={{ boxShadow: shadow }}>
              <div className="aspect-[2/1] rounded-lg bg-gradient-to-br from-rose-100 via-pink-50 to-fuchsia-100 mb-3" />
              <h3 className="font-semibold text-sm text-foreground tracking-tight leading-snug">{article.title}</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">{article.description}</p>
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                <LinkIcon className="size-3" />
                <span>{article.site}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {platforms.map((platform) => (
                <motion.button
                  key={platform.name}
                  className="flex flex-col items-center gap-1.5 rounded-xl p-3 border border-border hover:border-transparent transition-all"
                  whileHover={{ y: -2, boxShadow: shadow }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                >
                  <div
                    className={`flex size-10 items-center justify-center rounded-full text-sm font-bold ${platform.textColor}`}
                    style={{ backgroundColor: platform.color }}
                  >
                    {platform.icon}
                  </div>
                  <span className="text-xs text-muted-foreground">{platform.name}</span>
                </motion.button>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <div className="flex-1 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground font-mono truncate">
                {article.url}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="shrink-0"
              >
                {copied ? (
                  <><CheckIcon className="size-3.5 mr-1 text-emerald-500" /> Copied</>
                ) : (
                  <><CopyIcon className="size-3.5 mr-1" /> Copy</>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
