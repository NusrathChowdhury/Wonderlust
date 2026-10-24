import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const TESTIMONIALS = [
  {
    quote:
      "The Bali trip was absolutely magical! Every detail was perfectly planned. The resorts were luxurious and the cultural experiences were unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person2.png",
  },
  {
    quote:
      "Swiss Alps adventure exceeded all expectations. The mountain views were breathtaking and our guide was incredibly knowledgeable. Highly recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person1.png",
  },
  {
    quote:
      "Santorini was a dream come true. Watching the sunset from Oia with a glass of local wine is something I will never forget. Flawless planning throughout.",
    name: "Emma Thompson",
    location: "London, United Kingdom",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
  },
  {
    quote:
      "Our Tokyo food tour was the highlight of the year. Hidden ramen shops, bustling markets, and a guide who knew every story behind the dishes.",
    name: "David Park",
    location: "Seoul, South Korea",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
  },
]

export function Testimonials() {
  return (
    <section className="bg-[#fafcfd] px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-4xl text-left md:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-3 text-[15px] text-slate-500">
                Real experiences from our happy travelers
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <CarouselPrevious className="static size-10" />
              <CarouselNext className="static size-10" />
            </div>
          </div>

          <CarouselContent className="-ml-6 mt-8">
            {TESTIMONIALS.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="pl-6 md:basis-1/2"
              >
                <figure className="flex h-full overflow-hidden border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex flex-1 flex-col p-6">
                    <blockquote className="text-sm leading-relaxed text-slate-700">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-auto pt-6">
                      <p className="flex items-center gap-2 text-sm font-medium text-[#1a9dc4]">
                        <span
                          aria-hidden="true"
                          className="h-px w-6 bg-[#1a9dc4]"
                        />
                        {testimonial.name}
                      </p>
                      <p className="pl-8 pt-1 text-xs text-slate-400">
                        {testimonial.location}
                      </p>
                    </figcaption>
                  </div>
                  <div className="relative w-40 shrink-0 sm:w-48">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      sizes="(min-width: 640px) 192px, 160px"
                      className="object-cover"
                    />
                  </div>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
