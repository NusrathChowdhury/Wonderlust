"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Loader2, Pencil, Save, X } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const API_URL = "http://localhost:5000"

type DestinationForm = {
    name: string
    country: string
    category: string
    price: string
    duration: string
    departureDate: string
    imageUrl: string
    description: string
}

const emptyForm: DestinationForm = {
    name: "",
    country: "",
    category: "",
    price: "",
    duration: "",
    departureDate: "",
    imageUrl: "",
    description: "",
}

export default function EditDestinationDialog({
    id,
}: {
    id: string
}) {
    const router = useRouter()

    const [open, setOpen] = React.useState(false)
    const [form, setForm] = React.useState<DestinationForm>(emptyForm)
    const [isLoading, setIsLoading] = React.useState(false)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [error, setError] = React.useState("")
    const [success, setSuccess] = React.useState("")

    React.useEffect(() => {
        if (!open) return

        const loadDestination = async () => {
            setIsLoading(true)
            setError("")
            setSuccess("")

            try {
                const response = await fetch(
                    `${API_URL}/destinations/${id}`,
                    { cache: "no-store" }
                )

                if (!response.ok) {
                    throw new Error("Failed to load destination.")
                }

                const data = await response.json()

                if (!data) {
                    throw new Error("Destination not found.")
                }

                setForm({
                    name: data.name ?? "",
                    country: data.country ?? "",
                    category: data.category ?? "",
                    price: data.price != null ? String(data.price) : "",
                    duration: data.duration ?? "",
                    departureDate: data.departureDate
                        ? String(data.departureDate).slice(0, 10)
                        : "",
                    imageUrl: data.imageUrl ?? "",
                    description: data.description ?? "",
                })
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong while loading."
                )
            } finally {
                setIsLoading(false)
            }
        }

        loadDestination()
    }, [open, id])

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = event.target

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }))
    }

    const handleCategoryChange = (value: string) => {
        setForm((previous) => ({
            ...previous,
            category: value,
        }))
    }

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()

        setError("")
        setSuccess("")

        if (
            !form.name.trim() ||
            !form.country.trim() ||
            !form.category ||
            !form.price.trim() ||
            !form.duration.trim() ||
            !form.departureDate ||
            !form.description.trim()
        ) {
            setError("Please fill in all required fields.")
            return
        }

        const price = Number(form.price)

        if (!Number.isFinite(price) || price < 0) {
            setError("Please enter a valid, non-negative price.")
            return
        }

        setIsSubmitting(true)

        try {
            const updatedData = {
                name: form.name.trim(),
                country: form.country.trim(),
                category: form.category,
                price,
                duration: form.duration.trim(),
                departureDate: form.departureDate,
                imageUrl: form.imageUrl.trim(),
                description: form.description.trim(),
            }

            const response = await fetch(
                `${API_URL}/destination/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedData),
                }
            )

            const result = await response.json().catch(() => null)

            if (!response.ok) {
                throw new Error(
                    result?.message || "Failed to update destination."
                )
            }

            setSuccess("Destination updated successfully!")

            setOpen(false)
            router.refresh()
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong while saving."
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <Button
                        type="button"
                        variant="outline"
                        className="border-[#183b32]/20 text-[#183b32] hover:bg-[#183b32] hover:text-white"
                    />
                }
            >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto border-0 bg-[#f7faf8] sm:max-w-2xl">
                <DialogHeader className="rounded-xl bg-[#183b32] p-5 text-white">
                    <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
                        <Pencil className="h-5 w-5" />
                        Edit Destination
                    </DialogTitle>

                    <DialogDescription className="text-white/75">
                        Update the destination details below and save your changes.
                    </DialogDescription>
                </DialogHeader>

                {isLoading ? (
                    <div className="flex items-center justify-center gap-3 py-12 text-[#183b32]">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Loading destination...
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5 pt-4">
                        {error && (
                            <div
                                role="alert"
                                className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                            >
                                {error}
                            </div>
                        )}

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Destination Name *</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Cox's Bazar"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="country">Country *</Label>
                                <Input
                                    id="country"
                                    name="country"
                                    value={form.country}
                                    onChange={handleChange}
                                    placeholder="e.g. Bangladesh"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Category *</Label>
                                <Select
                                    value={form.category}
                                    onValueChange={handleCategoryChange}
                                >
                                    <SelectTrigger id="category" className="w-full">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="Beach">Beach</SelectItem>
                                        <SelectItem value="Mountain">Mountain</SelectItem>
                                        <SelectItem value="City">City</SelectItem>
                                        <SelectItem value="Adventure">Adventure</SelectItem>
                                        <SelectItem value="Nature">Nature</SelectItem>
                                        <SelectItem value="Historical">Historical</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="price">Price (৳) *</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    min="0"
                                    step="any"
                                    value={form.price}
                                    onChange={handleChange}
                                    placeholder="Enter price"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="duration">Duration *</Label>
                                <Input
                                    id="duration"
                                    name="duration"
                                    value={form.duration}
                                    onChange={handleChange}
                                    placeholder="e.g. 3 days, 2 nights"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="departureDate">Departure Date *</Label>
                                <Input
                                    id="departureDate"
                                    name="departureDate"
                                    type="date"
                                    value={form.departureDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="imageUrl">Image URL</Label>
                            <Input
                                id="imageUrl"
                                name="imageUrl"
                                type="url"
                                value={form.imageUrl}
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Describe this destination..."
                                rows={5}
                                required
                            />
                        </div>

                        <div className="flex flex-col-reverse gap-3 border-t border-[#183b32]/10 pt-4 sm:flex-row sm:justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                                disabled={isSubmitting}
                                className="border-[#183b32]/20"
                            >
                                <X className="mr-2 h-4 w-4" />
                                Delete
                            </Button>

                            <Button
                                type="submit"
                                disabled={isSubmitting || isLoading}
                                className="bg-[#183b32] text-white hover:bg-[#245448]"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    )
}
