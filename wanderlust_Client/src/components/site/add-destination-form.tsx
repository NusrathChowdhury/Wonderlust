"use client"

import { useState } from "react"
import Image from "next/image"
import {
  AlertCircle,
  CheckCircle2,
  ImagePlus,
  Star,
  Trash2,
} from "lucide-react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const CATEGORIES = [
  { value: "beach", label: "Beach" },
  { value: "mountain", label: "Mountain" },
  { value: "city", label: "City" },
  { value: "island", label: "Island" },
  { value: "desert", label: "Desert" },
  { value: "countryside", label: "Countryside" },
]

const CATEGORY_LABELS = Object.fromEntries(
  CATEGORIES.map((category) => [category.value, category.label])
)

const SEASONS = ["Summer", "Winter", "Spring", "Autumn"]

const ACTIVITIES = [
  "Hiking",
  "Beach",
  "Sightseeing",
  "Nightlife",
  "Food Tours",
  "Water Sports",
  "Wildlife",
  "Shopping",
]

const MAX_IMAGES = 6
const MAX_IMAGE_SIZE = 5 * 1024 * 1024
const DESCRIPTION_MAX = 500
const DEFAULT_RATING = 4

type ImageEntry = {
  id: string
  name: string
  previewUrl: string
}

type FormErrors = {
  name?: string
  country?: string
  description?: string
  price?: string
  duration?: string
  images?: string
}

type DestinationPayload = {
  name: string
  country: string
  city: string
  category: string | null
  description: string
  price: number
  durationDays: number | null
  rating: number
  seasons: string[]
  activities: string[]
  images: { name: string }[]
}

const pillClassName =
  "aria-pressed:bg-[#1a9dc4] aria-pressed:text-white data-[state=on]:bg-[#1a9dc4] data-[state=on]:text-white"

const cardClassName = "shadow-sm ring-0 [--card-spacing:--spacing(6)]"

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p role="alert" className="text-sm text-destructive">
      {message}
    </p>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <CardTitle className="flex items-center gap-2.5 text-base">
      <span aria-hidden="true" className="h-4 w-1 bg-[#1a9dc4]" />
      {children}
    </CardTitle>
  )
}

