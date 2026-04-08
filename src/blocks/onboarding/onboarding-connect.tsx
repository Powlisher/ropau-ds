"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckIcon, LinkIcon } from "lucide-react"

const integrations = [
  { id: "slack", name: "Slack", category: "Communication", color: "bg-amber-500/10 text-amber-700" },
  { id: "github", name: "GitHub", category: "Development", color: "bg-slate-500/10 text-slate-700" },
  { id: "figma", name: "Figma", category: "Design", color: "bg-purple-500/10 text-purple-700" },
  { id: "notion", name: "Notion", category: "Documentation", color: "bg-stone-500/10 text-stone-700" },
  { id: "linear", name: "Linear", category: "Project Management", color: "bg-blue-500/10 text-blue-700" },
  { id: "vercel", name: "Vercel", category: "Deployment", color: "bg-neutral-500/10 text-neutral-700" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function OnboardingConnect() {
  const [connected, setConnected] = useState<Set<string>>(new Set(["github"]))

  function toggle(id: string) {
    setConnected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="flex min-h-[540px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-lg">Connect your tools</CardTitle>
          <CardDescription>
            Integrations sync data and keep everything in one place. You can add more later.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-2 sm:grid-cols-2"
          >
            {integrations.map((intg) => {
              const isConnected = connected.has(intg.id)
              return (
                <motion.div key={intg.id} variants={itemVariants}>
                  <motion.div
                    whileHover={{ y: -1 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                    className={`flex items-center gap-3 rounded-lg border p-3 transition-colors ${
                      isConnected ? "border-primary/20 bg-primary/[0.02]" : "border-border hover:bg-muted/40"
                    }`}
                  >
                    <div className={`flex size-9 items-center justify-center rounded-lg ${intg.color}`}>
                      <LinkIcon className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{intg.name}</p>
                      <p className="text-xs text-muted-foreground">{intg.category}</p>
                    </div>
                    {isConnected ? (
                      <Badge variant="secondary" className="gap-1 text-xs">
                        <CheckIcon className="size-3" /> Connected
                      </Badge>
                    ) : (
                      <Button variant="outline" size="xs" onClick={() => toggle(intg.id)}>
                        Connect
                      </Button>
                    )}
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="ghost">Skip</Button>
          <Button>
            Continue
            {connected.size > 0 && (
              <span className="ml-1 tabular-nums text-primary-foreground/70">
                ({connected.size})
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
