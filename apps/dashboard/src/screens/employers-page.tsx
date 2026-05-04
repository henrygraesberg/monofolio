// 0001 | import { useForm } from "@tanstack/react-form"
// 0002 | import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
// 0003 | import { useState } from "react"
// 0004 | import { useAdminSession } from "@/components/admin-guard"
// 0005 | import { ResourceCreateModal, ResourceListCard, ResourceScreen } from "@/components/dashboard/resource-screen"
// 0006 | import { Input } from "@/components/ui/input"
// 0007 | import { queryKeys } from "@/lib/query-keys"
// 0008 | import { dashboardMutations, dashboardQueries } from "@/lib/trpc-client"
// 0009 | 
// 0010 | export const EmployersPage = () => {
// 0011 |   const { trpcClient } = useAdminSession()
// 0012 |   const queryClient = useQueryClient()
// 0013 |   const [isCreateOpen, setIsCreateOpen] = useState(false)
// 0014 |   const createForm = useForm({ defaultValues: { name: "" } })
// 0015 | 
// 0016 |   const employersQuery = useQuery({
// 0017 |     queryKey: queryKeys.dashboard.employers,
// 0018 |     queryFn: () => dashboardQueries.findEmployers(trpcClient),
// 0019 |   })
// 0020 | 
// 0021 |   const createMutation = useMutation({
// 0022 |     mutationFn: (values: typeof createForm.state.values) =>
// 0023 |       dashboardMutations.createEmployer(trpcClient, { name: values.name.trim() }),
// 0024 |     onSuccess: async () => {
// 0025 |       await queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.employers })
// 0026 |       createForm.reset()
// 0027 |       setIsCreateOpen(false)
// 0028 |     },
// 0029 |   })
// 0030 | 
// 0031 |   return (
// 0032 |     <ResourceScreen title="Employers" onCreate={() => setIsCreateOpen(true)}>
// 0033 |       <ResourceListCard title="Employer list" isLoading={employersQuery.isPending} loadingText="Loading employers...">
// 0034 |         <ul className="m-0 grid list-none gap-2.5 p-0">
// 0035 |           {(employersQuery.data ?? []).map((employer) => (
// 0036 |             <li className="grid gap-0.5 rounded-xl border border-line bg-surfaceSoft p-3" key={employer.id}>
// 0037 |               <strong>{employer.name}</strong>
// 0038 |               <span className="text-sm text-textMuted">{employer.id}</span>
// 0039 |             </li>
// 0040 |           ))}
// 0041 |         </ul>
// 0042 |       </ResourceListCard>
// 0043 |       <ResourceCreateModal
// 0044 |         open={isCreateOpen}
// 0045 |         onClose={() => setIsCreateOpen(false)}
// 0046 |         title="Create employer"
// 0047 |         error={createMutation.isError ? createMutation.error.message : undefined}
// 0048 |         isSubmitting={createMutation.isPending}
// 0049 |         submitLabel="Create"
// 0050 |         onSubmit={(event) => {
// 0051 |           event.preventDefault()
// 0052 |           void createMutation.mutateAsync(createForm.state.values)
// 0053 |         }}
// 0054 |       >
// 0055 |         <createForm.Field name="name">
// 0056 |           {(field) => <Input placeholder="Employer name" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
// 0057 |         </createForm.Field>
// 0058 |       </ResourceCreateModal>
// 0059 |     </ResourceScreen>
// 0060 |   )
// 0061 | }
