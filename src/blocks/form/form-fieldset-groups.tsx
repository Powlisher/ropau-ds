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
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function FormFieldsetGroups() {
  return (
    <div className="flex items-center justify-center bg-slate-50/80 px-4 py-16">
      <Card
        className="w-full max-w-lg"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <CardHeader>
          <CardTitle className="text-lg tracking-tight">
            Account setup
          </CardTitle>
          <CardDescription>
            Complete your profile in three sections
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <fieldset className="flex flex-col gap-4">
            <legend className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Personal information
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="ffg-first">First name</Label>
                <Input id="ffg-first" placeholder="Anders" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="ffg-last">Last name</Label>
                <Input id="ffg-last" placeholder="Bergqvist" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ffg-email">Email</Label>
              <Input
                id="ffg-email"
                type="email"
                placeholder="anders.b@nordicflow.se"
              />
            </div>
          </fieldset>

          <Separator />

          <fieldset className="flex flex-col gap-4">
            <legend className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Address
            </legend>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ffg-street">Street</Label>
              <Input id="ffg-street" placeholder="Drottninggatan 42" />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex flex-col gap-1.5 sm:col-span-1">
                <Label htmlFor="ffg-zip">Postal code</Label>
                <Input id="ffg-zip" placeholder="111 51" />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label htmlFor="ffg-city">City</Label>
                <Input id="ffg-city" placeholder="Stockholm" />
              </div>
            </div>
          </fieldset>

          <Separator />

          <fieldset className="flex flex-col gap-4">
            <legend className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Preferences
            </legend>
            <div className="flex flex-col gap-1.5">
              <Label>Timezone</Label>
              <Select defaultValue="cet">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cet">CET (UTC+1)</SelectItem>
                  <SelectItem value="eet">EET (UTC+2)</SelectItem>
                  <SelectItem value="gmt">GMT (UTC+0)</SelectItem>
                  <SelectItem value="est">EST (UTC-5)</SelectItem>
                  <SelectItem value="pst">PST (UTC-8)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-start gap-2">
              <Checkbox id="ffg-newsletter" className="mt-0.5" />
              <Label
                htmlFor="ffg-newsletter"
                className="text-sm font-normal leading-relaxed text-muted-foreground"
              >
                Subscribe to monthly product newsletter
              </Label>
            </div>
          </fieldset>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save profile</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
