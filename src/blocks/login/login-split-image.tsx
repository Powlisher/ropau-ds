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

export default function LoginSplitImage() {
  return (
    <div className="grid min-h-[640px] lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between bg-slate-900 p-10 lg:flex">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(220, 38, 38, 0.15), transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(220, 38, 38, 0.08), transparent 50%)",
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-white/10">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="size-4 text-white"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-tight text-white">
              Meridian
            </span>
          </div>
        </div>
        <div className="relative z-10 space-y-4">
          <p className="text-2xl font-semibold tracking-tight text-white/95">
            Build something people actually want.
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-white/60">
            Join 14,200+ teams shipping faster with real-time analytics, smart
            alerts, and collaborative workflows.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="size-8 rounded-full bg-white/10" />
          <div>
            <p className="text-sm font-medium text-white/90">
              Tomoko Nishikawa
            </p>
            <p className="text-xs text-white/50">VP Engineering, Solace Labs</p>
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
              <CardTitle className="text-lg tracking-tight">Sign in</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="lsi-email">Email address</Label>
                <Input
                  id="lsi-email"
                  type="email"
                  placeholder="tomoko@solacelabs.com"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="lsi-password">Password</Label>
                <Input
                  id="lsi-password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <Button className="w-full">Sign in</Button>

              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
                  or
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" type="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-4"
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" type="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-4"
                  >
                    <path
                      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                      fill="currentColor"
                    />
                  </svg>
                  GitHub
                </Button>
              </div>

              <p className="text-center text-xs text-muted-foreground">
                New to Meridian?{" "}
                <button className="font-medium text-primary hover:underline">
                  Create an account
                </button>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
