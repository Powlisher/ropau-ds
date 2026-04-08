import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function CtaDownloadApp() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-20">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
          className="flex flex-col gap-6"
        >
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Your workspace,
            <br />
            wherever you are
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Capture ideas on the train, review pull requests between meetings, and
            ship from anywhere. Available on iOS 17+ and Android 14+.
          </p>
          <div className="flex gap-3">
            <motion.div whileHover={{ y: -2 }} transition={spring}>
              <Button variant="outline" size="lg" className="gap-2 px-5">
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </Button>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={spring}>
              <Button variant="outline" size="lg" className="gap-2 px-5">
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.38l2.473 1.431c.451.261.451.917 0 1.178L17.7 15.367l-2.508-2.508 2.508-2.532zM5.864 2.658L16.8 9.284l-2.302 2.303-8.634-8.93z" />
                </svg>
                Google Play
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" as const, stiffness: 260, damping: 22, delay: 0.1 }}
          className="relative mx-auto flex aspect-[9/16] w-full max-w-[220px] items-center justify-center overflow-hidden rounded-[2rem] bg-muted ring-1 ring-foreground/10"
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)",
          }}
        >
          <div className="flex flex-col items-center gap-3 p-6">
            <div className="h-3 w-16 rounded-full bg-foreground/5" />
            <div className="h-3 w-24 rounded-full bg-foreground/5" />
            <div className="mt-6 grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="size-8 rounded-lg bg-foreground/5"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
