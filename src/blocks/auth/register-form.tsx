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

export function RegisterForm() {
  return (
    <div className="flex min-h-[600px] items-center justify-center px-4">
      <Card
        className="w-full max-w-md"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Start your 14-day free trial. No credit card required.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="reg-name">Full name</Label>
            <Input id="reg-name" placeholder="Camille Bernstein" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="reg-email">Email</Label>
            <Input
              id="reg-email"
              type="email"
              placeholder="camille@tidepool.io"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="reg-password">Password</Label>
            <Input
              id="reg-password"
              type="password"
              placeholder="Min. 8 characters"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="reg-confirm">Confirm password</Label>
            <Input id="reg-confirm" type="password" placeholder="Re-enter password" />
          </div>

          <Button className="mt-1 w-full">Create account</Button>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full">
              Google
            </Button>
            <Button variant="outline" className="w-full">
              GitHub
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <a
              href="#"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Sign in
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
