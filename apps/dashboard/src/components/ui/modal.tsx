import type { PropsWithChildren } from "react"

type ModalProps = PropsWithChildren<{
  open: boolean
  onClose: () => void
  title: string
}>

export const Modal = ({ open, onClose, title, children }: ModalProps) => {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-[rgb(20_22_20_/_38%)] p-4" onClick={onClose} role="presentation">
      <section
        className="w-[min(580px,100%)]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {children}
      </section>
    </div>
  )
}
