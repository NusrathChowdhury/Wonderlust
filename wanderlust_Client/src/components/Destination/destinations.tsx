
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type Destination = {
  _id: string
  name: string
  country: string
  price: number
  description: string
  imageUrl: string
}

const API_URL =` ${process.env.NEXT_PUBLIC_API_URL}`

export async function Destinations() {
  let DESTINATIONS: Destination[] = []

  try {
    const response = await fetch(`${API_URL}/featured-destinations`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch featured destinations")
    }

    DESTINATIONS = await response.json()
  } catch (error) {
    console.error("Featured destinations error:", error)
  }

  return (
    <section id="destinations" className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-serif text-4xl md:text-5xl">
            Featured Destinations
          </h2>
          <p className="mt-3 text-[15px] text-slate-500">
            Handpicked places our travelers love most
          </p>
        </div>

        {DESTINATIONS.length > 0 ? (
          <Carousel
            opts={{ align: "start", loop: true }}
            className="mt-10 w-full"
          >
            <CarouselContent>
              {DESTINATIONS.map((destination) => (
                <CarouselItem
                  key={destination._id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="group h-full bg-white shadow-sm transition-shadow hover:shadow-md">
                    <div className="relative h-48 overflow-hidden">
                      {destination.imageUrl ? (
                        <Image
                          src={destination.imageUrl}
                          alt={destination.name}
                          fill
                          unoptimized
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gray-100 text-sm text-gray-400">
                          No image available
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="text-xl">{destination.name}</h3>
                        <p className="text-sm font-medium text-[#1a9dc4]">
                          ৳{destination.price}
                        </p>
                      </div>

                      <p className="mt-1 text-xs tracking-wide text-slate-400 uppercase">
                        {destination.country}
                      </p>

                      <p className="mt-3 text-sm leading-relaxed text-slate-500">
                        {destination.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="-left-4 sm:-left-6 lg:-left-12" />
            <CarouselNext className="-right-4 sm:-right-6 lg:-right-12" />
          </Carousel>
        ) : (
          <p className="mt-10 text-center text-slate-500">
            No featured destinations available.
          </p>
        )}
      </div>
    </section>
  )
}
