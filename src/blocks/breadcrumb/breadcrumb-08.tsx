"use client"

import { useState } from "react"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { CopyIcon, CheckIcon } from "lucide-react"

const items = [
  { label: "docs", href: "#docs" },
  { label: "api-reference", href: "#api" },
  { label: "authentication", href: "#auth" },
  { label: "oauth2-pkce" },
]

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function Breadcrumb08() {
  const [copied, setCopied] = useState(false)
  const fullPath = items.map((i) => i.label).join(" / ")

  function handleCopy() {
    navigator.clipboard.writeText(fullPath).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="flex min-h-[120px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="inline-flex items-center gap-2"
      >
        <Breadcrumb>
          <BreadcrumbList>
            {items.map((item, i) => (
              <div key={item.label} className="inline-flex items-center gap-1.5">
                <BreadcrumbItem>
                  {i === items.length - 1 ? (
                    <BreadcrumbPage className="font-medium">{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {i < items.length - 1 && <BreadcrumbSeparator />}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        <Button
          variant="ghost"
          size="icon"
          className="size-7 shrink-0 text-muted-foreground"
          onClick={handleCopy}
          aria-label="Copy path"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={spring}
              >
                <CheckIcon className="size-3.5 text-primary" />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={spring}
              >
                <CopyIcon className="size-3.5" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
    </div>
  )
}
