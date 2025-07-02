import type { Metadata } from "next"
import SignupPageClient from "./pageClient"

export const metadata: Metadata = {
  title: "Sign Up - Resend-It",
  description: "Create your account to begin optimizing your business",
}

export default async function SignupPage() {
  return <SignupPageClient />
}
