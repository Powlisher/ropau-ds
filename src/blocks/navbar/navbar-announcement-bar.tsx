"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { XIcon, ArrowRightIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { label: "Products", href: "#products" },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
  { label: "Company", href: "#company" },
]

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function NavbarAnnouncementBar() {
  const [showBanner, setShowBanner] = React.useState(true)

  return (
    <div className="sticky top-0 z-50">
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 28 }}
            className="overflow-hidden border-b border-primary/10 bg-primary/[0.04]"
          >
            <div className="mx-auto flex h-9 max-w-6xl items-center justify-center gap-3 px-6 text-sm lg:px-8">
              <Badge variant="default" className="h-[18px] text-[10px] font-semibold uppercase tracking-wider">
                New
              </Badge>
              <span className="text-foreground/80">
                Multi-region deployments are now available
              </span>
              <a
                href="#learn-more"
                className="inline-flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary/80"
              >
                Learn more
                <ArrowRightIcon className="size-3" />
              </a>
              <button
                onClick={() => setShowBanner(false)}
                className="absolute right-4 rounded-md p-1 text-muted-foreground/60 transition-colors hover:text-foreground lg:right-8"
              >
                <XIcon className="size-3.5" />
                <span className="sr-only">Dismiss</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="w-full border-b border-border/60 bg-background/95 backdrop-blur-sm"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
        }}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 lg:px-8">
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

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Login
            </Button>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </motion.header>
    </div>
  )
}