export function AddDestinationForm() {
  const [name, setName] = useState("")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [category, setCategory] = useState<string | null>(null)
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [durationDays, setDurationDays] = useState("")
  const [rating, setRating] = useState(DEFAULT_RATING)
  const [seasons, setSeasons] = useState<string[]>([])
  const [activities, setActivities] = useState<string[]>([])
  const [images, setImages] = useState<ImageEntry[]>([])
  const [errors, setErrors] = useState<FormErrors>({})
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">(
    "idle"
  )

  const clearError = (field: keyof FormErrors) =>
    setErrors((prev) => (field in prev ? { ...prev, [field]: undefined } : prev))

  const addFiles = (fileList: FileList | null) => {
    if (!fileList) return
    const accepted: ImageEntry[] = []
    let skippedOversized = false

    for (const file of Array.from(fileList)) {
      if (images.length + accepted.length >= MAX_IMAGES) break
      if (!file.type.startsWith("image/")) continue
      if (file.size > MAX_IMAGE_SIZE) {
        skippedOversized = true
        continue
      }
      accepted.push({
        id: crypto.randomUUID(),
        name: file.name,
        previewUrl: URL.createObjectURL(file),
      })
    }

    if (accepted.length > 0) {
      setImages((prev) => [...prev, ...accepted])
      clearError("images")
    }
    setUploadError(
      skippedOversized
        ? "Some images were larger than 5 MB and were skipped."
        : images.length + accepted.length >= MAX_IMAGES
          ? `You can attach up to ${MAX_IMAGES} images.`
          : null
    )
  }

  const removeImage = (id: string) => {
    setImages((prev) => {
      const target = prev.find((image) => image.id === id)
      if (target) URL.revokeObjectURL(target.previewUrl)
      return prev.filter((image) => image.id !== id)
    })
  }

  const resetForm = () => {
    images.forEach((image) => URL.revokeObjectURL(image.previewUrl))
    setName("")
    setCountry("")
    setCity("")
    setCategory(null)
    setDescription("")
    setPrice("")
    setDurationDays("")
    setRating(DEFAULT_RATING)
    setSeasons([])
    setActivities([])
    setImages([])
    setErrors({})
    setUploadError(null)
    setSubmitState("idle")
  }

  const validate = (): FormErrors => {
    const next: FormErrors = {}
    const priceValue = Number(price)
    const durationValue = Number(durationDays)

    if (!name.trim()) next.name = "Destination name is required"
    if (!country.trim()) next.country = "Country is required"
    if (description.trim().length < 20)
      next.description = "Description must be at least 20 characters"
    if (!price.trim() || Number.isNaN(priceValue) || priceValue <= 0)
      next.price = "Enter a valid price per person"
    if (
      durationDays.trim() !== "" &&
      (Number.isNaN(durationValue) || durationValue <= 0)
    )
      next.duration = "Enter a valid number of days"
    if (images.length === 0) next.images = "Add at least one image"

    return next
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return

    setIsSubmitting(true)
    setSubmitState("idle")

    const payload: DestinationPayload = {
      name: name.trim(),
      country: country.trim(),
      city: city.trim(),
      category,
      description: description.trim(),
      price: Number(price),
      durationDays: durationDays.trim() === "" ? null : Number(durationDays),
      rating,
      seasons,
      activities,
      images: images.map((image) => ({ name: image.name })),
    }

    try {
      const response = await fetch("/api/destinations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      resetForm()
      setSubmitState("success")
    } catch {
      setSubmitState("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-slate-100/70 px-4 py-14">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h1 className="font-serif text-4xl md:text-5xl">
            Add New Destination
          </h1>
          <span
            aria-hidden="true"
            className="mx-auto mt-4 block h-1 w-14 bg-[#1a9dc4]"
          />
          <p className="mt-4 text-[15px] text-slate-500">
            Share an amazing place with the Wanderlust community
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-10 grid items-start gap-6 lg:grid-cols-3"
        >
          <div className="flex flex-col gap-6 lg:col-span-2">
            <Card className={cardClassName}>
              <CardHeader>
                <SectionTitle>Basic Information</SectionTitle>
                <CardDescription>
                  Tell travelers where this destination is and what makes it
                  special.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="destination-name">Destination name</Label>
                    <Input
                      id="destination-name"
                      className="h-10"
                      placeholder="e.g. Santorini"
                      value={name}
                      aria-invalid={!!errors.name}
                      onChange={(event) => {
                        setName(event.target.value)
                        clearError("name")
                      }}
                    />
                    <FieldError message={errors.name} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="destination-country">Country</Label>
                    <Input
                      id="destination-country"
                      className="h-10"
                      placeholder="e.g. Greece"
                      value={country}
                      aria-invalid={!!errors.country}
                      onChange={(event) => {
                        setCountry(event.target.value)
                        clearError("country")
                      }}
                    />
                    <FieldError message={errors.country} />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="destination-city">
                      City or region{" "}
                      <span className="font-normal text-muted-foreground">
                        (optional)
                      </span>
                    </Label>
                    <Input
                      id="destination-city"
                      className="h-10"
                      placeholder="e.g. Oia"
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="destination-category">Category</Label>
                    <Select
                      items={CATEGORY_LABELS}
                      value={category}
                      onValueChange={(value) => setCategory(value)}
                    >
                      <SelectTrigger
                        id="destination-category"
                        className="h-10 w-full"
                      >
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="destination-description">
                      Description
                    </Label>
                    <span className="text-xs text-slate-400">
                      {description.length}/{DESCRIPTION_MAX}
                    </span>
                  </div>
                  <Textarea
                    id="destination-description"
                    maxLength={DESCRIPTION_MAX}
                    className="min-h-28"
                    placeholder="Describe the experience, highlights, and why travelers should visit..."
                    value={description}
                    aria-invalid={!!errors.description}
                    onChange={(event) => {
                      setDescription(event.target.value)
                      clearError("description")
                    }}
                  />
                  <FieldError message={errors.description} />
                </div>
              </CardContent>
            </Card>

            <Card className={cardClassName}>
              <CardHeader>
                <SectionTitle>Trip Details</SectionTitle>
                <CardDescription>
                  Pricing, duration, ratings, and the best time to visit.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="destination-price">Price per person</Label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-slate-400">
                        $
                      </span>
                      <Input
                        id="destination-price"
                        type="number"
                        min={1}
                        placeholder="999"
                        className="h-10 pl-7"
                        value={price}
                        aria-invalid={!!errors.price}
                        onChange={(event) => {
                          setPrice(event.target.value)
                          clearError("price")
                        }}
                      />
                    </div>
                    <FieldError message={errors.price} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="destination-duration">
                      Duration{" "}
                      <span className="font-normal text-muted-foreground">
                        (optional)
                      </span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="destination-duration"
                        type="number"
                        min={1}
                        placeholder="7"
                        className="h-10 pr-14"
                        value={durationDays}
                        aria-invalid={!!errors.duration}
                        onChange={(event) =>
                          setDurationDays(event.target.value)
                        }
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-slate-400">
                        days
                      </span>
                    </div>
                    <FieldError message={errors.duration} />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Rating</Label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          aria-label={`Set rating to ${star}`}
                          onClick={() => setRating(star)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={cn(
                              "size-6",
                              star <= rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-300"
                            )}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-sm font-medium tabular-nums text-slate-500">
                      {rating}.0
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Best time to visit</Label>
                  <ToggleGroup
                    multiple
                    variant="outline"
                    value={seasons}
                    onValueChange={(values) => setSeasons(values as string[])}
                    aria-label="Best time to visit"
                  >
                    {SEASONS.map((season) => (
                      <ToggleGroupItem
                        key={season}
                        value={season}
                        className={pillClassName}
                      >
                        {season}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              </CardContent>
            </Card>

            <Card className={cardClassName}>
              <CardHeader>
                <SectionTitle>Activities</SectionTitle>
                <CardDescription>
                  Pick the experiences travelers can enjoy here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ToggleGroup
                  multiple
                  variant="outline"
                  value={activities}
                  onValueChange={(values) => setActivities(values as string[])}
                  aria-label="Activities"
                  className="flex-wrap"
                >
                  {ACTIVITIES.map((activity) => (
                    <ToggleGroupItem
                      key={activity}
                      value={activity}
                      className={pillClassName}
                    >
                      {activity}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </CardContent>
            </Card>
          </div>

          <Card className={cn(cardClassName, "lg:sticky lg:top-6")}>
            <CardHeader>
              <SectionTitle>Images</SectionTitle>
              <CardDescription>
                The first image becomes the cover photo.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div
                onDragOver={(event) => {
                  event.preventDefault()
                  setIsDragging(true)
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(event) => {
                  event.preventDefault()
                  setIsDragging(false)
                  addFiles(event.dataTransfer.files)
                }}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-8 text-center transition-colors",
                  isDragging
                    ? "border-[#1a9dc4] bg-[#1a9dc4]/5"
                    : errors.images
                      ? "border-destructive bg-destructive/5"
                      : "border-slate-300 bg-slate-50"
                )}
              >
                <ImagePlus
                  aria-hidden="true"
                  className="size-8 text-[#1a9dc4]"
                />
                <p className="text-sm font-medium text-slate-600">
                  Drag &amp; drop images here
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
                  onClick={() =>
                    document.getElementById("destination-images")?.click()
                  }
                >
                  Browse files
                </Button>
                <p className="text-xs text-slate-400">
                  JPG or PNG, up to 5 MB &middot; max {MAX_IMAGES} images
                </p>
                <input
                  id="destination-images"
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={(event) => {
                    addFiles(event.target.files)
                    event.target.value = ""
                  }}
                />
              </div>

              {uploadError && (
                <p className="text-sm text-slate-500">{uploadError}</p>
              )}
              <FieldError message={errors.images} />

              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {images.map((image, index) => (
                    <div
                      key={image.id}
                      className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
                    >
                      <Image
                        src={image.previewUrl}
                        alt={image.name}
                        fill
                        unoptimized
                        sizes="120px"
                        className="object-cover"
                      />
                      {index === 0 && (
                        <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
                          Cover
                        </span>
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Remove ${image.name}`}
                        onClick={() => removeImage(image.id)}
                        className="absolute top-1.5 right-1.5 bg-black/50 text-white opacity-0 transition-opacity hover:bg-black/70 hover:text-white group-hover:opacity-100 focus-visible:opacity-100"
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="col-span-full flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
            <div aria-live="polite">
              {submitState === "success" && (
                <p className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                  <CheckCircle2 aria-hidden="true" className="size-4" />
                  Destination added successfully!
                </p>
              )}
              {submitState === "error" && (
                <p className="flex items-center gap-2 text-sm font-medium text-destructive">
                  <AlertCircle aria-hidden="true" className="size-4" />
                  Couldn&apos;t reach the server &mdash; destination APIs
                  aren&apos;t configured yet.
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                className="h-11 rounded-none border-slate-300 bg-white px-8 text-[13px] font-medium tracking-wide text-slate-600 uppercase hover:bg-slate-50 hover:text-slate-800"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 rounded-none bg-[#1a9dc4] px-8 text-[13px] font-medium tracking-wide text-white uppercase hover:bg-[#178cb0]"
              >
                {isSubmitting && <Spinner />}
                {isSubmitting ? "Adding..." : "Add Destination"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
