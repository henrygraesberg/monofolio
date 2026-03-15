import { schemas } from "@henrygraesberg/portfolio-db/schemas"
import * as z from "zod"

export const SchoolSchema = schemas.SchoolSchema.extend({})

export const EducationSchema = schemas.EducationSchema.extend({
	school: SchoolSchema
})

export type Education = z.infer<typeof EducationSchema>
