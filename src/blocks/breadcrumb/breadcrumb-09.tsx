"use client"

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { motion } from "framer-motion"
import { FolderIcon, FolderOpenIcon, FileCodeIcon } from "lucide-react"

const items = [
  { label: "ropau-platform", href: "#root", type: "folder" as const },
  { label: "packages", href: "#packages", type: "folder" as const },
  { label: "ui", href: "#ui", type: "folder" as const },
  { label: "src", href: "#src", type: "folder" as const },
  { label: "button.tsx", type: "file" as const },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Breadcrumb09() {
  return (
    <div className="flex min-h-[120px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <motion.div
        className="inline-flex rounded-lg border border-border bg-card px-3 py-2"
        style={{
          boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Breadcrumb>
          <BreadcrumbList>
            <motion.div
              className="flex flex-wrap items-center gap-1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {items.map((item, i) => {
                const isLast = i === items.length - 1
                const Icon = item.type === "file"
                  ? FileCodeIcon
                  : isLast
                    ? FolderOpenIcon
                    : FolderIcon

                return (
                  <motion.div key={item.label} className="inline-flex items-center gap-1" variants={itemVariants}>
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage className="inline-flex items-center gap-1.5 font-mono text-[13px] font-medium">
                          <Icon className="size-3.5 text-primary" />
                          {item.label}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={item.href} className="inline-flex items-center gap-1.5 font-mono text-[13px]">
                          <Icon className="size-3.5 text-muted-foreground/60" />
                          {item.label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && (
                      <BreadcrumbSeparator>
                        <span className="text-muted-foreground/30 select-none">/</span>
                      </BreadcrumbSeparator>
                    )}
                  </motion.div>
                )
              })}
            </motion.div>
          </BreadcrumbList>
        </Breadcrumb>
      </motion.div>
    </div>
  )
}
