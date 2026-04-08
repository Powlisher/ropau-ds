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

const totalPages = 12

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function Pagination01() {
  const [current, setCurrent] = useState(4)

  function getVisiblePages() {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    if (current <= 3) return [1, 2, 3, 4, 5, null, totalPages]
    if (current >= totalPages - 2) return [1, null, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    return [1, null, current - 1, current, current + 1, null, totalPages]
  }

  return (
    <div className="flex min-h-[120px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
      >
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => { e.preventDefault(); setCurrent((p) => Math.max(1, p - 1)) }}
              />
            </PaginationItem>

            {getVisiblePages().map((page, i) =>
              page === null ? (
                <PaginationItem key={`ellipsis-${i}`}>
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
