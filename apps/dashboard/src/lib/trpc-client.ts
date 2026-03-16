import { schemas } from "@henrygraesberg/portfolio-db/schemas"
import type { AppRouter } from "@henrygraesberg/portfolio-trpc"
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import { z } from "zod"
import { env } from "./env"

const ExperienceWithEmployerSchema = schemas.ExperienceSchema.extend({ employer: schemas.EmployerSchema })
const EducationWithSchoolSchema = schemas.EducationSchema.extend({ school: schemas.SchoolSchema })

const CreateProjectSchema = schemas.ProjectSchema.omit({ id: true })
const CreateExperienceSchema = schemas.ExperienceSchema.omit({ id: true })
const CreateEducationSchema = schemas.EducationSchema.omit({ id: true })
const CreateEmployerSchema = schemas.EmployerSchema.omit({ id: true })
const CreateSchoolSchema = schemas.SchoolSchema.omit({ id: true })

type Project = z.infer<typeof schemas.ProjectSchema>
type Experience = z.infer<typeof ExperienceWithEmployerSchema>
type Education = z.infer<typeof EducationWithSchoolSchema>
type Employer = z.infer<typeof schemas.EmployerSchema>
type School = z.infer<typeof schemas.SchoolSchema>

type CreateProject = z.infer<typeof CreateProjectSchema>
type CreateExperience = z.infer<typeof CreateExperienceSchema>
type CreateEducation = z.infer<typeof CreateEducationSchema>
type CreateEmployer = z.infer<typeof CreateEmployerSchema>
type CreateSchool = z.infer<typeof CreateSchoolSchema>

export const createDashboardTrpcClient = (token: string) =>
  createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: env.trpcUrl,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    ],
  })

export const dashboardQueries = {
  findProjects: async (client: ReturnType<typeof createDashboardTrpcClient>) => {
    const response = await client.project.findMany.query()
    return schemas.ProjectSchema.array().parse(response)
  },
  findExperience: async (client: ReturnType<typeof createDashboardTrpcClient>) => {
    const response = await client.experience.findMany.query()
    return ExperienceWithEmployerSchema.array().parse(response)
  },
  findEducation: async (client: ReturnType<typeof createDashboardTrpcClient>) => {
    const response = await client.education.findMany.query()
    return EducationWithSchoolSchema.array().parse(response)
  },
  findEmployers: async (client: ReturnType<typeof createDashboardTrpcClient>) => {
    const response = await client.employer.findMany.query()
    return schemas.EmployerSchema.array().parse(response)
  },
  findSchools: async (client: ReturnType<typeof createDashboardTrpcClient>) => {
    const response = await client.school.findMany.query()
    return schemas.SchoolSchema.array().parse(response)
  },
}

export const dashboardMutations = {
  createProject: async (client: ReturnType<typeof createDashboardTrpcClient>, input: CreateProject) => {
    const payload = CreateProjectSchema.parse(input)
    const response = await client.project.create.query(payload)
    return schemas.ProjectSchema.parse(response)
  },
  createExperience: async (client: ReturnType<typeof createDashboardTrpcClient>, input: CreateExperience) => {
    const payload = CreateExperienceSchema.parse(input)
    const response = await client.experience.create.query(payload)
    return ExperienceWithEmployerSchema.parse(response)
  },
  createEducation: async (client: ReturnType<typeof createDashboardTrpcClient>, input: CreateEducation) => {
    const payload = CreateEducationSchema.parse(input)
    const response = await client.education.create.query(payload)
    return EducationWithSchoolSchema.parse(response)
  },
  createEmployer: async (client: ReturnType<typeof createDashboardTrpcClient>, input: CreateEmployer) => {
    const payload = CreateEmployerSchema.parse(input)
    const response = await client.employer.create.query(payload)
    return schemas.EmployerSchema.parse(response)
  },
  createSchool: async (client: ReturnType<typeof createDashboardTrpcClient>, input: CreateSchool) => {
    const payload = CreateSchoolSchema.parse(input)
    const response = await client.school.create.query(payload)
    return schemas.SchoolSchema.parse(response)
  },
}

export type {
  Education,
  Experience,
  Project,
  Employer,
  School,
  CreateProject,
  CreateExperience,
  CreateEducation,
  CreateEmployer,
  CreateSchool,
}
