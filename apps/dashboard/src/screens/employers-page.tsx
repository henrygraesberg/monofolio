import { useForm } from "@tanstack/react-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useAdminSession } from "@/components/admin-guard"
import { ResourceCreateModal, ResourceListCard, ResourceScreen } from "@/components/dashboard/resource-screen"
import { Input } from "@/components/ui/input"
import { queryKeys } from "@/lib/query-keys"
import { dashboardMutations, dashboardQueries } from "@/lib/trpc-client"

export const EmployersPage = () => {
  const { trpcClient } = useAdminSession()
  const queryClient = useQueryClient()
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const createForm = useForm({ defaultValues: { name: "" } })

  const employersQuery = useQuery({
    queryKey: queryKeys.dashboard.employers,
    queryFn: () => dashboardQueries.findEmployers(trpcClient),
  })

  const createMutation = useMutation({
    mutationFn: (values: typeof createForm.state.values) =>
      dashboardMutations.createEmployer(trpcClient, { name: values.name.trim() }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.employers })
      createForm.reset()
      setIsCreateOpen(false)
    },
  })

  return (
    <ResourceScreen title="Employers" onCreate={() => setIsCreateOpen(true)}>
      <ResourceListCard title="Employer list" isLoading={employersQuery.isPending} loadingText="Loading employers...">
        <ul className="m-0 grid list-none gap-2.5 p-0">
          {(employersQuery.data ?? []).map((employer) => (
            <li className="grid gap-0.5 rounded-xl border border-line bg-surfaceSoft p-3" key={employer.id}>
              <strong>{employer.name}</strong>
              <span className="text-sm text-textMuted">{employer.id}</span>
            </li>
          ))}
        </ul>
      </ResourceListCard>
      <ResourceCreateModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create employer"
        error={createMutation.isError ? createMutation.error.message : undefined}
        isSubmitting={createMutation.isPending}
        submitLabel="Create"
        onSubmit={(event) => {
          event.preventDefault()
          void createMutation.mutateAsync(createForm.state.values)
        }}
      >
        <createForm.Field name="name">
          {(field) => <Input placeholder="Employer name" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
        </createForm.Field>
      </ResourceCreateModal>
    </ResourceScreen>
  )
}
