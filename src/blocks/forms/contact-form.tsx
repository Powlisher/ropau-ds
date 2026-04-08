"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ContactForm() {
  return (
    <div className="flex items-center justify-center px-4 py-16">
      <Card
        className="w-full max-w-lg"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <CardHeader>
          <CardTitle>Get in touch</CardTitle>
          <CardDescription>
            Fill out the form and our team will get back to you within 24 hours.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-name">Name</Label>
              <Input id="contact-name" placeholder="Priya Khatri" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="priya@luminary.co"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Subject</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Sales inquiry</SelectItem>
                <SelectItem value="support">Technical support</SelectItem>
                <SelectItem value="billing">Billing question</SelectItem>
                <SelectItem value="partnership">Partnership</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              placeholder="Tell us how we can help..."
              className="min-h-28"
            />
          </div>

          <Button className="w-full sm:w-auto sm:self-end">
            Send message
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
