export type Destination = {
  _id: string
  name: string
  country: string
  category: string
  price: string
  duration: string
  departureDate: string
  imageUrl: string
  description: string
}

const asText = (value: unknown): string => {
  if (typeof value === "string") return value.trim()
  if (typeof value === "number" && Number.isFinite(value))
    return String(value)
  return ""
}

/**
 * The API returns loosely typed documents (price can be a string or a
 * number, and incomplete records may exist), so normalize everything
 * into a shape the UI can rely on.
 */
const normalizeRecord = (item: unknown): Destination | null => {
  if (typeof item !== "object" || item === null) return null

  const record = item as Record<string, unknown>
  const name = asText(record.name)

  if (!name) return null

  return {
    _id: asText(record._id),
    name,
    country: asText(record.country),
    category: asText(record.category),
    price: asText(record.price),
    duration: asText(record.duration),
    departureDate: asText(record.departureDate),
    imageUrl: asText(record.imageUrl),
    description: asText(record.description),
  }
}

export const normalizeDestinations = (data: unknown): Destination[] => {
  if (!Array.isArray(data)) return []

  return data.flatMap((item) => {
    const destination = normalizeRecord(item)
    return destination ? [destination] : []
  })
}

/** Normalize a single destination document (e.g. `GET /destinations/:id`). */
export const normalizeDestination = (data: unknown): Destination | null =>
  normalizeRecord(data)

export const numericPrice = (destination: Destination): number => {
  const price = Number(destination.price.replace(/[^0-9.]/g, ""))
  return Number.isFinite(price) ? price : 0
}

/** Deterministic per-record hash used to derive stable display values. */
const hashFor = (source: string): number => {
  let hash = 0

  for (let i = 0; i < source.length; i += 1) {
    hash = (hash * 31 + source.charCodeAt(i)) >>> 0
  }

  return hash
}

/**
 * The API has no rating field yet, so derive a stable value from the
 * record id (deterministic across renders, unlike Math.random).
 */
export const ratingFor = (destination: Destination): string => {
  const hash = hashFor(destination._id || destination.name)
  return (4 + (hash % 10) / 10).toFixed(1)
}

/**
 * The API has no review count yet, so derive a stable value from the
 * record id (deterministic across renders, unlike Math.random).
 */
export const reviewsFor = (destination: Destination): number => {
  const hash = hashFor(destination._id || destination.name)
  return 60 + (hash % 440) // 60 – 499
}

/**
 * The API has no highlights field yet, so turn the description into a
 * short bullet list (sentences first, comma-separated clauses as a
 * fallback for single-sentence descriptions).
 */
export const highlightsFor = (
  destination: Destination,
  max = 6
): string[] => {
  const source = destination.description.trim()
  if (!source) return []

  const clean = (part: string) =>
    part
      .replace(/^[.!?]+|[.!?]+$/g, "")
      .replace(/^(and|or|&)\s+/i, "")
      .trim()

  const sentences = source
    .split(/(?<=[.!?])\s+/)
    .map(clean)
    .filter(Boolean)

  const parts =
    sentences.length > 1
      ? sentences
      : source
          .split(/[,;]\s+/)
          .map(clean)
          .filter(Boolean)

  return parts.slice(0, max)
}

/**
 * Present durations the way the details page shows them
 * (`"7 Days / 6 Nights"`), tolerating the loose shapes the API returns:
 * bare numbers mean days, and `", "` separates the day/night clauses.
 */
export const formatDuration = (value: string): string => {
  const source = value.trim()
  if (!source) return ""
  if (/^\d+$/.test(source)) return `${source} Days`
  return source.replace(/,\s*/g, " / ")
}

/** Format `YYYY-MM-DD` / ISO dates as `MM/DD/YYYY` without timezone drift. */
export const formatDepartureDate = (value: string): string => {
  const source = value.trim()
  if (!source) return ""

  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(source)

  if (match) {
    const [, year, month, day] = match
    return `${month}/${day}/${year}`
  }

  const date = new Date(source)
  if (Number.isNaN(date.getTime())) return source

  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${month}/${day}/${date.getFullYear()}`
}
