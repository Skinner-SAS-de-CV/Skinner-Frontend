"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & 
  VariantProps<typeof labelVariants>

const Label = ({ className, ...props }: LabelProps) => (
  <LabelPrimitive.Root
    className={cn(labelVariants(), className)}
    data-slot="label"
    {...props}
  />
)
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
