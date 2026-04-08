"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, HomeIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Error404() {
  return (
    <div className="flex min-h-[540px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-6 text-center"
      >
        <motion.p
          variants={itemVariants}
          className="font-heading text-8xl font-bold tracking-tighter text-foreground/10 select-none md:text-9xl"
        >
          404
        </motion.p>

        <motion.div variants={itemVariants}>
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            Page not found
          </h1>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Check the URL or navigate back.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex gap-2">
          <Button variant="outline" className="gap-1.5">
            <ArrowLeftIcon data-icon="inline-start" className="size-4" />
            Go Back
          </Button>
          <Button className="gap-1.5">
            <HomeIcon data-icon="inline-start" className="size-4" />
            Home
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
