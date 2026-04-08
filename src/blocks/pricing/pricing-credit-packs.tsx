import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}
const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const packs = [
  {
    name: "Starter Pack",
    credits: "1,000",
    price: 19,
    perCredit: "0.019",
    description: "Perfect for testing or small batch jobs",
    highlighted: false,
    discount: null,
  },
  {
    name: "Growth Pack",
    credits: "10,000",
    price: 149,
    perCredit: "0.015",
    description: "Most popular for production workloads",
    highlighted: true,
    discount: "21% off",
  },
  {
    name: "Scale Pack",
    credits: "100,000",
    price: 990,
    perCredit: "0.0099",
    description: "High-volume teams and enterprise pipelines",
    highlighted: false,
    discount: "48% off",
  },
]

export default function PricingCreditPacks() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="mb-10 text-center"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Pay per credit, scale as you grow
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Buy credits in packs. Larger packs unlock deeper volume discounts.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-5 md:grid-cols-3"
      >
        {packs.map((pack) => (
          <motion.div key={pack.name} variants={itemVariants}>
            <Card
              className={`h-full ${pack.highlighted ? "ring-2 ring-primary/30" : ""}`}
              style={{
                boxShadow: pack.highlighted
                  ? "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04)"
                  : "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
              }}
            >
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle>{pack.name}</CardTitle>
                  {pack.discount && (
                    <Badge variant="secondary" className="text-[10px] tabular-nums">
                      {pack.discount}
                    </Badge>
                  )}
                </div>
                <CardDescription>{pack.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-3xl font-bold tabular-nums tracking-tight text-foreground">
                    {pack.credits}
                  </span>
                  <span className="text-sm text-muted-foreground">credits</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-heading text-2xl font-semibold tabular-nums tracking-tight text-foreground">
                    ${pack.price}
                  </span>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    ${pack.perCredit}/credit
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <motion.div whileHover={{ y: -1 }} transition={spring} className="w-full">
                  <Button
                    variant={pack.highlighted ? "default" : "outline"}
                    className="w-full"
                  >
                    Buy {pack.credits} credits
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
