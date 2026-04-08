"use client"

import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getComponentBySlug, allComponents } from "@/lib/component-registry"
import { getUiDemo } from "@/components/showcase/demos/ui-demos"
import { getAiDemo } from "@/components/showcase/demos/ai-demos"
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

export default function ComponentPreviewPage() {
  const params = useParams()
  const category = params.category as string
  const slug = params.component as string

  const entry = getComponentBySlug(category, slug)

  if (!entry) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-8">
        <p className="text-lg font-semibold">Component not found</p>
        <p className="text-sm text-muted-foreground">
          No component matching &quot;{slug}&quot; in category &quot;{category}&quot;
        </p>
        <Link
          href="/showcase"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="size-3.5" />
          Back to overview
        </Link>
      </div>
    )
  }

  let Demo: React.ComponentType | null = null
  if (category === "ui") Demo = getUiDemo(slug)
  if (category === "ai") Demo = getAiDemo(slug)

  const categoryComponents = allComponents.filter((c) => c.category === category)
  const currentIndex = categoryComponents.findIndex((c) => c.slug === slug)
  const prev = currentIndex > 0 ? categoryComponents[currentIndex - 1] : null
  const next =
    currentIndex < categoryComponents.length - 1
      ? categoryComponents[currentIndex + 1]
      : null

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between border-b border-border px-8 py-4">
        <div className="flex items-center gap-4">
          <Link
            href="/showcase"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            Showcase
          </Link>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {category}
          </span>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-sm font-medium">{entry.name}</span>
        </div>
        <DarkModeToggle />
      </header>

      <motion.main
        className="px-8 py-10 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl font-semibold tracking-tight">{entry.name}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{entry.description}</p>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Preview</p>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
                {category}/{slug}
              </span>
            </div>
          </div>
          <div
            className="rounded-xl border border-border bg-card p-8"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
            }}
          >
            {Demo ? (
              <Demo />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <div className="size-12 rounded-xl bg-muted/50 flex items-center justify-center ring-1 ring-foreground/5">
                  <span className="text-lg font-semibold text-muted-foreground/50">
                    {entry.name.charAt(0)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Preview available in the full design system documentation
                </p>
                <p className="text-xs text-muted-foreground/60">
                  Import from <code className="font-mono">@/components/{category}/{slug}</code>
                </p>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-3">Import</p>
          <div
            className="rounded-lg bg-zinc-900 px-5 py-3.5 font-mono text-sm text-zinc-100"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
            }}
          >
            <span className="text-zinc-500">import</span>{" "}
            <span className="text-zinc-300">{"{ "}{entry.name.replace(/\s+/g, "")}{" }"}</span>{" "}
            <span className="text-zinc-500">from</span>{" "}
            <span className="text-emerald-400">&quot;@/components/{category}/{slug}&quot;</span>
          </div>
        </motion.div>

        {(prev || next) && (
          <motion.div
            variants={itemVariants}
            className="mt-12 flex items-center justify-between border-t border-border pt-6"
          >
            {prev ? (
              <Link
                href={`/showcase/${prev.category}/${prev.slug}`}
                className="group flex flex-col gap-0.5"
              >
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Previous</span>
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  {prev.name}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/showcase/${next.category}/${next.slug}`}
                className="group flex flex-col items-end gap-0.5"
              >
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Next</span>
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  {next.name}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </motion.div>
        )}
      </motion.main>
    </div>
  )
}
