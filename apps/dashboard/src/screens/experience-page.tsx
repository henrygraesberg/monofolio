// 0001 | import { useForm } from "@tanstack/react-form"
// 0002 | import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
// 0003 | import { useState } from "react"
// 0004 | import { useAdminSession } from "@/components/admin-guard"
// 0005 | import { ResourceCreateModal, ResourceListCard, ResourceScreen } from "@/components/dashboard/resource-screen"
// 0006 | import { Input } from "@/components/ui/input"
// 0007 | import { RichTextEditor } from "@/components/ui/rich-text-editor"
// 0008 | import { queryKeys } from "@/lib/query-keys"
// 0009 | import { dashboardMutations, dashboardQueries } from "@/lib/trpc-client"
// 0010 | 
// 0011 | const dateFormat = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short" })
// 0012 | const formatDateRange = (start: Date, end: Date | null) => `${dateFormat.format(start)} - ${end ? dateFormat.format(end) : "Present"}`
// 0013 | 
// 0014 | export const ExperiencePage = () => {
// 0015 |   const { trpcClient } = useAdminSession()
// 0016 |   const queryClient = useQueryClient()
// 0017 |   const [isCreateOpen, setIsCreateOpen] = useState(false)
// 0018 |   const createForm = useForm({ defaultValues: { title: "", employerId: "", startTime: "", endTime: "", description: "" } })
// 0019 | 
// 0020 |   const experienceQuery = useQuery({ queryKey: queryKeys.dashboard.experience, queryFn: () => dashboardQueries.findExperience(trpcClient) })
// 0021 |   const employersQuery = useQuery({ queryKey: queryKeys.dashboard.employers, queryFn: () => dashboardQueries.findEmployers(trpcClient) })
// 0022 | 
// 0023 |   const createMutation = useMutation({
// 0024 |     mutationFn: (values: typeof createForm.state.values) =>
// 0025 |       dashboardMutations.createExperience(trpcClient, {
// 0026 |         title: values.title.trim(),
// 0027 |         employerId: values.employerId,
// 0028 |         startTime: new Date(values.startTime),
// 0029 |         endTime: values.endTime ? new Date(values.endTime) : null,
// 0030 |         description: values.description.trim(),
// 0031 |       }),
// 0032 |     onSuccess: async () => {
// 0033 |       await Promise.all([
// 0034 |         queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.experience }),
// 0035 |         queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.employers }),
// 0036 |       ])
// 0037 |       createForm.reset()
// 0038 |       setIsCreateOpen(false)
// 0039 |     },
// 0040 |   })
// 0041 | 
// 0042 |   const employers = employersQuery.data ?? []
// 0043 | 
// 0044 |   return (
// 0045 |     <ResourceScreen title="Experience" onCreate={() => setIsCreateOpen(true)}>
// 0046 |       <ResourceListCard title="Experience list" isLoading={experienceQuery.isPending} loadingText="Loading experience...">
// 0047 |         <ul className="m-0 grid list-none gap-2.5 p-0">
// 0048 |           {(experienceQuery.data ?? []).map((item) => (
// 0049 |             <li className="grid gap-0.5 rounded-xl border border-line bg-surfaceSoft p-3" key={item.id}>
// 0050 |               <strong>{item.title}</strong>
// 0051 |               <span className="text-sm text-textMuted">{item.employer.name}</span>
// 0052 |               <span className="text-sm text-textMuted">{formatDateRange(item.startTime, item.endTime)}</span>
// 0053 |               {item.description ? (
// 0054 |                 <article
// 0055 |                   className="max-w-none text-textMain [&_h1]:font-serif [&_h1]:text-2xl [&_h1]:my-2 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:my-2 [&_p]:my-2 [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6 [&_li]:my-1 [&_a]:text-brand [&_a]:underline"
// 0056 |                   dangerouslySetInnerHTML={{ __html: item.description }}
// 0057 |                 />
// 0058 |               ) : null}
// 0059 |             </li>
// 0060 |           ))}
// 0061 |         </ul>
// 0062 |       </ResourceListCard>
// 0063 |       <ResourceCreateModal
// 0064 |         open={isCreateOpen}
// 0065 |         onClose={() => setIsCreateOpen(false)}
// 0066 |         title="Create experience"
// 0067 |         error={createMutation.isError ? createMutation.error.message : undefined}
// 0068 |         isSubmitting={createMutation.isPending}
// 0069 |         submitLabel="Create"
// 0070 |         onSubmit={(event) => {
// 0071 |           event.preventDefault()
// 0072 |           void createMutation.mutateAsync(createForm.state.values)
// 0073 |         }}
// 0074 |       >
// 0075 |         <createForm.Field name="title">
// 0076 |           {(field) => <Input placeholder="Title" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
// 0077 |         </createForm.Field>
// 0078 |         <createForm.Field name="employerId">
// 0079 |           {(field) => (
// 0080 |             <select className="h-10 w-full rounded-[10px] border border-line bg-surfaceSoft px-3 text-[0.95rem] text-textMain outline-offset-1 focus:outline focus:outline-2 focus:outline-[#9bb3a5]" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)}>
// 0081 |               <option value="">Select employer</option>
// 0082 |               {employers.map((employer) => (
// 0083 |                 <option key={employer.id} value={employer.id}>
// 0084 |                   {employer.name}
// 0085 |                 </option>
// 0086 |               ))}
// 0087 |             </select>
// 0088 |           )}
// 0089 |         </createForm.Field>
// 0090 |         <createForm.Field name="startTime">
// 0091 |           {(field) => <Input type="date" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
// 0092 |         </createForm.Field>
// 0093 |         <createForm.Field name="endTime">
// 0094 |           {(field) => <Input type="date" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
// 0095 |         </createForm.Field>
// 0096 |         <createForm.Field name="description">
// 0097 |           {(field) => <RichTextEditor value={field.state.value} onChange={(value) => field.handleChange(value)} />}
// 0098 |         </createForm.Field>
// 0099 |       </ResourceCreateModal>
// 0100 |     </ResourceScreen>
// 0101 |   )
// 0102 | }
