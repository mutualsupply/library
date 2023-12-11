import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "utils"
import Spinner from "../Spinner"
import { useFormContext } from "react-hook-form"

const buttonVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed relative",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border border-black border-dashed bg-transparent rounded-none p-1",
        link: "text-black underline-offset-4 underline",
      },
      size: {
        default: "h-9 px-4 py-2 rounded-sm",
        lg: "h-12 rounded-2xl px-8",
        icon: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends Pick<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "className" | "type" | "children" | "disabled" | "onClick"
    >,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, loading, children, type = "button", ...props },
    ref,
  ) => {
    return (
      <button
        {...props}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={loading || props.disabled}
        ref={ref}
        type={type}
      >
        <>
          {loading && (
            <div className="absolute inset-0 flex justify-center align-items-center">
              <Spinner />
            </div>
          )}
          {children}
        </>
      </button>
    )
  },
)
Button.displayName = "Button"

const Submit = React.forwardRef<
  HTMLButtonElement,
  Exclude<ButtonProps, "type">
>(({ children, ...props }, ref) => {
  const { formState } = useFormContext()
  const isLoading = formState.isSubmitting || formState.isValidating
  return (
    <Button type="submit" disabled={isLoading} loading={isLoading} {...props}>
      {children ? children : "Submit"}
    </Button>
  )
})
Submit.displayName = "Submit"

export { Submit, Button, buttonVariants }
