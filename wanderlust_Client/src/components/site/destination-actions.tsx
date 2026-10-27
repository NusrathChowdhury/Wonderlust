"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button, buttonVariants } from "@/components/ui/button"
import { Loader2Icon, PencilIcon, Trash2Icon } from "lucide-react"

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
      const res = await fetch(`http://localhost:5000/destinations/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Delete request failed")

      router.push("/destinations")
      router.refresh()
    } catch {
      window.alert(
        "We could not delete this destination. Please try again."
      )
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/destinations/${id}/edit`}
        className={buttonVariants({ variant: "outline" })}
      >
        <PencilIcon data-icon="inline-start" />
        Edit
      </Link>

      <Button
        type="button"
        variant="outline"
        onClick={handleDelete}
        disabled={isDeleting}
        className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
      >
        {isDeleting ? (
          <Loader2Icon
            data-icon="inline-start"
            className="animate-spin"
          />
        ) : (
          <Trash2Icon data-icon="inline-start" />
        )}
        Cancel
      </Button>
    </div>
  )
}
