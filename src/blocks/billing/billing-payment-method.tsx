import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { CreditCardIcon, PlusIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

const premiumShadow =
  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const cards = [
  {
    brand: "Visa",
    last4: "4291",
    expiry: "08/28",
    isDefault: true,
  },
  {
    brand: "Mastercard",
    last4: "7853",
    expiry: "03/27",
    isDefault: false,
  },
]

export default function BillingPaymentMethod() {
  return (
    <Card className="w-full max-w-lg" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">Payment Method</CardTitle>
            <CardDescription>
              Manage the cards used for subscription and usage billing.
            </CardDescription>
          </motion.div>
          <CardAction>
            <motion.div variants={itemVariants}>
              <Button variant="outline" size="sm">
                <PlusIcon className="size-3.5" />
                Add card
              </Button>
            </motion.div>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {cards.map((card) => (
            <motion.div
              key={card.last4}
              variants={itemVariants}
              whileHover={{ y: -1 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              className="flex items-center justify-between rounded-xl border px-4 py-3.5"
              style={{
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-muted/70">
                  <CreditCardIcon className="size-5 text-muted-foreground" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">
                      {card.brand}
                    </span>
                    <span className="font-mono text-sm tabular-nums text-muted-foreground">
                      **** {card.last4}
                    </span>
                    {card.isDefault && (
                      <Badge variant="secondary" className="text-[10px]">
                        Default
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    Expires {card.expiry}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <Button variant="ghost" size="xs">
                  Edit
                </Button>
                <Button variant="ghost" size="xs" className="text-destructive hover:text-destructive">
                  Remove
                </Button>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </motion.div>
    </Card>
  )
}
