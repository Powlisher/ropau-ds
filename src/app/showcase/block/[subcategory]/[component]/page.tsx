"use client"

import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { blockComponents, type BlockSubcategory } from "@/lib/component-registry"
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

export default function BlockPreviewPage() {
  const params = useParams()
  const subcategory = params.subcategory as BlockSubcategory
  const slug = params.component as string

  const entry = blockComponents.find(
    (b) => b.subcategory === subcategory && b.slug === slug
  )

  if (!entry) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-8">
        <p className="text-lg font-semibold">Block not found</p>
        <p className="text-sm text-muted-foreground">
          No block matching &quot;{slug}&quot; in &quot;{subcategory}&quot;
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

  const subcategoryBlocks = blockComponents.filter(
    (b) => b.subcategory === subcategory
  )
  const currentIndex = subcategoryBlocks.findIndex((b) => b.slug === slug)
  const prev = currentIndex > 0 ? subcategoryBlocks[currentIndex - 1] : null
  const next =
    currentIndex < subcategoryBlocks.length - 1
      ? subcategoryBlocks[currentIndex + 1]
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
            blocks
          </span>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {subcategory}
          </span>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-sm font-medium">{entry.name}</span>
        </div>
        <DarkModeToggle />
      </header>

      <motion.main
        className="px-8 py-10"
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
            <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
              blocks/{subcategory}/{slug}
            </span>
          </div>
          <div
            className="rounded-xl border border-border bg-card overflow-hidden"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
            }}
          >
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="size-14 rounded-xl bg-muted/50 flex items-center justify-center ring-1 ring-foreground/5">
                <span className="text-xl font-semibold text-muted-foreground/40">
                  {entry.name.charAt(0)}
                </span>
              </div>
              <p className="text-sm font-medium">{entry.name}</p>
              <p className="text-xs text-muted-foreground max-w-sm text-center">
                This block is a self-contained page section. Import and use it directly in your layout.
              </p>
            </div>
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
            <span className="text-zinc-300">{entry.name.replace(/[\s-]+/g, "")}</span>{" "}
            <span className="text-zinc-500">from</span>{" "}
            <span className="text-emerald-400">&quot;@/blocks/{subcategory}/{slug}&quot;</span>
          </div>
        </motion.div>

        {(prev || next) && (
          <motion.div
            variants={itemVariants}
            className="mt-12 flex items-center justify-between border-t border-border pt-6"
          >
            {prev ? (
              <Link
                href={`/showcase/block/${subcategory}/${prev.slug}`}
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
                href={`/showcase/block/${subcategory}/${next.slug}`}
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
