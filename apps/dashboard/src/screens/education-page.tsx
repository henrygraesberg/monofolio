import { useForm } from "@tanstack/react-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useAdminSession } from "@/components/admin-guard"
import { ResourceCreateModal, ResourceListCard, ResourceScreen } from "@/components/dashboard/resource-screen"
import { Input } from "@/components/ui/input"
import { queryKeys } from "@/lib/query-keys"
import { dashboardMutations, dashboardQueries } from "@/lib/trpc-client"

const dateFormat = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short" })
const formatDateRange = (start: Date, end: Date | null) => `${dateFormat.format(start)} - ${end ? dateFormat.format(end) : "Present"}`

export const EducationPage = () => {
  const { trpcClient } = useAdminSession()
  const queryClient = useQueryClient()
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const createForm = useForm({ defaultValues: { degree: "", schoolId: "", startTime: "", endTime: "" } })

  const educationQuery = useQuery({ queryKey: queryKeys.dashboard.education, queryFn: () => dashboardQueries.findEducation(trpcClient) })
  const schoolsQuery = useQuery({ queryKey: queryKeys.dashboard.schools, queryFn: () => dashboardQueries.findSchools(trpcClient) })

  const createMutation = useMutation({
    mutationFn: (values: typeof createForm.state.values) =>
      dashboardMutations.createEducation(trpcClient, {
        degree: values.degree.trim(),
        schoolId: values.schoolId,
        startTime: new Date(values.startTime),
        endTime: values.endTime ? new Date(values.endTime) : null,
      }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.education }),
        queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.schools }),
      ])
      createForm.reset()
      setIsCreateOpen(false)
    },
  })

  const schools = schoolsQuery.data ?? []

  return (
    <ResourceScreen title="Education" onCreate={() => setIsCreateOpen(true)}>
      <ResourceListCard title="Education list" isLoading={educationQuery.isPending} loadingText="Loading education...">
        <ul className="m-0 grid list-none gap-2.5 p-0">
          {(educationQuery.data ?? []).map((item) => (
            <li className="grid gap-0.5 rounded-xl border border-line bg-surfaceSoft p-3" key={item.id}>
              <strong>{item.degree}</strong>
              <span className="text-sm text-textMuted">{item.school.schoolName}</span>
              <span className="text-sm text-textMuted">{formatDateRange(item.startTime, item.endTime)}</span>
            </li>
          ))}
        </ul>
      </ResourceListCard>
      <ResourceCreateModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create education"
        error={createMutation.isError ? createMutation.error.message : undefined}
        isSubmitting={createMutation.isPending}
        submitLabel="Create"
        onSubmit={(event) => {
          event.preventDefault()
          void createMutation.mutateAsync(createForm.state.values)
        }}
      >
        <createForm.Field name="degree">
          {(field) => <Input placeholder="Degree" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
        </createForm.Field>
        <createForm.Field name="schoolId">
          {(field) => (
            <select className="h-10 w-full rounded-[10px] border border-line bg-surfaceSoft px-3 text-[0.95rem] text-textMain outline-offset-1 focus:outline focus:outline-2 focus:outline-[#9bb3a5]" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)}>
              <option value="">Select school</option>
              {schools.map((school) => (
                <option key={school.id} value={school.id}>
                  {school.schoolName}
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
      </ResourceCreateModal>
    </ResourceScreen>
  )
}
