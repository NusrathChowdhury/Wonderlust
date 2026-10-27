"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { cn } from "cn"
import {
  ArrowUpRight,
  CalendarDays,
  Heart,
  ImageIcon,
  Star,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  numericPrice,
  ratingFor,
  type Destination,
} from "@/lib/destinations"

type FilterOption = {
  value: string
  label: string
}

const PRICE_RANGES: (FilterOption & {
  matches: (price: number) => boolean
})[] = [
  { value: "all", label: "All Prices", matches: () => true },
  {
    value: "budget",
    label: "Under 10,000",
    matches: (price) => price < 10000,
  },
  {
    value: "standard",
    label: "10,000 - 50,000",
    matches: (price) => price >= 10000 && price <= 50000,
  },
  {
    value: "premium",
    label: "Over 50,000",
    matches: (price) => price > 50000,
  },
]

const SORT_OPTIONS: FilterOption[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A to Z" },
]

function FilterSelect({
  label,
  value,
  options,
  onValueChange,
}: {
  label: string
  value: string | null
  options: FilterOption[]
  onValueChange: (value: string | null) => void
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="h-auto! w-full gap-3 rounded-none! border-0! bg-transparent px-4 py-3 shadow-none focus-visible:ring-0">
        <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
          {label}
        </span>
        <SelectValue className="justify-end text-right text-sm text-foreground" />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function WishlistButton({ name }: { name: string }) {
  const [saved, setSaved] = useState(false)

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={
        saved ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`
      }
      onClick={() => setSaved((previous) => !previous)}
      className="rounded-md bg-white p-1.5 text-slate-600 shadow-sm transition-colors hover:text-red-500"
    >
      <Heart
        className={cn(
          "size-3.5 transition-colors",
          saved && "fill-red-500 text-red-500"
        )}
      />
    </button>
  )
}

function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-4/3 overflow-hidden bg-muted">
        {destination.imageUrl ? (
          <Image
            src={destination.imageUrl}
            alt={destination.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-muted-foreground">
            <ImageIcon className="size-6" />
          </div>
        )}

        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
          <span className="flex items-center gap-1 rounded-md bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 shadow-sm">
            {ratingFor(destination)}
            <Star className="size-3 fill-amber-400 text-amber-400" />
          </span>
          <WishlistButton name={destination.name} />
        </div>
      </div>

      <div className="p-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          {destination.country || destination.category}
        </span>

        <div className="mt-3 flex items-start justify-between gap-3">
          <h2 className="text-[15px] leading-snug font-semibold">
            {destination.name}
          </h2>

          {destination.price && (
            <p className="shrink-0 text-sm">
              <span className="text-base font-semibold">
                ${destination.price}
              </span>
              <span className="text-muted-foreground">/person</span>
            </p>
          )}
        </div>

        {destination.duration && (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5 shrink-0" />
            {destination.duration}
          </p>
        )}

        {destination._id ? (
          <Link
            href={`/destinations/${destination._id}`}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#1a9dc4] uppercase transition-colors hover:text-[#178cb0]"
          >
            Book Now
            <ArrowUpRight className="size-3.5" data-icon="inline-end" />
          </Link>
        ) : (
          <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Book Now
            <ArrowUpRight className="size-3.5" data-icon="inline-end" />
          </span>
        )}
      </div>
    </article>
  )
}

export function DestinationsBrowser({
  destinations,
}: {
  destinations: Destination[]
}) {
  const [category, setCategory] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<string | null>(null)

  const categoryOptions: FilterOption[] = [
    { value: "all", label: "All Categories" },
    ...[...new Set(destinations.map((item) => item.category))]
      .filter((value) => value !== "")
      .sort()
      .map((value) => ({ value, label: value })),
  ]

  const selectedRange = PRICE_RANGES.find(
    (range) => range.value === priceRange
  )

  const visible = destinations
    .filter(
      (destination) =>
        !category || category === "all" || destination.category === category
    )
    .filter(
      (destination) =>
        !selectedRange || selectedRange.matches(numericPrice(destination))
    )

  const sorted = [...visible].sort((a, b) => {
    if (sortBy === "price-asc") return numericPrice(a) - numericPrice(b)
    if (sortBy === "price-desc") return numericPrice(b) - numericPrice(a)
    if (sortBy === "name") return a.name.localeCompare(b.name)
    return 0
  })

  return (
    <>
      <div className="mt-8 grid overflow-hidden rounded-lg border border-border sm:grid-cols-3">
        <div className="border-b border-border sm:border-r sm:border-b-0">
          <FilterSelect
            label="Category"
            value={category}
            options={categoryOptions}
            onValueChange={setCategory}
          />
        </div>

        <div className="border-b border-border sm:border-r sm:border-b-0">
          <FilterSelect
            label="Price Range"
            value={priceRange}
            options={PRICE_RANGES}
            onValueChange={setPriceRange}
          />
        </div>

        <FilterSelect
          label="Sort By"
          value={sortBy}
          options={SORT_OPTIONS}
          onValueChange={setSortBy}
        />
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Showing {sorted.length}{" "}
        {sorted.length === 1 ? "destination" : "destinations"}
      </p>

      {sorted.length === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed border-border px-6 py-16 text-center">
          <p className="text-sm text-muted-foreground">
            {destinations.length === 0
              ? "No destinations available yet."
              : "No destinations match your filters."}
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((destination, index) => (
            <DestinationCard
              key={destination._id || `${destination.name}-${index}`}
              destination={destination}
            />
          ))}
        </div>
      )}
    </>
  )
}
