"use client"

import { useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

const totalPages = 42

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function Pagination07() {
  const [current, setCurrent] = useState(7)
  const [jumpValue, setJumpValue] = useState("")

  function handleJump(e: React.FormEvent) {
    e.preventDefault()
    const page = parseInt(jumpValue, 10)
    if (page >= 1 && page <= totalPages) {
      setCurrent(page)
      setJumpValue("")
    }
  }

  const pages = [1, current - 1, current, current + 1, totalPages].filter(
    (p, i, arr) => p >= 1 && p <= totalPages && arr.indexOf(p) === i
  )

  return (
    <div className="flex min-h-[140px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
      >
        <Pagination className="w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => { e.preventDefault(); setCurrent((p) => Math.max(1, p - 1)) }}
              />
            </PaginationItem>
            {pages.map((page, i) => {
              const prevPage = pages[i - 1]
              const showGap = prevPage !== undefined && page - prevPage > 1
              return (
                <span key={page} className="inline-flex items-center gap-0.5">
                  {showGap && (
                    <PaginationItem>
                      <span className="flex size-8 items-center justify-center text-muted-foreground">...</span>
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      isActive={page === current}
                      onClick={(e) => { e.preventDefault(); setCurrent(page) }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                </span>
              )
            })}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => { e.preventDefault(); setCurrent((p) => Math.min(totalPages, p + 1)) }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <form onSubmit={handleJump} className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Go to</span>
          <Input
            type="number"
            min={1}
            max={totalPages}
            value={jumpValue}
            onChange={(e) => setJumpValue(e.target.value)}
            placeholder={String(current)}
            className="h-8 w-16 tabular-nums"
          />
        </form>
      </motion.div>
    </div>
  )
}
