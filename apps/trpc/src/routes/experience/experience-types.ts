import { schemas } from "@henrygraesberg/portfolio-db/schemas"
import * as z from "zod"

export const EmployerSchema = schemas.EmployerSchema.extend({})

export const ExperienceSchema = schemas.ExperienceSchema.extend({
	employer: EmployerSchema
})

export type Experience = z.infer<typeof ExperienceSchema>
