"use client"

import { motion } from "framer-motion"

const logos = [
  { name: "Riviera Studio", abbr: "RS" },
  { name: "Norden Labs", abbr: "NL" },
  { name: "Atelier Vigne", abbr: "AV" },
  { name: "Pico Coffee", abbr: "PC" },
  { name: "Kinto Ceramics", abbr: "KC" },
  { name: "Solara Energy", abbr: "SE" },
  { name: "Prism Health", abbr: "PH" },
  { name: "Luminos", abbr: "LM" },
]

const doubled = [...logos, ...logos]

export default function CarouselLogo() {
  return (
    <section className="w-full py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-8 px-6 text-center"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Trusted By
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Leading brands trust our products.
        </p>
      </motion.div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <motion.div
          className="flex gap-12"
          animate={{ x: [0, -(logos.length * 160)] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {doubled.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex shrink-0 items-center gap-3"
              style={{ width: 148 }}
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted ring-1 ring-foreground/10">
                <span className="font-heading text-xs font-bold tracking-wide text-muted-foreground">
                  {logo.abbr}
                </span>
              </div>
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                {logo.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
