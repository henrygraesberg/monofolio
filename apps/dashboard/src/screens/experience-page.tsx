import { useForm } from "@tanstack/react-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useAdminSession } from "@/components/admin-guard"
import { ResourceCreateModal, ResourceListCard, ResourceScreen } from "@/components/dashboard/resource-screen"
import { Input } from "@/components/ui/input"
import { RichTextEditor } from "@/components/ui/rich-text-editor"
import { queryKeys } from "@/lib/query-keys"
import { dashboardMutations, dashboardQueries } from "@/lib/trpc-client"

const dateFormat = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short" })
const formatDateRange = (start: Date, end: Date | null) => `${dateFormat.format(start)} - ${end ? dateFormat.format(end) : "Present"}`

export const ExperiencePage = () => {
  const { trpcClient } = useAdminSession()
  const queryClient = useQueryClient()
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const createForm = useForm({ defaultValues: { title: "", employerId: "", startTime: "", endTime: "", description: "" } })

  const experienceQuery = useQuery({ queryKey: queryKeys.dashboard.experience, queryFn: () => dashboardQueries.findExperience(trpcClient) })
  const employersQuery = useQuery({ queryKey: queryKeys.dashboard.employers, queryFn: () => dashboardQueries.findEmployers(trpcClient) })

  const createMutation = useMutation({
    mutationFn: (values: typeof createForm.state.values) =>
      dashboardMutations.createExperience(trpcClient, {
        title: values.title.trim(),
        employerId: values.employerId,
        startTime: new Date(values.startTime),
        endTime: values.endTime ? new Date(values.endTime) : null,
        description: values.description.trim(),
      }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.experience }),
        queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.employers }),
      ])
      createForm.reset()
      setIsCreateOpen(false)
    },
  })

  const employers = employersQuery.data ?? []

  return (
    <ResourceScreen title="Experience" onCreate={() => setIsCreateOpen(true)}>
      <ResourceListCard title="Experience list" isLoading={experienceQuery.isPending} loadingText="Loading experience...">
        <ul className="m-0 grid list-none gap-2.5 p-0">
          {(experienceQuery.data ?? []).map((item) => (
            <li className="grid gap-0.5 rounded-xl border border-line bg-surfaceSoft p-3" key={item.id}>
              <strong>{item.title}</strong>
              <span className="text-sm text-textMuted">{item.employer.name}</span>
              <span className="text-sm text-textMuted">{formatDateRange(item.startTime, item.endTime)}</span>
              {item.description ? (
                <article
                  className="max-w-none text-textMain [&_h1]:font-serif [&_h1]:text-2xl [&_h1]:my-2 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:my-2 [&_p]:my-2 [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6 [&_li]:my-1 [&_a]:text-brand [&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              ) : null}
            </li>
          ))}
        </ul>
      </ResourceListCard>
      <ResourceCreateModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create experience"
        error={createMutation.isError ? createMutation.error.message : undefined}
        isSubmitting={createMutation.isPending}
        submitLabel="Create"
        onSubmit={(event) => {
          event.preventDefault()
          void createMutation.mutateAsync(createForm.state.values)
        }}
      >
        <createForm.Field name="title">
          {(field) => <Input placeholder="Title" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
        </createForm.Field>
        <createForm.Field name="employerId">
          {(field) => (
            <select className="h-10 w-full rounded-[10px] border border-line bg-surfaceSoft px-3 text-[0.95rem] text-textMain outline-offset-1 focus:outline focus:outline-2 focus:outline-[#9bb3a5]" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)}>
              <option value="">Select employer</option>
              {employers.map((employer) => (
                <option key={employer.id} value={employer.id}>
                  {employer.name}
                </option>
              ))}
            </select>
          )}
        </createForm.Field>
        <createForm.Field name="startTime">
          {(field) => <Input type="date" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
        </createForm.Field>
        <createForm.Field name="endTime">
          {(field) => <Input type="date" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
        </createForm.Field>
        <createForm.Field name="description">
          {(field) => <RichTextEditor value={field.state.value} onChange={(value) => field.handleChange(value)} />}
        </createForm.Field>
      </ResourceCreateModal>
    </ResourceScreen>
  )
}
