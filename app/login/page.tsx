"use client"

import type React from "react" // Keep existing type import
import { useState } from "react"
import { useRouter } from "next/navigation" // Ensure this is from next/navigation
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase" // This should be your client-side Supabase client
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient() // Uses createBrowserClient internally

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (signInError) {
        // Throw the error to be caught by the catch block
        throw signInError
      }

      // At this point, Supabase client SDK has set auth cookies.
      // Now, ensure the server-side context is updated.

      // Check if profile exists, if not create it from user metadata
      // This logic should be robust and handle potential errors.
      if (data.user) {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", data.user.id)
          .single()

        if (profileError && profileError.code === "PGRST116") {
          // PGRST116: "No rows found"
          // Profile doesn't exist, create it
          const { error: insertError } = await supabase.from("profiles").insert({
            id: data.user.id,
            user_id: data.user.id,
            full_name: data.user.user_metadata?.full_name || "",
            email: data.user.email,
            company: data.user.user_metadata?.company || "",
            job_title: data.user.user_metadata?.job_title || "",
            website: data.user.user_metadata?.website || "",
            linkedin_url: data.user.user_metadata?.linkedin_url || "",
            username: (data.user.user_metadata?.full_name || data.user.email?.split("@")[0] || "user")
              .toLowerCase()
              .replace(/\s+/g, "_"),
            updated_at: new Date().toISOString(),
          })

          if (insertError) {
            console.error("Error creating profile post-login:", insertError)
            // Decide if this is a critical error. For now, we'll toast and continue.
            toast({
              title: "Profile Creation Issue",
              description: "Could not automatically create your profile. Please update it manually.",
              variant: "warning",
            })
          }
        } else if (profileError) {
          // Other profile fetch error
          console.error("Error fetching profile post-login:", profileError)
          toast({
            title: "Profile Check Issue",
            description: "There was an issue checking your profile information.",
            variant: "warning",
          })
        }
      }

      toast({
        title: "Login successful",
        description: "Welcome back! Redirecting...",
      })

      // Refresh the router. This is crucial.
      // It tells Next.js to re-fetch server components and re-run server-side logic (like middleware)
      // with the new auth cookies.
      router.refresh()

      // After the refresh has been initiated, push to the new route.
      // The server-side context for '/ai-suite' will now be up-to-date.
      router.push("/ai-suite")
    } catch (error) {
      console.error("Error logging in:", error)
      const errorMessage =
        error instanceof Error && (error as any).message
          ? (error as any).message
          : "Invalid email or password. Please try again."
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Log in to your account</CardTitle>
              <CardDescription>Enter your email and password to access the Resend-It platform</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Log in"}
                </Button>
                <div className="flex flex-col space-y-2 text-center text-sm">
                  <p className="text-gray-500">
                    {"Don't have an account? "}
                    <Link href="/signup" className="text-blue-500 hover:underline">
                      Sign up
                    </Link>
                  </p>
                  <p className="text-gray-500">
                    <Link href="/forgot-password" className="text-blue-500 hover:underline">
                      Forgot password?
                    </Link>
                  </p>
                </div>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
