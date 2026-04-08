import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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

export default function FormCompactDense() {
  return (
    <div className="flex items-center justify-center bg-slate-50/80 px-4 py-16">
      <Card
        className="w-full max-w-lg"
        size="sm"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
        }}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-sm tracking-tight">
            Quick entry
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="flex flex-col gap-1">
              <Label className="text-xs" htmlFor="fcd-first">
                First name
              </Label>
              <Input
                id="fcd-first"
                placeholder="Mika"
                className="h-7 text-xs"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs" htmlFor="fcd-last">
                Last name
              </Label>
              <Input
                id="fcd-last"
                placeholder="Virtanen"
                className="h-7 text-xs"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs" htmlFor="fcd-phone">
                Phone
              </Label>
              <Input
                id="fcd-phone"
                placeholder="+358 40 123 456"
                className="h-7 text-xs"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <Label className="text-xs" htmlFor="fcd-email">
                Email
              </Label>
              <Input
                id="fcd-email"
                type="email"
                placeholder="mika.v@arcticdata.fi"
                className="h-7 text-xs"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs">Role</Label>
              <Select>
                <SelectTrigger className="h-7 w-full text-xs" size="sm">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="billing">Billing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="flex flex-col gap-1">
              <Label className="text-xs" htmlFor="fcd-company">
                Company
              </Label>
              <Input
                id="fcd-company"
                placeholder="Arctic Data Oy"
                className="h-7 text-xs"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs" htmlFor="fcd-dept">
                Department
              </Label>
              <Input
                id="fcd-dept"
                placeholder="Engineering"
                className="h-7 text-xs"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs" htmlFor="fcd-location">
                Location
              </Label>
              <Input
                id="fcd-location"
                placeholder="Helsinki"
                className="h-7 text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <Button variant="ghost" size="sm" className="text-xs">
              Cancel
            </Button>
            <Button size="sm" className="text-xs">
              Add entry
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
