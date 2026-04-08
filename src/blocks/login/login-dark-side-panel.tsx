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
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginDarkSidePanel() {
  return (
    <div className="grid min-h-[640px] lg:grid-cols-[1fr_1.2fr]">
      <div className="relative hidden flex-col justify-center bg-slate-950 px-12 py-16 lg:flex">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(220, 38, 38, 0.12), transparent 70%)",
          }}
        />
        <div className="relative z-10 space-y-8">
          <div className="space-y-1">
            <div className="mb-6 flex -space-x-2">
              {["bg-emerald-400", "bg-amber-400", "bg-sky-400", "bg-rose-400"].map(
                (color, i) => (
                  <div
                    key={i}
                    className={`size-8 rounded-full ring-2 ring-slate-950 ${color}`}
                    style={{ opacity: 1 - i * 0.1 }}
                  />
                )
              )}
              <div className="flex size-8 items-center justify-center rounded-full bg-slate-800 text-xs font-medium text-white/70 ring-2 ring-slate-950">
                +8k
              </div>
            </div>
            <blockquote className="text-xl font-semibold leading-snug tracking-tight text-white/95">
              &ldquo;We reduced our deployment cycle from 3 weeks to 2 days.
              The visibility alone was worth the switch.&rdquo;
            </blockquote>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-white/10" />
            <div>
              <p className="text-sm font-medium text-white/90">
                Isabelle Fournier
              </p>
              <p className="text-xs text-white/50">
                CTO, Archetype Systems
              </p>
            </div>
          </div>
          <div className="flex gap-6 border-t border-white/10 pt-6">
            <div>
              <p className="text-2xl font-bold tabular-nums tracking-tight text-white">
                97.3%
              </p>
              <p className="text-xs tracking-wide text-white/40 uppercase">
                Uptime
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold tabular-nums tracking-tight text-white">
                14.2k
              </p>
              <p className="text-xs tracking-wide text-white/40 uppercase">
                Teams
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold tabular-nums tracking-tight text-white">
                4.8
              </p>
              <p className="text-xs tracking-wide text-white/40 uppercase">
                Rating
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center bg-slate-50/80 px-6 py-12">
        <div className="w-full max-w-sm">
          <Card
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <CardHeader>
              <CardTitle className="text-lg tracking-tight">
                Sign in to your account
              </CardTitle>
              <CardDescription>
                Welcome back. Enter your details below.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="ldsp-email">Email</Label>
                <Input
                  id="ldsp-email"
                  type="email"
                  placeholder="isabelle@archetypesys.com"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="ldsp-password">Password</Label>
                  <button className="text-xs font-medium text-primary hover:underline">
                    Forgot?
                  </button>
                </div>
                <Input
                  id="ldsp-password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="ldsp-remember" />
                <Label
                  htmlFor="ldsp-remember"
                  className="text-sm font-normal text-muted-foreground"
                >
                  Keep me signed in
                </Label>
              </div>
              <Button className="w-full">Sign in</Button>
              <p className="text-center text-xs text-muted-foreground">
                Don&apos;t have an account?{" "}
                <button className="font-medium text-primary hover:underline">
                  Sign up
                </button>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
