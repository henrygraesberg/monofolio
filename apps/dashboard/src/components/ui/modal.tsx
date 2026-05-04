// 0001 | import type { PropsWithChildren } from "react"
// 0002 | 
// 0003 | type ModalProps = PropsWithChildren<{
// 0004 |   open: boolean
// 0005 |   onClose: () => void
// 0006 |   title: string
// 0007 | }>
// 0008 | 
// 0009 | export const Modal = ({ open, onClose, title, children }: ModalProps) => {
// 0010 |   if (!open) {
// 0011 |     return null
// 0012 |   }
// 0013 | 
// 0014 |   return (
// 0015 |     <div className="fixed inset-0 z-40 grid place-items-center bg-[rgb(20_22_20_/_38%)] p-4" onClick={onClose} role="presentation">
// 0016 |       <section
// 0017 |         className="w-[min(580px,100%)]"
// 0018 |         onClick={(event) => event.stopPropagation()}
// 0019 |         role="dialog"
// 0020 |         aria-modal="true"
// 0021 |         aria-label={title}
// 0022 |       >
// 0023 |         {children}
// 0024 |       </section>
// 0025 |     </div>
// 0026 |   )
// 0027 | }
