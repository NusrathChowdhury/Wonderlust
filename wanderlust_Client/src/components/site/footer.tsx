
import Link from "next/link"
import { ArrowRight, MapPin, Mail, Phone } from "lucide-react"

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
    <footer className="relative overflow-hidden bg-[#080d12] text-white">
      {/* Subtle decorative accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 size-72 rounded-full bg-[#1a9dc4]/10 blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        {/* Brand and newsletter */}
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-2 md:items-center md:gap-12 lg:pb-14">
          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
              aria-label="Wanderlast home"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-[#1a9dc4]/15 text-[#40c5e8] ring-1 ring-[#1a9dc4]/25 transition-colors group-hover:bg-[#1a9dc4]/25">
                <MapPin className="size-5" />
              </span>
              <span className="text-3xl font-bold tracking-tight sm:text-4xl">
                Wanderlast<span className="text-[#40c5e8]">.</span>
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/55 sm:text-base">
              Your gateway to extraordinary travel experiences around the
              world. Discover new places, create unforgettable memories, and
              make every journey count.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 sm:p-6">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#40c5e8]">
              Travel inspiration
            </span>
            <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
              Your next adventure starts here.
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/50">
              Subscribe to receive travel deals, destination ideas, and useful
              tips for your next trip.
            </p>

            <form
              action="#"
              className="mt-5 flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 p-1.5 transition-colors focus-within:border-[#1a9dc4]/70"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email address"
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-white/35"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                title="Subscribe"
                className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#1a9dc4] text-white transition-all hover:bg-[#1685a7] active:scale-95"
              >
                <ArrowRight className="size-4" />
              </button>
            </form>
            <p className="mt-3 text-[11px] text-white/35">
              Travel inspiration, delivered to your inbox.
            </p>
          </div>
        </div>

        {/* Footer navigation */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-10 sm:grid-cols-2 md:grid-cols-4 lg:gap-12 lg:py-14">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white">
              Explore
            </h3>
            <ul className="mt-5 space-y-3.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center text-sm text-white/50 transition-all duration-200 hover:translate-x-1 hover:text-[#40c5e8]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white">
              Support
            </h3>
            <ul className="mt-5 space-y-3.5">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center text-sm text-white/50 transition-all duration-200 hover:translate-x-1 hover:text-[#40c5e8]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white">
              Get in touch
            </h3>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="group flex items-start gap-3 text-sm text-white/50 transition-colors hover:text-white"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-[#40c5e8] transition-colors group-hover:bg-[#1a9dc4]/15">
                    <Phone className="size-4" />
                  </span>
                  <span className="pt-2">{CONTACT.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group flex items-start gap-3 text-sm text-white/50 transition-colors hover:text-white"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-[#40c5e8] transition-colors group-hover:bg-[#1a9dc4]/15">
                    <Mail className="size-4" />
                  </span>
                  <span className="break-all pt-2">{CONTACT.email}</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white">
              Follow our journey
            </h3>
            <p className="mt-5 text-sm leading-6 text-white/50">
              Get inspired and discover more places worth exploring.
            </p>
            <div className="mt-4 flex items-center gap-2.5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/60 transition-all duration-200 hover:-translate-y-1 hover:border-[#1a9dc4]/50 hover:bg-[#1a9dc4]/10 hover:text-[#40c5e8]"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Wanderlast. All rights reserved.
          </p>
          <Link
            href="/"
            className="w-fit transition-colors hover:text-[#40c5e8]"
          >
            Made for the love of travel.
          </Link>
        </div>
      </div>
    </footer>
  )
}
