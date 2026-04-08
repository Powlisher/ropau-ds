"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon, SunIcon, MoonIcon } from "lucide-react"
import { motion } from "framer-motion"
import * as React from "react"

const navLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Analytics", href: "#analytics" },
  { label: "Reports", href: "#reports" },
  { label: "Settings", href: "#settings" },
]

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function NavbarDarkMode() {
  const [isDark, setIsDark] = React.useState(true)

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: isDark ? "oklch(0.17 0.01 285)" : undefined,
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.06), 0 2px 4px rgba(20,20,15,0.06), 0 4px 8px rgba(20,20,15,0.04)",
      }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 px-6 lg:px-8">
        <a href="/" className="flex shrink-0 items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <span className="font-heading text-sm font-bold tracking-tight text-primary-foreground">
              R
            </span>
          </div>
          <span
            className="font-heading text-[15px] font-semibold tracking-tight"
            style={{ color: isDark ? "oklch(0.95 0 0)" : undefined }}
          >
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
              className="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
              style={{
                color: isDark ? "oklch(0.75 0 0)" : undefined,
              }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <SearchIcon
              className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2"
              style={{ color: isDark ? "oklch(0.55 0 0)" : undefined }}
            />
            <Input
              placeholder="Search..."
              className="h-8 w-48 pl-8 text-sm"
              style={
                isDark
                  ? {
                      backgroundColor: "oklch(0.22 0.008 285)",
                      borderColor: "oklch(0.3 0.01 285)",
                      color: "oklch(0.9 0 0)",
                    }
                  : undefined
              }
            />
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsDark(!isDark)}
            style={isDark ? { color: "oklch(0.8 0 0)" } : undefined}
          >
            {isDark ? (
              <SunIcon className="size-4" />
            ) : (
              <MoonIcon className="size-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </motion.header>
  )
}
