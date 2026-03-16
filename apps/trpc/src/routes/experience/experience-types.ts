import { schemas } from "@henrygraesberg/portfolio-db/schemas"
import { EmployerSchema } from "../employer/employer-types"
import * as z from "zod"

export const ExperienceSchema = schemas.ExperienceSchema.extend({
	employer: EmployerSchema
})
export const CreateExperienceSchema = schemas.ExperienceSchema.omit({ id: true })

export type Experience = z.infer<typeof ExperienceSchema>
export type CreateExperience = z.infer<typeof CreateExperienceSchema>
