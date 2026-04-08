"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const leftLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
]

const rightLinks = [
  { label: "Blog", href: "#blog" },
  { label: "Docs", href: "#docs" },
]

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function NavbarCenteredLogo() {
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
      <div className="mx-auto flex h-14 max-w-6xl items-center px-6 lg:px-8">
        <nav className="hidden flex-1 items-center gap-1 md:flex">
          {leftLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              whileHover={{ y: -1 }}
              transition={spring}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        <a href="/" className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <span className="font-heading text-sm font-bold tracking-tight text-primary-foreground">
              R
            </span>
          </div>
          <span className="font-heading text-[15px] font-semibold tracking-tight text-foreground">
            Ropau
          </span>
        </a>

        <div className="hidden flex-1 items-center justify-end gap-1 md:flex">
          {rightLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              whileHover={{ y: -1 }}
              transition={spring}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </motion.a>
          ))}
          <div className="ml-3 flex items-center gap-2">
            <Button variant="outline" size="sm">
              Login
            </Button>
            <Button size="sm">Sign Up</Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
