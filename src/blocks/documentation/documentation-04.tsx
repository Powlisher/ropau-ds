"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const props = [
  {
    name: "variant",
    type: '"default" | "outline" | "ghost" | "destructive"',
    default: '"default"',
    required: false,
    description: "Controls the visual style of the button.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg" | "icon"',
    default: '"md"',
    required: false,
    description: "Sets the padding and font size. Icon size renders as a square.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "When true, prevents interaction and reduces visual prominence.",
  },
  {
    name: "loading",
    type: "boolean",
    default: "false",
    required: false,
    description: "Shows a spinner and disables the button while an action is in progress.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description: "Merges props onto the child element instead of rendering a <button>.",
  },
  {
    name: "onClick",
    type: "(event: MouseEvent) => void",
    default: "—",
    required: false,
    description: "Handler called when the button is clicked.",
  },
  {
    name: "children",
    type: "ReactNode",
    default: "—",
    required: true,
    description: "The content rendered inside the button.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function Documentation04() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-3xl"
    >
      <motion.div variants={itemVariants} className="mb-6">
        <div className="flex items-center gap-3">
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            Button
          </h2>
          <Badge variant="outline" className="font-mono text-[10px] tabular-nums">
            v3.2.0
          </Badge>
        </div>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Triggers an action or event. Supports multiple variants, sizes, and loading states.
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="overflow-hidden rounded-xl ring-1 ring-foreground/10"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="whitespace-nowrap px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Prop
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Type
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Default
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Description
                </th>
              </tr>
            </thead>
            <motion.tbody
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {props.map((prop) => (
                <motion.tr
                  key={prop.name}
                  variants={itemVariants}
                  className="border-b border-foreground/5 last:border-0"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-xs font-medium text-foreground">
                        {prop.name}
                      </code>
                      {prop.required && (
                        <span
                          className="text-[10px] font-semibold"
                          style={{ color: "oklch(0.55 0.15 25)" }}
                        >
                          *
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] tabular-nums text-muted-foreground">
                      {prop.type}
                    </code>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs tabular-nums text-muted-foreground">
                    {prop.default}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {prop.description}
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  )
}
