import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type AlertProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof alertVariants>
const Alert = ({
    className,
    variant,
    ...props
}: AlertProps) => (
  <div
  role="alert"
  className={cn(alertVariants({ variant }), className)}
  data-slot="alert"
  {...props}
  />
)
Alert.displayName = "Alert"

type AlertTitleProps = React.ComponentPropsWithoutRef<"h5">
const AlertTitle = ({
    className,
    ...props
}: AlertTitleProps) => (
  <h5
  className={cn("mb-1 font-medium leading-none tracking-tight", className)}
  data-slot="alert-title"
  {...props}
  />
)
AlertTitle.displayName = "AlertTitle"

type AlertDescriptionProps = React.ComponentPropsWithoutRef<"div">
const AlertDescription = ({
    className,
    ...props
}: AlertDescriptionProps) => (
  <div
  className={cn("text-sm [&_p]:leading-relaxed", className)}
  data-slot="alert-description"
  {...props}
  />
)
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }

