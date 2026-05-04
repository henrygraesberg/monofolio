// 0001 | import { cva, type VariantProps } from "class-variance-authority"
// 0002 | import type { ButtonHTMLAttributes } from "react"
// 0003 | import { cn } from "@/lib/utils"
// 0004 | 
// 0005 | const buttonVariants = cva(
// 0006 |   "inline-flex items-center justify-center gap-1.5 rounded-full border border-transparent font-semibold transition duration-100 hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-55",
// 0007 |   {
// 0008 |     variants: {
// 0009 |       variant: {
// 0010 |         primary: "bg-gradient-to-br from-brand to-[#2a4e3a] text-white shadow-button",
// 0011 |         ghost: "border-line bg-transparent text-textMain",
// 0012 |         secondary: "border-line bg-surfaceSoft text-textMain",
// 0013 |         danger: "bg-danger text-white",
// 0014 |       },
// 0015 |       size: {
// 0016 |         md: "h-10 px-4",
// 0017 |         sm: "h-8 px-3",
// 0018 |       },
// 0019 |     },
// 0020 |     defaultVariants: {
// 0021 |       variant: "primary",
// 0022 |       size: "md",
// 0023 |     },
// 0024 |   }
// 0025 | )
// 0026 | 
// 0027 | type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>
// 0028 | 
// 0029 | export const Button = ({ className, variant, size, ...props }: ButtonProps) => (
// 0030 |   <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
// 0031 | )
