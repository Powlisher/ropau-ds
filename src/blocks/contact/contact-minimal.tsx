import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function ContactMinimal() {
  return (
    <div className="flex min-h-[500px] items-center justify-center bg-slate-50/80 px-4 py-16">
      <Card
        className="w-full max-w-sm"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <CardHeader className="text-center">
          <CardTitle className="text-lg tracking-tight">
            Drop us a line
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cmin-email">Email</Label>
            <Input
              id="cmin-email"
              type="email"
              placeholder="kenji.mori@basaltstudio.jp"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cmin-message">Message</Label>
            <Textarea
              id="cmin-message"
              placeholder="What can we help with?"
              className="min-h-32"
            />
          </div>
          <Button className="w-full">Send</Button>
        </CardContent>
      </Card>
    </div>
  )
}
