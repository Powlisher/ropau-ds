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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { UserPlusIcon } from "lucide-react"

export default function Drawer04() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button>
            <UserPlusIcon data-icon="inline-start" />
            Add contact
          </Button>
        </DrawerTrigger>
        <DrawerContent className="sm:max-w-md">
          <DrawerHeader>
            <DrawerTitle>New contact</DrawerTitle>
            <DrawerDescription>
              Add a new contact to your workspace directory.
            </DrawerDescription>
          </DrawerHeader>
          <Separator />
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="contact-first">First name</Label>
                <Input id="contact-first" placeholder="Isabelle" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="contact-last">Last name</Label>
                <Input id="contact-last" placeholder="Moreau" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="isabelle.m@company.com"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-phone">Phone</Label>
              <Input
                id="contact-phone"
                type="tel"
                placeholder="+33 6 12 34 56 78"
                className="font-mono tabular-nums"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-company">Company</Label>
              <Input id="contact-company" placeholder="Atelier Lumiere" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Relationship</Label>
              <Select defaultValue="client">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="partner">Partner</SelectItem>
                  <SelectItem value="vendor">Vendor</SelectItem>
                  <SelectItem value="prospect">Prospect</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-notes">Notes</Label>
              <Textarea
                id="contact-notes"
                placeholder="Any relevant context about this contact..."
                className="min-h-20"
              />
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DrawerClose>
            <Button className="w-full">Save contact</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
