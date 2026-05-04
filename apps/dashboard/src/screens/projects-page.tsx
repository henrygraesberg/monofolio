// 0001 | import { useForm } from "@tanstack/react-form"
// 0002 | import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
// 0003 | import { useState } from "react"
// 0004 | import { useAdminSession } from "@/components/admin-guard"
// 0005 | import { ResourceCreateModal, ResourceListCard, ResourceScreen } from "@/components/dashboard/resource-screen"
// 0006 | import { Input } from "@/components/ui/input"
// 0007 | import { queryKeys } from "@/lib/query-keys"
// 0008 | import { dashboardMutations, dashboardQueries } from "@/lib/trpc-client"
// 0009 | 
// 0010 | export const ProjectsPage = () => {
// 0011 |   const { trpcClient } = useAdminSession()
// 0012 |   const queryClient = useQueryClient()
// 0013 |   const [isCreateOpen, setIsCreateOpen] = useState(false)
// 0014 | 
// 0015 |   const createForm = useForm({
// 0016 |     defaultValues: {
// 0017 |       title: "",
// 0018 |       url: "",
// 0019 |       shorthandUrl: "",
// 0020 |       sourceControlLink: "",
// 0021 |       imageUrl: "",
// 0022 |     },
// 0023 |   })
// 0024 | 
// 0025 |   const projectsQuery = useQuery({
// 0026 |     queryKey: queryKeys.dashboard.projects,
// 0027 |     queryFn: () => dashboardQueries.findProjects(trpcClient),
// 0028 |   })
// 0029 | 
// 0030 |   const createMutation = useMutation({
// 0031 |     mutationFn: (values: typeof createForm.state.values) =>
// 0032 |       dashboardMutations.createProject(trpcClient, {
// 0033 |         title: values.title.trim(),
// 0034 |         url: values.url.trim() || null,
// 0035 |         shorthandUrl: values.shorthandUrl.trim() || null,
// 0036 |         sourceControlLink: values.sourceControlLink.trim() || null,
// 0037 |         imageUrl: values.imageUrl.trim() || null,
// 0038 |       }),
// 0039 |     onSuccess: async () => {
// 0040 |       await queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.projects })
// 0041 |       createForm.reset()
// 0042 |       setIsCreateOpen(false)
// 0043 |     },
// 0044 |   })
// 0045 | 
// 0046 |   return (
// 0047 |     <ResourceScreen title="Projects" onCreate={() => setIsCreateOpen(true)}>
// 0048 |       <ResourceListCard title="Project list" isLoading={projectsQuery.isPending} loadingText="Loading projects...">
// 0049 |         <ul className="m-0 grid list-none gap-2.5 p-0">
// 0050 |           {(projectsQuery.data ?? []).map((item) => (
// 0051 |             <li className="grid gap-0.5 rounded-xl border border-line bg-surfaceSoft p-3" key={item.id}>
// 0052 |               <strong>{item.title}</strong>
// 0053 |               <span className="text-sm text-textMuted">{item.url ?? item.sourceControlLink ?? "No links"}</span>
// 0054 |             </li>
// 0055 |           ))}
// 0056 |         </ul>
// 0057 |       </ResourceListCard>
// 0058 | 
// 0059 |       <ResourceCreateModal
// 0060 |         open={isCreateOpen}
// 0061 |         onClose={() => setIsCreateOpen(false)}
// 0062 |         title="Create project"
// 0063 |         error={createMutation.isError ? createMutation.error.message : undefined}
// 0064 |         isSubmitting={createMutation.isPending}
// 0065 |         submitLabel="Create"
// 0066 |         onSubmit={(event) => {
// 0067 |           event.preventDefault()
// 0068 |           void createMutation.mutateAsync(createForm.state.values)
// 0069 |         }}
// 0070 |       >
// 0071 |         <createForm.Field name="title">
// 0072 |           {(field) => <Input placeholder="Project title" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
// 0073 |         </createForm.Field>
// 0074 |         <createForm.Field name="url">
// 0075 |           {(field) => <Input placeholder="Project URL" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
// 0076 |         </createForm.Field>
// 0077 |         <createForm.Field name="shorthandUrl">
// 0078 |           {(field) => <Input placeholder="Shorthand URL" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
// 0079 |         </createForm.Field>
// 0080 |         <createForm.Field name="sourceControlLink">
// 0081 |           {(field) => <Input placeholder="Source control URL" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
// 0082 |         </createForm.Field>
// 0083 |         <createForm.Field name="imageUrl">
// 0084 |           {(field) => <Input placeholder="Image URL" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
// 0085 |         </createForm.Field>
// 0086 |       </ResourceCreateModal>
// 0087 |     </ResourceScreen>
// 0088 |   )
// 0089 | }
