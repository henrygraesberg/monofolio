import { schemas } from "@henrygraesberg/portfolio-db/schemas"
import * as z from "zod"

export const SchoolSchema = schemas.SchoolSchema.extend({})
export const CreateSchoolSchema = SchoolSchema.omit({ id: true })

export type School = z.infer<typeof SchoolSchema>
export type CreateSchool = z.infer<typeof CreateSchoolSchema>
