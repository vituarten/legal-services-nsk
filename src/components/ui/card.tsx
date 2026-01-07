import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm transition-all",
  {
    variants: {
      variant: {
        default: "",
        elevated: "shadow-lg hover:shadow-xl",
        ghost: "border-transparent shadow-none",
        bordered: "border-2",
        interactive: "cursor-pointer hover:border-primary/50 hover:shadow-md",
        destructive: "border-destructive/20 bg-destructive/5",
        success: "border-green-200 bg-green-50",
        warning: "border-amber-200 bg-amber-50",
      },
      padding: {
        none: "",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
      hover: {
        none: "",
        lift: "hover:-translate-y-1",
        glow: "hover:shadow-lg hover:shadow-primary/10",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      hover: "none",
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hover, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding, hover, className }))}
      {...props}
    />
  ),
);
Card.displayName = "Card";

// CardHeader с поддержкой иконок и действий
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    action?: React.ReactNode;
    icon?: React.ReactNode;
  }
>(({ className, action, icon, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 p-6",
      action && "flex-row items-start justify-between",
      icon && "flex-row items-center gap-4",
      className,
    )}
    {...props}
  >
    {icon && <div className="shrink-0">{icon}</div>}
    <div className={cn("flex-1", action && "flex items-start justify-between")}>
      <div className="space-y-1.5">{children}</div>
      {action && <div className="shrink-0 ml-4">{action}</div>}
    </div>
  </div>
));
CardHeader.displayName = "CardHeader";

// CardTitle с поддержкой уровней заголовков
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  }
>(({ className, as: Component = "h3", ...props }, ref) => (
  <Component
    ref={ref}
    className={cn(
      "font-semibold leading-none tracking-tight",
      {
        "text-3xl": Component === "h1",
        "text-2xl": Component === "h2" || Component === "h3",
        "text-xl": Component === "h4",
        "text-lg": Component === "h5" || Component === "h6",
      },
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// CardDescription с поддержкой иконок
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    icon?: React.ReactNode;
  }
>(({ className, icon, children, ...props }, ref) => (
  <div className="flex items-start gap-2">
    {icon && <span className="mt-0.5 shrink-0">{icon}</span>}
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  </div>
));
CardDescription.displayName = "CardDescription";

// CardContent с поддержкой разделителей
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    separator?: boolean;
    noPadding?: boolean;
  }
>(({ className, separator = false, noPadding = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      !noPadding && "p-6 pt-0",
      separator && "border-t pt-6",
      className,
    )}
    {...props}
  />
));
CardContent.displayName = "CardContent";

// CardFooter с поддержкой выравнивания
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    align?: "start" | "center" | "end" | "between";
    direction?: "row" | "col";
  }
>(({ className, align = "start", direction = "row", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center p-6 pt-0",
      {
        "justify-start": align === "start",
        "justify-center": align === "center",
        "justify-end": align === "end",
        "justify-between": align === "between",
        "flex-row": direction === "row",
        "flex-col gap-2": direction === "col",
      },
      className,
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// Дополнительный компонент для карточек с изображением
const CardImage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    src?: string;
    alt?: string;
    aspectRatio?: "square" | "video" | "auto";
  }
>(({ className, src, alt, aspectRatio = "auto", children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "overflow-hidden",
      {
        "aspect-square": aspectRatio === "square",
        "aspect-video": aspectRatio === "video",
      },
      className,
    )}
    {...props}
  >
    {src ? (
      <img
        src={src}
        alt={alt || "Card image"}
        className="h-full w-full object-cover transition-transform hover:scale-105"
      />
    ) : (
      children
    )}
  </div>
));
CardImage.displayName = "CardImage";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardImage,
};
