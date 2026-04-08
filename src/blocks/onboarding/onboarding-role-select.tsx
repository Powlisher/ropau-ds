"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CodeIcon, PaletteIcon, BarChart3Icon, PenToolIcon, ShieldIcon, MegaphoneIcon } from "lucide-react"

const roles = [
  { id: "developer", label: "Developer", description: "Build and ship features", icon: CodeIcon },
  { id: "designer", label: "Designer", description: "Craft interfaces and experiences", icon: PaletteIcon },
  { id: "pm", label: "Product Manager", description: "Define roadmaps and priorities", icon: BarChart3Icon },
  { id: "writer", label: "Content Writer", description: "Write copy and documentation", icon: PenToolIcon },
  { id: "ops", label: "Operations", description: "Manage infrastructure and processes", icon: ShieldIcon },
  { id: "marketing", label: "Marketing", description: "Drive growth and campaigns", icon: MegaphoneIcon },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function OnboardingRoleSelect() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="flex min-h-[540px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <div className="flex w-full max-w-xl flex-col items-center gap-8">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            What describes you best?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We&apos;ll tailor your workspace based on your role
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3"
        >
          {roles.map((role) => {
            const active = selected === role.id
            const Icon = role.icon
            return (
              <motion.div key={role.id} variants={itemVariants}>
                <Card
                  className={`cursor-pointer transition-all ${
                    active
                      ? "ring-2 ring-primary bg-primary/[0.03]"
                      : "hover:ring-1 hover:ring-foreground/15"
                  }`}
                  onClick={() => setSelected(role.id)}
                >
                  <CardContent className="flex flex-col items-center gap-2 py-5 text-center">
                    <motion.div
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                      className={`flex size-10 items-center justify-center rounded-lg transition-colors ${
                        active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="size-5" />
                    </motion.div>
                    <p className="text-sm font-medium text-foreground">{role.label}</p>
                    <p className="text-xs text-muted-foreground leading-snug">{role.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        <Button disabled={!selected} className="w-full max-w-xs">
          Continue
        </Button>
      </div>
    </div>
  )
}
