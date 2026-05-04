// 0001 | import { schemas } from "@henrygraesberg/portfolio-db/schemas"
// 0002 | import type { AppRouter } from "@henrygraesberg/portfolio-trpc"
// 0003 | import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
// 0004 | import { z } from "zod"
// 0005 | import { env } from "./env"
// 0006 | 
// 0007 | const ExperienceWithEmployerSchema = schemas.ExperienceSchema.extend({ employer: schemas.EmployerSchema })
// 0008 | const EducationWithSchoolSchema = schemas.EducationSchema.extend({ school: schemas.SchoolSchema })
// 0009 | 
// 0010 | const CreateProjectSchema = schemas.ProjectSchema.omit({ id: true })
// 0011 | const CreateExperienceSchema = schemas.ExperienceSchema.omit({ id: true })
// 0012 | const CreateEducationSchema = schemas.EducationSchema.omit({ id: true })
// 0013 | const CreateEmployerSchema = schemas.EmployerSchema.omit({ id: true })
// 0014 | const CreateSchoolSchema = schemas.SchoolSchema.omit({ id: true })
// 0015 | 
// 0016 | type Project = z.infer<typeof schemas.ProjectSchema>
// 0017 | type Experience = z.infer<typeof ExperienceWithEmployerSchema>
// 0018 | type Education = z.infer<typeof EducationWithSchoolSchema>
// 0019 | type Employer = z.infer<typeof schemas.EmployerSchema>
// 0020 | type School = z.infer<typeof schemas.SchoolSchema>
// 0021 | 
// 0022 | type CreateProject = z.infer<typeof CreateProjectSchema>
// 0023 | type CreateExperience = z.infer<typeof CreateExperienceSchema>
// 0024 | type CreateEducation = z.infer<typeof CreateEducationSchema>
// 0025 | type CreateEmployer = z.infer<typeof CreateEmployerSchema>
// 0026 | type CreateSchool = z.infer<typeof CreateSchoolSchema>
// 0027 | 
// 0028 | export const createDashboardTrpcClient = (token: string) =>
// 0029 |   createTRPCProxyClient<AppRouter>({
// 0030 |     links: [
// 0031 |       httpBatchLink({
// 0032 |         url: env.trpcUrl,
// 0033 |         headers: {
// 0034 |           authorization: `Bearer ${token}`,
// 0035 |         },
// 0036 |       }),
// 0037 |     ],
// 0038 |   })
// 0039 | 
// 0040 | export const dashboardQueries = {
// 0041 |   findProjects: async (client: ReturnType<typeof createDashboardTrpcClient>) => {
// 0042 |     const response = await client.project.findMany.query()
// 0043 |     return schemas.ProjectSchema.array().parse(response)
// 0044 |   },
// 0045 |   findExperience: async (client: ReturnType<typeof createDashboardTrpcClient>) => {
// 0046 |     const response = await client.experience.findMany.query()
// 0047 |     return ExperienceWithEmployerSchema.array().parse(response)
// 0048 |   },
// 0049 |   findEducation: async (client: ReturnType<typeof createDashboardTrpcClient>) => {
// 0050 |     const response = await client.education.findMany.query()
// 0051 |     return EducationWithSchoolSchema.array().parse(response)
// 0052 |   },
// 0053 |   findEmployers: async (client: ReturnType<typeof createDashboardTrpcClient>) => {
// 0054 |     const response = await client.employer.findMany.query()
// 0055 |     return schemas.EmployerSchema.array().parse(response)
// 0056 |   },
// 0057 |   findSchools: async (client: ReturnType<typeof createDashboardTrpcClient>) => {
// 0058 |     const response = await client.school.findMany.query()
// 0059 |     return schemas.SchoolSchema.array().parse(response)
// 0060 |   },
// 0061 | }
// 0062 | 
// 0063 | export const dashboardMutations = {
// 0064 |   createProject: async (client: ReturnType<typeof createDashboardTrpcClient>, input: CreateProject) => {
// 0065 |     const payload = CreateProjectSchema.parse(input)
// 0066 |     const response = await client.project.create.query(payload)
// 0067 |     return schemas.ProjectSchema.parse(response)
// 0068 |   },
// 0069 |   createExperience: async (client: ReturnType<typeof createDashboardTrpcClient>, input: CreateExperience) => {
// 0070 |     const payload = CreateExperienceSchema.parse(input)
// 0071 |     const response = await client.experience.create.query(payload)
// 0072 |     return ExperienceWithEmployerSchema.parse(response)
// 0073 |   },
// 0074 |   createEducation: async (client: ReturnType<typeof createDashboardTrpcClient>, input: CreateEducation) => {
// 0075 |     const payload = CreateEducationSchema.parse(input)
// 0076 |     const response = await client.education.create.query(payload)
// 0077 |     return EducationWithSchoolSchema.parse(response)
// 0078 |   },
// 0079 |   createEmployer: async (client: ReturnType<typeof createDashboardTrpcClient>, input: CreateEmployer) => {
// 0080 |     const payload = CreateEmployerSchema.parse(input)
// 0081 |     const response = await client.employer.create.query(payload)
// 0082 |     return schemas.EmployerSchema.parse(response)
// 0083 |   },
// 0084 |   createSchool: async (client: ReturnType<typeof createDashboardTrpcClient>, input: CreateSchool) => {
// 0085 |     const payload = CreateSchoolSchema.parse(input)
// 0086 |     const response = await client.school.create.query(payload)
// 0087 |     return schemas.SchoolSchema.parse(response)
// 0088 |   },
// 0089 | }
// 0090 | 
// 0091 | export type {
// 0092 |   Education,
// 0093 |   Experience,
// 0094 |   Project,
// 0095 |   Employer,
// 0096 |   School,
// 0097 |   CreateProject,
// 0098 |   CreateExperience,
// 0099 |   CreateEducation,
// 0100 |   CreateEmployer,
// 0101 |   CreateSchool,
// 0102 | }
