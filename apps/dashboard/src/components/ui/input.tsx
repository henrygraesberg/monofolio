// 0001 | import type { InputHTMLAttributes } from "react"
// 0002 | import { cn } from "@/lib/utils"
// 0003 | 
// 0004 | export const Input = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => (
// 0005 |   <input
// 0006 |     className={cn(
// 0007 |       "h-10 w-full rounded-[10px] border border-line bg-surfaceSoft px-3 text-[0.95rem] text-textMain outline-offset-1 focus:outline focus:outline-2 focus:outline-[#9bb3a5]",
// 0008 |       className
// 0009 |     )}
// 0010 |     {...props}
// 0011 |   />
// 0012 | )
