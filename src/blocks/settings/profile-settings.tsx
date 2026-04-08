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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function ProfileSettings() {
  return (
    <Card
      className="w-full max-w-2xl"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Manage your personal information and public profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex items-center gap-5">
          <Avatar size="lg">
            <AvatarFallback>CB</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <Button variant="outline" size="sm">
              Upload photo
            </Button>
            <p className="text-xs text-muted-foreground">
              JPG, PNG or WebP. Max 2 MB.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="profile-name">Full name</Label>
            <Input id="profile-name" defaultValue="Camille Bernstein" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="profile-email">Email</Label>
            <Input
              id="profile-email"
              type="email"
              defaultValue="camille@tidepool.io"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="profile-bio">Bio</Label>
          <Textarea
            id="profile-bio"
            placeholder="A few words about yourself..."
            defaultValue="Staff Engineer at Tidepool. Focused on developer experience and CI/CD infrastructure."
          />
        </div>

        <div className="flex justify-end">
          <Button>Save changes</Button>
        </div>
      </CardContent>
    </Card>
  )
}
