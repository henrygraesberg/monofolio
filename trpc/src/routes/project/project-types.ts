import { schemas } from "@henrygraesberg/portfolio-db/schemas"
import * as z from "zod"

export const ProjectSchema = schemas.ProjectSchema.extend({})

export type Project = z.infer<typeof ProjectSchema>
