import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { UserMenuServer } from "@/components/server/user-menu-server"
import type { User } from "@supabase/supabase-js"

interface HeaderContentProps {
  user: User | null
  mainNavItems: { title: string; href: string }[]
  authNavItems: { title: string; href: string }[]
  allNavItems: { title: string; href: string }[]
}

export async function HeaderContent({ user, mainNavItems, authNavItems, allNavItems }: HeaderContentProps) {
  return (
    <div className="container flex h-16 items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://quantumone.b-cdn.net/resendit/resend-it-svg.svg"
            alt="Resend-It Logo"
            className="h-5 w-18 fill-currentColor"
            width={72}
            height={20}
          />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600"></span>
        </Link>
        <MainNav items={allNavItems} />
      </div>

      <div className="flex items-center gap-2">
        {user ? (
          <UserMenuServer user={user} />
        ) : (
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
        )}
        <MobileNav items={allNavItems} />
      </div>
    </div>
  )
}
