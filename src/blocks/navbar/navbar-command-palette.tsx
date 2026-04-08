"use client"

import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { SearchIcon } from "lucide-react"
import { motion } from "framer-motion"

const navLinks = [
  { label: "Dashboard", href: "#dashboard" },
  { label: "Projects", href: "#projects" },
  { label: "Team", href: "#team" },
  { label: "Settings", href: "#settings" },
]

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function NavbarCommandPalette() {
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
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-6">
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

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
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
        </div>

        <button
          className="flex h-8 w-56 items-center gap-2 rounded-lg border border-input bg-background px-3 text-sm text-muted-foreground transition-colors hover:bg-muted"
          onClick={() => {}}
        >
          <SearchIcon className="size-3.5" />
          <span className="flex-1 text-left">Search...</span>
          <span className="flex items-center gap-0.5">
            <Kbd>&#8984;</Kbd>
            <Kbd>K</Kbd>
          </span>
        </button>
      </div>
    </motion.header>
  )
}
