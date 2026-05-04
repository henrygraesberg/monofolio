// 0001 | import type { HTMLAttributes } from "react"
// 0002 | import { cn } from "@/lib/utils"
// 0003 | 
// 0004 | export const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
// 0005 |   <section className={cn("rounded-panel border border-line bg-surface shadow-panel", className)} {...props} />
// 0006 | )
// 0007 | 
// 0008 | export const CardHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
// 0009 |   <header className={cn("grid gap-1.5 px-4 pb-2 pt-4", className)} {...props} />
// 0010 | )
// 0011 | 
// 0012 | export const CardTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
// 0013 |   <h2 className={cn("card-title flex items-center gap-1.5 text-xl", className)} {...props} />
// 0014 | )
// 0015 | 
// 0016 | export const CardDescription = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
// 0017 |   <p className={cn("text-textMuted", className)} {...props} />
// 0018 | )
// 0019 | 
// 0020 | export const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
// 0021 |   <div className={cn("px-4 pb-4 pt-3", className)} {...props} />
// 0022 | )
