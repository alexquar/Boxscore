"use client"

import { useState } from "react"

import { Star, StarHalf } from "lucide-react"

import { cn } from "@/lib/utils"

type RatingStarsProps = {
  /** Value on a 0–5 scale (can include halves). */
  value: number
  max?: number
  className?: string
}

export function RatingStars({ value, max = 5, className }: RatingStarsProps) {
  const safeValue = Number.isFinite(value) ? Math.min(Math.max(value, 0), max) : 0
  const fullStars = Math.floor(safeValue)
  const hasHalf = safeValue - fullStars >= 0.5
  const emptyStars = max - fullStars - (hasHalf ? 1 : 0)

  return (
    <div className={cn("flex items-center gap-1 text-yellow-400", className)}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 fill-current" />
      ))}
      {hasHalf && <StarHalf className="h-4 w-4 fill-current" />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4 opacity-30" />
      ))}
    </div>
  )
}

type RatingInputProps = {
  /** Name for the hidden form field. */
  name?: string
  /** Maximum number of stars (defaults to 5). */
  max?: number
  /** Initial value on a 0–5 scale. */
  initialValue?: number
}

/**
 * Clickable star rating input for forms.
 *
 * Renders a row of stars that update a hidden input value so it can be
 * submitted with a standard HTML form.
 */
export function RatingInput({ name = "rating", max = 5, initialValue = 0 }: RatingInputProps) {
  const [value, setValue] = useState(
    Number.isFinite(initialValue) ? Math.min(Math.max(initialValue, 0), max) : 0,
  )

  const handleSelect = (index: number) => {
    const next = index + 1
    setValue(next)
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {Array.from({ length: max }).map((_, index) => {
            const isActive = index < value
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleSelect(index)}
                className={cn(
                  "inline-flex h-6 w-6 items-center justify-center text-yellow-400 transition-colors",
                  isActive ? "" : "opacity-30 hover:opacity-60",
                )}
                aria-label={`Set rating to ${index + 1} star${index === 0 ? "" : "s"}`}
              >
                <Star className={cn("h-5 w-5", isActive && "fill-current")} />
              </button>
            )
          })}
        </div>
        <span className="text-xs text-muted-foreground">
          {value > 0 ? `${value} / ${max}` : "No rating yet"}
        </span>
      </div>
      {name && <input type="hidden" name={name} value={value} />}
    </div>
  )
}

