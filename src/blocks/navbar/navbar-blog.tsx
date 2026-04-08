"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import { motion } from "framer-motion"

const categories = [
  { label: "Engineering", href: "#engineering" },
  { label: "Design", href: "#design" },
  { label: "Product", href: "#product" },
  { label: "Culture", href: "#culture" },
]

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function NavbarBlog() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-sm"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
      }}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-6 px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <span className="font-heading text-sm font-bold tracking-tight text-primary-foreground">
              R
            </span>
          </div>
          <span className="font-heading text-[15px] font-semibold tracking-tight text-foreground">
            Blog
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {categories.map((cat) => (
            <motion.a
              key={cat.label}
              href={cat.href}
              whileHover={{ y: -1 }}
              transition={spring}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {cat.label}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <SearchIcon className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              className="h-8 w-44 pl-8 text-sm"
            />
          </div>
          <Button size="sm">Subscribe</Button>
        </div>
      </div>
    </motion.header>
  )
}
