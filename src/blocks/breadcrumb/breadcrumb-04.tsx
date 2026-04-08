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
  { label: "Dashboard", href: "#dashboard" },
  { label: "Analytics", href: "#analytics" },
  { label: "Retention Cohorts" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Breadcrumb04() {
  return (
    <div className="flex min-h-[120px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Breadcrumb>
        <BreadcrumbList>
          <motion.div
            className="flex flex-wrap items-center gap-1.5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {items.map((item, i) => (
              <motion.div key={item.label} className="inline-flex items-center gap-1.5" variants={itemVariants}>
                <BreadcrumbItem>
                  {i === items.length - 1 ? (
                    <BreadcrumbPage className="rounded-md bg-primary/10 px-2.5 py-1 font-medium text-primary">
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {i < items.length - 1 && <BreadcrumbSeparator />}
              </motion.div>
            ))}
          </motion.div>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
