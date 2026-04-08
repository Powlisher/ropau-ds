"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from "framer-motion"

const footerLinks = [
  { label: "Privacy", href: "#privacy" },
  { label: "Terms", href: "#terms" },
  { label: "Cookies", href: "#cookies" },
  { label: "Contact", href: "#contact" },
]

export default function FooterCookieConsent() {
  const [showConsent, setShowConsent] = React.useState(true)

  return (
    <>
      <footer className="w-full border-t border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
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

            <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <p className="text-xs text-muted-foreground/60 tabular-nums">
              &copy; 2024 Ropau Inc.
            </p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showConsent && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 28 }}
            className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-background/95 backdrop-blur-sm"
            style={{
              boxShadow:
                "0 -1px 2px rgba(20,20,15,0.04), 0 -2px 4px rgba(20,20,15,0.04), 0 -4px 8px rgba(20,20,15,0.04)",
            }}
          >
            <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-4 sm:flex-row sm:items-center lg:px-8">
              <div className="max-w-lg">
                <p className="text-sm font-medium text-foreground">
                  We value your privacy
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze traffic. Read our{" "}
                  <a href="#privacy" className="underline underline-offset-2">
                    cookie policy
                  </a>
                  .
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowConsent(false)}
                >
                  Reject All
                </Button>
                <Button size="sm" onClick={() => setShowConsent(false)}>
                  Accept All
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
