"use client"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatDepartureDate } from "@/lib/destinations"
import { authClient } from "@/lib/auth-client"

const BOOKING_BENEFITS = [
  "Free cancelation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
]

type BookingCardProps = {
  price: string
  departureDate: string
  name: string
  imageUrl?: string
}

export function BookingCard({
  price,
  departureDate,
  name,
  imageUrl,
}: BookingCardProps) {
  const [date, setDate] = useState(
    /^\d{4}-\d{2}-\d{2}/.exec(departureDate)?.[0] ?? ""
  )
  const [isBooked, setIsBooked] = useState(false)
  const [loading, setLoading] = useState(false)

  const { data: session } = authClient.useSession()

  const handleBooking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Debug destination image
    console.log("Destination name:", name)
    console.log("Destination image:", imageUrl)
    console.log("Image type:", typeof imageUrl)
    console.log("Image length:", imageUrl?.length)

    if (!session?.user) {
      window.location.href = "/login"
      return
    }

    if (!imageUrl) {
      console.error("Destination image URL is missing:", imageUrl)
      alert("Destination image is missing. Please try again.")
      return
    }

    try {
      setLoading(true)

      const user = session.user

      const data = {
        username: user.name,
        email: user.email,
        name,
        imageUrl,
        price,
        departureDate: date,
        bookingDate: new Date(),
      }

      console.log("Booking image URL:", imageUrl)
      console.log("Booking data:", data)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Failed to save booking")
      }

      const bookingRes = await res.json()

      console.log("Booking saved:", bookingRes)
      setIsBooked(true)
    } catch (error) {
      console.error("Booking error:", error)
      alert(
        error instanceof Error
          ? error.message
          : "Booking failed. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <aside className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <p className="text-sm text-muted-foreground">Starting from</p>

      <p className="mt-1 text-4xl font-semibold text-[#1a9dc4]">
        {price ? `$${price}` : "N/A"}
      </p>

      <p className="text-sm text-muted-foreground">per person</p>

      <div className="mt-5">
        <label htmlFor="departure-date" className="sr-only">
          Departure date
        </label>

        <form onSubmit={handleBooking}>
          <Input
            id="departure-date"
            type="date"
            name="departure-date"
            value={date}
            onChange={(event) => {
              setDate(event.target.value)
              setIsBooked(false)
            }}
            className="h-11"
            required
          />

          <Button
            type="submit"
            disabled={!date || loading}
            className="mt-4 h-11 w-full rounded-md bg-[#1a9dc4] text-white hover:bg-[#178cb0]"
          >
            {loading ? "Booking..." : "Book Now"}
            {!loading && (
              <ArrowRight className="size-4" data-icon="inline-end" />
            )}
          </Button>
        </form>

        <div
          aria-live="polite"
          className="mt-3 text-sm font-medium text-emerald-600 empty:hidden"
        >
          {isBooked
            ? `Booking confirmed for ${name} on ${formatDepartureDate(date)}.`
            : null}
        </div>

        <ul className="mt-5 space-y-3">
          {BOOKING_BENEFITS.map((benefit) => (
            <li
              key={benefit}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Check
                aria-hidden="true"
                className="size-4 shrink-0 text-emerald-500"
              />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
