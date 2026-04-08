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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const departments = [
  { value: "sales", label: "Sales", description: "Pricing, demos, and partnerships" },
  { value: "support", label: "Technical Support", description: "Bug reports and product help" },
  { value: "billing", label: "Billing", description: "Invoices, refunds, and plan changes" },
  { value: "other", label: "Other", description: "General questions" },
]

export default function ContactDepartmentSelect() {
  return (
    <div className="flex items-center justify-center bg-slate-50/80 px-4 py-16">
      <Card
        className="w-full max-w-md"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <CardHeader>
          <CardTitle className="text-lg tracking-tight">
            How can we help?
          </CardTitle>
          <CardDescription>
            Select the right department so we can route your message faster
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <Label>Department</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.value} value={dept.value}>
                    {dept.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cds-name">Name</Label>
              <Input id="cds-name" placeholder="Fatima Al-Rashid" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cds-email">Email</Label>
              <Input
                id="cds-email"
                type="email"
                placeholder="fatima@lunartech.ae"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cds-subject">Subject</Label>
            <Input id="cds-subject" placeholder="Enterprise pricing for 50+ seats" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cds-message">Message</Label>
            <Textarea
              id="cds-message"
              placeholder="Describe your inquiry in detail..."
              className="min-h-28"
            />
          </div>

          <Button className="w-full sm:w-auto sm:self-end">
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
