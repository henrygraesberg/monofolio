import { schemas } from "@henrygraesberg/portfolio-db/schemas"
import * as z from "zod"

export const ProjectSchema = schemas.ProjectSchema.extend({})
export const CreateProjectSchema = ProjectSchema.omit({ id: true })

export type Project = z.infer<typeof ProjectSchema>
export type CreateProject = z.infer<typeof CreateProjectSchema>
