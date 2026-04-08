"use client"

import { CheckIcon, CopyIcon } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

const features = [
  "Fully typed API with auto-complete",
  "Server Components by default",
  "Dark mode with zero configuration",
  "Accessible to WCAG 2.2 AA",
]

const codeLines = [
  { indent: 0, text: "import { Button } from '@ropau/ui'" },
  { indent: 0, text: "" },
  { indent: 0, text: "export function Deploy() {" },
  { indent: 1, text: "return (" },
  { indent: 2, text: '<Button variant="default">' },
  { indent: 3, text: "Ship it" },
  { indent: 2, text: "</Button>" },
  { indent: 1, text: ")" },
  { indent: 0, text: "}" },
]

export default function HeroCodePreview() {
  return (
    <section className="w-full px-6 py-20 md:px-12 lg:px-20 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <motion.div
          className="flex flex-col gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Developer experience,
            <br />
            not developer friction
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-md text-lg leading-relaxed text-muted-foreground"
          >
            Copy. Paste. Ship. Every component works out of the box with
            TypeScript, Next.js, and your existing design tokens.
          </motion.p>

          <motion.ul variants={itemVariants} className="flex flex-col gap-3 pt-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2.5 text-sm text-foreground">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <CheckIcon className="size-3 text-primary" />
                </span>
                {feature}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={itemVariants} className="flex items-center gap-3 pt-4">
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            >
              <Button size="lg">Install now</Button>
            </motion.div>
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            >
              <Button variant="ghost" size="lg">
                Read docs
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring" as const, stiffness: 200, damping: 22, delay: 0.15 }}
          className="relative"
        >
          <div
            className="overflow-hidden rounded-xl bg-zinc-950 ring-1 ring-white/10"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)",
            }}
          >
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-red-400/60" />
                <span className="size-2.5 rounded-full bg-amber-400/60" />
                <span className="size-2.5 rounded-full bg-emerald-400/60" />
              </div>
              <span className="font-mono text-xs text-zinc-500">deploy.tsx</span>
              <Button
                size="icon-xs"
                variant="ghost"
                className="text-zinc-500 hover:text-zinc-300"
              >
                <CopyIcon className="size-3" />
              </Button>
            </div>
            <pre className="overflow-x-auto p-5">
              <code className="font-mono text-sm leading-relaxed">
                {codeLines.map((line, i) => (
                  <div key={i} className="whitespace-pre">
                    {"  ".repeat(line.indent)}
                    <span className={line.text.startsWith("import") ? "text-cyan-400" : line.text.startsWith("export") ? "text-violet-400" : line.text.includes("variant") ? "text-amber-300" : "text-zinc-300"}>
                      {line.text}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
