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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

export default function DialogForm() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Dialog>
        <DialogTrigger render={<Button />}>
          Create workspace
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>New workspace</DialogTitle>
            <DialogDescription>
              Set up a workspace for your team. You can invite members after creation.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Workspace name</label>
              <Input placeholder="e.g. Ropau Design" defaultValue="Meridian Studio" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Industry</label>
              <Select defaultValue="saas">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saas">SaaS / Software</SelectItem>
                  <SelectItem value="agency">Agency / Consulting</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="fintech">Fintech</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Team size</label>
              <Select defaultValue="small">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solo">Just me</SelectItem>
                  <SelectItem value="small">2 - 10 people</SelectItem>
                  <SelectItem value="medium">11 - 50 people</SelectItem>
                  <SelectItem value="large">51 - 200 people</SelectItem>
                  <SelectItem value="enterprise">200+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              Cancel
            </DialogClose>
            <Button>Create workspace</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
