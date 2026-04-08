"use client"

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ShoppingCartIcon, MinusIcon, PlusIcon, Trash2Icon } from "lucide-react"

const cartItems = [
  {
    name: "Meridian Pro License",
    variant: "Team / Annual",
    price: 348,
    qty: 1,
    img: "MP",
  },
  {
    name: "Custom Domain Setup",
    variant: "One-time",
    price: 29,
    qty: 1,
    img: "CD",
  },
  {
    name: "Priority Support Add-on",
    variant: "Monthly",
    price: 19,
    qty: 3,
    img: "PS",
  },
]

export default function Drawer06() {
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0)
  const tax = Math.round(subtotal * 0.2 * 100) / 100

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="outline" className="relative">
            <ShoppingCartIcon data-icon="inline-start" />
            Cart
            <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-mono tabular-nums font-bold text-primary-foreground">
              3
            </span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="sm:max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Your cart</DrawerTitle>
            <DrawerDescription>
              3 items &mdash; review before checkout
            </DrawerDescription>
          </DrawerHeader>
          <Separator />
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-3">
            {cartItems.map((item) => (
              <div
                key={item.name}
                className="flex gap-3 rounded-lg border p-3"
                style={{
                  boxShadow:
                    "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                }}
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-bold text-muted-foreground">
                  {item.img}
                </div>
                <div className="flex flex-1 flex-col gap-1.5">
                  <div>
                    <p className="text-sm font-medium leading-tight">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.variant}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Button variant="outline" size="icon-xs">
                        <MinusIcon />
                      </Button>
                      <span className="w-6 text-center text-sm font-mono tabular-nums font-medium">
                        {item.qty}
                      </span>
                      <Button variant="outline" size="icon-xs">
                        <PlusIcon />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium font-mono tabular-nums">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2Icon />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Separator />
          <div className="flex flex-col gap-2 px-4 py-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-mono tabular-nums font-medium">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Tax (20%)</span>
              <span className="font-mono tabular-nums font-medium">
                ${tax.toFixed(2)}
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="font-heading text-sm font-medium">Total</span>
              <span className="font-heading text-base font-semibold font-mono tabular-nums">
                ${(subtotal + tax).toFixed(2)}
              </span>
            </div>
          </div>
          <DrawerFooter>
            <Button className="w-full">Proceed to checkout</Button>
            <DrawerClose asChild>
              <Button variant="ghost" className="w-full">
                Continue shopping
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
