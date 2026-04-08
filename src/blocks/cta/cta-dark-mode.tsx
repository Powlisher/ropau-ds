import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function CtaDarkMode() {
  return (
    <section className="mx-auto w-full max-w-2xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="relative overflow-hidden rounded-2xl px-8 py-12 text-center md:px-12 md:py-16"
        style={{
          background: "linear-gradient(145deg, oklch(0.18 0.015 55), oklch(0.14 0.01 55))",
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, oklch(0.65 0.25 3.6), transparent 50%), radial-gradient(circle at 70% 80%, oklch(0.55 0.29 25), transparent 50%)",
          }}
        />

        <div className="relative flex flex-col items-center gap-5">
          <h2
            className="font-heading text-3xl font-bold tracking-tight md:text-4xl"
            style={{
              background: "linear-gradient(135deg, oklch(0.97 0.01 55), oklch(0.78 0.03 55))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Ship with confidence,
            <br />
            iterate with speed
          </h2>
          <p className="max-w-md text-sm leading-relaxed" style={{ color: "oklch(0.65 0.01 55)" }}>
            From prototype to production in a single workflow. No context switching,
            no broken handoffs, no surprises at deploy time.
          </p>
          <motion.div whileHover={{ y: -2 }} transition={spring}>
            <Button
              variant="secondary"
              size="lg"
              className="mt-2"
            >
              Get started free
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
