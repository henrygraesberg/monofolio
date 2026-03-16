import { useForm } from "@tanstack/react-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useAdminSession } from "@/components/admin-guard"
import { ResourceCreateModal, ResourceListCard, ResourceScreen } from "@/components/dashboard/resource-screen"
import { Input } from "@/components/ui/input"
import { queryKeys } from "@/lib/query-keys"
import { dashboardMutations, dashboardQueries } from "@/lib/trpc-client"

export const SchoolsPage = () => {
  const { trpcClient } = useAdminSession()
  const queryClient = useQueryClient()
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const createForm = useForm({ defaultValues: { schoolName: "", location: "" } })

  const schoolsQuery = useQuery({ queryKey: queryKeys.dashboard.schools, queryFn: () => dashboardQueries.findSchools(trpcClient) })

  const createMutation = useMutation({
    mutationFn: (values: typeof createForm.state.values) =>
      dashboardMutations.createSchool(trpcClient, { schoolName: values.schoolName.trim(), location: values.location.trim() }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.schools })
      createForm.reset()
      setIsCreateOpen(false)
    },
  })

  return (
    <ResourceScreen title="Schools" onCreate={() => setIsCreateOpen(true)}>
      <ResourceListCard title="School list" isLoading={schoolsQuery.isPending} loadingText="Loading schools...">
        <ul className="m-0 grid list-none gap-2.5 p-0">
          {(schoolsQuery.data ?? []).map((school) => (
            <li className="grid gap-0.5 rounded-xl border border-line bg-surfaceSoft p-3" key={school.id}>
              <strong>{school.schoolName}</strong>
              <span className="text-sm text-textMuted">{school.location}</span>
            </li>
          ))}
        </ul>
      </ResourceListCard>
      <ResourceCreateModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create school"
        error={createMutation.isError ? createMutation.error.message : undefined}
        isSubmitting={createMutation.isPending}
        submitLabel="Create"
        onSubmit={(event) => {
          event.preventDefault()
          void createMutation.mutateAsync(createForm.state.values)
        }}
      >
        <createForm.Field name="schoolName">
          {(field) => <Input placeholder="School name" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
        </createForm.Field>
        <createForm.Field name="location">
          {(field) => <Input placeholder="Location" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
        </createForm.Field>
      </ResourceCreateModal>
    </ResourceScreen>
  )
}
