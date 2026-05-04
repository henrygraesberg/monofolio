// 0001 | import { schemas } from "@henrygraesberg/portfolio-db/schemas"
// 0002 | import * as z from "zod"
// 0003 | 
// 0004 | export const ProjectSchema = schemas.ProjectSchema.extend({})
// 0005 | export const CreateProjectSchema = ProjectSchema.omit({ id: true })
// 0006 | 
// 0007 | export type Project = z.infer<typeof ProjectSchema>
// 0008 | export type CreateProject = z.infer<typeof CreateProjectSchema>
