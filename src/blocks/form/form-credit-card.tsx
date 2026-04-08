"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCardIcon, LockIcon } from "lucide-react"
import { motion } from "framer-motion"

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

export default function FormCreditCard() {
  return (
    <div className="flex items-center justify-center bg-slate-50/80 px-4 py-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <Card
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <CardHeader>
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2">
                <CreditCardIcon className="size-5 text-primary" />
                <CardTitle className="text-lg tracking-tight">
                  Payment details
                </CardTitle>
              </div>
              <CardDescription>
                Your card will be charged $247.80 USD
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
              <Label htmlFor="fcc-number">Card number</Label>
              <Input
                id="fcc-number"
                placeholder="4242 4242 4242 4242"
                className="tabular-nums"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="fcc-expiry">Expiry date</Label>
                <Input
                  id="fcc-expiry"
                  placeholder="MM / YY"
                  className="tabular-nums"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="fcc-cvc">CVC</Label>
                <Input
                  id="fcc-cvc"
                  placeholder="123"
                  className="tabular-nums"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
              <Label htmlFor="fcc-name">Cardholder name</Label>
              <Input id="fcc-name" placeholder="Mateo Ruiz-Gaviria" />
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-2">
              <Checkbox id="fcc-save" />
              <Label
                htmlFor="fcc-save"
                className="text-sm font-normal text-muted-foreground"
              >
                Save card for future purchases
              </Label>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button className="w-full">
                <LockIcon className="size-3.5" />
                Pay $247.80
              </Button>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="flex items-center justify-center gap-1 text-xs text-muted-foreground"
            >
              <LockIcon className="size-3" />
              Encrypted and secured by Stripe
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
