// 0001 | import { useForm } from "@tanstack/react-form"
// 0002 | import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
// 0003 | import { useState } from "react"
// 0004 | import { useAdminSession } from "@/components/admin-guard"
// 0005 | import { ResourceCreateModal, ResourceListCard, ResourceScreen } from "@/components/dashboard/resource-screen"
// 0006 | import { Input } from "@/components/ui/input"
// 0007 | import { queryKeys } from "@/lib/query-keys"
// 0008 | import { dashboardMutations, dashboardQueries } from "@/lib/trpc-client"
// 0009 | 
// 0010 | export const SchoolsPage = () => {
// 0011 |   const { trpcClient } = useAdminSession()
// 0012 |   const queryClient = useQueryClient()
// 0013 |   const [isCreateOpen, setIsCreateOpen] = useState(false)
// 0014 |   const createForm = useForm({ defaultValues: { schoolName: "", location: "" } })
// 0015 | 
// 0016 |   const schoolsQuery = useQuery({ queryKey: queryKeys.dashboard.schools, queryFn: () => dashboardQueries.findSchools(trpcClient) })
// 0017 | 
// 0018 |   const createMutation = useMutation({
// 0019 |     mutationFn: (values: typeof createForm.state.values) =>
// 0020 |       dashboardMutations.createSchool(trpcClient, { schoolName: values.schoolName.trim(), location: values.location.trim() }),
// 0021 |     onSuccess: async () => {
// 0022 |       await queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.schools })
// 0023 |       createForm.reset()
// 0024 |       setIsCreateOpen(false)
// 0025 |     },
// 0026 |   })
// 0027 | 
// 0028 |   return (
// 0029 |     <ResourceScreen title="Schools" onCreate={() => setIsCreateOpen(true)}>
// 0030 |       <ResourceListCard title="School list" isLoading={schoolsQuery.isPending} loadingText="Loading schools...">
// 0031 |         <ul className="m-0 grid list-none gap-2.5 p-0">
// 0032 |           {(schoolsQuery.data ?? []).map((school) => (
// 0033 |             <li className="grid gap-0.5 rounded-xl border border-line bg-surfaceSoft p-3" key={school.id}>
// 0034 |               <strong>{school.schoolName}</strong>
// 0035 |               <span className="text-sm text-textMuted">{school.location}</span>
// 0036 |             </li>
// 0037 |           ))}
// 0038 |         </ul>
// 0039 |       </ResourceListCard>
// 0040 |       <ResourceCreateModal
// 0041 |         open={isCreateOpen}
// 0042 |         onClose={() => setIsCreateOpen(false)}
// 0043 |         title="Create school"
// 0044 |         error={createMutation.isError ? createMutation.error.message : undefined}
// 0045 |         isSubmitting={createMutation.isPending}
// 0046 |         submitLabel="Create"
// 0047 |         onSubmit={(event) => {
// 0048 |           event.preventDefault()
// 0049 |           void createMutation.mutateAsync(createForm.state.values)
// 0050 |         }}
// 0051 |       >
// 0052 |         <createForm.Field name="schoolName">
// 0053 |           {(field) => <Input placeholder="School name" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
// 0054 |         </createForm.Field>
// 0055 |         <createForm.Field name="location">
// 0056 |           {(field) => <Input placeholder="Location" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
// 0057 |         </createForm.Field>
// 0058 |       </ResourceCreateModal>
// 0059 |     </ResourceScreen>
// 0060 |   )
// 0061 | }
