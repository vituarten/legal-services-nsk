// src/components/ui/checkbox-simple.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface CheckboxSimpleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const CheckboxSimple = React.forwardRef<HTMLInputElement, CheckboxSimpleProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onCheckedChange) {
        onCheckedChange(e.target.checked)
      }
    }

    return (
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        onChange={handleChange}
        className={cn(
          "h-4 w-4 rounded border border-gray-300 text-primary focus:ring-primary",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    )
  }
)
CheckboxSimple.displayName = "CheckboxSimple"

export { CheckboxSimple }