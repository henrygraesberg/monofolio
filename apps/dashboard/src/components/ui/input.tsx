import type { InputHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export const Input = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn(
      "h-10 w-full rounded-[10px] border border-line bg-surfaceSoft px-3 text-[0.95rem] text-textMain outline-offset-1 focus:outline focus:outline-2 focus:outline-[#9bb3a5]",
      className
    )}
    {...props}
  />
)
