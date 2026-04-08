"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GlobeIcon, ExternalLinkIcon } from "lucide-react"

const browsers = [
  { name: "Chrome", version: "120+", url: "https://www.google.com/chrome/" },
  { name: "Firefox", version: "119+", url: "https://www.mozilla.org/firefox/" },
  { name: "Safari", version: "17+", url: "https://www.apple.com/safari/" },
  { name: "Edge", version: "120+", url: "https://www.microsoft.com/edge" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function ErrorBrowser() {
  return (
    <div className="flex min-h-[540px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Card className="w-full max-w-md">
        <CardContent className="py-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-6 text-center"
          >
            <motion.div
              variants={itemVariants}
              className="flex size-14 items-center justify-center rounded-full bg-muted ring-4 ring-border/30"
            >
              <GlobeIcon className="size-6 text-muted-foreground" />
            </motion.div>

            <motion.div variants={itemVariants}>
              <h1 className="font-heading text-xl font-semibold tracking-tight text-foreground">
                Please update your browser
              </h1>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                Ropau requires a modern browser for security and performance. Download one of the supported versions below.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
              <div className="flex flex-col gap-1.5">
                {browsers.map((b) => (
                  <motion.a
                    key={b.name}
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -1 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                    className="flex items-center justify-between rounded-lg border border-border px-4 py-3 transition-colors hover:bg-muted/40"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-md bg-muted text-xs font-bold text-muted-foreground">
                        {b.name.charAt(0)}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-foreground">{b.name}</p>
                        <p className="text-xs tabular-nums text-muted-foreground">{b.version}</p>
                      </div>
                    </div>
                    <ExternalLinkIcon className="size-3.5 text-muted-foreground" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}
