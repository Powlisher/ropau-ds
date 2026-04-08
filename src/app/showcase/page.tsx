"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Layers, Sparkles, LayoutGrid, ArrowRight } from "lucide-react"
import {
  uiComponents,
  aiComponents,
  blockSubcategories,
} from "@/lib/component-registry"
import { DarkModeToggle } from "@/components/showcase/dark-mode-toggle"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

const categories = [
  {
    title: "UI Components",
    description: "Core building blocks — buttons, inputs, cards, overlays, navigation, and data display elements.",
    href: "/showcase/ui/button",
    icon: Layers,
    count: uiComponents.length,
    accent: "bg-primary/8 text-primary ring-primary/12",
    items: ["Button", "Card", "Badge", "Input", "Tabs", "Dialog", "Select", "Switch"],
  },
  {
    title: "AI Components",
    description: "Conversational interface primitives — messages, prompts, reasoning traces, tool calls, and streaming states.",
    href: "/showcase/ai/ai-message",
    icon: Sparkles,
    count: 14,
    accent: "bg-accent/8 text-accent ring-accent/12",
    items: ["Message", "Prompt Input", "Reasoning", "Code Block", "Task", "Tool", "Conversation", "Loader"],
  },
  {
    title: "Blocks",
    description: "Production-ready page sections — landing heroes, auth forms, dashboards, settings panels.",
    href: "/showcase/block/landing/hero-split",
    icon: LayoutGrid,
    count: blockSubcategories.reduce((sum, s) => sum + s.count, 0),
    accent: "bg-foreground/5 text-foreground ring-foreground/8",
    items: blockSubcategories.map((s) => `${s.label} (${s.count})`),
  },
]

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between border-b border-border px-8 py-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Component Showcase</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Browse, preview, and customize every component in ropau-ds
          </p>
        </div>
        <DarkModeToggle />
      </header>

      <main className="px-8 py-10 max-w-5xl">
        <motion.div
          className="grid gap-6 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <motion.div key={cat.title} variants={itemVariants}>
                <Link href={cat.href} className="group block">
                  <div
                    className="flex flex-col gap-5 rounded-xl bg-card p-6 ring-1 ring-foreground/[0.06] transition-all"
                    style={{
                      boxShadow:
                        "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className={`flex size-10 items-center justify-center rounded-xl ring-1 ${cat.accent}`}
                      >
                        <Icon className="size-4.5" />
                      </div>
                      <span className="font-mono text-xs tabular-nums text-muted-foreground">
                        {cat.count}
                      </span>
                    </div>

                    <div>
                      <h2 className="text-base font-semibold tracking-tight group-hover:text-primary transition-colors">
                        {cat.title}
                      </h2>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {cat.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.slice(0, 6).map((item) => (
                        <span
                          key={item}
                          className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                      {cat.items.length > 6 && (
                        <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground tabular-nums">
                          +{cat.items.length - 6}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Browse components
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-2 gap-x-12 gap-y-3 md:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { label: "Total Components", value: `${uiComponents.length + 14}` },
            { label: "Block Sections", value: `${blockSubcategories.reduce((s, b) => s + b.count, 0)}` },
            { label: "Categories", value: `${blockSubcategories.length}` },
            { label: "Color System", value: "oklch" },
          ].map((stat) => (
            <motion.div key={stat.label} variants={itemVariants} className="py-3">
              <p className="text-2xl font-semibold tracking-tight tabular-nums">{stat.value}</p>
              <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  )
}
