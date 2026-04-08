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
  { label: "Account", href: "#account", step: 1 },
  { label: "Preferences", href: "#prefs", step: 2 },
  { label: "Integrations", href: "#integrations", step: 3 },
  { label: "Review", step: 4 },
]

const currentStep = 3

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Breadcrumb10() {
  return (
    <div className="flex min-h-[140px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Breadcrumb>
        <BreadcrumbList>
          <motion.div
            className="flex flex-wrap items-center gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {items.map((item, i) => {
              const isCompleted = item.step < currentStep
              const isCurrent = item.step === currentStep
              const isUpcoming = item.step > currentStep

              return (
                <motion.div key={item.label} className="inline-flex items-center gap-3" variants={itemVariants}>
                  <BreadcrumbItem className="flex items-center gap-2">
                    <motion.div
                      className={`flex size-6 items-center justify-center rounded-full text-[11px] font-semibold tabular-nums ${
                        isCompleted
                          ? "bg-primary text-primary-foreground"
                          : isCurrent
                            ? "bg-primary/15 text-primary ring-2 ring-primary/30"
                            : "bg-muted text-muted-foreground"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                    >
                      {item.step}
                    </motion.div>
                    {isCurrent ? (
                      <BreadcrumbPage className="font-medium text-sm">{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href={item.href}
                        className={`text-sm ${isUpcoming ? "text-muted-foreground/50 pointer-events-none" : ""}`}
                      >
                        {item.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {i < items.length - 1 && (
                    <BreadcrumbSeparator>
                      <div className={`h-px w-6 ${isCompleted ? "bg-primary" : "bg-border"}`} />
                    </BreadcrumbSeparator>
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
