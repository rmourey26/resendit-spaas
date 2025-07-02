"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export function AuthButtons() {
  return (
    <div className="hidden md:flex items-center gap-2">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "text-gray-500 hover:text-green-400 hover:bg-transparent",
        )}
      >
        Login
      </Link>
      <Link
        href="/signup"
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "border-green-500 text-green-400 hover:bg-green-500/20",
        )}
      >
        Sign Up
      </Link>
    </div>
  )
}
