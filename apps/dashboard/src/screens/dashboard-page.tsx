import { useAuth0 } from "@auth0/auth0-react"
import { useForm } from "@tanstack/react-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { Lock, LogOut, ShieldAlert, ShieldCheck } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { hasAdminAccess } from "@/lib/auth"
import { env } from "@/lib/env"
import { queryKeys } from "@/lib/query-keys"
import {
  createDashboardTrpcClient,
  dashboardMutations,
  dashboardQueries,
  type Education,
  type Experience,
  type Project,
} from "@/lib/trpc-client"

const dateFormat = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short" })

const formatDateRange = (start: Date, end: Date | null) => {
  const startValue = dateFormat.format(start)
  const endValue = end ? dateFormat.format(end) : "Present"
  return `${startValue} - ${endValue}`
}

const formatDateInput = (date: Date) => date.toISOString().slice(0, 10)

export const DashboardPage = () => {
  const queryClient = useQueryClient()
  const { isAuthenticated, isLoading, loginWithRedirect, logout, getAccessTokenSilently, user } = useAuth0()

  const tokenQuery = useQuery({
    queryKey: ["auth", "token"],
    enabled: isAuthenticated,
    queryFn: () =>
      getAccessTokenSilently({
        authorizationParams: {
          audience: env.auth0Audience,
        },
      }),
  })

  const adminGate = tokenQuery.data ? hasAdminAccess(tokenQuery.data) : { isAdmin: false, subject: null, permissions: [] }
  const trpcClient = tokenQuery.data ? createDashboardTrpcClient(tokenQuery.data) : null

  const searchForm = useForm({
    defaultValues: {
      query: "",
    },
  })

  const [searchQueryText, setSearchQueryText] = useState("")

  const projectCreateForm = useForm({
    defaultValues: {
      title: "",
      url: "",
      shorthandUrl: "",
      sourceControlLink: "",
      imageUrl: "",
    },
  })

  const employerCreateForm = useForm({
    defaultValues: {
      name: "",
    },
  })

  const schoolCreateForm = useForm({
    defaultValues: {
      schoolName: "",
      location: "",
    },
  })

  const experienceCreateForm = useForm({
    defaultValues: {
      title: "",
      employerId: "",
      startTime: "",
      endTime: "",
    },
  })

  const educationCreateForm = useForm({
    defaultValues: {
      degree: "",
      schoolId: "",
      startTime: "",
      endTime: "",
    },
  })

  const searchQuery = searchQueryText.trim().toLowerCase()

  const projectsQuery = useQuery({
    queryKey: queryKeys.dashboard.projects,
    enabled: Boolean(trpcClient) && adminGate.isAdmin,
    queryFn: () => dashboardQueries.findProjects(trpcClient!),
  })

  const experienceQuery = useQuery({
    queryKey: queryKeys.dashboard.experience,
    enabled: Boolean(trpcClient) && adminGate.isAdmin,
    queryFn: () => dashboardQueries.findExperience(trpcClient!),
  })

  const educationQuery = useQuery({
    queryKey: queryKeys.dashboard.education,
    enabled: Boolean(trpcClient) && adminGate.isAdmin,
    queryFn: () => dashboardQueries.findEducation(trpcClient!),
  })

  const employersQuery = useQuery({
    queryKey: queryKeys.dashboard.employers,
    enabled: Boolean(trpcClient) && adminGate.isAdmin,
    queryFn: () => dashboardQueries.findEmployers(trpcClient!),
  })

  const schoolsQuery = useQuery({
    queryKey: queryKeys.dashboard.schools,
    enabled: Boolean(trpcClient) && adminGate.isAdmin,
    queryFn: () => dashboardQueries.findSchools(trpcClient!),
  })

  const refreshAll = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.projects }),
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.experience }),
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.education }),
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.employers }),
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.schools }),
    ])

  const createProjectMutation = useMutation({
    mutationFn: async (values: {
      title: string
      url: string
      shorthandUrl: string
      sourceControlLink: string
      imageUrl: string
    }) =>
      dashboardMutations.createProject(trpcClient!, {
        title: values.title.trim(),
        url: values.url.trim() || null,
        shorthandUrl: values.shorthandUrl.trim() || null,
        sourceControlLink: values.sourceControlLink.trim() || null,
        imageUrl: values.imageUrl.trim() || null,
      }),
    onSuccess: async () => {
      await refreshAll()
      projectCreateForm.reset()
    },
  })

  const createEmployerMutation = useMutation({
    mutationFn: async (values: { name: string }) =>
      dashboardMutations.createEmployer(trpcClient!, {
        name: values.name.trim(),
      }),
    onSuccess: async () => {
      await refreshAll()
      employerCreateForm.reset()
    },
  })

  const createSchoolMutation = useMutation({
    mutationFn: async (values: { schoolName: string; location: string }) =>
      dashboardMutations.createSchool(trpcClient!, {
        schoolName: values.schoolName.trim(),
        location: values.location.trim(),
      }),
    onSuccess: async () => {
      await refreshAll()
      schoolCreateForm.reset()
    },
  })

  const createExperienceMutation = useMutation({
    mutationFn: async (values: { title: string; employerId: string; startTime: string; endTime: string }) =>
      dashboardMutations.createExperience(trpcClient!, {
        title: values.title.trim(),
        employerId: values.employerId,
        startTime: new Date(values.startTime),
        endTime: values.endTime ? new Date(values.endTime) : null,
      }),
    onSuccess: async () => {
      await refreshAll()
      experienceCreateForm.reset()
    },
  })

  const createEducationMutation = useMutation({
    mutationFn: async (values: { degree: string; schoolId: string; startTime: string; endTime: string }) =>
      dashboardMutations.createEducation(trpcClient!, {
        degree: values.degree.trim(),
        schoolId: values.schoolId,
        startTime: new Date(values.startTime),
        endTime: values.endTime ? new Date(values.endTime) : null,
      }),
    onSuccess: async () => {
      await refreshAll()
      educationCreateForm.reset()
    },
  })

  if (isLoading) {
    return (
      <main className="layout-shell">
        <Card>
          <CardHeader>
            <CardTitle>Checking session...</CardTitle>
            <CardDescription>Loading Auth0 session details.</CardDescription>
          </CardHeader>
        </Card>
      </main>
    )
  }

  if (!isAuthenticated) {
    return (
      <main className="layout-shell">
        <Card>
          <CardHeader>
            <CardTitle>Admin login required</CardTitle>
            <CardDescription>Use Auth0 to log into the dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="row-actions">
            <Button onClick={() => loginWithRedirect()}>
              <Lock size={16} />
              Log in with Auth0
            </Button>
            <Link to="/">
              <Button variant="ghost">Back to home</Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    )
  }

  if (tokenQuery.isPending) {
    return (
      <main className="layout-shell">
        <Card>
          <CardHeader>
            <CardTitle>Getting access token...</CardTitle>
            <CardDescription>Loading your API token for dashboard requests.</CardDescription>
          </CardHeader>
        </Card>
      </main>
    )
  }

  if (tokenQuery.isError) {
    return (
      <main className="layout-shell">
        <Card>
          <CardHeader>
            <CardTitle>Token error</CardTitle>
            <CardDescription>Could not get an Auth0 API token for dashboard access.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="muted">{tokenQuery.error.message}</p>
          </CardContent>
        </Card>
      </main>
    )
  }

  if (!adminGate.isAdmin) {
    return (
      <main className="layout-shell">
        <Card>
          <CardHeader>
            <CardTitle>Access denied</CardTitle>
            <CardDescription>Your account is authenticated but does not have admin access.</CardDescription>
          </CardHeader>
          <CardContent className="stack-gap">
            <p className="muted">Signed in as {user?.email ?? user?.name ?? "Unknown user"}</p>
            <p className="muted">Subject: {adminGate.subject ?? "Unavailable"}</p>
            <div className="row-actions">
              <Button variant="ghost" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                <LogOut size={16} />
                Log out
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    )
  }

  const employers = employersQuery.data ?? []
  const schools = schoolsQuery.data ?? []

  const filteredProjects = (projectsQuery.data ?? []).filter((item) => item.title.toLowerCase().includes(searchQuery))
  const filteredExperience = (experienceQuery.data ?? []).filter(
    (item) => item.title.toLowerCase().includes(searchQuery) || item.employer.name.toLowerCase().includes(searchQuery)
  )
  const filteredEducation = (educationQuery.data ?? []).filter(
    (item) => item.degree.toLowerCase().includes(searchQuery) || item.school.schoolName.toLowerCase().includes(searchQuery)
  )

  const hasError =
    projectsQuery.isError ||
    experienceQuery.isError ||
    educationQuery.isError ||
    employersQuery.isError ||
    schoolsQuery.isError

  return (
    <main className="layout-shell">
      <header className="dashboard-header">
        <div className="stack-gap">
          <p className="eyebrow">Admin Dashboard</p>
          <h1>Monofolio content management</h1>
          <p className="muted">Signed in as {user?.email ?? user?.name ?? adminGate.subject ?? "Unknown user"}</p>
        </div>
        <div className="row-actions">
          <Button variant="secondary" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            <LogOut size={16} />
            Log out
          </Button>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>List filter</CardTitle>
          <CardDescription>Use TanStack Form state to filter all list collections.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="row-actions" onSubmit={(event) => event.preventDefault()}>
            <searchForm.Field name="query">
              {(field) => (
                <Input
                  placeholder="Search projects, experience, education..."
                  value={field.state.value}
                  onChange={(event) => {
                    const value = event.target.value
                    field.handleChange(value)
                    setSearchQueryText(value)
                  }}
                />
              )}
            </searchForm.Field>
          </form>
        </CardContent>
      </Card>

      {hasError ? (
        <Card className="error-card">
          <CardHeader>
            <CardTitle>
              <ShieldAlert size={16} />
              Request failed
            </CardTitle>
            <CardDescription>One or more requests failed. Check API and Auth0 config.</CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      {createEmployerMutation.isError ||
      createSchoolMutation.isError ||
      createProjectMutation.isError ||
      createExperienceMutation.isError ||
      createEducationMutation.isError ? (
        <Card className="error-card">
          <CardHeader>
            <CardTitle>
              <ShieldAlert size={16} />
              Create failed
            </CardTitle>
            <CardDescription>
              {(createEmployerMutation.error as Error | null)?.message ??
                (createSchoolMutation.error as Error | null)?.message ??
                (createProjectMutation.error as Error | null)?.message ??
                (createExperienceMutation.error as Error | null)?.message ??
                (createEducationMutation.error as Error | null)?.message ??
                "Creation request failed. Check required fields and backend logs."}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      <div className="grid-columns">
        <Card>
          <CardHeader>
            <CardTitle>Employers</CardTitle>
            <CardDescription>Create employers used by experiences.</CardDescription>
          </CardHeader>
          <CardContent className="stack-gap">
            <form
              className="stack-gap"
              onSubmit={(event) => {
                event.preventDefault()
                void createEmployerMutation.mutateAsync(employerCreateForm.state.values)
              }}
            >
              <employerCreateForm.Field name="name">
                {(field) => (
                  <Input
                    placeholder="Employer name"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                )}
              </employerCreateForm.Field>
              <Button type="submit" disabled={createEmployerMutation.isPending}>
                Create employer
              </Button>
            </form>
            <ul className="list-stack">
              {employers.map((employer) => (
                <li className="list-item" key={employer.id}>
                  <strong>{employer.name}</strong>
                  <span className="muted small">{employer.id}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schools</CardTitle>
            <CardDescription>Create schools used by education entries.</CardDescription>
          </CardHeader>
          <CardContent className="stack-gap">
            <form
              className="stack-gap"
              onSubmit={(event) => {
                event.preventDefault()
                void createSchoolMutation.mutateAsync(schoolCreateForm.state.values)
              }}
            >
              <schoolCreateForm.Field name="schoolName">
                {(field) => (
                  <Input
                    placeholder="School name"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                )}
              </schoolCreateForm.Field>
              <schoolCreateForm.Field name="location">
                {(field) => (
                  <Input
                    placeholder="Location"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                )}
              </schoolCreateForm.Field>
              <Button type="submit" disabled={createSchoolMutation.isPending}>
                Create school
              </Button>
            </form>
            <ul className="list-stack">
              {schools.map((school) => (
                <li className="list-item" key={school.id}>
                  <strong>{school.schoolName}</strong>
                  <span className="muted small">{school.location}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
            <CardDescription>Create projects and list current projects.</CardDescription>
          </CardHeader>
          <CardContent className="stack-gap">
            <form
              className="stack-gap"
              onSubmit={(event) => {
                event.preventDefault()
                void createProjectMutation.mutateAsync(projectCreateForm.state.values)
              }}
            >
              <projectCreateForm.Field name="title">
                {(field) => (
                  <Input
                    placeholder="Project title"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                )}
              </projectCreateForm.Field>
              <projectCreateForm.Field name="url">
                {(field) => (
                  <Input
                    placeholder="Project URL"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                )}
              </projectCreateForm.Field>
              <projectCreateForm.Field name="shorthandUrl">
                {(field) => (
                  <Input
                    placeholder="Shorthand URL"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                )}
              </projectCreateForm.Field>
              <projectCreateForm.Field name="sourceControlLink">
                {(field) => (
                  <Input
                    placeholder="Source control URL"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                )}
              </projectCreateForm.Field>
              <projectCreateForm.Field name="imageUrl">
                {(field) => (
                  <Input
                    placeholder="Image URL"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                )}
              </projectCreateForm.Field>
              <Button type="submit" disabled={createProjectMutation.isPending}>
                Create project
              </Button>
            </form>
            <ul className="list-stack">
              {filteredProjects.map((item) => (
                <li className="list-item" key={item.id}>
                  <strong>{item.title}</strong>
                  <span className="muted small">{item.url ?? item.sourceControlLink ?? "No links"}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid-columns">
        <Card>
          <CardHeader>
            <CardTitle>Experience</CardTitle>
            <CardDescription>Create entries and list current experience.</CardDescription>
          </CardHeader>
          <CardContent className="stack-gap">
            <form
              className="stack-gap"
              onSubmit={(event) => {
                event.preventDefault()
                void createExperienceMutation.mutateAsync(experienceCreateForm.state.values)
              }}
            >
              <experienceCreateForm.Field name="title">
                {(field) => (
                  <Input
                    placeholder="Title"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                )}
              </experienceCreateForm.Field>
              <experienceCreateForm.Field name="employerId">
                {(field) => (
                  <select
                    className="input"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                  >
                    <option value="">Select employer</option>
                    {employers.map((employer) => (
                      <option key={employer.id} value={employer.id}>
                        {employer.name}
                      </option>
                    ))}
                  </select>
                )}
              </experienceCreateForm.Field>
              <experienceCreateForm.Field name="startTime">
                {(field) => (
                  <Input
                    type="date"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                )}
              </experienceCreateForm.Field>
              <experienceCreateForm.Field name="endTime">
                {(field) => (
                  <Input
                    type="date"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                )}
              </experienceCreateForm.Field>
              <Button type="submit" disabled={createExperienceMutation.isPending}>
                Create experience
              </Button>
            </form>
            <ul className="list-stack">
              {filteredExperience.map((item) => (
                <li className="list-item" key={item.id}>
                  <strong>{item.title}</strong>
                  <span className="muted small">{item.employer.name}</span>
                  <span className="muted small">{formatDateRange(item.startTime, item.endTime)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
            <CardDescription>Create entries and list education history.</CardDescription>
          </CardHeader>
          <CardContent className="stack-gap">
            <form
              className="stack-gap"
              onSubmit={(event) => {
                event.preventDefault()
                void createEducationMutation.mutateAsync(educationCreateForm.state.values)
              }}
            >
              <educationCreateForm.Field name="degree">
                {(field) => (
                  <Input
                    placeholder="Degree"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                )}
              </educationCreateForm.Field>
              <educationCreateForm.Field name="schoolId">
                {(field) => (
                  <select
                    className="input"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                  >
                    <option value="">Select school</option>
                    {schools.map((school) => (
                      <option key={school.id} value={school.id}>
                        {school.schoolName}
                      </option>
                    ))}
                  </select>
                )}
              </educationCreateForm.Field>
              <educationCreateForm.Field name="startTime">
                {(field) => (
                  <Input
                    type="date"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                )}
              </educationCreateForm.Field>
              <educationCreateForm.Field name="endTime">
                {(field) => (
                  <Input
                    type="date"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                )}
              </educationCreateForm.Field>
              <Button type="submit" disabled={createEducationMutation.isPending}>
                Create education
              </Button>
            </form>
            <ul className="list-stack">
              {filteredEducation.map((item) => (
                <li className="list-item" key={item.id}>
                  <strong>{item.degree}</strong>
                  <span className="muted small">{item.school.schoolName}</span>
                  <span className="muted small">{formatDateRange(item.startTime, item.endTime)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <ShieldCheck size={16} /> Quick references
            </CardTitle>
            <CardDescription>Copy IDs for related resources when creating entries.</CardDescription>
          </CardHeader>
          <CardContent className="stack-gap">
            <h3>Employers</h3>
            <ul className="list-stack">
              {employers.map((employer) => (
                <li className="list-item" key={employer.id}>
                  <strong>{employer.name}</strong>
                  <span className="muted small">{employer.id}</span>
                </li>
              ))}
            </ul>
            <h3>Schools</h3>
            <ul className="list-stack">
              {schools.map((school) => (
                <li className="list-item" key={school.id}>
                  <strong>{school.schoolName}</strong>
                  <span className="muted small">{school.id}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
