import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const DESTINATIONS = [
  {
    name: "Paris",
    country: "France",
    price: "$1,299",
    description: "Iconic landmarks, world-class art, and charming café culture.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
  },
  {
    name: "Bali",
    country: "Indonesia",
    price: "$999",
    description: "Serene beaches, lush rice terraces, and vibrant temple rituals.",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
  },
  {
    name: "Tokyo",
    country: "Japan",
    price: "$1,450",
    description: "Where ancient tradition meets cutting-edge city life.",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
  },
  {
    name: "New York",
    country: "United States",
    price: "$899",
    description: "The city that never sleeps — skyline, culture, and buzz.",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
  },
  {
    name: "Santorini",
    country: "Greece",
    price: "$1,199",
    description: "Whitewashed villages perched above the deep blue Aegean.",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
  },
  {
    name: "Dubai",
    country: "United Arab Emirates",
    price: "$1,050",
    description: "Futuristic towers, desert dunes, and luxury shopping.",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
  },
]

export function Destinations() {
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

        <Carousel
          opts={{ align: "start", loop: true }}
          className="mt-10 w-full"
        >
          <CarouselContent>
            {DESTINATIONS.map((destination) => (
              <CarouselItem
                key={destination.name}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="group h-full bg-white shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-xl">{destination.name}</h3>
                      <p className="text-sm font-medium text-[#1a9dc4]">
                        {destination.price}
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
      </div>
    </section>
  )
}
