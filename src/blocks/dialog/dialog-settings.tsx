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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { SettingsIcon } from "lucide-react"

export default function DialogSettings() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          <SettingsIcon data-icon="inline-start" />
          Settings
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Workspace settings</DialogTitle>
            <DialogDescription>Manage your workspace preferences and configuration.</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="general">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="mt-4 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Workspace name</label>
                <Input defaultValue="Meridian Studio" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Workspace URL</label>
                <Input defaultValue="meridian-studio" className="font-mono text-sm" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Timezone</label>
                <Select defaultValue="europe-paris">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us-eastern">US Eastern (UTC-5)</SelectItem>
                    <SelectItem value="us-pacific">US Pacific (UTC-8)</SelectItem>
                    <SelectItem value="europe-london">London (UTC+0)</SelectItem>
                    <SelectItem value="europe-paris">Paris (UTC+1)</SelectItem>
                    <SelectItem value="asia-tokyo">Tokyo (UTC+9)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            <TabsContent value="appearance" className="mt-4 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Dark mode</p>
                  <p className="text-xs text-muted-foreground">Switch between light and dark themes</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Compact mode</p>
                  <p className="text-xs text-muted-foreground">Reduce spacing for denser layouts</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Animations</p>
                  <p className="text-xs text-muted-foreground">Enable motion and transitions</p>
                </div>
                <Switch defaultChecked />
              </div>
            </TabsContent>
            <TabsContent value="notifications" className="mt-4 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Email digests</p>
                  <p className="text-xs text-muted-foreground">Daily summary of workspace activity</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Push notifications</p>
                  <p className="text-xs text-muted-foreground">Real-time alerts for mentions and updates</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Marketing emails</p>
                  <p className="text-xs text-muted-foreground">Product updates and feature announcements</p>
                </div>
                <Switch />
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
            <Button>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
