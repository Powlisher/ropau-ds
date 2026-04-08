"use client"

import { useState } from "react"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"
import { ChevronRightIcon } from "lucide-react"

const items = [
  { label: "Platform", href: "#platform" },
  { label: "Identity", href: "#identity" },
  { label: "Access Control", href: "#access" },
  { label: "Role Policies", href: "#roles" },
  { label: "Editor Permissions" },
]

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function Breadcrumb07() {
  return (
    <div className="flex min-h-[120px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
      >
        <Breadcrumb>
          <BreadcrumbList>
            {/* Mobile: show only last 2 with ellipsis */}
            <div className="flex items-center gap-1.5 sm:hidden">
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="flex items-center rounded-md p-1 transition-colors hover:bg-muted"
                    aria-label="Show full path"
                  >
                    <BreadcrumbEllipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {items.slice(0, -2).map((item) => (
                      <DropdownMenuItem key={item.label} render={<a href={item.href} />}>
                        {item.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={items[items.length - 2].href}>
                  {items[items.length - 2].label}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium">
                  {items[items.length - 1].label}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </div>

            {/* Desktop: show all */}
            <div className="hidden items-center gap-1.5 sm:flex">
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
            </div>
          </BreadcrumbList>
        </Breadcrumb>
      </motion.div>
    </div>
  )
}
