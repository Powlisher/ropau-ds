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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { motion } from "framer-motion"

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function Pagination02() {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState("25")
  const totalItems = 247
  const totalPages = Math.ceil(totalItems / Number(pageSize))

  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1)

  return (
    <div className="flex min-h-[140px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Rows per page</span>
          <Select
            value={pageSize}
            onValueChange={(v) => {
              if (v) setPageSize(v)
              setCurrent(1)
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
      </motion.div>
    </div>
  )
}
