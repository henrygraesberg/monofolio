import { schemas } from "@henrygraesberg/portfolio-db/schemas"
import * as z from "zod"

export const EmployerSchema = schemas.EmployerSchema.extend({})

export const ExperienceSchema = schemas.ExperienceSchema.extend({
	employer: EmployerSchema
})

export const ExperienceReturnRowSchema = z.object({
	id: z.string(),
	title: z.string(),
	employerId: z.string(),
	startTime: z.coerce.date(),
	endTime: z.coerce.date().nullable(),
	employerName: z.string()
})

export type Experience = z.infer<typeof ExperienceSchema>
export type ExperienceQueryRow = z.infer<typeof ExperienceReturnRowSchema>
