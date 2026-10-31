
"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Toaster, toast } from "@/components/ui/toast"
import { PlusIcon, XIcon } from "lucide-react"
import { authClient } from "@/lib/auth-client"

const CATEGORIES = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
  "Wildlife",
  "Desert",
  "Island",
]

const EMPTY_FORM = {
  name: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
}

type FormState = typeof EMPTY_FORM
type FormErrors = Partial<Record<keyof FormState, string>>

const validate = (form: FormState): FormErrors => {
  const errors: FormErrors = {}

  if (!form.name.trim()) errors.name = "Destination name is required"
  if (!form.country.trim()) errors.country = "Country is required"
  if (!form.category) errors.category = "Please select a category"

  const price = Number(form.price)

  if (!form.price.trim()) errors.price = "Price is required"
  else if (Number.isNaN(price) || price <= 0)
    errors.price = "Enter a valid price"

  if (!form.duration.trim()) errors.duration = "Duration is required"

  if (!form.departureDate)
    errors.departureDate = "Departure date is required"

  if (!form.imageUrl.trim()) errors.imageUrl = "Image URL is required"
  else if (!/^https?:\/\/\S+\.\S+/.test(form.imageUrl.trim()))
    errors.imageUrl = "Enter a valid URL (https://...)"

  if (!form.description.trim())
    errors.description = "Description is required"

  return errors
}

export default function AddDestinationForm() {
  const [form, setForm] = React.useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = React.useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const setField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleReset = () => {
    setForm(EMPTY_FORM)
    setErrors({})
  }

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    const nextErrors = validate(form)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)

    try {
      const { data, error } = await authClient.token()

      if (error || !data?.token) {
        throw new Error("Unable to get authentication token")
      }

      const token = data.token

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`)
      }

      toast.add({
        type: "success",
        title: "Travel package added",
        description: `${form.name} has been added successfully.`,
      })

      handleReset()
    } catch (error) {
      console.error("Add destination error:", error)

      toast.add({
        type: "error",
        title: "Something went wrong",
        description:
          "The travel package could not be added. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="px-4 py-16">
      <Toaster />

      <div className="mx-auto max-w-2xl">
        <h1 className="font-serif text-3xl md:text-4xl">
          Add New Travel Package
        </h1>

        <Card className="mt-8">
          <CardContent>
            <form onSubmit={handleSubmit} noValidate>
              <FieldGroup className="gap-5">
                <Field orientation="vertical">
                  <FieldLabel htmlFor="name">
                    Destination Name
                  </FieldLabel>

                  <Input
                    id="name"
                    placeholder="Bali Paradise"
                    value={form.name}
                    onChange={(event) =>
                      setField("name", event.target.value)
                    }
                    aria-invalid={!!errors.name}
                  />

                  {errors.name && (
                    <p className="text-sm text-destructive">
                      {errors.name}
                    </p>
                  )}
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field orientation="vertical">
                    <FieldLabel htmlFor="country">Country</FieldLabel>

                    <Input
                      id="country"
                      placeholder="Indonesia"
                      value={form.country}
                      onChange={(event) =>
                        setField("country", event.target.value)
                      }
                      aria-invalid={!!errors.country}
                    />

                    {errors.country && (
                      <p className="text-sm text-destructive">
                        {errors.country}
                      </p>
                    )}
                  </Field>

                  <Field orientation="vertical">
                    <FieldLabel>Category</FieldLabel>

                    <Select
                      value={form.category}
                      onValueChange={(value) =>
                        setField("category", value ?? "")
                      }
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={!!errors.category}
                      >
                        <SelectValue placeholder="Beach" />
                      </SelectTrigger>

                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem
                            key={category}
                            value={category}
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {errors.category && (
                      <p className="text-sm text-destructive">
                        {errors.category}
                      </p>
                    )}
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field orientation="vertical">
                    <FieldLabel htmlFor="price">
                      Price (USD)
                    </FieldLabel>

                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="599.00"
                      value={form.price}
                      onChange={(event) =>
                        setField("price", event.target.value)
                      }
                      aria-invalid={!!errors.price}
                    />

                    {errors.price && (
                      <p className="text-sm text-destructive">
                        {errors.price}
                      </p>
                    )}
                  </Field>

                  <Field orientation="vertical">
                    <FieldLabel htmlFor="duration">
                      Duration
                    </FieldLabel>

                    <Input
                      id="duration"
                      placeholder="e.g., 7 Days/6 Nights"
                      value={form.duration}
                      onChange={(event) =>
                        setField("duration", event.target.value)
                      }
                      aria-invalid={!!errors.duration}
                    />

                    {errors.duration && (
                      <p className="text-sm text-destructive">
                        {errors.duration}
                      </p>
                    )}
                  </Field>
                </div>

                <Field orientation="vertical">
                  <FieldLabel htmlFor="departureDate">
                    Departure Date
                  </FieldLabel>

                  <Input
                    id="departureDate"
                    type="date"
                    value={form.departureDate}
                    onChange={(event) =>
                      setField("departureDate", event.target.value)
                    }
                    aria-invalid={!!errors.departureDate}
                  />

                  {errors.departureDate && (
                    <p className="text-sm text-destructive">
                      {errors.departureDate}
                    </p>
                  )}
                </Field>

                <Field orientation="vertical">
                  <FieldLabel htmlFor="imageUrl">
                    Image URL
                  </FieldLabel>

                  <Input
                    id="imageUrl"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={form.imageUrl}
                    onChange={(event) =>
                      setField("imageUrl", event.target.value)
                    }
                    aria-invalid={!!errors.imageUrl}
                  />

                  {errors.imageUrl && (
                    <p className="text-sm text-destructive">
                      {errors.imageUrl}
                    </p>
                  )}
                </Field>

                <Field orientation="vertical">
                  <FieldLabel htmlFor="description">
                    Description
                  </FieldLabel>

                  <Textarea
                    id="description"
                    placeholder="Describe the travel experience..."
                    value={form.description}
                    onChange={(event) =>
                      setField("description", event.target.value)
                    }
                    aria-invalid={!!errors.description}
                  />

                  {errors.description && (
                    <p className="text-sm text-destructive">
                      {errors.description}
                    </p>
                  )}
                </Field>

                <div className="flex flex-wrap justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleReset}
                    disabled={isSubmitting}
                  >
                    <XIcon data-icon="inline-start" />
                    Cancel
                  </Button>

                  <Button type="submit" disabled={isSubmitting}>
                    <PlusIcon data-icon="inline-start" />
                    {isSubmitting
                      ? "Adding..."
                      : "Add Travel Package"}
                  </Button>
                </div>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
