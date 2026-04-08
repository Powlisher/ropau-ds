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
import { CalendarDaysIcon } from "lucide-react"

export default function FormDateRange() {
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
          <div className="flex items-center gap-2">
            <CalendarDaysIcon className="size-5 text-primary" />
            <CardTitle className="text-lg tracking-tight">
              Date range
            </CardTitle>
          </div>
          <CardDescription>
            Select a start and end date for your report
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="fdr-start">Start date</Label>
              <Input id="fdr-start" type="date" defaultValue="2026-03-01" className="tabular-nums" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="fdr-end">End date</Label>
              <Input id="fdr-end" type="date" defaultValue="2026-04-07" className="tabular-nums" />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { label: "Last 7 days", value: "7d" },
              { label: "Last 30 days", value: "30d" },
              { label: "This quarter", value: "quarter" },
              { label: "Year to date", value: "ytd" },
            ].map((preset) => (
              <Button
                key={preset.value}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                {preset.label}
              </Button>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-1">
            <Button variant="ghost">Reset</Button>
            <Button>Apply range</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
