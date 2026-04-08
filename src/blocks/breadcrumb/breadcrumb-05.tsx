"use client"

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowLeftIcon } from "lucide-react"

const items = [
  { label: "Settings", href: "#settings" },
  { label: "Integrations", href: "#integrations" },
  { label: "Slack Configuration" },
]

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function Breadcrumb05() {
  return (
    <div className="flex min-h-[140px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="inline-flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-2.5"
        style={{
          boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <Button variant="ghost" size="icon" className="size-8 shrink-0" render={<a href="#back" aria-label="Go back" />}>
          <ArrowLeftIcon className="size-4" />
        </Button>
        <div className="h-5 w-px bg-border" />
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
      </motion.div>
    </div>
  )
}
