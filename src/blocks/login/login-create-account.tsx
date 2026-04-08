"use client"

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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export default function LoginCreateAccount() {
  return (
    <div className="flex min-h-[600px] items-center justify-center bg-slate-50/80 px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="w-full max-w-sm"
      >
        <Card
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <CardHeader className="text-center pb-0">
            <CardTitle className="text-lg tracking-tight">
              Get started
            </CardTitle>
            <CardDescription>
              Sign in or create an account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="mt-2">
              <TabsList className="w-full">
                <TabsTrigger value="login" className="flex-1">
                  Login
                </TabsTrigger>
                <TabsTrigger value="register" className="flex-1">
                  Create Account
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-5">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="lca-login-email">Email</Label>
                    <Input
                      id="lca-login-email"
                      type="email"
                      placeholder="soren.dahl@brightpath.co"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="lca-login-password">Password</Label>
                      <button className="text-xs font-medium text-primary hover:underline">
                        Forgot password?
                      </button>
                    </div>
                    <Input
                      id="lca-login-password"
                      type="password"
                      placeholder="Enter your password"
                    />
                  </div>
                  <Button className="w-full">Sign in</Button>
                </div>
              </TabsContent>

              <TabsContent value="register" className="mt-5">
                <div className="flex flex-col gap-5">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="lca-first">First name</Label>
                      <Input id="lca-first" placeholder="Soren" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="lca-last">Last name</Label>
                      <Input id="lca-last" placeholder="Dahl" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="lca-reg-email">Email</Label>
                    <Input
                      id="lca-reg-email"
                      type="email"
                      placeholder="soren.dahl@brightpath.co"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="lca-reg-password">Password</Label>
                    <Input
                      id="lca-reg-password"
                      type="password"
                      placeholder="Min. 8 characters"
                    />
                  </div>
                  <div className="flex items-start gap-2">
                    <Checkbox id="lca-terms" className="mt-0.5" />
                    <Label
                      htmlFor="lca-terms"
                      className="text-xs font-normal leading-relaxed text-muted-foreground"
                    >
                      I agree to the Terms of Service and Privacy Policy
                    </Label>
                  </div>
                  <Button className="w-full">Create account</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
