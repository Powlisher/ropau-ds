"use client"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CreditCardIcon, LockIcon } from "lucide-react"

export default function DialogPayment() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Dialog>
        <DialogTrigger render={<Button />}>
          Upgrade plan
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upgrade to Pro</DialogTitle>
            <DialogDescription>Unlock unlimited projects, advanced analytics, and priority support.</DialogDescription>
          </DialogHeader>

          <div
            className="rounded-xl bg-muted/50 p-4 ring-1 ring-foreground/5"
            style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading text-sm font-semibold tracking-tight">Pro Plan</span>
                  <Badge variant="secondary">Annual</Badge>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">Billed annually, cancel anytime</p>
              </div>
              <div className="text-right">
                <p className="font-heading text-xl font-bold tracking-tight">$29</p>
                <p className="text-xs tabular-nums text-muted-foreground">/month</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Cardholder name</label>
              <Input defaultValue="Margaux Delacroix" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Card number</label>
              <div className="relative">
                <Input placeholder="4242 4242 4242 4242" className="pr-10 font-mono tabular-nums" />
                <CreditCardIcon className="absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Expiry</label>
                <Input placeholder="MM / YY" className="font-mono tabular-nums" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">CVC</label>
                <Input placeholder="123" className="font-mono tabular-nums" />
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total today</span>
            <span className="font-heading text-lg font-bold tabular-nums tracking-tight">$348.00</span>
          </div>

          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
            <Button className="gap-1.5">
              <LockIcon className="size-3.5" />
              Pay $348.00
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
