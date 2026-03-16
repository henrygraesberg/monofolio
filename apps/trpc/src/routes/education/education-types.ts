import { schemas } from "@henrygraesberg/portfolio-db/schemas"
import * as z from "zod"

export const SchoolSchema = schemas.SchoolSchema.extend({})

export const EducationSchema = schemas.EducationSchema.extend({
	school: SchoolSchema
})
export const CreateEducationSchema = schemas.EducationSchema.omit({ id: true })

export type Education = z.infer<typeof EducationSchema>
export type CreateEducation = z.infer<typeof CreateEducationSchema>
