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

const items = [
  { label: "acme-corp", href: "#acme" },
  { label: "repositories", href: "#repos" },
  { label: "design-system", href: "#ds" },
  { label: "src", href: "#src" },
  { label: "components" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Breadcrumb06() {
  return (
    <div className="flex min-h-[120px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Breadcrumb>
        <BreadcrumbList>
          <motion.div
            className="flex flex-wrap items-center gap-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {items.map((item, i) => (
              <motion.div key={item.label} className="inline-flex items-center gap-1" variants={itemVariants}>
                <BreadcrumbItem>
                  {i === items.length - 1 ? (
                    <BreadcrumbPage className="font-medium">{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href} className="font-mono text-[13px]">
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {i < items.length - 1 && (
                  <BreadcrumbSeparator>
                    <span className="text-muted-foreground/40 select-none">/</span>
                  </BreadcrumbSeparator>
                )}
              </motion.div>
            ))}
          </motion.div>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
