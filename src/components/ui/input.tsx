import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Eye, EyeOff, Search, X, Check, AlertCircle } from "lucide-react";

import { cn } from "../../lib/utils";

const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default: "",
        ghost: "border-transparent shadow-none bg-transparent",
        filled: "bg-muted border-muted-foreground/20",
        success: "border-green-500 focus-visible:ring-green-500/20",
        error: "border-destructive focus-visible:ring-destructive/20",
        warning: "border-amber-500 focus-visible:ring-amber-500/20",
      },
      size: {
        default: "h-10 px-3 py-2 text-sm",
        sm: "h-8 px-2 py-1 text-xs",
        lg: "h-12 px-4 py-3 text-base",
        xl: "h-14 px-5 py-4 text-lg",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
        lg: "rounded-lg",
        none: "rounded-none",
      },
      hasLeftIcon: {
        true: "pl-10",
      },
      hasRightIcon: {
        true: "pr-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  showPasswordToggle?: boolean;
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      variant,
      size,
      rounded,
      leftIcon,
      rightIcon,
      clearable = false,
      onClear,
      showPasswordToggle = false,
      label,
      helperText,
      error,
      success,
      fullWidth = true,
      value,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(value || "");

    const inputType =
      showPasswordToggle && type === "password"
        ? showPassword
          ? "text"
          : "password"
        : type;

    const hasLeftIcon = !!leftIcon;
    const hasRightIcon =
      !!rightIcon || clearable || (showPasswordToggle && type === "password");

    const currentVariant = error ? "error" : success ? "success" : variant;

    const handleClear = () => {
      setInternalValue("");
      onClear?.();
      // Триггерим событие change для формы
      const event = new Event("input", { bubbles: true });
      if (ref && "current" in ref && ref.current) {
        ref.current.value = "";
        ref.current.dispatchEvent(event);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value);
      props.onChange?.(e);
    };

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}

          <input
            type={inputType}
            className={cn(
              inputVariants({
                variant: currentVariant,
                size,
                rounded,
                hasLeftIcon,
                hasRightIcon,
              }),
              className,
            )}
            ref={ref}
            value={value ?? internalValue}
            onChange={handleChange}
            disabled={disabled}
            {...props}
          />

          <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
            {showPasswordToggle && type === "password" && (
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            )}

            {clearable && internalValue && !disabled && (
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={handleClear}
                tabIndex={-1}
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {rightIcon && !clearable && (
              <div className="text-muted-foreground">{rightIcon}</div>
            )}

            {success && !error && <Check className="h-4 w-4 text-green-500" />}
          </div>
        </div>

        {(helperText || error) && (
          <p
            className={cn(
              "text-xs",
              error ? "text-destructive" : "text-muted-foreground",
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

// Дополнительные специализированные инпуты
const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => (
    <Input
      ref={ref}
      leftIcon={<Search className="h-4 w-4" />}
      placeholder="Поиск..."
      {...props}
    />
  ),
);
SearchInput.displayName = "SearchInput";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => (
    <Input ref={ref} type="password" showPasswordToggle {...props} />
  ),
);
PasswordInput.displayName = "PasswordInput";

export { Input, SearchInput, PasswordInput, inputVariants };
