import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Compass,
  Info,
  ListChecks,
  MapPinned,
  Star,
} from "lucide-react"

import { BookingCard } from "@/components/booking/booking-card"
import { DestinationActions } from "@/components/Destination/destination-actions"
import {
  formatDuration,
  highlightsFor,
  normalizeDestination,
  ratingFor,
  reviewsFor,
  type Destination,
} from "@/lib/destinations"

const DESTINATIONS_ENDPOINT = "http://localhost:5000/destinations"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params

  try {
    const res = await fetch(`${DESTINATIONS_ENDPOINT}/${id}`)

    if (!res.ok) {
      return { title: "Destination Not Found | Wanderlust" }
    }

    const destination = normalizeDestination(await res.json())

    if (!destination) {
      return { title: "Destination Not Found | Wanderlust" }
    }

    return {
      title: `${destination.name} | Wanderlust`,
      description: destination.description,
    }
  } catch {
    return { title: "Destinations | Wanderlust" }
  }
}

const DestinationDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  let destination: Destination | null = null

  try {
    const res = await fetch(`${DESTINATIONS_ENDPOINT}/${id}`)

    if (res.ok) {
      destination = normalizeDestination(await res.json())
    }
  } catch {
    destination = null
  }

  if (!destination) notFound()

  const highlights = highlightsFor(destination)
  const rating = ratingFor(destination)
  const reviews = reviewsFor(destination)
  const duration = formatDuration(destination.duration)

  return (
    <main className="min-h-screen bg-[#f7faf8] pb-16">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/destinations"
            className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition-all hover:border-[#1a9dc4] hover:text-[#1a9dc4]"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            All Destinations
          </Link>

          <DestinationActions
            id={destination._id}
            name={destination.name}
          />
        </div>

        {/* Hero Image */}
        <div className="relative isolate overflow-hidden rounded-2xl bg-gray-200 shadow-lg sm:rounded-3xl">
          <div className="relative aspect-[16/9] max-h-[580px] min-h-[260px] w-full sm:aspect-[21/9]">
            {destination.imageUrl ? (
              <Image
                src={destination.imageUrl}
                alt={destination.name}
                fill
                priority
                sizes="(min-width: 1280px) 1216px, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-sm text-gray-500">
                No image available
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 md:p-10">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                <Compass className="size-4" />
                Discover Bangladesh
              </div>

              <h1 className="max-w-4xl font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {destination.name}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/90">
                <span className="inline-flex items-center gap-2">
                  <MapPinned className="size-4 text-[#73d5ec]" />
                  {destination.country || destination.category}
                </span>

                {duration && (
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="size-4 text-[#73d5ec]" />
                    {duration}
                  </span>
                )}

                <span className="inline-flex items-center gap-2">
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{rating}</span>
                  <span className="text-white/70">
                    ({reviews} reviews)
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10">
          <div className="min-w-0 space-y-7">
            {/* Overview */}
            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#e8f6fa] text-[#1a9dc4]">
                  <Info className="size-5" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1a9dc4]">
                    Get to know the destination
                  </p>

                  <h2 className="mt-1 font-serif text-2xl font-semibold text-[#183b32] sm:text-3xl">
                    Overview
                  </h2>
                </div>
              </div>

              <p className="mt-5 text-[15px] leading-8 text-gray-600 sm:text-base">
                {destination.description ||
                  "Discover this beautiful destination and plan your next memorable journey with Wanderlust."}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {destination.category && (
                  <span className="rounded-full bg-[#edf4ed] px-4 py-2 text-sm font-medium text-[#183b32]">
                    {destination.category}
                  </span>
                )}

                {destination.country && (
                  <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600">
                    {destination.country}
                  </span>
                )}
              </div>
            </section>

            {/* Highlights */}
            {highlights.length > 0 && (
              <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf7ef] text-emerald-700">
                    <ListChecks className="size-5" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                      Make the most of your trip
                    </p>

                    <h2 className="mt-1 font-serif text-2xl font-semibold text-[#183b32] sm:text-3xl">
                      Trip Highlights
                    </h2>
                  </div>
                </div>

                <ul className="mt-7 grid gap-4 sm:grid-cols-2">
                  {highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3 rounded-xl bg-[#f7faf8] p-4 text-sm leading-6 text-gray-700 transition-colors hover:bg-[#edf4ed]"
                    >
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <Check className="size-3.5" />
                      </span>

                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Travel Note */}
            <div className="rounded-2xl border border-[#dcefeb] bg-[#edf7f4] p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Compass className="mt-1 size-5 shrink-0 text-[#1a9dc4]" />

                <div>
                  <h2 className="font-semibold text-[#183b32]">
                    Your next adventure starts here
                  </h2>

                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    Explore the details, check your trip information, and
                    reserve your place for an unforgettable travel experience.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <aside className="lg:sticky lg:top-6">
            <BookingCard
              price={destination.price}
              departureDate={destination.departureDate}
              name={destination.name}
            />
          </aside>
        </div>
      </div>
    </main>
  )
}

export default DestinationDetailsPage
