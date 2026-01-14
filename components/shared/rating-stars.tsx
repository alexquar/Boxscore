"use client"

import { useState, type MouseEvent } from "react"

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
  /** Controlled value on a 0–max scale, in 0.5 increments. */
  value?: number
  /** Uncontrolled initial value on a 0–max scale, in 0.5 increments. */
  defaultValue?: number
  /** @deprecated Use defaultValue instead. */
  initialValue?: number
  /** Called whenever the rating changes (may be a half value like 3.5). */
  onChange?: (value: number) => void
  /** Optional className for the outer wrapper. */
  className?: string
}

/**
 * Clickable star rating input for forms.
 *
 * Renders a row of stars that update a hidden input value so it can be
 * submitted with a standard HTML form.
 */
export function RatingInput({
  name = "rating",
  max = 5,
  value,
  defaultValue,
  initialValue,
  onChange,
  className,
}: RatingInputProps) {
  const clamp = (val: number | undefined) => {
    if (!Number.isFinite(val)) return 0
    const clamped = Math.min(Math.max(val as number, 0), max)
    // Snap to the nearest 0.5 step so external values stay aligned
    return Math.round(clamped * 2) / 2
  }

  // Support both controlled and uncontrolled usage.
  const [internalValue, setInternalValue] = useState<number>(() =>
    clamp(defaultValue ?? initialValue ?? 0),
  )

  const isControlled = value !== undefined
  const currentValue = isControlled ? clamp(value) : internalValue

  const handleSelect = (index: number, event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const isHalf = clickX < rect.width / 2

    const next = index + (isHalf ? 0.5 : 1)

    if (!isControlled) {
      setInternalValue(next)
    }

    onChange?.(next)
  }

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {Array.from({ length: max }).map((_, index) => {
            const starValue = index + 1
            const isFull = currentValue >= starValue
            const isHalf = !isFull && currentValue >= starValue - 0.5
            const isActive = isFull || isHalf
            return (
              <button
                key={index}
                type="button"
                onClick={(event) => handleSelect(index, event)}
                className={cn(
                  "inline-flex h-6 w-6 items-center justify-center text-yellow-400 transition-colors",
                  isActive ? "" : "opacity-30 hover:opacity-60",
                )}
                aria-label={`Set rating to ${starValue} star${starValue === 1 ? "" : "s"}`}
              >
                {isFull ? (
                  <Star className="h-5 w-5 fill-current" />
                ) : isHalf ? (
                  <StarHalf className="h-5 w-5 fill-current" />
                ) : (
                  <Star className="h-5 w-5" />
                )}
              </button>
            )
          })}
        </div>
        <span className="text-xs text-muted-foreground">
          {currentValue > 0 ? `${currentValue} / ${max}` : ""}
        </span>
      </div>
      {name && <input type="hidden" name={name} value={currentValue} />}
    </div>
  )
}
