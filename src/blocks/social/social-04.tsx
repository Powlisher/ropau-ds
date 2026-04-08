"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageIcon, VideoIcon, SmileIcon, MapPinIcon, AtSignIcon, HashIcon, GlobeIcon, ChevronDownIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

const shadowLg = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)"

const maxChars = 280

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function SocialPostComposer() {
  const [text, setText] = useState("")
  const remaining = maxChars - text.length
  const pct = (text.length / maxChars) * 100

  return (
    <motion.div
      className="mx-auto max-w-xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadowLg }}>
          <CardContent className="p-4">
            <div className="flex gap-3">
              <div className="size-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-2">
                  <Button variant="outline" size="sm" className="h-6 text-xs rounded-full gap-1">
                    <GlobeIcon className="size-3" />
                    Everyone
                    <ChevronDownIcon className="size-3" />
                  </Button>
                </div>

                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, maxChars))}
                  placeholder="What's happening?"
                  className="w-full resize-none bg-transparent text-foreground placeholder:text-muted-foreground/60 text-lg leading-relaxed outline-none min-h-[120px]"
                  rows={4}
                />

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-0.5">
                    {[
                      { icon: ImageIcon, label: "Photo" },
                      { icon: VideoIcon, label: "Video" },
                      { icon: SmileIcon, label: "Emoji" },
                      { icon: MapPinIcon, label: "Location" },
                      { icon: AtSignIcon, label: "Mention" },
                      { icon: HashIcon, label: "Tag" },
                    ].map(({ icon: Icon, label }) => (
                      <motion.button
                        key={label}
                        className="rounded-full p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
                        title={label}
                      >
                        <Icon className="size-4" />
                      </motion.button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    {text.length > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="relative size-6">
                          <svg className="size-6 -rotate-90" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted" />
                            <circle
                              cx="12" cy="12" r="10" fill="none" strokeWidth="2"
                              strokeDasharray={`${pct * 0.628} 100`}
                              className={remaining < 0 ? "text-red-500" : remaining < 20 ? "text-amber-500" : "text-foreground"}
                              stroke="currentColor"
                            />
                          </svg>
                        </div>
                        <span className={`text-xs tabular-nums font-medium ${remaining < 0 ? "text-red-500" : remaining < 20 ? "text-amber-500" : "text-muted-foreground"}`}>
                          {remaining}
                        </span>
                        <div className="w-px h-5 bg-border" />
                      </div>
                    )}
                    <Button
                      size="sm"
                      disabled={text.length === 0 || remaining < 0}
                      className="rounded-full px-5"
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
