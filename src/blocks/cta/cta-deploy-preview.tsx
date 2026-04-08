import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const codeLines = [
  { prefix: "$", text: "npx create-app my-project" },
  { prefix: "", text: "  Creating project structure..." },
  { prefix: "", text: "  Installing dependencies..." },
  { prefix: "", text: '  Done in 4.2s' },
  { prefix: "$", text: "npx deploy --prod" },
  { prefix: "", text: "  Building optimized bundle..." },
  { prefix: "", text: "  Deployed to https://my-project.app" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const lineVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function CtaDeployPreview() {
  return (
    <section className="mx-auto w-full max-w-xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="flex flex-col gap-6"
      >
        <div
          className="overflow-hidden rounded-xl ring-1 ring-foreground/10"
          style={{
            background: "oklch(0.16 0.01 55)",
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)",
          }}
        >
          <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-2.5">
            <div className="size-2.5 rounded-full bg-white/10" />
            <div className="size-2.5 rounded-full bg-white/10" />
            <div className="size-2.5 rounded-full bg-white/10" />
            <span className="ml-2 font-mono text-[10px] tracking-wide text-white/30">
              terminal
            </span>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="px-4 py-4"
          >
            {codeLines.map((line, i) => (
              <motion.div
                key={i}
                variants={lineVariants}
                className="font-mono text-xs leading-6"
              >
                {line.prefix ? (
                  <>
                    <span style={{ color: "oklch(0.68 0.18 3.6)" }}>{line.prefix}</span>
                    <span style={{ color: "oklch(0.85 0.02 55)" }}> {line.text}</span>
                  </>
                ) : (
                  <span style={{ color: "oklch(0.55 0.01 55)" }}>{line.text}</span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-muted-foreground">
            Two commands. Zero config. Production in under 30 seconds.
          </p>
          <motion.div whileHover={{ y: -2 }} transition={spring}>
            <Button size="lg">Deploy now</Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
