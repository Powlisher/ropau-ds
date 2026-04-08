"use client"

import { useState, useEffect } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"
import { Kbd } from "@/components/ui/kbd"
import { motion } from "framer-motion"

const totalPages = 9

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function Pagination09() {
  const [current, setCurrent] = useState(4)

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" || e.key === "j") {
        setCurrent((p) => Math.max(1, p - 1))
      } else if (e.key === "ArrowRight" || e.key === "k") {
        setCurrent((p) => Math.min(totalPages, p + 1))
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex min-h-[160px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="flex flex-col items-center gap-4"
      >
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => { e.preventDefault(); setCurrent((p) => Math.max(1, p - 1)) }}
              />
            </PaginationItem>
            {pages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === current}
                  onClick={(e) => { e.preventDefault(); setCurrent(page) }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => { e.preventDefault(); setCurrent((p) => Math.min(totalPages, p + 1)) }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Kbd>&#8592;</Kbd>
            <span>Previous</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Kbd>&#8594;</Kbd>
            <span>Next</span>
          </span>
        </div>
      </motion.div>
    </div>
  )
}
