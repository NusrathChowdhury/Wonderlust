"use client"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatDepartureDate } from "@/lib/destinations"

const BOOKING_BENEFITS = [
  "Free cancelation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
]

export function BookingCard({
  price,
  departureDate,
  name,
}: {
  price: string
  departureDate: string
  name: string
}) {
  const [date, setDate] = useState(
    /^\d{4}-\d{2}-\d{2}/.exec(departureDate)?.[0] ?? ""
  )
  const [isBooked, setIsBooked] = useState(false)

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
        <Input
          id="departure-date"
          type="date"
          value={date}
          onChange={(event) => {
            setDate(event.target.value)
            setIsBooked(false)
          }}
          className="h-11"
        />
      </div>

      <Button
        type="button"
        disabled={!date}
        onClick={() => setIsBooked(true)}
        className="mt-4 h-11 w-full rounded-md bg-[#1a9dc4] text-white hover:bg-[#178cb0]"
      >
        Book Now
        <ArrowRight className="size-4" data-icon="inline-end" />
      </Button>

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
    </aside>
  )
}
