import * as React from "react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type SurfaceCardProps = React.ComponentProps<typeof Card>

/**
 * Shared card surface for primary content areas.
 *
 * Centralizes the border / background / shadow treatment used across
 * auth, profile, settings, search, and log pages so it can be
 * updated in one place.
 */
export function SurfaceCard({ className, ...props }: SurfaceCardProps) {
  return (
    <Card
      className={cn(
        "border-input/60 bg-card/95 shadow-lg shadow-black/30",
        className,
      )}
      {...props}
    />
  )
}

