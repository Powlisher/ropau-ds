"use client"

import { useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

const totalItems = 156
const pageSize = 5
const totalPages = Math.ceil(totalItems / pageSize)

const mockRows = [
  { name: "Elara Fontaine", role: "Lead Designer", joined: "Jan 2024" },
  { name: "Marcus Alvarez", role: "Backend Engineer", joined: "Mar 2023" },
  { name: "Priya Shankar", role: "Product Manager", joined: "Sep 2023" },
  { name: "Tobias Lindqvist", role: "DevOps", joined: "Nov 2022" },
  { name: "Amara Osei", role: "Frontend Engineer", joined: "Jun 2024" },
]

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Pagination10() {
  const [current, setCurrent] = useState(3)

  const start = (current - 1) * pageSize + 1
  const end = Math.min(current * pageSize, totalItems)

  function getVisiblePages() {
    if (current <= 3) return [1, 2, 3, null, totalPages]
    if (current >= totalPages - 2) return [1, null, totalPages - 2, totalPages - 1, totalPages]
    return [1, null, current, null, totalPages]
  }

  return (
    <div className="flex min-h-[440px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Card className="w-full max-w-lg overflow-hidden">
        <CardContent className="p-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="divide-y divide-border"
            >
              {mockRows.map((row) => (
                <motion.div
                  key={row.name}
                  variants={rowVariants}
                  className="flex items-center justify-between px-5 py-3.5"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-foreground">{row.name}</span>
                    <span className="text-xs text-muted-foreground">{row.role}</span>
                  </div>
                  <span className="text-xs tabular-nums text-muted-foreground tracking-wide">{row.joined}</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t border-border px-5 py-3">
          <span className="text-xs text-muted-foreground">
            <span className="tabular-nums font-medium text-foreground">{start}-{end}</span> of <span className="tabular-nums font-medium text-foreground">{totalItems}</span>
          </span>

          <Pagination className="w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  text=""
                  onClick={(e) => { e.preventDefault(); setCurrent((p) => Math.max(1, p - 1)) }}
                />
              </PaginationItem>

              {getVisiblePages().map((page, i) =>
                page === null ? (
                  <PaginationItem key={`e-${i}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={page === current}
                      onClick={(e) => { e.preventDefault(); setCurrent(page) }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  text=""
                  onClick={(e) => { e.preventDefault(); setCurrent((p) => Math.min(totalPages, p + 1)) }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
    </div>
  )
}
