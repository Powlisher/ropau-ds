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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function FormAddress() {
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
            Shipping address
          </CardTitle>
          <CardDescription>
            Enter the delivery address for your order
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="fa-street">Street address</Label>
            <Input id="fa-street" placeholder="1847 Kensington Ave" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="fa-apt">Apartment, suite, etc.</Label>
            <Input id="fa-apt" placeholder="Apt 3B" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="fa-city">City</Label>
              <Input id="fa-city" placeholder="Portland" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>State / Province</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="or">Oregon</SelectItem>
                  <SelectItem value="wa">Washington</SelectItem>
                  <SelectItem value="ca">California</SelectItem>
                  <SelectItem value="ny">New York</SelectItem>
                  <SelectItem value="tx">Texas</SelectItem>
                  <SelectItem value="il">Illinois</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="fa-zip">ZIP / Postal code</Label>
              <Input id="fa-zip" placeholder="97204" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Country</Label>
              <Select defaultValue="us">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="gb">United Kingdom</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <Button>Save address</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
