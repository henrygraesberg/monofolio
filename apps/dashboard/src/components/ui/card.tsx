import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <section className={cn("rounded-panel border border-line bg-surface shadow-panel", className)} {...props} />
)

export const CardHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <header className={cn("grid gap-1.5 px-4 pb-2 pt-4", className)} {...props} />
)

export const CardTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("card-title flex items-center gap-1.5 text-xl", className)} {...props} />
)

export const CardDescription = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-textMuted", className)} {...props} />
)

export const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("px-4 pb-4 pt-3", className)} {...props} />
)
