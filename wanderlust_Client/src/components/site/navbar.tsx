
'use client'

import Link from "next/link"
import Image from "next/image"
import { User, LogOut, LoaderCircle } from "lucide-react"
import { useState } from "react"
import { cn } from "cn"
import { authClient } from "@/lib/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

const LEFT_LINKS = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/myBookings" },
  { label: "Add Destination", href: "/add-destination" },
]

const RIGHT_LINKS = [
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
]

export function Navbar() {
  const { data: session } = authClient.useSession()
  const user = session?.user
  const [isSigningOut, setIsSigningOut] = useState(false)

  async function handleSignOut() {
    if (isSigningOut) return

    setIsSigningOut(true)

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/"
          },
          onError: () => {
            setIsSigningOut(false)
          },
        },
      })
    } catch (error) {
      console.error("Sign out failed:", error)
      setIsSigningOut(false)
    }
  }

  return (
    <header className="sticky top-0 z-20 flex h-11 items-center bg-white px-4 text-[13px] text-foreground shadow-sm">
      <nav className="flex h-full items-center">
        {LEFT_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={cn(
              "relative flex h-full items-center px-3 transition-colors hover:text-[#1a9dc4]",
              link.active && "font-medium text-[#1a9dc4]"
            )}
          >
            {link.label}
            {link.active && (
              <span className="absolute inset-x-2 bottom-0 h-0.5 bg-[#1a9dc4]" />
            )}
          </Link>
        ))}
      </nav>

      <Link href="/" className="absolute left-1/2 h-5 -translate-x-1/2">
        <Image
          src="/images/Wanderlast.png"
          alt="Wanderlast"
          width={118}
          height={22}
          priority
          className="h-full w-auto"
        />
      </Link>

      <div className="ml-auto flex items-center">
        {user ? (
          <Popover>
            <PopoverTrigger
              render={
                <button
                  type="button"
                  aria-label="Open profile menu"
                  className="flex items-center gap-1.5 px-3 transition-colors hover:text-[#1a9dc4]"
                />
              }
            >
              <Avatar className="size-8">
                {user.image && (
                  <AvatarImage
                    src={user.image}
                    alt={user.name || "User"}
                  />
                )}
                <AvatarFallback>
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <User className="size-3.5" />
              Profile
            </PopoverTrigger>

            <PopoverContent
              align="end"
              sideOffset={8}
              className="w-64 rounded-xl border border-gray-100 bg-white p-0 shadow-lg"
            >
              <PopoverHeader className="border-b border-gray-100 p-4">
                <PopoverTitle className="text-sm font-semibold text-gray-900">
                  {user.name || "Traveler"}
                </PopoverTitle>
                <PopoverDescription className="mt-1 break-all text-xs text-gray-500">
                  {user.email}
                </PopoverDescription>
              </PopoverHeader>

              <div className="p-3">
                <Link
                  href="/profile"
                  className="mb-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-[#1a9dc4]"
                >
                  <User className="size-4" />
                  My Profile
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSigningOut ? (
                    <LoaderCircle className="size-4 animate-spin" />
                  ) : (
                    <LogOut className="size-4" />
                  )}
                  {isSigningOut ? "Signing out..." : "Sign Out"}
                </button>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          RIGHT_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3 transition-colors hover:text-[#1a9dc4]"
            >
              {link.label}
            </Link>
          ))
        )}
      </div>
    </header>
  )
}
