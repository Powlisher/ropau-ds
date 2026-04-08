"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function CheckoutExpress() {
  return (
    <section className="mx-auto w-full max-w-md px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-6"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Express Checkout
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pay quickly or use the standard form below.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.06 }}
        className="space-y-5"
      >
        <Card
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <CardContent className="space-y-3">
            <motion.div whileHover={{ y: -1 }} transition={spring}>
              <Button
                variant="secondary"
                className="w-full gap-2 bg-foreground text-background hover:bg-foreground/90"
                size="lg"
              >
                <svg viewBox="0 0 24 24" className="size-5 fill-current"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.32-2.12 4.56-3.74 4.25z"/></svg>
                Apple Pay
              </Button>
            </motion.div>
            <motion.div whileHover={{ y: -1 }} transition={spring}>
              <Button
                variant="secondary"
                className="w-full gap-2"
                size="lg"
              >
                <svg viewBox="0 0 24 24" className="size-5"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Google Pay
              </Button>
            </motion.div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">or</span>
          <Separator className="flex-1" />
        </div>

        <Card
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <CardHeader>
            <CardTitle>Card Payment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="clara@example.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="card">Card number</Label>
              <Input id="card" placeholder="4242 4242 4242 4242" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="exp">Expiration</Label>
                <Input id="exp" placeholder="MM / YY" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>
            <motion.div whileHover={{ y: -1 }} transition={spring} className="pt-1">
              <Button className="w-full" size="lg">
                Pay $313.00
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
