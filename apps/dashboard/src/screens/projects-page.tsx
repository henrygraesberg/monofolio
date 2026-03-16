import { useForm } from "@tanstack/react-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useAdminSession } from "@/components/admin-guard"
import { ResourceCreateModal, ResourceListCard, ResourceScreen } from "@/components/dashboard/resource-screen"
import { Input } from "@/components/ui/input"
import { queryKeys } from "@/lib/query-keys"
import { dashboardMutations, dashboardQueries } from "@/lib/trpc-client"

export const ProjectsPage = () => {
  const { trpcClient } = useAdminSession()
  const queryClient = useQueryClient()
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const createForm = useForm({
    defaultValues: {
      title: "",
      url: "",
      shorthandUrl: "",
      sourceControlLink: "",
      imageUrl: "",
    },
  })

  const projectsQuery = useQuery({
    queryKey: queryKeys.dashboard.projects,
    queryFn: () => dashboardQueries.findProjects(trpcClient),
  })

  const createMutation = useMutation({
    mutationFn: (values: typeof createForm.state.values) =>
      dashboardMutations.createProject(trpcClient, {
        title: values.title.trim(),
        url: values.url.trim() || null,
        shorthandUrl: values.shorthandUrl.trim() || null,
        sourceControlLink: values.sourceControlLink.trim() || null,
        imageUrl: values.imageUrl.trim() || null,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.projects })
      createForm.reset()
      setIsCreateOpen(false)
    },
  })

  return (
    <ResourceScreen title="Projects" onCreate={() => setIsCreateOpen(true)}>
      <ResourceListCard title="Project list" isLoading={projectsQuery.isPending} loadingText="Loading projects...">
        <ul className="m-0 grid list-none gap-2.5 p-0">
          {(projectsQuery.data ?? []).map((item) => (
            <li className="grid gap-0.5 rounded-xl border border-line bg-surfaceSoft p-3" key={item.id}>
              <strong>{item.title}</strong>
              <span className="text-sm text-textMuted">{item.url ?? item.sourceControlLink ?? "No links"}</span>
            </li>
          ))}
        </ul>
      </ResourceListCard>

      <ResourceCreateModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create project"
        error={createMutation.isError ? createMutation.error.message : undefined}
        isSubmitting={createMutation.isPending}
        submitLabel="Create"
        onSubmit={(event) => {
          event.preventDefault()
          void createMutation.mutateAsync(createForm.state.values)
        }}
      >
        <createForm.Field name="title">
          {(field) => <Input placeholder="Project title" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
        </createForm.Field>
        <createForm.Field name="url">
          {(field) => <Input placeholder="Project URL" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
        </createForm.Field>
        <createForm.Field name="shorthandUrl">
          {(field) => <Input placeholder="Shorthand URL" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
        </createForm.Field>
        <createForm.Field name="sourceControlLink">
          {(field) => <Input placeholder="Source control URL" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
        </createForm.Field>
        <createForm.Field name="imageUrl">
          {(field) => <Input placeholder="Image URL" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
        </createForm.Field>
      </ResourceCreateModal>
    </ResourceScreen>
  )
}
