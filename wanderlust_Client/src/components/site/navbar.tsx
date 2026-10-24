import Link from "next/link"
import Image from "next/image"
import { User } from "lucide-react"
import { cn } from "cn"

const LEFT_LINKS = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/bookings" },
  { label: "Admin", href: "/admin" },
]

const RIGHT_LINKS = [
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
]

export function Navbar() {
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
        <Link
          href="/profile"
          className="flex items-center gap-1.5 px-3 transition-colors hover:text-[#1a9dc4]"
        >
          <User className="size-3.5" data-icon="inline-start" />
          Profile
        </Link>
        {RIGHT_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="px-3 transition-colors hover:text-[#1a9dc4]"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  )
}
