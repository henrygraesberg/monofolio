// 0001 | import type { FormEvent, PropsWithChildren } from "react"
// 0002 | import { Button } from "@/components/ui/button"
// 0003 | import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// 0004 | import { Modal } from "@/components/ui/modal"
// 0005 | 
// 0006 | export const ResourceScreen = ({
// 0007 |   title,
// 0008 |   description,
// 0009 |   onCreate,
// 0010 |   children,
// 0011 | }: PropsWithChildren<{ title: string; description?: string; onCreate: () => void }>) => (
// 0012 |   <div className="grid gap-4">
// 0013 |     <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
// 0014 |       <div>
// 0015 |         <h1 className="font-serif text-3xl">{title}</h1>
// 0016 |         {description ? <p className="text-textMuted">{description}</p> : null}
// 0017 |       </div>
// 0018 |       <Button onClick={onCreate}>+ Create</Button>
// 0019 |     </header>
// 0020 |     {children}
// 0021 |   </div>
// 0022 | )
// 0023 | 
// 0024 | export const ResourceListCard = ({
// 0025 |   title,
// 0026 |   description,
// 0027 |   isLoading,
// 0028 |   loadingText,
// 0029 |   children,
// 0030 | }: PropsWithChildren<{
// 0031 |   title: string
// 0032 |   description?: string
// 0033 |   isLoading: boolean
// 0034 |   loadingText: string
// 0035 | }>) => (
// 0036 |   <Card>
// 0037 |     <CardHeader>
// 0038 |       <CardTitle>{title}</CardTitle>
// 0039 |       {description ? <CardDescription>{description}</CardDescription> : null}
// 0040 |     </CardHeader>
// 0041 |     <CardContent>
// 0042 |       {isLoading ? <p className="text-textMuted">{loadingText}</p> : null}
// 0043 |       {children}
// 0044 |     </CardContent>
// 0045 |   </Card>
// 0046 | )
// 0047 | 
// 0048 | export const ResourceCreateModal = ({
// 0049 |   open,
// 0050 |   onClose,
// 0051 |   title,
// 0052 |   description,
// 0053 |   error,
// 0054 |   isSubmitting,
// 0055 |   submitLabel,
// 0056 |   onSubmit,
// 0057 |   children,
// 0058 | }: PropsWithChildren<{
// 0059 |   open: boolean
// 0060 |   onClose: () => void
// 0061 |   title: string
// 0062 |   description?: string
// 0063 |   error?: string
// 0064 |   isSubmitting: boolean
// 0065 |   submitLabel: string
// 0066 |   onSubmit: (event: FormEvent<HTMLFormElement>) => void
// 0067 | }>) => (
// 0068 |   <Modal open={open} onClose={onClose} title={title}>
// 0069 |     <Card>
// 0070 |       <CardHeader>
// 0071 |         <CardTitle>{title}</CardTitle>
// 0072 |         {description ? <CardDescription>{description}</CardDescription> : null}
// 0073 |       </CardHeader>
// 0074 |       <CardContent>
// 0075 |         <form className="grid gap-2" onSubmit={onSubmit}>
// 0076 |           {children}
// 0077 |           {error ? <p className="text-textMuted">{error}</p> : null}
// 0078 |           <div className="flex flex-wrap items-center gap-2.5">
// 0079 |             <Button type="submit" disabled={isSubmitting}>
// 0080 |               {submitLabel}
// 0081 |             </Button>
// 0082 |             <Button type="button" variant="ghost" onClick={onClose}>
// 0083 |               Cancel
// 0084 |             </Button>
// 0085 |           </div>
// 0086 |         </form>
// 0087 |       </CardContent>
// 0088 |     </Card>
// 0089 |   </Modal>
// 0090 | )
