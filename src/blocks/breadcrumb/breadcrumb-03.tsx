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

const allItems = [
  { label: "Organization", href: "#org" },
  { label: "Engineering", href: "#engineering" },
  { label: "Frontend", href: "#frontend" },
  { label: "Components", href: "#components" },
  { label: "Design System", href: "#ds" },
  { label: "Token Reference" },
]

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function Breadcrumb03() {
  const [expanded, setExpanded] = useState(false)

  const first = allItems[0]
  const last = allItems[allItems.length - 1]
  const secondToLast = allItems[allItems.length - 2]
  const collapsed = allItems.slice(1, allItems.length - 2)

  const visibleItems = expanded ? allItems : [first]

  return (
    <div className="flex min-h-[120px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Breadcrumb>
        <BreadcrumbList>
          <motion.div
            className="flex flex-wrap items-center gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={spring}
          >
            {expanded ? (
              allItems.map((item, i) => (
                <div key={item.label} className="inline-flex items-center gap-1.5">
                  <BreadcrumbItem>
                    {i === allItems.length - 1 ? (
                      <BreadcrumbPage className="font-medium">{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {i < allItems.length - 1 && <BreadcrumbSeparator />}
                </div>
              ))
            ) : (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href={first.href}>{first.label}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className="flex items-center gap-1 rounded-md p-1 transition-colors hover:bg-muted"
                      aria-label="Show hidden path"
                    >
                      <BreadcrumbEllipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {collapsed.map((item) => (
                        <DropdownMenuItem key={item.label} render={<a href={item.href} />}>
                          {item.label}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuItem onClick={() => setExpanded(true)}>
                        Show full path
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbItem>
                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbLink href={secondToLast.href}>{secondToLast.label}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbPage className="font-medium">{last.label}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </motion.div>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
