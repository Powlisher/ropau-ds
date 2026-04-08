import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

const premiumShadow =
  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

export default function SettingsGeneral() {
  return (
    <Card className="w-full max-w-2xl" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">General</CardTitle>
            <CardDescription>
              Core workspace configuration and display preferences.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <Label htmlFor="gen-name">Workspace name</Label>
            <Input id="gen-name" defaultValue="Cordoba Engineering" />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <Label htmlFor="gen-desc">Description</Label>
            <Textarea
              id="gen-desc"
              defaultValue="Internal platform for the engineering team. CI/CD pipelines, API management, and developer tooling."
              className="min-h-20"
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid gap-5 sm:grid-cols-2"
          >
            <div className="flex flex-col gap-1.5">
              <Label>Language</Label>
              <Select defaultValue="en">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Timezone</Label>
              <Select defaultValue="europe-madrid">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="europe-madrid">Europe/Madrid (UTC+2)</SelectItem>
                  <SelectItem value="europe-london">Europe/London (UTC+1)</SelectItem>
                  <SelectItem value="america-new-york">America/New York (UTC-4)</SelectItem>
                  <SelectItem value="america-los-angeles">America/Los Angeles (UTC-7)</SelectItem>
                  <SelectItem value="asia-tokyo">Asia/Tokyo (UTC+9)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-end pt-1">
            <Button>Save changes</Button>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
