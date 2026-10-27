"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Loader2Icon,
  Trash2Icon,
} from "lucide-react"

import EditDestinationDialog from "./EditDestinationDialog"

const API_URL = "http://localhost:5000"

export function DestinationActions({
  id,
  name,
}: {
  id: string
  name: string
}) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = React.useState(false)

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${name}"? This action cannot be undone.`
    )

    if (!confirmed) return

    setIsDeleting(true)

    try {
      const response = await fetch(
        `${API_URL}/destinations/${id}`,
        {
          method: "DELETE",
        }
      )

      if (!response.ok) {
        throw new Error("Delete request failed")
      }

      router.push("/destinations")
      router.refresh()
    } catch (error) {
      console.error("Error deleting destination:", error)

      window.alert(
        "We could not delete this destination. Please try again."
      )
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <EditDestinationDialog id={id} />

      <Button
        type="button"
        variant="outline"
        onClick={handleDelete}
        disabled={isDeleting}
        className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
      >
        {isDeleting ? (
          <Loader2Icon
            className="mr-2 h-4 w-4 animate-spin"
          />
        ) : (
          <Trash2Icon className="mr-2 h-4 w-4" />
        )}

        {isDeleting ? "Deleting..." : "Delete"}
      </Button>
    </div>
  )
}
