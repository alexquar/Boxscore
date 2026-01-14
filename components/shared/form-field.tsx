import type { ReactNode } from "react"

import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface FormFieldProps {
  id: string
  label: ReactNode
  children: ReactNode
  className?: string
  /** Optional helper or hint text shown under the field. */
  hint?: ReactNode
  /** Optional content aligned to the right of the label row (e.g. a link). */
  labelExtras?: ReactNode
}

/**
 * Shared wrapper for label + control + helper text.
 *
 * Keeps spacing, typography, and semantics consistent across forms
 * (auth, profile, settings, log, etc.) while allowing flexible
 * field contents.
 */
export function FormField({
  id,
  label,
  children,
  className,
  hint,
  labelExtras,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id}>{label}</Label>
        {labelExtras}
      </div>
      {children}
      {hint && (
        <p className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  )
}

