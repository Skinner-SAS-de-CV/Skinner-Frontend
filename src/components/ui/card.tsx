import * as React from "react"

import { cn } from "@/lib/utils"

const Card = (
  {
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>
) => (<div
  className={cn(
    "rounded-xl border bg-card text-card-foreground shadow-sm",
    className
  )}
  data-slot="card"
  {...props}
/>)
Card.displayName = "Card"

const CardHeader = (
  {
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>
) => (<div
  className={cn("flex flex-col space-y-1.5 p-6", className)}
  data-slot="card-header"
  {...props}
/>)
CardHeader.displayName = "CardHeader"

const CardTitle = (
  {
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>
) => (<div
  className={cn("font-semibold leading-none tracking-tight", className)}
  data-slot="card-title"
  {...props}
/>)
CardTitle.displayName = "CardTitle"

const CardDescription = (
  {
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>
) => (<div
  className={cn("text-sm text-muted-foreground", className)}
  data-slot="card-description"
  {...props}
/>)
CardDescription.displayName = "CardDescription"

const CardContent = (
  {
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>
) => (<div className={cn("p-6 pt-0", className)} data-slot="card-content" {...props} />)
CardContent.displayName = "CardContent"

const CardFooter = (
  {
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>
) => (<div
  className={cn("flex items-center p-6 pt-0", className)}
  data-slot="card-footer"
  {...props}
/>)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
