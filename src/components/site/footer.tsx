import Link from "next/link"
import { ArrowRight } from "lucide-react"

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/bookings" },
  { label: "My Profile", href: "/profile" },
]

const SUPPORT_LINKS = [
  { label: "Help Center", href: "/help" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
]

const CONTACT = {
  phone: "760 695 4422",
  email: "info@wanderlust.com",
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

const SOCIALS = [
  { label: "X", href: "https://x.com", Icon: XIcon },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: LinkedinIcon },
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
]

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="text-4xl font-bold tracking-tight">Wanderlast</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
              Your gateway to extraordinary travel experiences around the
              world.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-medium tracking-widest text-white/70 uppercase">
              Newsletter
            </h3>
            <p className="mt-4 text-sm text-white/50">
              Subscribe to receive travel deals and tips.
            </p>
            <form className="relative mt-4 max-w-xs">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter email"
                className="w-full rounded-md border border-white/15 bg-white/5 py-2.5 pr-11 pl-3 text-sm text-white transition-colors placeholder:text-white/40 focus:border-[#1a9dc4] focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute top-1/2 right-1.5 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 hover:text-[#1a9dc4]"
              >
                <ArrowRight className="size-4" />
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-xs font-medium tracking-widest text-white/70 uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium tracking-widest text-white/70 uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-2.5">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium tracking-widest text-white/70 uppercase">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/50">
              <li>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-white"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="transition-colors hover:text-white"
                >
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-5 text-xs text-white/50 sm:flex-row">
          <p>© 2025 Wanderlust. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition-colors hover:text-white"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
