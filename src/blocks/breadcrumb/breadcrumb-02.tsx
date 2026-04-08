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
import { HomeIcon, FolderIcon, LayersIcon, FileTextIcon } from "lucide-react"

const items = [
  { label: "Home", href: "#home", icon: HomeIcon },
  { label: "Marketing", href: "#marketing", icon: FolderIcon },
  { label: "Campaigns", href: "#campaigns", icon: LayersIcon },
  { label: "Summer Launch 2025", icon: FileTextIcon },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Breadcrumb02() {
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
            {items.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div key={item.label} className="inline-flex items-center gap-1.5" variants={itemVariants}>
                  <BreadcrumbItem>
                    {i === items.length - 1 ? (
                      <BreadcrumbPage className="inline-flex items-center gap-1.5 font-medium">
                        <Icon className="size-3.5" />
                        {item.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={item.href} className="inline-flex items-center gap-1.5">
                        <Icon className="size-3.5" />
                        {item.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {i < items.length - 1 && <BreadcrumbSeparator />}
                </motion.div>
              )
            })}
          </motion.div>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
