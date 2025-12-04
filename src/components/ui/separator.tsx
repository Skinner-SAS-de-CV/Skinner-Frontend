"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = (
  {
    className,
    orientation = "horizontal",
    decorative = true,
    ...props
  }: React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
) => (<SeparatorPrimitive.Root
  decorative={decorative}
  orientation={orientation}
  className={cn(
    "shrink-0 bg-border",
    orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
    className
  )}
  data-slot="separator"
  {...props}
/>)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
