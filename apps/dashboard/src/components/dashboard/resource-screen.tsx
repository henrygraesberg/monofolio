import type { FormEvent, PropsWithChildren } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Modal } from "@/components/ui/modal"

export const ResourceScreen = ({
  title,
  description,
  onCreate,
  children,
}: PropsWithChildren<{ title: string; description?: string; onCreate: () => void }>) => (
  <div className="grid gap-4">
    <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="font-serif text-3xl">{title}</h1>
        {description ? <p className="text-textMuted">{description}</p> : null}
      </div>
      <Button onClick={onCreate}>+ Create</Button>
    </header>
    {children}
  </div>
)

export const ResourceListCard = ({
  title,
  description,
  isLoading,
  loadingText,
  children,
}: PropsWithChildren<{
  title: string
  description?: string
  isLoading: boolean
  loadingText: string
}>) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      {description ? <CardDescription>{description}</CardDescription> : null}
    </CardHeader>
    <CardContent>
      {isLoading ? <p className="text-textMuted">{loadingText}</p> : null}
      {children}
    </CardContent>
  </Card>
)

export const ResourceCreateModal = ({
  open,
  onClose,
  title,
  description,
  error,
  isSubmitting,
  submitLabel,
  onSubmit,
  children,
}: PropsWithChildren<{
  open: boolean
  onClose: () => void
  title: string
  description?: string
  error?: string
  isSubmitting: boolean
  submitLabel: string
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}>) => (
  <Modal open={open} onClose={onClose} title={title}>
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent>
        <form className="grid gap-2" onSubmit={onSubmit}>
          {children}
          {error ? <p className="text-textMuted">{error}</p> : null}
          <div className="flex flex-wrap items-center gap-2.5">
            <Button type="submit" disabled={isSubmitting}>
              {submitLabel}
            </Button>
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </Modal>
)
