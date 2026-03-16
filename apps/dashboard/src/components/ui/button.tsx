import { cva, type VariantProps } from "class-variance-authority"
import type { ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-full border border-transparent font-semibold transition duration-100 hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-55",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-br from-brand to-[#2a4e3a] text-white shadow-button",
        ghost: "border-line bg-transparent text-textMain",
        secondary: "border-line bg-surfaceSoft text-textMain",
        danger: "bg-danger text-white",
      },
      size: {
        md: "h-10 px-4",
        sm: "h-8 px-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>

export const Button = ({ className, variant, size, ...props }: ButtonProps) => (
  <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
)
