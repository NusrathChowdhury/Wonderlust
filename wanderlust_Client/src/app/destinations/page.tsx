import type { Metadata } from "next"
import { DestinationsBrowser } from "../../../destinations-browser"
import { normalizeDestinations, type Destination } from "@/lib/destinations"

const DESTINATIONS_ENDPOINT =(`${process.env.NEXT_PUBLIC_API_URL}/destinations`)

export const metadata: Metadata = {
  title: "Explore All Destinations | Wanderlust",
  description:
    "Find your perfect travel experience from our curated collection.",
}

const AllDestinationPage = async () => {
  let destinations: Destination[] = []

  try {
    const res = await fetch(DESTINATIONS_ENDPOINT)

    if (res.ok) {
      destinations = normalizeDestinations(await res.json())
    }
  } catch {
    destinations = []
  }

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-serif text-3xl md:text-4xl">
          Explore All Destinations
        </h1>
        <p className="mt-3 text-[15px] text-muted-foreground">
          Find your perfect travel experience from our curated collection
        </p>

        <DestinationsBrowser destinations={destinations} />
      </div>
    </section>
  )
}

export default AllDestinationPage
