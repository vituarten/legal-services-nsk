import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, Check, Info } from "lucide-react";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "flex items-center gap-1.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-foreground",
        destructive: "text-destructive",
        success: "text-green-600",
        warning: "text-amber-600",
        muted: "text-muted-foreground",
        secondary: "text-secondary-foreground",
      },
      size: {
        default: "text-sm",
        sm: "text-xs",
        lg: "text-base",
        xl: "text-lg",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
      required: {
        true: "after:content-['*'] after:ml-0.5 after:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      weight: "medium",
    },
  },
);

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  icon?: React.ReactNode;
  helperText?: string;
  tooltip?: string;
  badge?: string;
  badgeVariant?: "default" | "destructive" | "success" | "warning" | "outline";
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(
  (
    {
      className,
      variant,
      size,
      weight,
      required,
      icon,
      helperText,
      tooltip,
      badge,
      badgeVariant = "outline",
      children,
      ...props
    },
    ref,
  ) => {
    const badgeClass = cn("ml-2 px-1.5 py-0.5 text-xs rounded-full", {
      "bg-primary text-primary-foreground": badgeVariant === "default",
      "bg-destructive text-destructive-foreground":
        badgeVariant === "destructive",
      "bg-green-100 text-green-800": badgeVariant === "success",
      "bg-amber-100 text-amber-800": badgeVariant === "warning",
      "border border-input bg-transparent": badgeVariant === "outline",
    });

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LabelPrimitive.Root
              ref={ref}
              className={cn(
                labelVariants({ variant, size, weight, required, className }),
              )}
              data-tooltip={tooltip}
              {...props}
            >
              {icon && <span className="shrink-0">{icon}</span>}
              {children}
              {badge && <span className={badgeClass}>{badge}</span>}
            </LabelPrimitive.Root>

            {tooltip && (
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground"
                title={tooltip}
              >
                <Info className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>

        {helperText && (
          <p
            className={cn(
              "text-xs",
              variant === "destructive"
                ? "text-destructive"
                : variant === "success"
                  ? "text-green-600"
                  : variant === "warning"
                    ? "text-amber-600"
                    : "text-muted-foreground",
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
Label.displayName = LabelPrimitive.Root.displayName;

// Специализированные Label компоненты
const LabelWithIcon = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps & { iconType?: "info" | "warning" | "success" }
>(({ iconType = "info", children, ...props }, ref) => {
  const icons = {
    info: <Info className="h-3.5 w-3.5" />,
    warning: <AlertCircle className="h-3.5 w-3.5" />,
    success: <Check className="h-3.5 w-3.5" />,
  };

  return (
    <Label
      ref={ref}
      icon={icons[iconType]}
      variant={
        iconType === "warning"
          ? "warning"
          : iconType === "success"
            ? "success"
            : "default"
      }
      {...props}
    >
      {children}
    </Label>
  );
});
LabelWithIcon.displayName = "LabelWithIcon";

const RequiredLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>((props, ref) => <Label ref={ref} required {...props} />);
RequiredLabel.displayName = "RequiredLabel";

export { Label, LabelWithIcon, RequiredLabel, labelVariants };
