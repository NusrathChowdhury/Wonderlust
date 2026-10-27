import Image from "next/image"
import { ArrowRight } from "lucide-react"

const SEARCH_FIELDS = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime/3 Days" },
  { label: "Budget", value: "$0-$3000" },
  { label: "People", value: "5-10" },
]

export function Banner() {
  return (
    <section className="relative flex h-[516px] flex-col">
      <Image
        src="/images/Banner.png"
        alt=""
        fill
        priority
        className="object-cover"
      />

      <div className="relative flex flex-1 flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="max-w-2xl font-serif text-6xl leading-[1.1] text-balance">
          Discover Your Next Adventure
        </h1>
        <p className="mt-5 max-w-xl text-[15px] text-white/90">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-9 flex items-center gap-3 text-[13px] font-medium tracking-wide uppercase">
          <a
            href="#destinations"
            className="flex items-center gap-2.5 bg-[#1a9dc4] px-8 py-3.5 transition-colors hover:bg-[#178cb0]"
          >
            Explore Now
            <ArrowRight className="size-4" data-icon="inline-end" />
          </a>
          <a
            href="#destinations"
            className="bg-white px-8 py-3.5 text-slate-600 transition-colors hover:bg-slate-100"
          >
            View Destination
          </a>
        </div>
      </div>

      <form className="relative grid grid-cols-2 text-left md:grid-cols-[1fr_1fr_1fr_1fr_auto]">
        {SEARCH_FIELDS.map((field) => (
          <div
            key={field.label}
            className="border-t border-white/20 bg-white/10 px-4 py-2.5 backdrop-blur-[2px] md:border-t-0 md:border-l md:first:border-l-0"
          >
            <p className="text-sm font-semibold text-white">{field.label}</p>
            <p className="text-xs text-white/70">{field.value}</p>
          </div>
        ))}
        <button
          type="submit"
          className="col-span-2 bg-[#1a9dc4] px-16 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#178cb0] md:col-span-1"
        >
          Search
        </button>
      </form>
    </section>
  )
}
