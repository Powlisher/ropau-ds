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
import { motion } from "framer-motion"

const totalItems = 347
const pageSize = 25
const totalPages = Math.ceil(totalItems / pageSize)

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function Pagination05() {
  const [current, setCurrent] = useState(3)

  const start = (current - 1) * pageSize + 1
  const end = Math.min(current * pageSize, totalItems)

  function getVisiblePages() {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)
    if (current <= 3) return [1, 2, 3, null, totalPages]
    if (current >= totalPages - 2) return [1, null, totalPages - 2, totalPages - 1, totalPages]
    return [1, null, current, null, totalPages]
  }

  return (
    <div className="flex min-h-[140px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-8"
      >
        <p className="text-sm text-muted-foreground whitespace-nowrap">
          Showing{" "}
          <span className="font-medium tabular-nums text-foreground">{start}</span>
          {" - "}
          <span className="font-medium tabular-nums text-foreground">{end}</span>
          {" of "}
          <span className="font-medium tabular-nums text-foreground">{totalItems}</span>
          {" results"}
        </p>

        <Pagination className="w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
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
                onClick={(e) => { e.preventDefault(); setCurrent((p) => Math.min(totalPages, p + 1)) }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </motion.div>
    </div>
  )
}
